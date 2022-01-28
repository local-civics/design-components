import { useApi } from "@local-civics/js-client";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BadgeGrid } from "../badge/grid";
import { Badge } from "../badge/model";
import { Icon } from "../icon";
import { Loader } from "../loader";
import { EventGrid } from "../event/grid";

/**
 * EngagementWidget props
 */
export interface EngagementWidgetProps {
  communityName: string;
  residentName: string;
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
  const [state, setState] = useState({
    badges: {
      data: [] as Badge[],
    },
    isLoading: true,
  });
  // todo: make this a hook
  // todo: make this purely presentational
  const { api } = useApi();
  const navigate = useNavigate();
  const location = useLocation();
  const onBadgeClick = (badgeName: string) =>
    navigate(`${location.pathname}/badges/${badgeName}`);

  useEffect(() => {
    (async () => {
      setState({
        ...state,
        badges: {
          ...state.badges,
          data: (await api(
            "GET",
            `/caliber/v0/bearers/${props.residentName}/badges`
          )) as Badge[],
        },
        isLoading: false,
      });
    })();
  }, []);

  let tab = null;
  switch (props.active) {
    case "milestones":
      tab = (
        <EventGrid
          communityName={props.communityName}
          type="milestone"
          query={{ residentName: props.residentName, timePeriod: "milestone" }}
          onClick={props.onEventClick}
        />
      );
      break;
    case "activity":
      tab = (
        <EventGrid
          communityName={props.communityName}
          columns={1}
          type="reflection"
          query={{ residentName: props.residentName, status: "contributed" }}
          onClick={props.onEventClick}
        />
      );
      break;
    case "badges":
      tab = (
        <BadgeGrid
          residentName={props.residentName}
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
                className="w-5 h-5 stroke-gray-700 fill-gray-700 inline-block"
                icon="badges"
              />
              <h4 className="ml-1 capitalize text-sm font-semibold align-middle text-gray-700 inline-block">
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
                className="w-5 h-5 stroke-gray-700 fill-gray-700 inline-block"
                icon="milestones"
              />
              <h4 className="ml-1 capitalize text-sm font-semibold align-middle text-gray-700 inline-block">
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
                className="w-5 h-5 stroke-gray-700 fill-gray-700 inline-block"
                icon="activity"
              />
              <h4 className="ml-2 capitalize text-sm font-semibold align-middle text-gray-700 inline-block">
                Activity
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 h-full">
        <div className="h-[25rem] overflow-scroll">
          <Loader isLoading={state.isLoading}>{tab}</Loader>
        </div>
      </div>
    </div>
  );
};
