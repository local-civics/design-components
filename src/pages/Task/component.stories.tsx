import React from "react";
import { InMemoryApp } from "../../App";
import { Task } from "./Task";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Task",
  component: Task,
};

/**
 * Task
 */
export const Page = () => <InMemoryApp accessToken="andre.carter" location="/residents/andre.carter/tasks/tasks.1" />;
