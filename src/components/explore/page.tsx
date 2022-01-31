import React from "react";
import { Outlet } from "react-router-dom";
import { useRequest } from "../../hooks/request";
import { useEventQuery, useEvents } from "../../hooks/event";
import { NavigationBar } from "../navigation-bar";
import { Pathway } from "../pathway";
import { ExploreComponent } from "./component";

/**
 * Explore page
 * @constructor
 */
export const ExplorePage = () => {
  // todo: location search

  const req = useRequest();
  const [eventQuery, setEventQuery] = useEventQuery(req.query);
  const top = useEvents(req.community?.communityName, {
    order: "top",
    limit: 4,
  });
  const sponsored = useEvents(req.community?.communityName, {
    order: "sponsored",
    limit: 3,
  });
  const soonest = useEvents(req.community?.communityName, {
    order: "soonest",
    limit: 3,
  });
  const filtered = useEvents(req.community?.communityName, eventQuery);

  const onEventClick = (eventName?: string) =>
    req.navigate(
      `/communities/${req.community?.communityName}/explore/events/${eventName}`
    );
  const onTagClick = (tags: string[]) =>
    setEventQuery("tags", tags.length > 0 ? tags : undefined);
  const onPathwayClick = (pathways: Pathway[]) =>
    setEventQuery("pathways", pathways.length > 0 ? pathways : undefined);

  let timeout: NodeJS.Timeout;
  const onEventSearch = (title: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => setEventQuery("title", title), 800);
  };

  return (
    <main className="h-screen max-w-full overflow-x-hidden bg-white font-proxima">
      <NavigationBar
        community={req.community}
        resident={req.resident}
        page="explore"
      />
      <ExploreComponent
        resident={req.resident}
        top={req.hasQuery() ? [] : top}
        sponsored={req.hasQuery() ? [] : sponsored}
        soonest={req.hasQuery() ? [] : soonest}
        filtered={filtered}
        pathways={req.pathways()}
        tags={req.tags()}
        onPathwayClick={onPathwayClick}
        onEventClick={onEventClick}
        onTagClick={onTagClick}
        onEventSearch={onEventSearch}
      />
      <Outlet context={req} />
    </main>
  );
};
