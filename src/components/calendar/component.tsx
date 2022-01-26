import React from "react";
import { NavigationBar } from "../navigation-bar";

/**
 * Pure presentational calendar component
 * @constructor
 */
export const CalendarComponent = () => {
  return (
    <main className="h-screen bg-white font-proxima">
      <NavigationBar page="calendar" />
    </main>
  );
};
