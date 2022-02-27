import React from "react";
import { Outlet } from "react-router-dom";
import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";
import { DashboardContainer } from "./containers/DashboardContainer/DashboardContainer";
import { ImpactContainer } from "./containers/ImpactContainer/ImpactContainer";
import { ResidentContainer } from "./containers/ResidentContainer/ResidentContainer";

/**
 * A component for the profile page.
 * @constructor
 */
export const Profile = () => {
  const { ResidentWidget, AboutWidget } = ResidentContainer();
  const { ImpactWidget, PathwayWidget, AchievementWidget } = ImpactContainer();
  const { Dashboard } = DashboardContainer();

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
