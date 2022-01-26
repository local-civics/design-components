import { useApi } from "@local-civics/js-client";
import { useEffect, useState } from "react";
import { Badge } from "./model";

/**
 * useBadges hook
 * @param owner
 * @param query
 * // todo: any
 */
export const useBadges: (owner: string, query?: any) => [Badge[], boolean] = (
  owner: string,
  query?: any
) => {
  const { api } = useApi();
  const [state, setState] = useState({
    badges: {
      data: [] as Badge[],
      isLoading: true,
    },
  });

  useEffect(() => {
    (async () => {
      setState({
        ...state,
        badges: {
          ...state.badges,
          data: (await api(
            "GET",
            `/caliber/v0/bearers/${owner}/badges`,
            query
          )) as Badge[],
          isLoading: false,
        },
      });
    })();
  }, []);

  return [state.badges.data, state.badges.isLoading];
};

/**
 * useBadge hook
 * @param owner
 * @param badgeName
 */
export const useBadge: (
  owner: string,
  badgeName: string
) => [Badge, boolean] = (owner: string, badgeName: string) => {
  const { api } = useApi();
  const [state, setState] = useState({
    badge: {
      data: {} as Badge,
      isLoading: true,
    },
  });

  useEffect(() => {
    (async () => {
      setState({
        ...state,
        badge: {
          ...state.badge,
          data: (await api(
            "GET",
            `/caliber/v0/bearers/${owner}/badges/${badgeName}`
          )) as Badge,
          isLoading: false,
        },
      });
    })();
  }, []);

  return [state.badge.data, state.badge.isLoading];
};
