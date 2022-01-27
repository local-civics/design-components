import React, { FunctionComponent } from "react";
import { Icon } from "../icon";
import { Loader } from "../loader";
import { Event } from "./model";

/**
 * Properties for the event
 */
export interface EventComponentProps {
  isLoading?: boolean;
  event?: Event;
  onClose: () => void;
}

/**
 * Pure presentational event component
 * @constructor
 */
export const EventComponent: FunctionComponent<EventComponentProps> = (
  props
) => {
  const event = props.event || {};
  const isLoading = props.isLoading;
  const cta = (() => {
    switch (event.status) {
      case "opportunity":
        return (
          <button className="transition-colors font-semibold rounded-lg max-h-14 py-3 px-12 bg-sky-400 text-white mx-2 lg:mt-2">
            Register
          </button>
        );
      case "going":
        return (
          <button className="transition-colors font-semibold rounded-lg max-h-14 py-3 px-12 bg-slate-700 text-white mx-2 lg:mt-2">
            Registered
          </button>
        );
      case "happening":
        return (
          <button className="transition-colors font-semibold rounded-lg max-h-14 py-3 px-12 bg-green-600 text-white mx-2 lg:mt-2">
            Begin
          </button>
        );
      case "went":
        return (
          <button className="transition-colors font-semibold rounded-lg max-h-14 py-3 px-12 bg-slate-700 text-white mx-2 lg:mt-2">
            Reflect
          </button>
        );
      case "contributed":
        return (
          <button className="transition-colors font-semibold rounded-lg max-h-14 py-3 px-12 bg-slate-700 text-white mx-2 lg:mt-2">
            Revisit
          </button>
        );
      default:
        return null;
    }
  })();

  return (
    <div className="shadow-md overflow-hidden w-9/12 lg:w-7/12 bg-white rounded-md">
      <div className="pb-5 w-full">
        <div className="relative">
          <Icon
            onClick={props.onClose}
            className="mt-5 absolute right-5 transition ease-in-out cursor-pointer stroke-gray-300 fill-gray-300 hover:stroke-gray-400 hover:fill-gray-400 w-4"
            icon="close"
          />
        </div>
        <div className="w-full">
          <Loader isLoading={isLoading}>
            <img
              className="w-full h-60 object-cover"
              alt={event.title}
              src={event.imageURL}
            />
            <div className="w-full flex mt-5 pl-5 pr-10 pb-5 border-b border-gray-200">
              <div className="flex items-start grow">
                <Icon
                  className="inline-block min-w-6 w-6 h-6 stroke-gray-700 fill-gray-700"
                  icon={event.pathway || "explore"}
                />

                <div className="grow align-top ml-2 inline-block">
                  <p className="font-semibold capitalize text-gray-700 text-lg -mt-1.5">
                    {event.title}
                  </p>
                  <div>
                    <p className="text-xs inline-block capitalize text-gray-700">
                      {event.pathway}
                    </p>
                    {event.proficiency && (
                      <p className="ml-1 font-semibold inline-block text-xs text-blue-500">
                        {event.proficiency} pts
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {cta}
            </div>
          </Loader>
        </div>
      </div>
    </div>
  );
};
