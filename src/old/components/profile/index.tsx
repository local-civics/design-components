import React, { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { useBadges } from "../../hooks/badge";
import { useEvents } from "../../hooks/event";
import { useReadiness } from "../../hooks/readiness";
import { useRequest } from "../../hooks/request";
import { AboutWidget } from "../../../pages/Profile/widgets/AboutWidget/AboutWidget";
import { ResidentWidget } from "../../../pages/Profile/widgets/ResidentWidget/ResidentWidget";
import { EventWidget } from "../event/widget";
import { AchievementWidget } from "./achievement.widget";
import { Loader } from "../../../components";
import { NavBar as NavigationBar } from "../../../components";
import { ImpactWidget } from "./impact.widget";
import { Pathway } from "../pathway";
import { PathwayHelpComponent } from "../readiness/component";
import { PathwayWidget } from "../readiness/widget";
import { EngagementWidget } from "./widget";

export interface ProfileProps {
  tab?: "badges" | "milestones" | "activity";
}

/**
 * Profile component
 * todo: link to explore page for events matching badges
 * todo: link to explore page for events matching pathways
 * todo: check identity permissions for expand only
 */
export const Profile: FunctionComponent<ProfileProps> = (props) => {
  const req = useRequest();
  const [tab, setTab] = React.useState(props.tab || "badges");
  const onPathwayClick = (pathway: Pathway) =>
    req.navigate(`/communities/${req.community?.communityName}/explore/events?pathways=${encodeURIComponent(pathway)}`);
  const onSeeAllClick = () =>
    req.navigate(`/communities/${req.community?.communityName}/calendar/events?tab=registered`);
  const onPathwayHelpClick = () => setPathwayHelpVisible(true);
  const onEventClick = (communityName?: string, eventName?: string) =>
    req.navigate(`/residents/${req.resident?.residentName}/events/${eventName}`);
  const [pathwayHelpVisible, setPathwayHelpVisible] = React.useState(false);
  const milestones = useEvents(req.community?.communityName, {
    residentName: req.resident?.residentName,
    timePeriod: "milestone",
  });
  const activity = useEvents(req.community?.communityName, {
    residentName: req.resident?.residentName,
    status: "contributed",
  });
  const bearing = useBadges(req.resident?.residentName, { status: "bearing" });
  const contingent = useBadges(req.resident?.residentName, {
    status: "contingent",
  });
  const unqualified = useBadges(req.resident?.residentName, {
    status: "unqualified",
  });
  const readiness = useReadiness(req.resident?.residentName);

  return (
    <main className="h-screen bg-white font-proxima">
      <NavigationBar community={req.community} resident={req.resident} page="profile" />
      <Loader isLoading={req.resident === null || req.community === null}>
        <div className="px-4 lg:px-24">
          {/* Avatar Header */}
          <div className="flex w-full">
            <ResidentWidget resident={req.resident} />
          </div>

          {/* Body */}
          <div className="lg:flex w-full mt-5">
            {/* Left Panel */}
            <div className="lg:flex lg:flex-col w-full lg:w-60">
              {/* About Me */}
              <AboutWidget
                viewOnly={req.isViewOnly()}
                community={req.community}
                resident={req.resident}
                onModify={req.navigate.settings}
              />

              {/* Pathways */}
              <PathwayWidget
                resident={req.resident}
                title="pathways"
                onHelpClick={onPathwayHelpClick}
                onClick={onPathwayClick}
              />

              {/* Registered */}
              <EventWidget
                community={req.community}
                title="my events"
                query={{
                  residentName: req.resident?.residentName,
                  status: "registered",
                  limit: 3,
                }}
                onSeeAllClick={onSeeAllClick}
                onClick={onEventClick}
              />

              <p className="place-self-center inline-block mt-2 mb-2 text-xs text-slate-300">
                Local Civics © {new Date().getFullYear()}
              </p>
            </div>

            {/* Right Panel */}
            <div className="lg:grow lg:flex-col lg:ml-9">
              <div className="lg:flex lg:h-36 w-full">
                <ImpactWidget resident={req.resident} readiness={readiness} />
                <AchievementWidget resident={req.resident} readiness={readiness} />
              </div>

              {/* Milestones/Activity/Badges */}
              <EngagementWidget
                community={req.community}
                resident={req.resident}
                milestones={milestones}
                bearing={bearing}
                contingent={contingent}
                unqualified={unqualified}
                activity={activity}
                active={tab}
                setActive={setTab}
                onEventClick={onEventClick}
              />
            </div>
          </div>
        </div>
      </Loader>
      {pathwayHelpVisible && <PathwayHelpComponent onClose={() => setPathwayHelpVisible(false)} />}
      <Outlet context={req} />
    </main>
  );
};
