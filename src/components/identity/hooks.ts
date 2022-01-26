import { useApi } from "@local-civics/js-client";
import { useEffect, useState } from "react";

/**
 * useIdentity hook
 * //todo: any
 */
export const useIdentity: (owner: string) => [any, any, boolean] = (
  owner: string
) => {
  const { api } = useApi();
  const [state, setState] = useState({
    identity: {} as any,
    community: {} as any,
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      setState({
        ...state,
        identity: await api("GET", `/identity/v0/users/${owner}`),
      });
    })();
  }, []);

  useEffect(() => {
    const network = state.identity.network || [];
    if (network.length > 0) {
      (async () => {
        setState({
          ...state,
          community: await api("GET", `/identity/v0/communities/${network[0]}`),
          isLoading: false,
        });
      })();
    }
  }, [state.identity.network]);

  return [state.identity, state.community, state.isLoading];
};
