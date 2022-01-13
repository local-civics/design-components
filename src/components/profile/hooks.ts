import {Identity}         from "@local-civics/js-gateway";
import {useOutletContext} from "react-router-dom";

/**
 * useIdentify outlet context hook
 */
export const useIdentify = () => {
    return useOutletContext<(identity: Identity) => void>();
}