import React, { FunctionComponent } from "react";
import {Community}                  from "../../models/community";
import { background }               from "../../utilities/colors";
import { Icon }                     from "../icon";
import { Loader }                   from "../loader";
import { useEvents }                from "../../hooks/event";
import {EventQuery}                 from "../../models/event";

/**
 * EventGrid props
 */
export interface EventGridProps {
  community: Community | null
  rows?: number;
  columns?: number;
  query?: EventQuery | null;
  type: "milestone" | "reflection";
  onClick: (communityName?: string, eventName?: string) => void;
}

/**
 * EventGrid component
 * @param props
 * @constructor
 */
export const EventGrid: FunctionComponent<EventGridProps> = (props) => {
  if (props.rows === 1 && !props.columns) {
    return <HorizontalGrid {...props} />;
  }

  if (props.columns === 1 && !props.rows) {
    return <VerticalGrid {...props} />;
  }

  return <CoordinateGrid {...props} />;
};

const HorizontalGrid: FunctionComponent<EventGridProps> = (props) => {
  return null;
};

const VerticalGrid: FunctionComponent<EventGridProps> = (props) => {
  const events = useEvents(props.community?.communityName, props.query)
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

const CoordinateGrid: FunctionComponent<EventGridProps> = (props) => {
  const rows = props.rows || 2;
  const columns = props.columns || 3;
  const gridSize = rows * columns;
  const events = useEvents(props.community?.communityName, props.query)
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
