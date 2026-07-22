import * as React from "react";
import { IconBell } from "@tabler/icons";

/**
 * DashboardTopBarProps
 */
export type DashboardTopBarProps = {
  eyebrow?: string;
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
        {props.eyebrow && (
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{props.eyebrow}</p>
        )}
        <h1 className="text-lg font-extrabold text-dark-blue-400">{props.title}</h1>
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
