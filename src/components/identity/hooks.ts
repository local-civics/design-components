import {Community, Identity, useClient} from "@local-civics/js-gateway";
import {useEffect, useState}            from "react";

/**
 * useIdentity hook
 */
export const useIdentity: (username: string) => [Identity, Community, boolean] = (username: string) => {
    const client = useClient()
    const [state, setState] = useState({
        identity: {} as Identity,
        community: {} as Community,
        isLoading: true,
    })

    useEffect(() => {
        (async () => {
            setState({
                ...state,
                identity: await client.identity.user(username),
            })
        })()
    }, [])

    useEffect(() => {
        const network = state.identity.network || []
        if((network).length > 0){
            (async () => {
                setState({
                    ...state,
                    community: await client.identity.community(network[0]),
                    isLoading: false,
                })
            })()
        }
    }, [state.identity.network])

    return [state.identity, state.community, state.isLoading]
}