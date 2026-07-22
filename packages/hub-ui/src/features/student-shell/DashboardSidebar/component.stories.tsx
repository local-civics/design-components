import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Story } from "@storybook/react";
import { DashboardSidebar, DashboardSidebarProps } from "./DashboardSidebar";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/DashboardSidebar",
  component: DashboardSidebar,
};

/**
 * Component storybook template
 */
const Template: Story<DashboardSidebarProps> = (args) => (
  <MemoryRouter>
    <div style={{ height: "100vh" }}>
      <DashboardSidebar
        {...args}
        active={args.active || "profile"}
        links={
          args.links || {
            profile: { href: "#" },
            pathways: { href: "#" },
            badges: { href: "#" },
          }
        }
        identity={
          args.identity || {
            name: "Beverly Leon",
            subtitle: "NVPS AMS I",
            online: true,
            avatarURL:
              "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          }
        }
        onSwitchAccount={args.onSwitchAccount || (() => {})}
        onLogout={args.onLogout || (() => {})}
      />
    </div>
  </MemoryRouter>
);

/**
 * Component stories
 */
export const Component: Story<DashboardSidebarProps> = Template.bind({});
Component.args = {};
