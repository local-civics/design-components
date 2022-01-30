import React, { FunctionComponent } from "react";
import {Community}                  from "../../models/community";
import { Icon }                     from "../icon";
import { Loader }                   from "../loader";
import { useEvents }                from "../../hooks/event";
import {EventQuery}                 from "../../models/event";

/**
 * EventWidget properties
 */
export interface EventWidgetProps {
  title: string;
  community: Community | null
  query?: EventQuery;
  onClick: (communityName?: string, eventName?: string) => void;
  onSeeAllClick: () => void;
}

/**
 * EventWidget
 * @param props
 * @constructor
 */
export const EventWidget: FunctionComponent<EventWidgetProps> = (props) => {
  const events = useEvents(props.community?.communityName, props.query)
  return (
    <div
      className="border-gray-200 border shadow-sm rounded-md h-[20.5rem] lg:w-60 w-full mt-3 overflow-hidden"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="px-2 py-2 bg-gray-200" />
      <div className="p-2">
        <div className="flex items-center">
          <div className="grow">
            <Icon
              className="w-5 h-5 stroke-slate-600 fill-slate-600 inline-block"
              icon="calendar"
            />
            <h4 className="ml-2 capitalize align-middle font-semibold text-slate-600 inline-block">
              {props.title}
            </h4>
          </div>
          {props.onSeeAllClick && (
            <p
              onClick={props.onSeeAllClick}
              className="text-xs align-middle cursor-pointer text-slate-400 hover:text-slate-600 inline-block"
            >
              See All
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 overflow-hidden justify-items-center content-center min-h-60">
          <Loader isLoading={events === null}>
            {!events?.length && (
              <p className="text-xs text-center align-middle leading-6 font-semibold text-slate-600">
                {" "}
                No events, go and explore!{" "}
              </p>
            )}
            {events?.map((event) => {
              return (
                <div
                  onClick={() =>
                    props.onClick(event.courseName, event.eventName)
                  }
                  key={event.eventName}
                  className="cursor-pointer transition shadow-md ease-in-out mt-3 bg-gray-100 hover:bg-gray-50  px-2 py-4 rounded-md text-gray-600 w-full"
                >
                  <p className="font-semibold text-xs">{event.title}</p>
                  {event.notBefore && (
                    <p className="mt-3 text-xs">
                      {new Date(event.notBefore).toLocaleString("default", {
                        month: "short",
                        day: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              );
            })}
          </Loader>
        </div>
      </div>
    </div>
  );
};
