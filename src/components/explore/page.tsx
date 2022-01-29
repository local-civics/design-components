import React                            from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useNavigationQuery}             from "../../hooks/navigation";
import {useCurrentResident}             from "../../hooks/resident";
import {useEventQuery, useEvents}       from "../../hooks/event";
import {getPathways}                     from "../../utilities/pathway";
import {NavigationBar}                  from "../navigation-bar";
import {Pathway}                        from "../pathway";
import {ExploreComponent}               from "./component";

/**
 * Explore page
 * @constructor
 */
export const ExplorePage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const query = useNavigationQuery()
    const pathways = query && query.pathways
    const tags = query && query.tags
    const communityName = params.communityName || ""
    const [eventQuery, setEventQuery] = useEventQuery(query)
    const resident = useCurrentResident()
    const top = useEvents(communityName, {order: "top", limit: 4})
    const sponsored = useEvents(communityName, {order: "sponsored", limit: 3})
    const soonest = useEvents(communityName, {order: "soonest", limit: 3})
    const filtered = useEvents(communityName, eventQuery)
    const onEventClick = (eventName?: string) => navigate(`/communities/${communityName}/events/${eventName}`)
    const onTagClick = (tags: string[]) => setEventQuery("tags", tags.length > 0 ? tags : undefined)
    const onPathwayClick = (pathways: Pathway[]) => setEventQuery("pathways", pathways.length > 0 ? pathways : undefined)

    let timeout: NodeJS.Timeout
    const onEventSearch = (title: string) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => setEventQuery("title", title), 800)
    }

    return (
        <main className="h-screen max-w-full overflow-x-hidden bg-white font-proxima">
            <NavigationBar page="explore" />
            <ExploreComponent
                resident={resident}
                top={eventQuery === null ? top : []}
                sponsored={eventQuery === null ? sponsored : []}
                soonest={eventQuery === null ? soonest : []}
                filtered={filtered}
                pathways={getPathways(pathways)}
                tags={tags}
                onPathwayClick={onPathwayClick}
                onEventClick={onEventClick}
                onTagClick={onTagClick}
                onEventSearch={onEventSearch}
            />
            <Outlet/>
        </main>
    );
};