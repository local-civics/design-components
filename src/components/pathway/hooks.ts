import {Pathway, PathwayQuery, useClient} from "@local-civics/js-gateway";
import {useEffect, useState}                        from "react";

/**
 * usePathways hook
 * @param username
 * @param query
 */
export const usePathways: (username: string, query?: PathwayQuery) => [Pathway[], boolean] = (username: string, query?: PathwayQuery) => {
    const client = useClient()
    const [state, setState] = useState({
        pathways: {
            data: [] as Pathway[],
            isLoading: true,
        },
    })

    useEffect(() => {
        (async () => {
            setState({
                ...state,
                pathways: {
                    ...state.pathways,
                    data: await client.footprint.pathways(username, query),
                    isLoading: false,
                }
            })
        })()
    }, [])

    return [state.pathways.data, state.pathways.isLoading]
}

/**
 * usePathway hook
 * @param username
 * @param pathwayId
 */
export const usePathway: (username: string, pathwayId: string) => [Pathway, boolean] = (username: string, pathwayId: string) => {
    const client = useClient()
    const [state, setState] = useState({
        pathway: {
            data: {} as Pathway,
            isLoading: true,
        },
    })

    useEffect(() => {
        (async () => {
            setState({
                ...state,
                pathway: {
                    ...state.pathway,
                    data: await client.footprint.pathway(username, pathwayId),
                    isLoading: false,
                }
            })
        })()
    }, [])

    return [state.pathway.data, state.pathway.isLoading]
}