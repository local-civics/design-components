import { Auth0ContextInterface, Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { Client, init, errorCode } from "@local-civics/js-client";
import React from "react";
import * as Sentry from "@sentry/react";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "../Error/Error";
import { MessageProvider, useMessage } from "../Message";
import { Context, Method, RequestOptions, Service } from "@local-civics/js-client/dist/client";

/* Auth domain for auth0 */
const AuthDomain = process.env.REACT_APP_AUTH_DOMAIN || "auth.localcivics.io";

/* Client id for auth0 */
const ClientId = process.env.REACT_APP_AUTH_CLIENT_ID || "1Epch6YO3dcGBApKkSFCl6dz5aADfU7x";

/* Api context */
const ApiContext = React.createContext(undefined as ApiState | undefined);

/* Auth context */
const AuthContext = React.createContext(undefined as AuthState | undefined);

/* Tenant context */
const TenantContext = React.createContext(undefined as TenantState | undefined);

/**
 * A hook for subscribing to the current tenant
 */
export const useTenant = () => {
  const context = React.useContext(TenantContext);
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider");
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
 * tenant state.
 */
export type TenantState = any & {
  isLoading: boolean;
  resolve: () => Promise<any>;
  configure: (conf: any) => Promise<any>;
};

/**
 * The api state.
 */
export type ApiState = Client & { accessToken?: string };

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
            <TenantProvider>
              <Consumer>{props.children}</Consumer>
            </TenantProvider>
          </ApiProvider>
        </AuthProvider>
      </MessageProvider>
    </ErrorBoundary>
  );
};

/**
 * Provide tenant tenant.
 */
export const TenantProvider = (props: { children?: React.ReactNode }) => {
  const Tenant = () => {
    const navigate = useNavigate();
    const [tenant, setTenant] = React.useState({} as TenantState);
    const [isLoading, setResolving] = React.useState(true);
    const location = useLocation();
    const api = useApi();
    const { accessToken } = useAuth();
    const [needsReload, setNeedsReload] = React.useState(false);
    const context = {
      ...tenant,
      isLoading: isLoading,
      configure: async (body: any) => {
        setResolving(true);
        const data = { ...body };
        const ctx = { referrer: location.pathname };
        let resp: any;
        if (data.avatar !== undefined) {
          const ctx = { referrer: location.pathname };
          const form = new FormData();
          form.append("object", data.avatar);
          data.avatarURL = await api.do(ctx, "PUT", "media", `/tenants/${tenant.tenantName}/store/avatar`, {
            body: form,
          })
          delete data.avatar
        }

        if (Object.keys(data).length > 0) {
          resp = await api.do(ctx, "PATCH", "identity", `/tenants/${tenant.tenantName}`, {
            body: data,
          });
        }

        setNeedsReload(true);
        return resp;
      },
      resolve: async () => {
        setResolving(true);
        const ctx = { referrer: location.pathname };
        const tenant = { ...(await api.do(ctx, "GET", "identity", "/me")) };
        setTenant(tenant);
        setResolving(false);
        Sentry.setUser({ id: tenant.tenantId, tenantName: tenant.tenantName });

        if (location.search && (location.pathname === "/" || !location.pathname)) {
          navigate(`/tenants/${tenant.tenantName}`);
        }
      },
    };

    // Watch for access token changes and re-authenticate.
    React.useEffect(() => {
      if (!accessToken) {
        Sentry.configureScope((scope) => scope.setUser(null));
        setTenant({} as TenantState);
        return;
      }

      (async () => {
        await context.resolve();
        setNeedsReload(false);
      })();

      return () => setTenant({} as TenantState);
    }, [accessToken, needsReload]);

    return (
      <TenantContext.Provider value={context}>
        <Consumer>{props.children}</Consumer>
      </TenantContext.Provider>
    );
  };

  return <Tenant />;
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
    const client = init(accessToken, {
      gatewayURL: process.env.REACT_APP_API_URL,
      onReject: (e) => {
        send(e);

        const code = errorCode(e);
        if (code >= 400 && code < 500) {
          return Promise.resolve(e);
        }

        return Promise.reject(e);
      },
    });

    const context = {
      ...client,
      accessToken,
      do: async (ctx: Context, method: Method, service: Service, endpoint: string, options?: RequestOptions) => {
        if (accessToken) {
          return client.do(ctx, method, service, endpoint, options);
        }
      },
    };

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
      nickname: auth0.user?.nickname,
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
