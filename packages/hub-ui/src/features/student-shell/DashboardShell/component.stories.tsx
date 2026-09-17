import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Story } from "@storybook/react";
import { DashboardShell, DashboardShellProps } from "./DashboardShell";
import { DashboardSidebar } from "../DashboardSidebar/DashboardSidebar";
import { DashboardTopBar } from "../DashboardTopBar/DashboardTopBar";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/DashboardShell",
  component: DashboardShell,
};

/**
 * Component storybook template
 */
const Template: Story<DashboardShellProps> = (args) => (
  <MemoryRouter>
    <DashboardShell
      {...args}
      sidebar={
        <DashboardSidebar
          active="profile"
          links={{ profile: { href: "#" }, pathways: { href: "#" }, badges: { href: "#" } }}
          identity={{ name: "Beverly Leon", subtitle: "NVPS AMS I", online: true }}
          onSwitchAccount={() => {}}
          onLogout={() => {}}
        />
      }
      topBar={<DashboardTopBar eyebrow="Student Portal" title="My Profile" onNotifications={() => {}} />}
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">Page content goes here.</div>
    </DashboardShell>
  </MemoryRouter>
);

/**
 * Component stories
 */
export const Component: Story<DashboardShellProps> = Template.bind({});
Component.args = {};

/**
 * The bigger, higher-contrast spinner + contextual text treatment given to slow-loading pages
 * (educator File Locker / Dashboard) via the loading* props.
 */
export const LoadingWithLabel: Story<DashboardShellProps> = Template.bind({});
LoadingWithLabel.args = {
  isLoading: true,
  loadingLabel: "Hold on, we're loading your dashboard.",
  loadingSize: 56,
  loadingStrokeClassName: "stroke-dark-blue-400",
};
