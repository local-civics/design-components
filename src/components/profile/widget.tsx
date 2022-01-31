import React, { FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "../../models/badge";
import { Community } from "../../models/community";
import { Resident } from "../../models/resident";
import { Icon } from "../icon";
import { Loader } from "../loader";
import { Event } from "../../models/event";
import { ActivityTab } from "./activity.tab";
import { BadgeTab } from "./badge.tab";
import { MilestoneTab } from "./milestone.tab";

/**
 * EngagementWidget props
 */
export interface EngagementWidgetProps {
  community: Community | null;
  resident: Resident | null;
  milestones: Event[] | null;
  activity: Event[] | null;
  bearing: Badge[] | null;
  contingent: Badge[] | null;
  unqualified: Badge[] | null;
  active: "milestones" | "activity" | "badges";
  setActive: (active: "milestones" | "activity" | "badges") => void;
  onEventClick: (courseName?: string, eventName?: string) => void;
}

/**
 * EngagementWidget
 * @param props
 * @constructor
 * todo: congrats on submitting a milestone - you've earned ??? points
 * todo: check edit permissions for identity
 */
export const EngagementWidget: FunctionComponent<EngagementWidgetProps> = (
  props
) => {
  // todo: make this a hook
  // todo: make this purely presentational
  const navigate = useNavigate();
  const location = useLocation();
  const onBadgeClick = (badgeName: string) =>
    navigate(`${location.pathname}/badges/${badgeName}`);

  let tab = null;
  switch (props.active) {
    case "milestones":
      tab = (
        <MilestoneTab
          community={props.community}
          events={props.milestones}
          onClick={props.onEventClick}
        />
      );
      break;
    case "activity":
      tab = (
        <ActivityTab
          community={props.community}
          events={props.activity}
          onClick={props.onEventClick}
        />
      );
      break;
    case "badges":
      tab = (
        <BadgeTab
          resident={props.resident}
          bearing={props.bearing}
          contingent={props.contingent}
          unqualified={props.unqualified}
          onBadgeClick={onBadgeClick}
        />
      );
      break;
  }

  const setActive = (active: "milestones" | "activity" | "badges") => {
    if (props.active === active) {
      return;
    }

    props.setActive(active);
  };

  return (
    <div
      className="border-gray-200 shadow-sm border overflow-hidden rounded-md w-full mt-5"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="px-2 py-2 bg-gray-200">
        <div className="grid gap-2 grid-cols-1 lg:grid-cols-3 justify-items-center">
          <div
            onClick={() => setActive("badges")}
            className={`transition ease-in-out w-full rounded-md py-3 px-5 ${
              props.active === "badges"
                ? "bg-white"
                : "cursor-pointer hover:bg-white"
            }`}
          >
            <div className="lg:m-auto w-max">
              <Icon
                className="w-5 h-5 stroke-slate-600 fill-slate-600 inline-block"
                icon="badges"
              />
              <h4 className="ml-1 capitalize text-sm font-semibold align-middle text-slate-600 inline-block">
                Badges
              </h4>
            </div>
          </div>
          <div
            onClick={() => setActive("milestones")}
            className={`transition ease-in-out w-full rounded-md py-3 px-5 ${
              props.active === "milestones"
                ? "bg-white"
                : "cursor-pointer hover:bg-white"
            }`}
          >
            <div className="lg:m-auto w-max">
              <Icon
                className="w-5 h-5 stroke-slate-600 fill-slate-600 inline-block"
                icon="milestones"
              />
              <h4 className="ml-1 capitalize text-sm font-semibold align-middle text-slate-600 inline-block">
                Milestones
              </h4>
            </div>
          </div>
          <div
            onClick={() => setActive("activity")}
            className={`transition ease-in-out w-full rounded-md py-3 px-5 ${
              props.active === "activity"
                ? "bg-white"
                : "cursor-pointer hover:bg-white"
            }`}
          >
            <div className="lg:m-auto w-max">
              <Icon
                className="w-5 h-5 stroke-slate-600 fill-slate-600 inline-block"
                icon="activity"
              />
              <h4 className="ml-2 capitalize text-sm font-semibold align-middle text-slate-600 inline-block">
                Activity
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 h-full">
        <div className="h-[25rem] overflow-scroll">
          <Loader
            isLoading={props.resident === null || props.community === null}
          >
            {tab}
          </Loader>
        </div>
      </div>
    </div>
  );
};
