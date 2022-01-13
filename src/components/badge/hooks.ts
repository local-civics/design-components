import {Badge, BadgeQuery, useClient} from "@local-civics/js-gateway";
import {useEffect, useState}          from "react";

/**
 * useBadges hook
 * @param username
 * @param query
 */
export const useBadges: (username: string, query?: BadgeQuery) => [Badge[], boolean] = (username: string, query?: BadgeQuery) => {
    const client = useClient()
    const [state, setState] = useState({
        badges: {
            data: [] as Badge[],
            isLoading: true,
        }
    })

    useEffect(() => {
        (async () => {
            setState({
                ...state,
                badges: {
                    ...state.badges,
                    data: await client.footprint.badges(username, query),
                    isLoading: false,
                }
            })
        })()
    }, [])

    return [state.badges.data, state.badges.isLoading]
}