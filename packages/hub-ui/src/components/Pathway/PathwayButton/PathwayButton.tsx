import React from "react";
import { Icon } from "../../Icon";

/**
 * PathwayProps
 */
export type PathwayButtonProps = {
  active?: boolean;
  name?: "policy & government" | "arts & culture" | "college & career" | "volunteer" | "recreation";
  onClick?: () => void;
};

/**
 * A component for displaying a single pathway
 * @param props
 * @constructor
 */
export const PathwayButton = (props: PathwayButtonProps) => {
  const base = "px-2 py-4 text-left cursor-pointer hover:bg-white active:bg-white";
  const bg = props.active ? "bg-sky-100" : "bg-gray-50";
  const className = [base, bg].join(" ");
  return (
    <button onClick={props.onClick} className={className}>
      <div className="inline-block align-middle w-3 h-3 min-w-3 stroke-slate-600 fill-slate-600">
        <Icon name={props.name || "pathway"} />
      </div>
      <span className="ml-2 align-middle capitalize font-semibold text-sm text-slate-600"> {props.name} </span>
    </button>
  );
};
