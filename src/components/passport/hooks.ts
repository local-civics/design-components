import {Passport, useClient} from "@local-civics/js-gateway";
import {useEffect, useState}                    from "react";

/**
 * usePassport hook
 * @param username
 */
export const usePassport: (username: string) => [Passport, boolean] = (username: string) => {
    const client = useClient()
    const [state, setState] = useState({
        passport: {
            data: {} as Passport,
            isLoading: true,
        },
    })

    useEffect(() => {
        (async () => {
            setState({
                ...state,
                passport: {
                    ...state.passport,
                    data: await client.footprint.passport(username),
                    isLoading: false,
                }
            })
        })()
    }, [])

    return [state.passport.data, state.passport.isLoading]
}
