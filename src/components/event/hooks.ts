import {Event, EventQuery, useClient} from "@local-civics/js-gateway";
import {useEffect, useState}          from "react";

/**
 * useEvents hook
 * @param username
 * @param query
 */
export const useEvents: (username: string, query?: EventQuery) => [Event[], boolean] = (username: string, query?: EventQuery) => {
    const client = useClient()
    const [state, setState] = useState({
        events: {
            data: [] as Event[],
            isLoading: true,
        }
    })

    useEffect(() => {
        (async () => {
            setState({
                ...state,
                events: {
                    ...state.events,
                    data: await client.calendar.events(username, query),
                    isLoading: false,
                }
            })
        })()
    }, [])

    return [state.events.data, state.events.isLoading]
}