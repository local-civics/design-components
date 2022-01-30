import React, { FunctionComponent } from "react";
import { Outlet }                from "react-router-dom";
import {useRequest}                                      from "../../hooks/request";
import { EventWidget }                                   from "../event/widget";
import { IdentityWidget }                                from "../identity/widget";
import { Loader }                                        from "../loader";
import { NavigationBar }                                 from "../navigation-bar";
import { PassportWidget }                                from "../passport/widget";
import { Pathway }                                       from "../pathway";
import {PathwayHelpComponent}                            from "../readiness/component";
import { PathwayWidget }                                 from "../readiness/widget";
import { EngagementWidget }                              from "./widget";

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
  const req = useRequest()
  const [tab, setTab] = React.useState(props.tab || "badges");
  const avatar =
    (req.resident && req.resident.avatarURL) || "https://cdn.localcivics.io/hub/avatar.jpg";
  const onPathwayClick = (pathway: Pathway) =>
    req.navigate(`/communities/${req.community?.communityName}/explore/events?pathways=${encodeURIComponent(pathway)}`);
  const onSeeAllClick = () => req.navigate(`/communities/${req.community?.communityName}/calendar/events`);
  const onPathwayHelpClick = () => setPathwayHelpVisible(true);
  const onEventClick = (communityName?: string, eventName?: string) =>
    req.navigate(
      `/residents/${req.resident?.residentName}/events/${eventName}`
    );
  const [pathwayHelpVisible,  setPathwayHelpVisible] = React.useState(false)

  return (
    <main className="h-screen bg-white font-proxima">
      <NavigationBar community={req.community} resident={req.resident} page="profile" />
      <Loader isLoading={req.resident === null}>
        <div className="px-4 lg:px-24">
          {/* Avatar Header */}
          <div className="flex w-full">
            <div className="h-48 w-full border-gray-200 shadow-sm border-l border-r border-b rounded-b-md">
              <div className="h-2/5 lg:h-3/5 w-full bg-gray-200" />

              <div className="mt-10 ml-2 lg:ml-40 lg:mt-2">
                <h4 className="font-semibold capitalize text-2xl text-slate-600">
                  {req.resident?.givenName} {req.resident?.familyName}
                </h4>
                {req.resident?.createdAt && (
                  <p className="text-slate-400">
                    Member since {new Date(req.resident?.createdAt).getFullYear()}
                  </p>
                )}
              </div>
            </div>
            <div className="absolute">
              <div className="relative ml-2 mt-3">
                <img
                  src={avatar}
                  alt="avatar"
                  className="border border-gray-200 shadow-sm w-24 h-24 lg:w-36 lg:h-36 rounded-full object-cover"
                />
                <span className="absolute h-5 w-5 top-3 right-3 rounded-full bg-green-500 border-4 border-white top-0 right-0" />
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="lg:flex w-full mt-5">
            {/* Left Panel */}
            <div className="lg:flex lg:flex-col w-full lg:w-60">
              {/* About Me */}
              <IdentityWidget
                community={req.community}
                resident={req.resident}
                title="about me"
                onEdit={() => req.navigate(`/residents/${req.resident?.residentName}/settings`)}
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
                query={{ residentName: req.resident?.residentName, status: "going", limit: 3 }}
                onSeeAllClick={onSeeAllClick}
                onClick={onEventClick}
              />

              <p className="place-self-center inline-block mt-2 mb-2 text-xs text-slate-300">
                Local Civics © {new Date().getFullYear()}
              </p>
            </div>

            {/* Right Panel */}
            <div className="lg:grow lg:flex-col lg:ml-9">
              <PassportWidget resident={req.resident} />

              {/* Milestones/Activity/Badges */}
              <EngagementWidget
                community={req.community}
                resident={req.resident}
                active={tab}
                setActive={setTab}
                onEventClick={onEventClick}
              />
            </div>
          </div>
        </div>
      </Loader>
      { pathwayHelpVisible && <PathwayHelpComponent onClose={() => setPathwayHelpVisible(false)}/>}
      <Outlet context={req} />
    </main>
  );
};
