import React from "react";
import { Badge } from "../../models/badge";
import { Resident } from "../../models/resident";
import { Icon } from "../../../components";
import { Loader } from "../../../components";

/**
 * BadgeTabProps
 */
export interface BadgeTabProps {
  resident: Resident | null;
  bearing: Badge[] | null;
  contingent: Badge[] | null;
  unqualified: Badge[] | null;
  onBadgeClick: (badgeName: string) => void;
}

/**
 * BadgeTab
 * @param props
 * @constructor
 */
export const BadgeTab = (props: BadgeTabProps) => {
  const rows = 2;
  const columns = 3;
  const gridSize = rows * columns;
  const bearing = props.bearing;
  const contingent = props.contingent;
  const unqualified = props.unqualified;
  const isLoading = bearing === null || contingent === null || unqualified === null;
  const badges = isLoading ? [] : [...bearing, ...contingent, ...unqualified];

  return (
    <Loader isLoading={isLoading}>
      {!badges.length && (
        <div className="h-full grid justify-items-center content-center">
          <p className="text-xs text-center align-middle leading-6 font-semibold text-slate-600">
            {" "}
            No badges currently, check back later!{" "}
          </p>
        </div>
      )}
      {badges.length > 0 && (
        <div className={`grid lg:grid-cols-${columns} gap-3`}>
          {bearing?.map((badge) => {
            return (
              <div
                key={badge.badgeName}
                className={`flex flex-col cursor-pointer shadow-md bg-gray-100 hover:bg-gray-50 transition ease-in-out p-4 rounded-md text-gray-500 h-48`}
                onClick={() => props.onBadgeClick(badge.badgeName || "")}
              >
                <img
                  className="h-[8rem] w-[8rem] max-w-[8rem] max-h-[8rem] m-auto drop-shadow-lg object-contain"
                  alt={badge.title}
                  src={badge.imageURL}
                />
                <p className="font-semibold capitalize text-center text-gray-600 text-sm mt-3">{badge.title}</p>
              </div>
            );
          })}

          {contingent?.map((badge) => {
            return (
              <div
                key={badge.badgeName}
                className={`flex flex-col cursor-pointer shadow-md bg-gray-100 hover:bg-gray-50 transition ease-in-out p-4 rounded-md text-gray-500 h-48`}
                onClick={() => props.onBadgeClick(badge.badgeName || "")}
              >
                <div className="relative">
                  <Icon className="m-auto h-6 w-6 stroke-gray-500 fill-gray-500 absolute right-0 mr-2" icon="unlock" />
                </div>
                <Icon className="h-48 w-48 max-w-48 m-auto drop-shadow-lg stroke-gray-500 fill-gray-500" icon="badge" />
                <p className="font-semibold capitalize text-center text-gray-600 text-sm mt-3">{badge.title}</p>
              </div>
            );
          })}

          {unqualified?.map((badge) => {
            return (
              <div
                key={badge.badgeName}
                className={`flex flex-col cursor-pointer shadow-md bg-gray-100 transition ease-in-out p-4 rounded-md text-gray-500 h-48`}
                onClick={() => props.onBadgeClick(badge.badgeName || "")}
              >
                <div className="relative">
                  <Icon className="m-auto h-6 w-6 stroke-gray-300 fill-gray-300 absolute right-0 mr-2" icon="lock" />
                </div>
                <Icon className="h-48 w-48 max-w-48 m-auto drop-shadow-lg stroke-gray-300 fill-gray-300" icon="badge" />
                <p className="font-semibold capitalize text-center text-gray-300 text-sm mt-3">{badge.title}</p>
              </div>
            );
          })}

          {badges.length < gridSize &&
            [...Array(gridSize - badges.length).keys()].map((k) => {
              return (
                <div
                  key={"missing.badge." + k}
                  className="bg-gray-100 px-2 py-4 shadow-md rounded-md text-gray-500 h-48"
                />
              );
            })}
        </div>
      )}
    </Loader>
  );
};
