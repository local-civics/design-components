import React, { FunctionComponent } from "react";
import { Icon } from "../icon";
import { Loader } from "../loader";
import { useBadges } from "./hooks";

/**
 * BadgeGrid props
 */
export interface BadgeGridProps {
  residentName: string;
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
  const [complete, isCompleteLoading] = useBadges(props.residentName, {
    complete: true,
  });
  const [incomplete, isIncompleteLoading] = useBadges(props.residentName, {
    incomplete: true,
  });
  const [inactive, isInactiveLoading] = useBadges(props.residentName, {
    inactive: true,
  });
  const badges = [...complete, ...incomplete, ...inactive];
  const isLoading =
    isCompleteLoading || isIncompleteLoading || isInactiveLoading;

  return (
    <Loader isLoading={isLoading}>
      {!badges.length && (
        <div className="h-full grid justify-items-center content-center">
          <p className="text-xs text-center align-middle leading-6 font-semibold text-gray-700">
            {" "}
            No badges currently, check back later!{" "}
          </p>
        </div>
      )}
      {badges.length > 0 && (
        <div className={`grid lg:grid-cols-${columns} gap-3`}>
          {complete.map((badge) => {
            return (
              <div
                key={badge.badgeName}
                className={`flex flex-col cursor-pointer bg-gray-100 hover:bg-gray-200 transition ease-in-out p-4 rounded-md text-gray-500 h-48`}
                onClick={() => props.onBadgeClick(badge.badgeName || "")}
              >
                <div className="h-48 w-48 m-auto overflow-hidden">
                  <img
                    className="h-full w-full object-contain"
                    alt={badge.title}
                    src={badge.imageURL}
                  />
                </div>
                <p className="font-semibold capitalize text-center text-gray-600 text-sm mt-3">
                  {badge.title}
                </p>
              </div>
            );
          })}

          {incomplete.map((badge) => {
            return (
              <div
                key={badge.badgeName}
                className={`flex flex-col cursor-pointer bg-gray-100 hover:bg-gray-200 transition ease-in-out p-4 rounded-md text-gray-500 h-48`}
                onClick={() => props.onBadgeClick(badge.badgeName || "")}
              >
                <div className="relative">
                  <Icon
                    className="m-auto h-6 w-6 stroke-gray-500 fill-gray-500 absolute right-0 mr-2"
                    icon="unlock"
                  />
                </div>
                <div className="h-48 w-48 m-auto overflow-hidden">
                  <Icon
                    className="h-full w-full stroke-gray-500 fill-gray-500"
                    icon="badge"
                  />
                </div>
                <p className="font-semibold capitalize text-center text-gray-600 text-sm mt-3">
                  {badge.title}
                </p>
              </div>
            );
          })}

          {inactive.map((badge) => {
            return (
              <div
                key={badge.badgeName}
                className={`flex flex-col cursor-pointer bg-gray-100 transition ease-in-out p-4 rounded-md text-gray-500 h-48`}
                onClick={() => props.onBadgeClick(badge.badgeName || "")}
              >
                <div className="relative">
                  <Icon
                    className="m-auto h-6 w-6 stroke-gray-300 fill-gray-300 absolute right-0 mr-2"
                    icon="lock"
                  />
                </div>
                <div className="h-48 w-48 m-auto overflow-hidden">
                  <Icon
                    className="h-full w-full stroke-gray-300 fill-gray-300"
                    icon="badge"
                  />
                </div>
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
                  className="bg-gray-100 px-2 py-4 rounded-md text-gray-500 h-48"
                />
              );
            })}
        </div>
      )}
    </Loader>
  );
};
