import React from "react";
import { Icon, IconName } from "../../../../components";
import { builder } from "../../../../utils/classname/classname";
import { background } from "../../../../utils/colors";

/**
 * The properties for the milestone.
 */
export type MilestoneProps = {
  open?: boolean;
  icon?: IconName;
  status?: "todo" | "done";
  title?: string;
  onOpen?: () => void;
};

/**
 * A component for milestones.
 * @param props
 * @constructor
 */
export const Milestone = (props: MilestoneProps) => {
  const status = props.status || "survey";
  const icon = props.icon || "milestone";
  const className = builder("flex flex-col shadow-md transition ease-in-out")
    .append(background(icon, status === "done", !props.open))
    .append("p-4 rounded-md text-gray-500 h-28 lg:h-40")
    .if(!!props.open, "cursor-pointer")
    .build();

  const onOpen = () => props.open && props.onOpen && props.onOpen();
  return (
    <div className={className} onClick={onOpen}>
      {status === "done" && (
        <div className="relative text-slate-600">
          <div className="m-auto h-2 w-2 lg:h-4 lg:w-4 absolute right-0">
            <Icon name="reflection" />
          </div>
        </div>
      )}
      <div className="w-8 h-10 lg:w-12 lg:h-20 drop-shadow-md text-slate-600 mb-5">
        <Icon name={icon} />
      </div>
      {props.title && (
        <div className="relative">
          <p className="font-semibold capitalize text-slate-600 text-xs lg:text-sm absolute bottom-0">{props.title}</p>
        </div>
      )}
    </div>
  );
};
