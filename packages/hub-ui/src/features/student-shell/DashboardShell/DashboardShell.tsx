import * as React from "react";
import { Loader } from "../../../components/Loader";
import { Footer } from "../../../components/Footer";

/**
 * DashboardShellProps
 */
export type DashboardShellProps = {
  sidebar: React.ReactNode;
  topBar?: React.ReactNode;
  isLoading?: boolean;
  children?: React.ReactNode;
};

/**
 * The student-facing app's page shell: a full-height row with the sidebar and content pane as
 * siblings, so the content pane (with its own top bar) can scroll independently of the sidebar.
 * Used across the student side of the app (Home, Pathway/Badge detail pages, etc.) in place of
 * bare `AuthLayout` usage — `AuthLayout` itself is untouched, still used for non-student surfaces.
 * Renders the shared `Footer` at the bottom of the scrollable content, pinned to the viewport
 * bottom on short pages and pushed below content on long ones (standard sticky-footer behavior).
 * @param props
 * @constructor
 */
export const DashboardShell = (props: DashboardShellProps) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[linear-gradient(150deg,#EEF9FF_0%,#F0FEFA_40%,#FFFBEA_100%)] font-proxima">
      {props.sidebar}
      <div className="flex flex-1 flex-col overflow-hidden">
        {props.topBar}
        <div className="flex-1 overflow-y-auto">
          <Loader isLoading={props.isLoading}>
            <div className="flex min-h-full flex-col">
              <div className="flex flex-1 flex-col gap-3.5 p-5">{props.children}</div>
              <Footer />
            </div>
          </Loader>
        </div>
      </div>
    </div>
  );
};
