import React from "react";
import { Icon } from "../../../../components";
import { Pathway } from "../../../../old/models/pathway";
import { compact } from "../../../../utils/numbers";

/**
 * The properties for the event item.
 */
export type EventProps = {
  eventName?: string;
  title?: string;
  imageURL?: string;
  pathway?: Pathway;
  proficiency?: number;
  onClick: (eventName?: string) => void;
};

/**
 * A preview of the props.
 * @param props
 * @constructor
 */
export const Event = (props: EventProps) => {
  return (
    <div
      key={props.eventName}
      className="relative rounded-md shadow-md text-gray-500 h-48 cursor-pointer transition ease-in-out"
    >
      <img alt={props.title} src={props.imageURL} className="rounded-md w-full h-full object-cover" />
      <div
        onClick={() => props.onClick(props.eventName)}
        className={`absolute top-0 left-0 flex flex-col rounded-md p-4 text-white h-full w-full bg-slate-700/50 hover:bg-slate-700/60`}
      >
        <div>
          <Icon
            className="w-6 h-6 min-6 drop-shadow-md stroke-white fill-white mb-2"
            icon={props.pathway || "explore"}
          />
          <p className="capitalize text-white text-xs">{props.pathway}</p>
          <p className="font-semibold capitalize text-white text-md">{props.title}</p>
        </div>

        {props.proficiency && (
          <div className="relative h-full">
            <p className="font-semibold text-white text-2xl absolute bottom-0">{compact(props.proficiency)} XP</p>
          </div>
        )}
      </div>
    </div>
  );
};
