import React from "react";
import { Community } from "../../models/community";
import { Resident } from "../../models/resident";
import { Loader } from "../loader";
import { DateWidget } from "./date.widget";
import { EventTable } from "./event.table";
import { Event } from "../../models/event";

/**
 * CalendarComponent props
 */
export interface CalendarComponentProps {
  day: Date | null;
  community: Community | null;
  resident: Resident | null;
  events: Event[] | null;
  going: Event[] | null;
  upcoming: Event[] | null;
  reflections: Event[] | null;
  tab: "going" | "upcoming" | "reflections" | null;
  onSetDay: (day: Date | null) => void;
  onClick: (eventName?: string) => void;
}

/**
 * Pure presentational calendar component
 * @constructor
 */
export const CalendarComponent = (props: CalendarComponentProps) => {
  return (
    <Loader isLoading={props.community === null || props.resident === null}>
      <section className="px-4 lg:px-24 py-5">
        {/* Body */}
        <div className="lg:flex w-full mt-5">
          {/* Left Panel */}
          <div className="lg:flex lg:flex-col w-full lg:w-60">
            <DateWidget day={props.day} onSetDay={props.onSetDay} />
            <p className="place-self-center inline-block mt-2 mb-2 text-xs text-slate-300">
              Local Civics © {new Date().getFullYear()}
            </p>
          </div>

          {/* Right Panel */}
          <div className="lg:flex lg:flex-col lg:ml-9 w-full max-w-full lg:px-2 overflow-x-hidden">
            <EventTable
              community={props.community}
              day={props.day}
              events={props.events}
              tab={props.tab}
              going={props.going}
              upcoming={props.upcoming}
              reflections={props.reflections}
              onSetDay={props.onSetDay}
              onClick={props.onClick}
            />
          </div>
        </div>
      </section>
    </Loader>
  );
};
