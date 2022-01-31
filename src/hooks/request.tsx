import {useApi}                                                                  from "@local-civics/js-client";
import React                       from "react";
import {
    useParams,
    useLocation,
    useNavigate,
    Location,
    Params,
    NavigateFunction,
    useOutletContext
}                                  from "react-router-dom";
import {Community, CommunityQuery} from "../models/community";
import {Resident, ResidentQuery}   from "../models/resident";
import {getPathways}               from "../utilities/pathway";
import {useNavigationQuery}                                                      from "./navigation";
import {useEffect}                                                               from "./react";


export interface Request{
    location: Location
    params: Params
    query: Record<string, string[]> | null
    navigate: NavigateFunction
    requester: Resident | null
    resident: Resident | null
    community: Community | null
    updateResident: (resident: Resident) => Promise<void>;
}

/**
 * useRequest
 */
export const useRequest = () => {
    // todo: handle not authorized
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const query = useNavigationQuery()
    const [request, setRequest] = React.useState({
        location: location,
        params: params,
        query: query,
        navigate: navigate,
    } as Request)

    useEffect(() => {
        (async () => {
            const req = {
                ...request,
                location: location,
                params: params,
                query: query,
                navigate: navigate,
            }

            if(!request.requester){
                req.requester = await api.currentResident()
            }

            if(!request.resident || (params.residentName && request.resident.residentName !== params.residentName)){
                req.resident = await api.resident(params.residentName) || req.requester
            }

            if(!request.community || (params.communityName && request.community.communityName !== params.communityName)){
                req.community = await api.community(params.communityName || req.resident?.communityName || req.requester?.communityName)
            }

            if(req.resident?.residentName === req.requester?.residentName){
                req.requester = req.resident
            }

            setRequest(req)
        })();
    }, [params, query, location])


    return {
        ...request,
        updateResident: async (resident: Resident) => {
            await api.updateResident(resident)
            setRequest({...request, resident: resident})
        },
        hasQuery: () => {
            return Object.keys(request.query || 0).length > 0
        },
        isViewOnly: () => {
            // todo: view only for components
            return !request.requester || request.requester?.residentName !== request.resident?.residentName
        },
        tags: () => {
            return request.query && request.query.tags ? request.query.tags : []
        },
        pathways: () => {
            return request.query && request.query.pathways ? getPathways(request.query.pathways) : []
        }
    }
}

/**
 * A hook to use request context
 */
export const useRequestContext = () => {
    return useOutletContext<Request>();
};

// todo: move this to the js-client package
const api = {
    resident: (communityName?: string, residentName?: string, query?: ResidentQuery) => {
        const {api} = useApi()
        if(!communityName || !residentName){
            return null
        } else {
            return api("GET", `/identity/v0/communities/${communityName}/residents/${residentName}`, query) as Promise<Resident>
        }
    },
    currentResident: (query?: ResidentQuery) => {
        const {api} = useApi()
        return api("GET", `/identity/v0/resolve`, query) as Promise<Resident>;
    },
    community: (communityName?: string, query?: CommunityQuery) => {
        // todo: this is not a hook, please rename it
        const { api } = useApi();
        if(!communityName){
            return null
        } else {
            return api("GET", `/identity/v0/communities/${communityName}`, query) as Promise<Community>
        }
    },
    updateResident: (resident: Resident | null) => {
        const {api} = useApi()
        if(!resident){
            return
        }
        return api(
            "PUT",
            `/identity/v0/residents/${resident?.residentName}`,
            undefined,
            resident
        );
    },
}