import React, { FunctionComponent } from "react";
import { Icon } from "../icon";
import { Loader } from "../loader";
import { Event } from "../../models/event";

/**
 * Properties for the event
 */
export interface EventComponentProps {
  event: Event | null;
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
  const isLoading = props.event === null;
  const cta = (() => {
    switch (event.status) {
      case "opportunity":
        return (
          <button className="transition-colors shadow-md font-semibold rounded-lg max-h-14 py-3 px-12 bg-sky-400 text-white mx-2 lg:mt-2">
            Register
          </button>
        );
      case "going":
        return (
          <button className="transition-colors shadow-md font-semibold rounded-lg max-h-14 py-3 px-12 bg-slate-700 text-white mx-2 lg:mt-2">
            Registered
          </button>
        );
      case "happening":
        return (
          <button className="transition-colors shadow-md font-semibold rounded-lg max-h-14 py-3 px-12 bg-green-600 text-white mx-2 lg:mt-2">
            Join
          </button>
        );
      case "went":
        return (
          <button className="transition-colors shadow-md font-semibold rounded-lg max-h-14 py-3 px-12 bg-slate-700 text-white mx-2 lg:mt-2">
            Reflect
          </button>
        );
      case "contributed":
        return (
          <button className="transition-colors shadow-md font-semibold rounded-lg max-h-14 py-3 px-12 bg-slate-700 text-white mx-2 lg:mt-2">
            Revisit
          </button>
        );
      default:
        return null;
    }
  })();

  const skills = getSkills(event);
  return (
    <div className="shadow-md overflow-hidden w-11/12 max-w-[36rem] bg-white rounded-md">
      <div className="pb-5 w-full">
        <div className="relative z-50">
          <Icon
            onClick={props.onClose}
            className="mt-5 absolute right-5 transition ease-in-out cursor-pointer stroke-gray-300 fill-gray-300 hover:stroke-gray-400 hover:fill-gray-400 w-4"
            icon="close"
          />
        </div>
        {/* todo: fix margin for loader */}
        <div className="w-full min-h-60 justify-items-center content-center">
          <Loader isLoading={isLoading}>
            <img
              className="w-full h-60 object-cover"
              alt={event.title}
              src={event.imageURL}
            />
            <div className="w-full flex p-5 border-b border-gray-200">
              <div className="flex items-start grow">
                <Icon
                  className="inline-block min-w-6 w-6 h-6 stroke-slate-600 fill-slate-600"
                  icon={event.pathway || "explore"}
                />

                <div className="grow align-top ml-2 inline-block leading-none">
                  <p className="font-semibold capitalize text-slate-600 text-lg -mt-1.5">
                    {event.title}
                  </p>
                  <div>
                    <p className="text-xs inline-block capitalize text-slate-600">
                      {event.pathway}
                    </p>
                    {event.proficiency && (
                      <p className="ml-1 font-semibold inline-block text-xs text-green-500">
                        {event.proficiency} pts
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {cta}
            </div>

            <div className="w-full max-h-[20rem] overflow-scroll">
              <div className="w-full p-5 border-b border-gray-200 grid grid-cols-1 gap-4">
                {event.summary && (
                  <div className="text-slate-600 grid grid-cols-1 gap-4">
                    <p className="font-semibold text-lg">Summary</p>
                    <p className="text-sm">{event.summary}</p>
                  </div>
                )}

                {skills && skills.length > 0 && (
                  <div className="grid grid-cols-1 gap-4">
                    <p className="text-slate-600 font-semibold text-lg">Skills</p>
                    <div className="flex gap-2">
                      {skills.map((skill, i) => {
                        return (
                          <button key={skill+i} className="grow-0 cursor-pointer shadow-sm text-center font-semibold inline-block rounded-md capitalize bg-gray-100 hover:bg-gray-50 active:bg-gray-50 focus:bg-gray-50 px-4 py-2 text-xs text-gray-600">
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full p-5 border-b border-gray-200 grid grid-cols-1 gap-4">
                {(event.location || event.url || event.notBefore) && (
                  <div className="text-slate-600 grid grid-cols-1 gap-4">
                    <p className="font-semibold text-lg">Details</p>
                    <div className="grid grid-cols-1 gap-8">
                      {event.location && (
                        <div className="flex gap-1 items-center">
                          <Icon
                            className="grow-0 w-6 h-6 min-w-6 stroke-slate-600 fill-slate-600"
                            icon="pin"
                          />
                          <div className="grow font-medium inline-block capitalize px-4 py-2 text-sm text-slate-600">
                            {event.location.address}, {event.location.city},{" "}
                            {event.location.state} {event.location.postalCode}
                          </div>
                        </div>
                      )}

                      {event.notBefore && (
                        <div className="flex gap-1 items-center">
                          <Icon
                            className="grow-0 w-6 h-6 min-w-6 stroke-slate-600 fill-slate-600"
                            icon="clock"
                          />
                          <div className="grow font-medium inline-block px-4 py-2 text-sm text-slate-600">
                            {new Intl.DateTimeFormat("en-US", {
                              dateStyle: "full",
                              timeStyle: "long",
                            }).format(new Date(event.notBefore))}
                          </div>
                        </div>
                      )}

                      {event.url && (
                        <div className="flex gap-1 items-center">
                          <Icon
                            className="grow-0 w-6 h-6 min-w-6 stroke-slate-600 fill-slate-600"
                            icon="globe"
                          />
                          <div className="grow font-medium inline-block px-4 py-2 text-sm text-slate-600 hover:underline">
                            <a href={event.url}>{event.url}</a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Loader>
        </div>
      </div>
    </div>
  );
};

/**
 * Get skills from event tags
 * @param event
 */
const getSkills = (event: Event) => {
  return event.tags
    ?.map((tag) => (tag.startsWith("skill:") ? tag.replace("skill:", "") : ""))
    .filter((tag) => tag);
};
