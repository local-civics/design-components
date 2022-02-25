import { Story } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { AppProvider } from "../../contexts/App";
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
  const sidebar = <div className="w-full h-96 bg-gray-200" />;
  const main = <div className="w-full h-96 bg-gray-200" />;

  return (
    <MemoryRouter>
      <AppProvider>
        <AuthLayout sidebar={sidebar} main={main} {...props} />
      </AppProvider>
    </MemoryRouter>
  );
};
