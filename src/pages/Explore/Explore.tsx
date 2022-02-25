import React from "react";
import { Outlet } from "react-router-dom";
import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";
import { ExploreContainer } from "./containers/ExploreContainer/ExploreContainer";

/**
 * A component for the Explore page.
 * @constructor
 */
export const Explore = () => {
  const { PathwayList, Gallery } = ExploreContainer();
  return <AuthLayout page="explore" sidebar={<PathwayList />} main={<Gallery />} outlet={<Outlet />} />;
};
