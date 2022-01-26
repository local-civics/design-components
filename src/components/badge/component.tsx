import React, { FunctionComponent } from "react";
import { Icon } from "../icon";
import { Icons } from "../icon/icons";
import { Loader } from "../loader";
import { Badge } from "./model";

/**
 * Properties for the badge
 */
export interface BadgeComponentProps {
  isLoading?: boolean;
  badge?: Badge;
  onClose: () => void;
  onObjectiveClick: (actionURL?: string) => void;
}

/**
 * Pure presentational badge component
 * @constructor
 */
export const BadgeComponent: FunctionComponent<BadgeComponentProps> = (
  props
) => {
  const badge = props.badge || {};
  const isLoading = props.isLoading;

  return (
    <div className="grid grid-cols-1 justify-items-center content-center transition ease-in-out duration-300 fixed top-0 w-screen h-screen p-5 bg-gray-500/80 z-50">
      <div className="shadow-md overflow-hidden w-9/12 lg:w-5/12 bg-white rounded-md">
        <div className="pt-5 pb-5 w-full">
          <div className="relative">
            <Icon
              onClick={props.onClose}
              className="absolute right-5 transition ease-in-out cursor-pointer stroke-gray-300 fill-gray-300 hover:stroke-gray-400 hover:fill-gray-400 w-4"
              icon="close"
            />
          </div>
          <div className="w-full">
            <Loader isLoading={isLoading}>
              <div className="w-full pl-5 pr-10 pb-5 border-b border-gray-200">
                <Icon
                  className="inline-block w-7 h-7 stroke-gray-700 fill-gray-700"
                  icon="shield"
                />
                <div className="align-middle ml-2 inline-block">
                  <p className="font-semibold capitalize text-gray-700 text-lg">
                    {badge.title}
                  </p>
                  <div className="text-xs">
                    <p className="inline-block text-gray-700">
                      {badge.summary}
                    </p>
                    {badge.proficiency && (
                      <p className="ml-1 font-semibold inline-block text-blue-500">
                        {badge.proficiency} pts
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {badge.criteria && badge.criteria.length > 0 && (
                <div className="w-full mt-5 px-5">
                  <p className="text-sm mt-5 font-bold text-gray-600">
                    Objectives
                  </p>
                  <div className="mt-5 grid gap-10 w-full">
                    {badge.criteria.map((criterion, i) => {
                      const color = criterion.completedAt
                        ? "stroke-green-500 fill-green-500"
                        : "stroke-gray-300 fill-gray-300";
                      const border = criterion.completedAt
                        ? "border rounded border-gray-200"
                        : "border rounded border-gray-200";
                      const opacity =
                        badge.status === "unqualified" || criterion.completedAt
                          ? "opacity-50"
                          : "";
                      const icon: Icons = criterion.completedAt
                        ? "accept"
                        : "circle";
                      const cursor =
                        criterion.completedAt || !criterion.actionURL
                          ? ""
                          : "cursor-pointer hover:stroke-cyan-400 hover:fill-cyan-400 hover:border-gray-300";
                      return (
                        <div
                          key={criterion.criterionName}
                          onClick={() =>
                            props.onObjectiveClick(criterion.actionURL)
                          }
                          className={`flex px-3 py-2 gap-5 items-center ${color} ${cursor} ${border} ${opacity}`}
                        >
                          <Icon
                            className={`h-3 w-3 stroke-inherit fill-inherit`}
                            icon={icon}
                          />
                          <div className="flex-grow">
                            <div className="align-middle ml-2 inline-block">
                              <p className="font-semibold text-gray-600 text-md">
                                {criterion.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </Loader>
          </div>
        </div>
      </div>
    </div>
  );
};
