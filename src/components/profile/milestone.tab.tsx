import React from "react";
import { Community } from "../../models/community";
import { background } from "../../utilities/colors";
import { Icon } from "../icon";
import { Loader } from "../loader";
import { Event } from "../../models/event";

/**
 * MilestoneTabProps
 */
export interface MilestoneTabProps {
  community: Community | null;
  events: Event[] | null;
  onClick: (communityName?: string, eventName?: string) => void;
}

/**
 * MilestoneTab
 * @param props
 * @constructor
 */
export const MilestoneTab = (props: MilestoneTabProps) => {
  const rows = 2;
  const columns = 3;
  const gridSize = rows * columns;
  const events = props.events;
  return (
    <Loader isLoading={events === null}>
      {!events?.length && (
        <div className="h-full grid justify-items-center content-center">
          <p className="text-xs text-center align-middle leading-6 font-semibold text-slate-600">
            {" "}
            No events currently, check back later!{" "}
          </p>
        </div>
      )}
      {events?.length && events?.length > 0 && (
        <div className={`grid lg:grid-cols-${columns} gap-3`}>
          {events.map((event) => {
            return (
              <div
                onClick={() => props.onClick(event.courseName, event.eventName)}
                key={event.eventId}
                className={`flex flex-col shadow-md cursor-pointer transition ease-in-out ${background(
                  event.pathway,
                  event.status === "contributed"
                )} p-4 rounded-md text-gray-500 h-48`}
              >
                {event.status === "contributed" && (
                  <div className="relative">
                    <Icon
                      className="m-auto h-4 w-4 stroke-slate-600 fill-slate-600 absolute right-0"
                      icon="reflection"
                    />
                  </div>
                )}
                <Icon
                  className="w-12 h-20 drop-shadow-md stroke-slate-600 fill-slate-600 mb-5"
                  icon={event.pathway || "explore"}
                />
                <div className="relative h-full">
                  <p className="font-semibold capitalize text-slate-600 text-md absolute bottom-0">
                    {event.title}
                  </p>
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
