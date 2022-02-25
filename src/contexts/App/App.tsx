import { Auth0ContextInterface, Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { Client, client, Resident } from "@local-civics/js-client";
import React from "react";
import * as Sentry from "@sentry/react";
import { ErrorContextProvider } from "../Error/Error";
import { MessageProvider, useMessage } from "../Message";

/* Auth domain for auth0 */
const AuthDomain = process.env.AUTH_DOMAIN || "auth.localcivics.io";

/* Client id for auth0 */
const ClientId = process.env.CLIENT_ID || "1Epch6YO3dcGBApKkSFCl6dz5aADfU7x";

/* App context */
const AppContext = React.createContext({} as AppState);

/**
 * A hook for subscribing to the current requester
 */
export const useRequester = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useRequester must be used within a AppProvider");
  }
  return context.requester;
};

/**
 * A hook for resolving the current requester (typical post update)
 */
export const useResolver = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useResolver must be used within a AppProvider");
  }
  return context.resolver;
};

/**
 * A hook for handling authentication.
 */
export const useAuth = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AppProvider");
  }
  return context.auth;
};

/**
 * A hook for subscribing to and api context
 */
export const useApi = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApi must be used within a AppProvider");
  }

  return context.api;
};

/**
 * The state of the app.
 */
export type AppState = {
  auth: {
    accessToken?: string;
    login?: () => Promise<void>;
    logout?: () => void;
  };
  requester: Resident;
  resolver: {
    resolving: boolean;
    resolve: () => Promise<void>;
  };
  api: Client;
};

/**
 * The properties for the app provider.
 */
export type AppProviderProps = {
  accessToken?: string;
  children: React.ReactNode;
};

/**
 * Provide access to apis and resident.
 *
 * @link https://auth0.com/docs/quickstart/spa/react/01-login#show-user-profile-information
 * @link https://auth0.com/docs/quickstart/spa/react/02-calling-an-api
 * @param props
 * @constructor
 */
export const AppProvider = (props: AppProviderProps) => {
  const App = () => {
    const context = useContext(props.accessToken);
    return <AppContext.Provider value={context}>{props.children}</AppContext.Provider>;
  };

  return (
    <ErrorContextProvider>
      <MessageProvider>
        <Auth0Provider domain={AuthDomain} clientId={ClientId} redirectUri={window.location.origin}>
          <App />
        </Auth0Provider>
      </MessageProvider>
    </ErrorContextProvider>
  );
};

/**
 * A hook for subscribing to resident context updates
 */
const useContext = (token?: string) => {
  const auth0 = useAuth0();
  const accessToken = useAccessToken(auth0, token);
  const message = useMessage();
  const auth = {
    accessToken: accessToken,
    login: async () =>
      auth0.loginWithRedirect().catch((e) => {
        message.send(e);
        throw e;
      }),
    logout: async () => auth0.logout({ returnTo: window.location.origin }),
  };
  const api = client({
    accessToken,
    catch: (e) => {
      message.send(e);
      throw e;
    },
  });

  const [requester, setRequester] = React.useState({} as Resident);
  const [resolving, setResolving] = React.useState(false);
  const resolver = {
    resolving: resolving,
    resolve: async () => {
      try {
        setResolving(true);
        let residentName: string = requester.residentName || "";
        if (!residentName) {
          const preview = await api.residents.resolve();
          residentName = preview.residentName || "";
        }

        const resident = await api.residents.view(residentName);
        setRequester(resident);
        setResolving(false);
        Sentry.setUser({ id: resident.residentId, residentName: resident.residentName });
      } catch (e) {
        message.send(e);
      }
    },
  };

  // Watch for access token changes and re-authenticate.
  React.useEffect(() => {
    if (!accessToken) {
      Sentry.configureScope((scope) => scope.setUser(null));
      setRequester({});
      return;
    }

    (async () => {
      await resolver.resolve();
    })();

    return () => setRequester({});
  }, [accessToken]);

  return {
    auth,
    requester,
    api,
    resolver,
  };
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
  }, [auth0.getAccessTokenSilently, auth0.user?.sub, token]);
  return accessToken;
};

/**
 * Determine audience by app environment.
 */
const audience = () => {
  const env = process.env.APP_ENV;
  switch (env) {
    case "docker":
      return `localhost:8080`;
    case "beta":
      return `dev.api.localcivics.io`;
    case "alpha":
      return `stg.api.localcivics.io`;
    default:
      return `api.localcivics.io`;
  }
};
