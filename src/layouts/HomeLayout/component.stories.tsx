import { Story } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { AppProvider } from "../../contexts/App";
import { HomeLayout, HomeLayoutProps } from "./HomeLayout";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Layout/HomeLayout",
  component: HomeLayout,
};

/**
 * Component
 */
export const Component: Story<HomeLayoutProps> = (props) => {
  return (
    <MemoryRouter>
      <AppProvider>
        <HomeLayout {...props}>
          <div className="w-full h-96 bg-gray-200" />
        </HomeLayout>
      </AppProvider>
    </MemoryRouter>
  );
};
