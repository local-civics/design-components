import { Auth0ContextInterface, Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { Client, client, IsBadRequest, IsNotAuthorized, IsNotFound, TenantPreview } from "@local-civics/js-client";
import React from "react";
import * as Sentry from "@sentry/react";
import { Simulate } from "react-dom/test-utils";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "../Error/Error";
import { MessageProvider, useMessage } from "../Message";
import error = Simulate.error;

/* Auth domain for auth0 */
const AuthDomain = process.env.REACT_APP_AUTH_DOMAIN || "auth.localcivics.io";

/* Client id for auth0 */
const ClientId = process.env.REACT_APP_AUTH_CLIENT_ID || "1Epch6YO3dcGBApKkSFCl6dz5aADfU7x";

/* Api context */
const ApiContext = React.createContext(undefined as ApiState | undefined);

/* Auth context */
const AuthContext = React.createContext(undefined as AuthState | undefined);

/* Identity context */
const IdentityContext = React.createContext(undefined as IdentityState | undefined);

/**
 * A hook for subscribing to the current identity
 */
export const useIdentity = () => {
  const context = React.useContext(IdentityContext);
  if (context === undefined) {
    throw new Error("useIdentity must be used within a IdentityProvider");
  }
  return context;
};

/**
 * A hook for handling authentication.
 */
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

/**
 * A hook for subscribing to and api context
 */
export const useApi = () => {
  const context = React.useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within a ApiProvider");
  }

  return context;
};

/**
 * identity state.
 */
export type IdentityState = TenantPreview & {
  resolving: boolean;
  digest: () => Promise<void>;
};

/**
 * The api state.
 */
export type ApiState = Client;

/**
 * Auth state.
 */
export type AuthState = {
  accessToken?: string;
  login?: () => Promise<void>;
  logout?: () => void;
};

/**
 * The properties for the app provider.
 */
export type AppProviderProps = {
  accessToken?: string;
  children: React.ReactNode;
};

const Consumer = React.memo((props) => <>{props.children}</>);

/**
 * Provide access to apis and tenant.
 *
 * @link https://auth0.com/docs/quickstart/spa/react/01-login#show-user-profile-information
 * @link https://auth0.com/docs/quickstart/spa/react/02-calling-an-api
 * @param props
 * @constructor
 */
export const AppProvider = (props: AppProviderProps) => {
  return (
    <ErrorBoundary>
      <MessageProvider>
        <AuthProvider accessToken={props.accessToken}>
          <ApiProvider>
            <IdentityProvider>
              <Consumer>{props.children}</Consumer>
            </IdentityProvider>
          </ApiProvider>
        </AuthProvider>
      </MessageProvider>
    </ErrorBoundary>
  );
};

/**
 * Provide identity identity.
 */
export const IdentityProvider = (props: { children?: React.ReactNode }) => {
  const Identity = () => {
    const navigate = useNavigate();
    const [identity, setIdentity] = React.useState({} as TenantPreview);
    const [resolving, setResolving] = React.useState(true);
    const location = useLocation();
    const api = useApi();
    const { accessToken } = useAuth();
    const context = {
      ...identity,
      resolving: resolving,
      digest: async () => {
        setResolving(true);
        const tenant = await api.identity.digest();
        setIdentity(tenant);
        setResolving(false);
        Sentry.setUser({ id: tenant.id, tenantName: tenant.nickname });

        if (location.search && (location.pathname === "/" || !location.pathname)) {
          navigate(`/tenants/${tenant.nickname}`);
        }
      },
    };

    // Watch for access token changes and re-authenticate.
    React.useEffect(() => {
      if (!accessToken) {
        Sentry.configureScope((scope) => scope.setUser(null));
        setIdentity({});
        return;
      }

      (async () => {
        await context.digest();
      })();

      return () => setIdentity({});
    }, [accessToken]);

    return (
      <IdentityContext.Provider value={context}>
        <Consumer>{props.children}</Consumer>
      </IdentityContext.Provider>
    );
  };

  return <Identity />;
};

/**
 * Provide access to apis.
 */
export const ApiProvider = (props: { children?: React.ReactNode }) => {
  const Api = () => {
    const { send } = useMessage();
    const memoSend = React.useCallback(send, []);
    return <MessageApi send={memoSend} />;
  };

  const MessageApi = React.memo<{ send: (err: any) => void }>(({ send }) => {
    const { accessToken } = useAuth();
    const context = client({
      apiURL: process.env.REACT_APP_API_URL,
      accessToken: accessToken,
      onReject: (e) => {
        send(e);
        if (IsBadRequest(e)) {
          return Promise.resolve(e);
        }

        if (IsNotFound(e) || IsNotAuthorized(e)) {
          return Promise.resolve(null);
        }

        return Promise.reject(e);
      },
    });
    return (
      <ApiContext.Provider value={context}>
        <Consumer>{props.children}</Consumer>
      </ApiContext.Provider>
    );
  });

  return <Api />;
};

/**
 * Provide access to auth.
 */
export const AuthProvider = (props: { accessToken?: string; children?: React.ReactNode }) => {
  const Auth = () => {
    const { send } = useMessage();
    const memoSend = React.useCallback(send, []);
    return <MessageAuth send={memoSend} />;
  };

  const MessageAuth = React.memo<{ send: (err: any) => void }>(({ send }) => {
    const auth0 = useAuth0();
    const accessToken = useAccessToken(auth0, props.accessToken);
    const context = {
      accessToken: accessToken,
      login: async () =>
        auth0.loginWithRedirect().catch((e) => {
          send(e);
          throw e;
        }),
      logout: async () => auth0.logout({ returnTo: window.location.origin }),
    };

    return (
      <AuthContext.Provider value={context}>
        <Consumer>{props.children}</Consumer>
      </AuthContext.Provider>
    );
  });

  return (
    <Auth0Provider audience={audience()} domain={AuthDomain} clientId={ClientId} redirectUri={window.location.origin}>
      <Auth />
    </Auth0Provider>
  );
};

/**
 * A custom hook to obtain an access token.
 * @link https://auth0.com/docs/get-started/apis/scopes/openid-connect-scopes
 */
const useAccessToken = (auth0: Auth0ContextInterface, token?: string) => {
  const [accessToken, setAccessToken] = React.useState(token);
  React.useEffect(() => {
    (async () => {
      if (token) {
        setAccessToken(token);
        return;
      }

      if (!auth0.isAuthenticated) {
        return;
      }

      try {
        const accessToken = await auth0.getAccessTokenSilently({
          audience: audience(),
          scope: "read:current_user openid email profile",
        });
        setAccessToken(accessToken);
      } catch (e) {
        console.log(e);
      }
    })();

    return () => setAccessToken(token);
  }, [auth0.isAuthenticated, auth0.user?.sub, token]);
  return accessToken;
};

/**
 * Determine audience by app environment.
 */
const audience = () => {
  const audience = process.env.REACT_APP_AUTH_AUDIENCE;
  if (audience) {
    return audience;
  }

  const env = process.env.REACT_APP_ENV;
  switch (env) {
    case "beta":
      return `dev.api.localcivics.io`;
    case "alpha":
      return `stg.api.localcivics.io`;
    default:
      return `api.localcivics.io`;
  }
};
