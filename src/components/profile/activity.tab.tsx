import React from "react";
import { Community } from "../../models/community";
import { Event } from "../../models/event";
import { Icon } from "../icon";
import { Loader } from "../loader";

/**
 * ActivityTabProps
 */
export interface ActivityTabProps {
  community: Community | null;
  events: Event[] | null;
  onClick: (communityName?: string, eventName?: string) => void;
}

/**
 * @param props
 * @constructor
 */
export const ActivityTab = (props: ActivityTabProps) => {
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
        <div className={`m-auto grid lg:grid-cols-1 gap-3 lg:max-w-[48rem]`}>
          {events.map((event) => {
            return (
              <div
                onClick={() => props.onClick(event.courseName, event.eventName)}
                key={event.eventId}
                className={`border shadow-sm border-slate-300 rounded-md cursor-pointer transition ease-in-out text-gray-500 h-96`}
              >
                <div className="w-full py-4 px-4">
                  <Icon
                    className="inline-block w-7 h-7 stroke-slate-600 fill-slate-600"
                    icon={event.pathway || "explore"}
                  />
                  <div className="align-middle ml-2 inline-block">
                    <p className="font-semibold capitalize text-slate-600 text-md">
                      {event.title}
                    </p>
                    <div className="text-xs">
                      <p className="inline-block capitalize text-slate-600">
                        {event.pathway}
                      </p>
                      {event.proficiency && (
                        <p className="ml-1 font-semibold inline-block text-green-500">
                          {event.proficiency} pts
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <img
                  className="w-full object-cover h-64"
                  alt={event.title}
                  src={event.imageURL}
                />
                <div className="w-full h-16" />
              </div>
            );
          })}
        </div>
      )}
    </Loader>
  );
};
