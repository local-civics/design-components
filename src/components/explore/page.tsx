import React             from "react";
import {Outlet, useNavigate, useParams}  from "react-router-dom";
import {useCurrentResident}             from "../../hooks/resident";
import {useEvents}                       from "../../hooks/event";
import {NavigationBar}                  from "../navigation-bar";
import {Pathway}                        from "../pathway";
import {ExploreComponent}               from "./component";
import {EventQuery}                     from "../event/model";

/**
 * Explore page
 * @constructor
 */
export const ExplorePage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const communityName = params.communityName || ""
    const [query, setQuery] = React.useState(null as EventQuery | null)
    const setQueryKey = (key: string, value: any) => {
        const newQuery = {...query, [key]: value}
        const isNullQuery = !((newQuery.tags && newQuery.tags?.length > 0) || (newQuery.pathways && newQuery.pathways?.length > 0) || newQuery.eventName)
        if(isNullQuery){
            setQuery(null)
        } else {
            setQuery(newQuery)
        }
    }
    const resident = useCurrentResident()
    const top = useEvents(communityName, {order: "top"})
    const soonest = useEvents(communityName, {order: "soonest"})
    const filtered = useEvents(communityName, query)
    const onEventClick = (eventName?: string) => navigate(`/communities/${communityName}/events/${eventName}`)
    const onTagClick = (tags: string[]) => setQueryKey("tags", tags.length > 0 ? tags : undefined)
    const onPathwayClick = (pathways: Pathway[]) => setQueryKey("pathways", pathways.length > 0 ? pathways : undefined)

    let timeout: NodeJS.Timeout
    const onEventSearch = (eventName: string) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => setQueryKey("eventName", eventName), 800)
    }

    return (
        <main className="h-screen max-w-full overflow-x-hidden bg-white font-proxima">
            <NavigationBar page="explore" />
            <ExploreComponent
                resident={resident}
                top={query === null ? top : []}
                soonest={query === null ? soonest : []}
                filtered={filtered}
                onPathwayClick={onPathwayClick}
                onEventClick={onEventClick}
                onTagClick={onTagClick}
                onEventSearch={onEventSearch}
            />
            <Outlet/>
        </main>
    );
};