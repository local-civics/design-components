import React from "react";
import { Outlet } from "react-router-dom";
import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";
import { ExploreContainer } from "../../containers/Explore/ExploreContainer";

/**
 * A component for the Explore page.
 * @constructor
 */
export const Explore = () => {
  const { PathwayFilter, ActivityList } = ExploreContainer();
  return <AuthLayout page="explore" sidebar={<PathwayFilter />} main={<ActivityList />} outlet={<Outlet />} />;
};
