import React from "react";
import { NavigationBar } from "../navigation-bar";

/**
 * Pure presentational explore component
 * @constructor
 */
export const ExploreComponent = () => {
  return (
    <main className="h-screen bg-white font-proxima">
      <NavigationBar page="explore" />
    </main>
  );
};
