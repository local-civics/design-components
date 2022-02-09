import React from "react";
import { Event } from "../models/event";
import { background } from "../../utils/colors";
import { Icon } from "../../components";
import { Loader } from "../../components";

export interface EventListProps {
  events: Event[] | null;
  onSetEvent: (eventName?: string) => void;
}

export const EventList = (props: EventListProps) => {
  return (
    <div className="w-full h-[30rem] overflow-scroll p-2">
      <Loader isLoading={props.events === null}>
        {!props.events?.length && (
          <div className="h-full grid justify-items-center content-center">
            <p className="text-xs text-center align-middle leading-6 font-semibold text-slate-200"> No events found.</p>
          </div>
        )}
        {props.events && props.events?.length > 0 && (
          <div className="grid grid-cols-1 gap-3">
            {props.events.map((event) => {
              return (
                <div
                  onClick={() => props.onSetEvent(event.eventName)}
                  key={event.eventName}
                  className={`flex flex-col shadow-md cursor-pointer transition ease-in-out ${background(
                    event.pathway
                  )} p-4 rounded-md text-gray-500 h-28`}
                >
                  <Icon
                    className="w-5 h-5 min-h-5 drop-shadow-md stroke-slate-600 fill-slate-600 mb-5"
                    icon={event.pathway || "explore"}
                  />
                  <p className="capitalize text-slate-600 text-xs">{event.pathway}</p>
                  <div className="relative h-full">
                    <p className="font-semibold capitalize text-slate-600 text-md absolute bottom-0">{event.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Loader>
    </div>
  );
};
