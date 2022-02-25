import React from "react";
import { Icon } from "../../../../components";
import { background } from "../../../../utils/colors";

/**
 * Event props.
 */
export type EventProps = {
  displayName?: string;
  pathway?: "policy & government" | "arts & culture" | "college & career" | "volunteer" | "recreation";
  onClick?: () => void;
};

/**
 * Event component.
 * @param props
 * @constructor
 */
export const Event = (props: EventProps) => {
  return (
    <div
      onClick={props.onClick}
      className={`flex flex-col shadow-md cursor-pointer transition ease-in-out ${background(
        props.pathway
      )} p-4 rounded-md text-gray-500 h-28`}
    >
      <div className="w-5 h-5 min-h-5 drop-shadow-md text-slate-600 mb-5">
        <Icon name={props.pathway || "explore"} />
      </div>
      <p className="capitalize text-slate-600 text-xs">{props.pathway}</p>
      <div className="relative h-full">
        <p className="font-semibold capitalize text-slate-600 text-md absolute bottom-0">{props.displayName}</p>
      </div>
    </div>
  );
};
