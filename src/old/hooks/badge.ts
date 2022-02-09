import { useApi } from "@local-civics/js-client";
import { useState } from "react";
import { Badge, BadgeQuery } from "../models/badge";
import { useEffect } from "./react";

/**
 * A custom hook to get badges
 */
export const useBadges = (bearerName?: string, query?: BadgeQuery | null) => {
  const { api } = useApi();
  const [badges, setBadges] = useState(null as Badge[] | null);
  useEffect(() => {
    (async () => {
      if (!bearerName) {
        setBadges(null);
      } else if (query === null) {
        setBadges([]);
      } else {
        setBadges(await api("GET", `/caliber/v0/bearers/${bearerName}/badges`, query));
      }
    })();
  }, [bearerName, query]);
  return badges;
};

/**
 * A custom hook to get a badge
 */
export const useBadge = (bearerName?: string, badgeName?: string, query?: BadgeQuery) => {
  const { api } = useApi();
  const [badge, setBadge] = useState(null as Badge | null);
  useEffect(() => {
    (async () => {
      if (!bearerName || !badgeName) {
        setBadge(null);
      } else {
        setBadge(await api("GET", `/caliber/v0/bearers/${bearerName}/badges/${badgeName}`, query));
      }
    })();
  }, [bearerName, badgeName, query]);
  return badge;
};
