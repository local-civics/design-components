import React from "react";
import { Community } from "../../models/community";
import { Event } from "../../models/event";
import { background } from "../../utilities/colors";
import { compact } from "../../utilities/numbers";
import { Icon } from "../icon";
import { Loader } from "../loader";
import { ActivityTab } from "../profile/activity.tab";
import { BadgeTab } from "../profile/badge.tab";
import { MilestoneTab } from "../profile/milestone.tab";
import { EventTab } from "./event.tab";

export interface EventTableProps {
  community: Community | null;
  events: Event[] | null;
  going: Event[] | null;
  upcoming: Event[] | null;
  reflections: Event[] | null;
  day: Date | null;
  tab: "going" | "upcoming" | "reflections" | null;
  onSetDay: (day: Date | null) => void;
  onClick: (eventName?: string) => void;
}

export const EventTable = (props: EventTableProps) => {
  const [active, setActive] = React.useState(
    props.tab || ("upcoming" as "going" | "upcoming" | "reflections")
  );
  const day = props.day || new Date();

  let tab;
  switch (active) {
    case "going":
      tab = <EventTab events={props.going} onClick={props.onClick} />;
      break;
    case "reflections":
      tab = <EventTab events={props.reflections} onClick={props.onClick} />;
      break;
    case "upcoming":
      tab = <EventTab events={props.upcoming} onClick={props.onClick} />;
      break;
    default:
      setActive("upcoming");
  }

  const onSetActive = (target: "going" | "upcoming" | "reflections") => {
    if (target === active) {
      return;
    }
    setActive(target);
  };

  return (
    <article className="border-gray-200 border shadow-sm rounded-md min-h-48 h-full w-full overflow-hidden">
      <div className="p-2 bg-gray-200" />
      <div className="h-full">
        <Loader
          isLoading={
            props.community === null ||
            props.events === null ||
            props.going === null ||
            props.upcoming === null ||
            props.reflections === null
          }
        >
          <div>
            <div className="flex items-center">
              <div className="grow">
                <div className="p-5 flex items-center border-b border-b-gray-200">
                  <div>
                    <span className="font-semibold text-3xl text-slate-600">
                      {Intl.DateTimeFormat("en-US", {
                        month: "long",
                      }).format(day)}
                    </span>
                    <span className="font-semibold ml-2 text-3xl text-slate-600">
                      {getNumberWithOrdinal(day.getDate())}
                    </span>
                    <span className="text-3xl ml-2 text-slate-600">
                      {Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                      }).format(day)}
                    </span>
                  </div>
                  {props.day && (
                    <Icon
                      onClick={() =>
                        props.onSetDay(
                          new Date(
                            day.getFullYear(),
                            day.getMonth(),
                            day.getDate() - 1
                          )
                        )
                      }
                      className="cursor-pointer ml-5 w-3 h-3 min-w-3 fill-slate-300 stroke-slate-300 hover:stroke-slate-500 hover:fill-slate-500"
                      icon="leftArrow"
                    />
                  )}
                  {props.day && (
                    <Icon
                      onClick={() =>
                        props.onSetDay(
                          new Date(
                            day.getFullYear(),
                            day.getMonth(),
                            day.getDate() + 1
                          )
                        )
                      }
                      className="cursor-pointer ml-2 w-3 h-3 min-w-3 fill-slate-300 stroke-slate-300 hover:stroke-slate-500 hover:fill-slate-500"
                      icon="rightArrow"
                    />
                  )}
                </div>

                {!props.day && (
                  <div
                    className="overflow-hidden w-full"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                  >
                    <div className="p-2">
                      <div className="grid gap-2 grid-cols-1 lg:grid-cols-3 justify-items-center">
                        <div
                          onClick={() => onSetActive("going")}
                          className={`transition ease-in-out w-full py-3 px-5 ${
                            active === "going"
                              ? "border-b-2 border-b-sky-400"
                              : "cursor-pointer hover:border-b-2 hover:border-b-sky-400"
                          }`}
                        >
                          <div className="lg:m-auto w-max">
                            <Icon
                              className="w-5 h-5 stroke-slate-600 fill-slate-600 inline-block"
                              icon="milestone"
                            />
                            <h4 className="ml-1 capitalize text-sm font-semibold align-middle text-slate-600 inline-block">
                              Registered
                            </h4>
                          </div>
                        </div>
                        <div
                          onClick={() => onSetActive("upcoming")}
                          className={`transition ease-in-out w-full py-3 px-5 ${
                            active === "upcoming"
                              ? "border-b-2 border-b-sky-400"
                              : "cursor-pointer hover:border-b-2 hover:border-b-sky-400"
                          }`}
                        >
                          <div className="lg:m-auto w-max">
                            <Icon
                              className="w-5 h-5 stroke-slate-600 fill-slate-600 inline-block"
                              icon="clock"
                            />
                            <h4 className="ml-1 capitalize text-sm font-semibold align-middle text-slate-600 inline-block">
                              Upcoming
                            </h4>
                          </div>
                        </div>
                        <div
                          onClick={() => onSetActive("reflections")}
                          className={`transition ease-in-out w-full py-3 px-5 ${
                            active === "reflections"
                              ? "border-b-2 border-b-sky-400"
                              : "cursor-pointer hover:border-b-2 hover:border-b-sky-400"
                          }`}
                        >
                          <div className="lg:m-auto w-max">
                            <Icon
                              className="w-5 h-5 stroke-slate-600 fill-slate-600 inline-block"
                              icon="reflection"
                            />
                            <h4 className="ml-1 capitalize text-sm font-semibold align-middle text-slate-600 inline-block">
                              Reflections
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 h-full">
                      <div className="h-[25rem] overflow-scroll">{tab}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Loader>
      </div>
    </article>
  );
};

/**
 * https://community.shopify.com/c/shopify-design/ordinal-number-in-javascript-1st-2nd-3rd-4th/m-p/72156
 * @param n
 */
const getNumberWithOrdinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
