import { Story } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ResidentContextProvider } from "../../contexts/ResidentContext/ResidentContext";
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
  const value = { resident: {}, resolved: false, accessToken: null, login: () => {}, logout: () => {} };
  return (
    <MemoryRouter>
      <ResidentContextProvider value={value}>
        <HomeLayout {...props}>
          <div className="w-full h-96 bg-gray-200" />
        </HomeLayout>
      </ResidentContextProvider>
    </MemoryRouter>
  );
};
