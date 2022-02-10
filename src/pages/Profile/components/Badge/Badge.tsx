import React from "react";
import { Icon, IconName } from "../../../../components";
import { builder } from "../../../../utils/classname/classname";

/**
 * The properties for the badge.
 */
export type BadgeProps = {
  open?: boolean;
  title?: string;
  icon?: IconName;
  statusIcon?: IconName;
  status?: "bearing" | "contingent" | "unqualified";
  imageURL?: string;
  onOpen?: () => void;
  intensity?: "normal" | "faded";
};

/**
 * A component for badge achievements.
 * @param props
 * @constructor
 */
export const Badge = (props: BadgeProps) => {
  const icon = props.icon || "badge";
  const intensity = props.intensity || "normal";
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
    "grid justify-items-center content-center h-28 lg:h-40 shadow-md bg-gray-100 transition ease-in-out p-4 rounded-md text-gray-500"
  )
    .if(!!props.open, "cursor-pointer hover:bg-gray-50")
    .build();

  const onOpen = () => props.open && props.onOpen && props.onOpen();

  return (
    <div className={className}>
      {props.statusIcon && (
        <div className={statusIconClassName}>
          <div className="relative">
            <div className="absolute h-2 w-2 top-0 right-0 lg:h-4 lg:w-4 lg:-top-1 lg:-right-1">
              <Icon name={props.statusIcon} />
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-y-4 flex-col w-full" onClick={onOpen}>
        {props.status === "bearing" && props.imageURL && (
          <img
            className="h-16 w-16 max-w-16 lg:h-24 lg:w-24 lg:max-w-24 m-auto drop-shadow-lg object-contain"
            alt={props.title}
            src={props.imageURL}
          />
        )}

        {props.status !== "bearing" && (
          <div className={iconClassName}>
            <div className="h-16 w-16 max-w-16 lg:h-24 lg:w-24 lg:max-w-24 m-auto drop-shadow-lg">
              <Icon name={icon} />
            </div>
          </div>
        )}
        <p className={titleClassName}>{props.title}</p>
      </div>
    </div>
  );
};
