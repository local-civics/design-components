import { useApi } from "@local-civics/js-client";
import { useEffect, useState } from "react";
import { Pathway } from "../pathway";
import { Readiness } from "./model";

/**
 * usePathway hook
 * @param bearerName
 * @param pathway
 */
export const useReadiness: (
  bearerName: string,
  pathway?: Pathway
) => [Readiness, boolean] = (bearerName: string, pathway?: Pathway) => {
  const { api } = useApi();
  const [state, setState] = useState({
    pathway: {
      data: {} as Readiness,
      isLoading: true,
    },
  });

  const query = {} as { pathway: Pathway };
  if (pathway) {
    query["pathway"] = pathway;
  }

  useEffect(() => {
    (async () => {
      setState({
        ...state,
        pathway: {
          ...state.pathway,
          data: (await api(
            "GET",
            `/caliber/v0/bearers/${bearerName}/readiness`,
            query
          )) as Readiness,
          isLoading: false,
        },
      });
    })();
  }, []);

  return [state.pathway.data, state.pathway.isLoading];
};
