import { useApi } from "@local-civics/js-client";
import { useEffect, useState } from "react";

/**
 * useEvents hook
 * @param owner
 * @param query
 * // todo: any
 */
export const useEvents: (owner: string, query?: any) => [any[], boolean] = (
  owner: string,
  query?: any
) => {
  const { api } = useApi();
  const [state, setState] = useState({
    events: {
      data: [] as any[],
      isLoading: true,
    },
  });

  useEffect(() => {
    (async () => {
      setState({
        ...state,
        events: {
          ...state.events,
          data: await api("GET", `/calendar/v0/${owner}/events`, query),
          isLoading: false,
        },
      });
    })();
  }, []);

  return [state.events.data, state.events.isLoading];
};
