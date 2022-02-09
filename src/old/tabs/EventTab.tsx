import React from "react";
import { Event } from "../models/event";
import { compact } from "../../utils/numbers";
import { Icon } from "../../components";
import { Loader } from "../../components";

/**
 * EventTabProps
 */
export interface EventTabProps {
  events: Event[] | null;
  onSetEvent: (eventName?: string) => void;
}

/**
 * EventTabComponent
 * @param props
 * @constructor
 */
export const EventTab = (props: EventTabProps) => {
  const rows = 2;
  const columns = 3;
  const gridSize = rows * columns;
  const events = props.events;
  return (
    <Loader isLoading={events === null}>
      {!events?.length && (
        <div className="h-full grid justify-items-center content-center">
          <p className="text-xs text-center align-middle leading-6 font-semibold text-slate-300"> No events found.</p>
        </div>
      )}
      {events && events?.length > 0 && (
        <div className={`grid lg:grid-cols-${columns} gap-3`}>
          {events.map((event) => {
            return (
              <div
                key={event.eventName}
                className="relative rounded-md shadow-md text-gray-500 h-48 cursor-pointer transition ease-in-out"
              >
                <img alt={event.title} src={event.imageURL} className="rounded-md w-full h-full object-cover" />
                <div
                  onClick={() => props.onSetEvent(event.eventName)}
                  className={`absolute top-0 left-0 flex flex-col rounded-md p-4 text-white h-full w-full bg-slate-700/50 hover:bg-slate-700/60`}
                >
                  <div>
                    <Icon
                      className="w-6 h-6 min-6 drop-shadow-md stroke-white fill-white mb-2"
                      icon={event.pathway || "explore"}
                    />
                    <p className="capitalize text-white text-xs">{event.pathway}</p>
                    <p className="font-semibold capitalize text-white text-md">{event.title}</p>
                  </div>

                  {event.proficiency && (
                    <div className="relative h-full">
                      <p className="font-semibold text-white text-2xl absolute bottom-0">
                        {compact(event.proficiency)} XP
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {events.length < gridSize &&
            [...Array(gridSize - events.length).keys()].map((k) => {
              return (
                <div
                  key={"missing.event." + k}
                  className="bg-gray-100 px-2 py-4 shadow-md rounded-md text-gray-500 h-48"
                />
              );
            })}
        </div>
      )}
    </Loader>
  );
};
