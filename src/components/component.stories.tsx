import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { App } from "./App";

/**
 * Storybook component configuration
 */
export default {
  title: "Hub/App",
  component: App,
};

/**
 * Home
 */
export const Home = () => <App />;

/**
 * Profile
 */
export const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/residents/andre.carter");
  }, []);

  return <App />;
};

/**
 * Calendar
 */
export const Calendar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/communities/hcz/calendar/events");
  }, []);

  return <App />;
};

/**
 * Explore
 */
export const Explore = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/communities/hcz/explore/events");
  }, []);

  return <App />;
};
