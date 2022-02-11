import React from "react";
import { Icon, IconName } from "../../../../components";
import { builder } from "../../../../utils/classname/classname";
import { background } from "../../../../utils/colors";

/**
 * The properties for the material.
 */
export type MaterialProps = {
  open?: boolean;
  icon?: IconName;
  delivery?: "synchronous" | "asynchronous";
  status?: "draft" | "pending" | "available" | "unavailable";
  title?: string;
  onOpen?: () => void;
};

/**
 * A component for materials.
 * @param props
 * @constructor
 */
export const Material = (props: MaterialProps) => {
  const icon = props.icon || "materials";
  const status = props.status;
  const className = builder("flex flex-col shadow-md transition ease-in-out")
    .append(background(icon, status === "available", props.status !== "available" || !props.open))
    .append("p-4 rounded-md text-gray-500 h-28 lg:h-40")
    .if(props.status === "available" && !!props.open, "cursor-pointer")
    .build();

  const onOpen = () => props.status === "available" && props.open && props.onOpen && props.onOpen();
  return (
    <div className={className} onClick={onOpen}>
      {props.delivery && (
        <div className="relative">
          <div className="m-auto h-6 w-6 lg:h-8 lg:w-8 drop-shadow-sm text-slate absolute right-0">
            <Icon name={props.delivery} />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="grow w-8 h-10 lg:w-12 lg:h-16 drop-shadow-md text-slate-600 mb-5">
          <Icon name={icon} />
        </div>
        {props.title && <p className="font-semibold capitalize text-slate-600 text-xs lg:text-sm">{props.title}</p>}
      </div>
    </div>
  );
};
