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
  /** Contextual text shown beneath the loading spinner (e.g. "Loading dashboard activity..."). Omit to keep the original bare-spinner loading state. */
  loadingLabel?: string;
  /** Spinner width/height in px while loading. Omit to keep the original small (35px) spinner. */
  loadingSize?: number;
  /** Tailwind stroke color class for the loading spinner. Omit to keep the original low-contrast default. */
  loadingStrokeClassName?: string;
  children?: React.ReactNode;
};

/**
 * The student-facing app's page shell: a full-height row with the sidebar and content pane as
 * siblings, so the content pane (with its own top bar) can scroll independently of the sidebar.
 * Used across the student side of the app (Home, Pathway/Badge detail pages, etc.) in place of
 * bare `AuthLayout` usage — `AuthLayout` itself is untouched, still used for non-student surfaces.
 * Renders the shared `Footer` at the bottom of the scrollable content, pinned to the viewport
 * bottom on short pages and pushed below content on long ones (standard sticky-footer behavior).
 * On print (`window.print()`), the sidebar/topbar/footer chrome is hidden and the fixed-viewport
 * height/overflow constraints are relaxed so the page content paginates naturally instead of being
 * clipped to one screen's worth of height - no page opts into this, it's a universal print rule
 * since no legitimate use case wants nav chrome printed alongside a page's content.
 * @param props
 * @constructor
 */
export const DashboardShell = (props: DashboardShellProps) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[linear-gradient(150deg,#EEF9FF_0%,#F0FEFA_40%,#FFFBEA_100%)] font-proxima print:h-auto print:overflow-visible print:bg-none">
      <div className="print:hidden">{props.sidebar}</div>
      <div className="flex flex-1 flex-col overflow-hidden print:overflow-visible">
        <div className="print:hidden">{props.topBar}</div>
        <div className="flex-1 overflow-y-auto print:overflow-visible">
          <Loader
            isLoading={props.isLoading}
            label={props.loadingLabel}
            size={props.loadingSize}
            strokeClassName={props.loadingStrokeClassName}
          >
            <div className="flex min-h-full flex-col print:min-h-0">
              <div className="flex flex-1 flex-col gap-3.5 p-5 print:p-0">{props.children}</div>
              <div className="print:hidden">
                <Footer />
              </div>
            </div>
          </Loader>
        </div>
      </div>
    </div>
  );
};
