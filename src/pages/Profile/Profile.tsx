import React from "react";
import { Outlet } from "react-router-dom";
import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";
import { ProfileContainer } from "../../containers/Profile/ProfileContainer";

/**
 * A component for the profile page.
 * @constructor
 */
export const Profile = () => {
  const { ResidentWidget, AboutWidget, ImpactWidget, PathwayWidget, AchievementWidget, Dashboard } = ProfileContainer();

  const sidebar = (
    <>
      <AboutWidget />
      <PathwayWidget />
    </>
  );

  const subheader = (
    <>
      <ImpactWidget />
      <AchievementWidget />
    </>
  );

  return (
    <AuthLayout
      page="profile"
      header={<ResidentWidget />}
      sidebar={sidebar}
      subheader={subheader}
      main={<Dashboard />}
      outlet={<Outlet />}
    />
  );
};
