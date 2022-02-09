import React from "react";
import { Badge } from "../models/badge";
import { Icon } from "../../components";
import { Loader } from "../../components";

/**
 * BadgeTabProps
 */
export interface BadgeTabProps {
  badges: Badge[] | null;
  onSetBadge: (badgeName?: string) => void;
}

/**
 * BadgeTabComponent
 * @param props
 * @constructor
 */
export const BadgeTab = (props: BadgeTabProps) => {
  const rows = 2;
  const columns = 3;
  const gridSize = rows * columns;
  return (
    <Loader isLoading={props.badges === null}>
      {!props.badges?.length && (
        <div className="h-full grid justify-items-center content-center">
          <p className="text-xs text-center align-middle leading-6 font-semibold text-slate-600">
            {" "}
            No badges currently, check back later!{" "}
          </p>
        </div>
      )}
      {props.badges && props.badges?.length > 0 && (
        <div className={`grid lg:grid-cols-${columns} gap-3`}>
          {props.badges.map((badge) => {
            const titleColor = badge.status === "unqualified" ? "text-gray-300" : "text-gray-600";
            const badgeIconColor =
              badge.status === "unqualified" ? "stroke-gray-300 fill-gray-300" : "stroke-gray-500 fill-gray-500";
            return (
              <div
                key={badge.badgeName}
                className={`flex flex-col cursor-pointer shadow-md bg-gray-100 transition ease-in-out p-4 rounded-md text-gray-500 h-48`}
                onClick={() => props.onSetBadge(badge.badgeName || "")}
              >
                {badge.status !== "bearing" && (
                  <>
                    <div className="relative">
                      <Icon
                        className="m-auto h-6 w-6 stroke-gray-300 fill-gray-300 absolute right-0 mr-2"
                        icon={badge.status === "contingent" ? "unlock" : "lock"}
                      />
                    </div>

                    <Icon className={`h-48 w-48 max-w-48 m-auto drop-shadow-lg ${badgeIconColor}`} icon="badge" />
                  </>
                )}

                {badge.status === "bearing" && (
                  <img
                    className="h-[8rem] w-[8rem] max-w-[8rem] max-h-[8rem] m-auto drop-shadow-lg object-contain"
                    alt={badge.title}
                    src={badge.imageURL}
                  />
                )}

                <p className={`font-semibold capitalize text-center ${titleColor} text-sm mt-3`}>{badge.title}</p>
              </div>
            );
          })}
          {props.badges.length < gridSize &&
            [...Array(gridSize - props.badges.length).keys()].map((k) => {
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
