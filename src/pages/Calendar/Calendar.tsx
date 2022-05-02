import React from "react";
import { Outlet } from "react-router-dom";
import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";
import { CalendarContainer } from "../../containers/Calendar/CalendarContainer";

/**
 * A component for the Calendar page.
 * @constructor
 */
export const Calendar = () => {
  const { DateSelection, EventList } = CalendarContainer();
  return <AuthLayout page="calendar" sidebar={<DateSelection />} main={<EventList />} outlet={<Outlet />} />;
};
