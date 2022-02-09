import React from "react";
import { App, InMemoryApp } from "./App";

/**
 * Storybook component configuration
 */
export default {
  title: "App",
  component: App,
};

/**
 * Home
 */
export const Home = () => <InMemoryApp />;

/**
 * Profile
 */
export const Profile = () => <InMemoryApp location="/residents/andre.carter" />;

/**
 * Calendar
 */
export const Calendar = () => <InMemoryApp location="/communities/hcz/calendar/events" />;

/**
 * Explore
 */
export const Explore = () => <InMemoryApp location="/communities/hcz/explore/events" />;
