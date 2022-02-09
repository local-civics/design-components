import { Story } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ResidentContextProvider } from "../../contexts/ResidentContext/ResidentContext";
import { AuthLayout, AuthLayoutProps } from "./AuthLayout";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Layout/AuthLayout",
  component: AuthLayout,
};

/**
 * Component
 */
export const Component: Story<AuthLayoutProps> = (props) => {
  const value = { resident: {}, resolved: false, accessToken: null, login: () => {}, logout: () => {} };
  const sidebar = <div className="w-full h-96 bg-gray-200" />;
  const main = <div className="w-full h-96 bg-gray-200" />;

  return (
    <MemoryRouter>
      <ResidentContextProvider value={value}>
        <AuthLayout sidebar={sidebar} main={main} {...props} />
      </ResidentContextProvider>
    </MemoryRouter>
  );
};
