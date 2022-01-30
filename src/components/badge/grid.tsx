import React, { FunctionComponent } from "react";
import {Resident}                   from "../../models/resident";
import { Icon }                     from "../icon";
import { Loader }                   from "../loader";
import { useBadges }                from "../../hooks/badge";

/**
 * BadgeGrid props
 */
export interface BadgeGridProps {
  resident: Resident | null
  rows?: number;
  columns?: number;
  onBadgeClick: (badgeName: string) => void;
}

/**
 * BadgeGrid component
 * @param props
 * @constructor
 */
export const BadgeGrid: FunctionComponent<BadgeGridProps> = (props) => {
  if (props.rows === 1 && !props.columns) {
    return <HorizontalGrid {...props} />;
  }

  if (props.columns === 1 && !props.rows) {
    return <VerticalGrid {...props} />;
  }

  return <CoordinateGrid {...props} />;
};

const HorizontalGrid: FunctionComponent<BadgeGridProps> = (props) => {
  return null;
};

const VerticalGrid: FunctionComponent<BadgeGridProps> = (props) => {
  return null;
};

// CoordinateGrid is an armorial (or ordinary) of badges
const CoordinateGrid: FunctionComponent<BadgeGridProps> = (props) => {
  const rows = props.rows || 2;
  const columns = props.columns || 3;
  const gridSize = rows * columns;

  const bearing = useBadges(props.resident?.residentName, {
    status: "bearing"
  })

  const contingent = useBadges(props.resident?.residentName, {
    status: "contingent"
  })

  const unqualified = useBadges(props.resident?.residentName, {
    status: "unqualified"
  })

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
                <p className="font-semibold capitalize text-center text-gray-600 text-sm mt-3">
                  {badge.title}
                </p>
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
                  <Icon
                    className="m-auto h-6 w-6 stroke-gray-500 fill-gray-500 absolute right-0 mr-2"
                    icon="unlock"
                  />
                </div>
                <Icon
                    className="h-48 w-48 max-w-48 m-auto drop-shadow-lg stroke-gray-500 fill-gray-500"
                    icon="badge"
                />
                <p className="font-semibold capitalize text-center text-gray-600 text-sm mt-3">
                  {badge.title}
                </p>
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
                  <Icon
                    className="m-auto h-6 w-6 stroke-gray-300 fill-gray-300 absolute right-0 mr-2"
                    icon="lock"
                  />
                </div>
                <Icon
                    className="h-48 w-48 max-w-48 m-auto drop-shadow-lg stroke-gray-300 fill-gray-300"
                    icon="badge"
                />
                <p className="font-semibold capitalize text-center text-gray-300 text-sm mt-3">
                  {badge.title}
                </p>
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
