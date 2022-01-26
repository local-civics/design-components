import { useOutletContext } from "react-router-dom";

/**
 * useIdentify outlet context hook
 * // todo: any
 */
export const useIdentify = () => {
  return useOutletContext<(identity: any) => void>();
};
