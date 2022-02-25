import React from "react";
import { InMemoryApp } from "../../App";
import { Calendar } from "./Calendar";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Calendar",
  component: Calendar,
};

/**
 * Calendar
 */
export const Page = () => <InMemoryApp accessToken="andre.carter" location="/communities/hcz/calendar/experiences" />;
