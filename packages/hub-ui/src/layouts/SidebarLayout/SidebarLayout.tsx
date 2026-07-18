import React from "react";
import { Sidebar, SidebarIdentity, SidebarLinks, SidebarTabName } from "../../components";
import { AuthLayout, AuthLayoutProps } from "../AuthLayout/AuthLayout";

/**
 * SidebarLayoutProps
 */
export type SidebarLayoutProps = Omit<AuthLayoutProps, "sidebar" | "children" | "topNav" | "page" | "onProfile"> & {
  active?: SidebarTabName;
  links: SidebarLinks;
  identity?: SidebarIdentity;
  settingsHref?: string;
  sidebarExtra?: React.ReactNode;
};

/**
 * SidebarLayout
 *
 * AuthLayout with the student home-page Sidebar pre-wired into its sidebar slot.
 * Reused by every page that adopts the new left nav, not just one page - the
 * caller still supplies header/subheader/main the same way it would for AuthLayout directly.
 * @constructor
 */
export const SidebarLayout = (props: SidebarLayoutProps) => {
  return (
    <AuthLayout
      {...props}
      topNav={false}
      sidebar={
        <>
          <Sidebar
            active={props.active}
            links={props.links}
            identity={props.identity}
            settingsHref={props.settingsHref}
            disabled={props.disabled}
            onLogout={props.onLogout}
          />
          {props.sidebarExtra}
        </>
      }
    />
  );
};
