import * as React from "react";
import { IconBell } from "@tabler/icons";

/**
 * DashboardTopBarBreadcrumbSegment
 */
export type DashboardTopBarBreadcrumbSegment = {
  label: string;
  /** Omit on the current page's own segment (the array's last entry) - it renders as plain text. */
  onClick?: () => void;
};

/**
 * DashboardTopBarProps
 */
export type DashboardTopBarProps = {
  eyebrow?: string;
  /** Role/context clarifier under the title (e.g. "You're viewing this as an educator."). Distinct
   * from `children`, which stays in the right-hand action slot. */
  subtitle?: string;
  /** 2-4 segment orientation trail, including the current page as the final, non-clickable
   * segment (e.g. "Pathways › Civic Readiness › NYS Seal Badge"). Rendered above the eyebrow. */
  breadcrumb?: DashboardTopBarBreadcrumbSegment[];
  title: string;
  children?: React.ReactNode;

  onNotifications?: () => void;
};

/**
 * The persistent bar above the dashboard's scrollable content: a page heading on the left,
 * notifications and a primary action slot (e.g. LogServiceButton) on the right.
 * @param props
 * @constructor
 */
export const DashboardTopBar = (props: DashboardTopBarProps) => {
  return (
    <div className="flex shrink-0 items-center justify-between gap-4 border-b border-sky-blue-400/20 bg-white px-5 py-3.5 shadow-[0_2px_10px_rgba(59,208,242,0.08)]">
      <div>
        {!!props.breadcrumb?.length && (
          <nav className="mb-0.5 flex flex-wrap items-center gap-1 text-[11px] font-semibold text-slate-400">
            {props.breadcrumb!.map((seg, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-slate-300">›</span>}
                {seg.onClick ? (
                  <button type="button" onClick={seg.onClick} className="hover:text-sky-blue-400 hover:underline">
                    {seg.label}
                  </button>
                ) : (
                  <span className="text-slate-500">{seg.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        {props.eyebrow && (
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{props.eyebrow}</p>
        )}
        <h1 className="text-lg font-extrabold text-dark-blue-400">{props.title}</h1>
        {props.subtitle && <p className="text-xs font-medium text-slate-400">{props.subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {props.onNotifications && (
          <button
            type="button"
            onClick={props.onNotifications}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-blue-400/20 bg-sky-blue-400/10 text-sky-blue-400 hover:bg-sky-blue-400/15"
          >
            <IconBell size={16} stroke={1.75} />
          </button>
        )}
        {props.children}
      </div>
    </div>
  );
};
