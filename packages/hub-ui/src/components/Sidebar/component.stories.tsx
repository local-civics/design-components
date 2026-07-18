import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Story } from "@storybook/react";
import { Sidebar, SidebarProps } from "./Sidebar";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Sidebar",
  component: Sidebar,
};

/**
 * Component storybook template
 */
const Template: Story<SidebarProps> = (args) => (
  <MemoryRouter>
    <div style={{ height: "100vh" }}>
      <Sidebar
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
            subtitle: "Level 6",
            avatarURL:
              "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          }
        }
        settingsHref={args.settingsHref || "#"}
        onLogout={args.onLogout || (() => {})}
      />
    </div>
  </MemoryRouter>
);

/**
 * Component stories
 */
export const Component: Story<SidebarProps> = Template.bind({});
Component.args = {};
