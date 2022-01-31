import { useApi } from "@local-civics/js-client";
import { useState } from "react";
import { useEffect } from "./react";
import { Readiness, ReadinessQuery } from "../models/readiness";

/**
 * usePathway hook
 * @param bearerName
 * @param query
 */
export const useReadiness = (bearerName?: string, query?: ReadinessQuery) => {
  const { api } = useApi();
  const [readiness, setReadiness] = useState(null as Readiness | null);
  useEffect(() => {
    (async () => {
      if (!bearerName) {
        setReadiness(null);
      } else {
        setReadiness(
          await api("GET", `/caliber/v0/bearers/${bearerName}/readiness`, query)
        );
      }
    })();
  }, [bearerName, query]);

  return readiness;
};
