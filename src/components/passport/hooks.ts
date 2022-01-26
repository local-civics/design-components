import { useApi } from "@local-civics/js-client";
import { useEffect, useState } from "react";

/**
 * usePassport hook
 * @param residentName
 * // todo: passport model
 */
export const usePassport: (residentName: string) => [any, boolean] = (
  residentName: string
) => {
  const { api } = useApi();
  const [state, setState] = useState({
    passport: {
      data: {} as any,
      isLoading: true,
    },
  });

  useEffect(() => {
    (async () => {
      setState({
        ...state,
        passport: {
          ...state.passport,
          data: await api("GET", `/footprint/v0/${residentName}/passport`),
          isLoading: false,
        },
      });
    })();
  }, []);

  return [state.passport.data, state.passport.isLoading];
};
