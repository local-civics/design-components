import React, { FunctionComponent } from "react";
import { background } from "../../utilities/colors";
import { Icon } from "../icon";
import { Loader } from "../loader";
import { useEvents } from "./hooks";

/**
 * EventGrid props
 */
export interface EventGridProps {
  residentName: string;
  rows?: number;
  columns?: number;
  query?: any;
  type: "milestone" | "reflection";
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
  const [events, isLoading] = useEvents(props.residentName, props.query);
  return (
    <Loader isLoading={isLoading}>
      {!events.length && (
        <div className="h-full grid justify-items-center content-center">
          <p className="text-xs text-center align-middle leading-6 font-semibold text-gray-700">
            {" "}
            No events currently, check back later!{" "}
          </p>
        </div>
      )}
      {events.length > 0 && (
        <div className={`m-auto grid lg:grid-cols-1 gap-3 lg:max-w-[48rem]`}>
          {events.map((event) => {
            return (
              <div
                key={event.eventId}
                className={`border-2 border-gray-200 rounded-md cursor-pointer transition ease-in-out text-gray-500 h-96`}
              >
                <div className="w-full py-4 px-4">
                  <Icon
                    className="inline-block w-7 h-7 stroke-gray-700 fill-gray-700"
                    icon={event.pathway}
                  />
                  <div className="align-middle ml-2 inline-block">
                    <p className="font-semibold capitalize text-gray-700 text-md">
                      {event.name}
                    </p>
                    <div className="text-xs">
                      <p className="inline-block capitalize text-gray-700">
                        {event.pathway}
                      </p>
                      {event.points && (
                        <p className="ml-1 font-semibold inline-block text-green-500">
                          {event.points} pts
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <img
                  className="w-full object-cover h-64"
                  alt={event.name}
                  src={event.image}
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
  const [events, isLoading] = useEvents(props.residentName, props.query);
  return (
    <Loader isLoading={isLoading}>
      {!events.length && (
        <div className="h-full grid justify-items-center content-center">
          <p className="text-xs text-center align-middle leading-6 font-semibold text-gray-700">
            {" "}
            No events currently, check back later!{" "}
          </p>
        </div>
      )}
      {events.length > 0 && (
        <div className={`grid lg:grid-cols-${columns} gap-3`}>
          {events.map((event) => {
            return (
              <div
                key={event.eventId}
                className={`flex flex-col cursor-pointer transition ease-in-out ${background(
                  event.pathway
                )} p-4 rounded-md text-gray-500 h-48`}
              >
                <Icon
                  className="w-12 h-20 stroke-gray-700 fill-gray-700 mb-5"
                  icon={event.pathway}
                />
                <div className="relative h-full">
                  <p className="font-semibold capitalize text-gray-700 text-md absolute bottom-0">
                    {event.name}
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
                  className="bg-gray-100 px-2 py-4 rounded-md text-gray-500 h-48"
                />
              );
            })}
        </div>
      )}
    </Loader>
  );
};
