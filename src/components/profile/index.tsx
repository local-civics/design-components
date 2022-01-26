import { useApi } from "@local-civics/js-client";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { EventWidget } from "../event/widget";
import { IdentityWidget } from "../identity/widget";
import { Loader } from "../loader";
import { NavigationBar } from "../navigation-bar";
import { PassportWidget } from "../passport/widget";
import { PathwayTutorial } from "../readiness/tutorial";
import { PathwayWidget } from "../readiness/widget";
import { EngagementWidget } from "./widget";

/**
 * Profile component
 * todo: link to explore page for events matching badges
 * todo: link to explore page for events matching pathways
 * todo: check identity permissions for expand only
 */
export const Profile: FunctionComponent = () => {
  const { api } = useApi();
  const navigate = useNavigate();
  const params = useParams();
  const [identity, setIdentity] = React.useState({} as any); // todo: as Resident
  const [subject, setSubject] = React.useState({} as any); // todo: as Resident
  const owner = subject.owner || "";
  const [edit, setEdit] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [tab, setTab] = React.useState(
    "badges" as "milestones" | "activity" | "badges"
  );
  const avatar =
    (subject && subject.avatar) ||
    "https://cdn.localcivics.io/dashboard/avatar.jpg";
  const [currentScreen, setCurrentScreen] = useState("");
  const [previousScreen, setPreviousScreen] = useState("");
  const setScreen = (cur: string) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(cur);
  };

  useEffect(() => {
    (async () => {
      // todo: handle not authorized
      setIdentity(await api("GET", "/identity/v0/resolve"));

      // todo: handle not authorized
      setSubject(await api("GET", `/identity/v0/users/${params.owner}`));

      setEdit(subject.identityId === identity.identityId);
      setLoading(false);
    })();
  }, []);

  return (
    <main className="h-screen bg-white font-proxima">
      <NavigationBar owner={owner} page="profile" />
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
              {/* About */}
              <IdentityWidget
                owner={owner}
                title="about me"
                onEdit={edit ? () => navigate(`/${owner}/settings`) : undefined}
              />

              {/* Pathways */}
              <PathwayWidget
                bearerName={owner}
                title="pathways"
                onHelp={() => setScreen("pathway/tutorial")}
              />

              {/* Registered */}
              <EventWidget
                owner={owner}
                title="my events"
                query={{ status: "watched", limit: 3 }}
                onSeeAll={edit ? () => {} : undefined}
              />

              <p className="place-self-center inline-block mt-2 mb-2 text-xs text-gray-300">
                Local Civics © {new Date().getFullYear()}
              </p>
            </div>

            {/* Right Panel */}
            <div className="lg:flex-grow lg:flex-col lg:ml-9">
              <PassportWidget owner={owner} />

              {/* Milestones/Activity/Badges */}
              <EngagementWidget
                bearerName={owner}
                active={tab}
                setActive={setTab}
              />
            </div>
          </div>
        </div>
        <PathwayTutorial
          close={() => setScreen(previousScreen)}
          visible={currentScreen === "pathway/tutorial"}
        />
      </Loader>
      <Outlet context={setSubject} />
    </main>
  );
};
