import {useApi}              from "@local-civics/js-client";
import {useEffect, useState}     from "react";
import {Resident, ResidentQuery} from "../models/resident";

/**
 * A custom hook to get a resident
 */
export const useResident: (
    communityName: string,
    residentName: string,
    query?: ResidentQuery,
) => Resident | null = (communityName, residentName, query) => {
    const { api } = useApi();
    const [resident, setResident] = useState(null as Resident | null)
    useEffect(() => {
        (async () => {
            setResident(await api("GET", `/identity/v0/communities/${communityName}/residents/${residentName}`, query));
        })();
    }, []);

    return resident;
};

/**
 * A custom hook to get the current resident
 */
export const useCurrentResident: (
    query?: ResidentQuery,
) => Resident | null = (query) => {
    const { api } = useApi();
    const [resident, setResident] = useState(null as Resident | null)
    useEffect(() => {
        (async () => {
            setResident(await api("GET", `/identity/v0/resolve`, query));
        })();
    }, []);

    return resident;
};