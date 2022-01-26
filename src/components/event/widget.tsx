import React, { FunctionComponent } from "react";
import { Icon } from "../icon";
import { Loader } from "../loader";
import { useEvents } from "./hooks";

/**
 * EventWidget properties
 */
export interface EventWidgetProps {
  title: string;
  residentName: string;
  // todo: event query
  query?: any;
  onSeeAllClick?: () => void;
}

/**
 * EventWidget
 * @param props
 * @constructor
 */
export const EventWidget: FunctionComponent<EventWidgetProps> = (props) => {
  const [events, isLoading] = useEvents(props.residentName, props.query);
  return (
    <div
      className="border-gray-200 border-2 rounded-md h-[20.5rem] lg:w-60 w-full mt-3"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="px-2 py-2 bg-gray-200" />
      <div className="p-2">
        <div className="flex items-center">
          <div className="flex-grow">
            <Icon
              className="w-5 h-5 stroke-gray-700 fill-gray-700 inline-block"
              icon="calendar"
            />
            <h4 className="ml-2 capitalize align-middle font-semibold text-gray-700 inline-block">
              {props.title}
            </h4>
          </div>
          {props.onSeeAllClick && (
            <p
              onClick={props.onSeeAllClick}
              className="text-xs align-middle cursor-pointer text-gray-400 hover:text-gray-600 inline-block"
            >
              See All
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 overflow-hidden justify-items-center content-center min-h-60">
          <Loader isLoading={isLoading}>
            {!events.length && (
              <p className="text-xs text-center align-middle leading-6 font-semibold text-gray-700">
                {" "}
                No events, go and explore!{" "}
              </p>
            )}
            {events.map((event) => {
              return (
                <div
                  key={event.eventId}
                  className="cursor-pointer transition ease-in-out mt-3 bg-gray-100 hover:bg-gray-200  px-2 py-4 rounded-md text-gray-600 w-full"
                >
                  <p className="font-semibold text-xs">{event.name}</p>
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
