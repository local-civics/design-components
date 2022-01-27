import { useApi } from "@local-civics/js-client";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { EventWidget } from "../event/widget";
import { IdentityWidget } from "../identity/widget";
import { Loader } from "../loader";
import { NavigationBar } from "../navigation-bar";
import { PassportWidget } from "../passport/widget";
import { Pathway } from "../pathway";
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
  const { api } = useApi();
  const navigate = useNavigate();
  const params = useParams();
  const [identity, setIdentity] = React.useState({} as any); // todo: as Resident
  const [subject, setSubject] = React.useState({} as any); // todo: as Resident
  const residentName = subject.residentName || "";
  const communityName = subject.communityName || "";
  const [edit, setEdit] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [tab, setTab] = React.useState(props.tab || "badges");
  const avatar =
    (subject && subject.avatar) ||
    "https://cdn.localcivics.io/hub/avatar.jpg";
  const onPathwayClick = (pathway: Pathway) =>
    navigate(`/communities/${communityName}?pathway=${pathway}`);
  const onSeeAllClick = () => navigate(`/residents/${residentName}/calendar`);
  const onPathwayHelpClick = () =>
    navigate(`/residents/${residentName}/help/pathway/intro`);
  const onEventClick = (courseName?: string, eventName?: string) =>
    navigate(
      `/residents/${residentName}/courses/${courseName}/events/${eventName}`
    );

  useEffect(() => {
    (async () => {
      // todo: handle not authorized
      setIdentity(await api("GET", "/identity/v0/resolve"));

      // todo: handle not authorized
      setSubject(
        await api("GET", `/identity/v0/residents/${params.residentName}`)
      );

      setEdit(subject.identityId === identity.identityId);
      setLoading(false);
    })();
  }, []);

  return (
    <main className="h-screen bg-white font-proxima">
      <NavigationBar residentName={residentName} page="profile" />
      <Loader isLoading={isLoading}>
        <div className="px-4 lg:px-24">
          {/* Avatar Header */}
          <div className="flex w-full">
            <div className="h-48 w-full border-l-2 border-r-2 border-b-2 rounded-b-md">
              <div className="h-2/5 lg:h-3/5 w-full bg-gray-200" />

              <div className="mt-10 ml-2 lg:ml-40 lg:mt-2">
                <h4 className="font-semibold capitalize text-2xl text-gray-700">
                  {subject.givenName} {subject.familyName}
                </h4>
                {subject.createdAt && (
                  <p className="text-gray-400">
                    Member since {new Date(subject.createdAt).getFullYear()}
                  </p>
                )}
              </div>
            </div>
            <div className="absolute">
              <div className="relative ml-2 mt-3">
                <img
                  src={avatar}
                  alt="avatar"
                  className="border-4 w-24 h-24 lg:w-36 lg:h-36 rounded-full object-cover"
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
                residentName={residentName}
                title="about me"
                onEdit={
                  edit
                    ? () => navigate(`/residents/${residentName}/settings`)
                    : undefined
                }
              />

              {/* Pathways */}
              <PathwayWidget
                bearerName={residentName}
                title="pathways"
                onHelpClick={onPathwayHelpClick}
                onClick={onPathwayClick}
              />

              {/* Registered */}
              <EventWidget
                residentName={residentName}
                title="my events"
                query={{ status: "going", limit: 3 }}
                onSeeAllClick={onSeeAllClick}
                onClick={onEventClick}
              />

              <p className="place-self-center inline-block mt-2 mb-2 text-xs text-gray-300">
                Local Civics © {new Date().getFullYear()}
              </p>
            </div>

            {/* Right Panel */}
            <div className="lg:grow lg:flex-col lg:ml-9">
              <PassportWidget residentName={residentName} />

              {/* Milestones/Activity/Badges */}
              <EngagementWidget
                bearerName={residentName}
                active={tab}
                setActive={setTab}
                onEventClick={onEventClick}
              />
            </div>
          </div>
        </div>
      </Loader>
      <Outlet context={setSubject} />
    </main>
  );
};
