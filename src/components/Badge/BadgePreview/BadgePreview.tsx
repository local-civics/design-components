import React from "react";
import { Icon, IconName } from "../../index";
import { builder } from "../../../utils/classname/classname";

/**
 * The properties for the badge.
 */
export type BadgePreviewProps = {
  isInProgress?: boolean;
  isAwarded?: boolean;
  isLocked?: boolean;

  headline?: string;
  icon?: IconName;
  imageURL?: string;

  onOpen?: () => void;
};

/**
 * A component for badge achievements.
 * @param props
 * @constructor
 */
export const BadgePreview = (props: BadgePreviewProps) => {
  const icon = props.icon || "badge";
  const statusIcon: IconName | "" = props.isLocked ? "lock" : props.isAwarded || props.isInProgress ? "" : "unlock";
  const intensity = !props.isLocked ? "normal" : "faded";
  const iconClassName = builder("w-full")
    .if(intensity === "normal", "text-gray-600")
    .if(intensity === "faded", "text-gray-300")
    .build();
  const statusIconClassName = builder("w-full")
    .if(intensity === "normal", "text-gray-600")
    .if(intensity === "faded", "text-gray-300")
    .build();
  const titleClassName = builder("font-semibold capitalize text-center text-xs lg:text-sm")
    .if(intensity === "normal", "text-gray-600")
    .if(intensity === "faded", "text-gray-300")
    .build();

  const className = builder(
    "grid justify-items-center content-center shadow-md transition ease-in-out p-4 rounded-md text-gray-500"
  )
    .if(!!props.onOpen && !!props.isAwarded, "cursor-pointer bg-gray-50 hover:bg-gray-50")
    .if(!!props.onOpen && !!props.isInProgress, "cursor-pointer bg-gray-100 hover:bg-gray-50")
    .if(!!props.onOpen && !props.isInProgress && !props.isAwarded && !props.isLocked, "cursor-pointer bg-gray-100 hover:bg-gray-50")
    .if(!!props.onOpen && !!props.isLocked, "bg-gray-100 hover:bg-gray-50")
    .build();

  const onOpen = () => props.onOpen && !props.isLocked && props.onOpen();

  return (
    <div className={className}>
      {statusIcon && (
        <div className={statusIconClassName}>
          <div className="relative">
            <div className="absolute h-2 w-2 top-0 right-0 md:-top-2 md:-right-1 lg:h-4 lg:w-4 lg:-top-1 lg:-right-1">
              <Icon name={statusIcon} />
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-y-4 flex-col w-full" onClick={onOpen}>
        {props.isAwarded && props.imageURL && (
          <img
            className="h-16 w-16 max-w-16 lg:h-24 lg:w-24 lg:max-w-24 m-auto drop-shadow-lg object-contain"
            alt={props.headline}
            src={props.imageURL}
          />
        )}

        {!props.isAwarded && (
          <div className={iconClassName}>
            <div className="h-16 w-16 max-w-16 lg:h-24 lg:w-24 lg:max-w-24 m-auto drop-shadow-lg">
              <Icon name={icon} />
            </div>
          </div>
        )}
        <p className={titleClassName}>{props.headline}</p>
      </div>
    </div>
  );
};
