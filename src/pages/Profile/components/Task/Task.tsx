import React from "react";
import { Icon, IconName } from "../../../../components";
import { builder } from "../../../../utils/classname/classname";
import { background } from "../../../../utils/colors";

/**
 * The properties for the task.
 */
export type TaskProps = {
  open?: boolean;
  title?: string;
  icon?: IconName;
  status?: "todo" | "review" | "done";
  onOpen?: () => void;
};

/**
 * A component for displaying tasks.
 * @param props
 * @constructor
 */
export const Task = (props: TaskProps) => {
  const icon = props.icon || "objective";
  const status = props.status || "todo";
  const className = builder("flex gap-3 flex-col shadow-md transition ease-in-out")
    .append(background(icon, status === "done", !props.open))
    .append("p-4 text-gray-500")
    .if(!!props.open, "cursor-pointer")
    .build();

  const onOpen = () => props.open && props.onOpen && props.onOpen();

  return (
    <div onClick={onOpen} className={className}>
      <div className="flex justify-start">
        <div className="grow">
          <div className="w-4 h-4 min-h-4 drop-shadow-md stroke-slate-600 fill-slate-600">
            <Icon name={icon} />
          </div>
        </div>
        <div className="h-4 w-4 text-slate-600">
          <Icon name={status} />
        </div>
      </div>

      <div className="grid grid-cols-1">
        <p className="capitalize text-slate-600 text-[0.5rem]">{icon}</p>
        <p className="font-semibold capitalize text-slate-600 text-md">{props.title}</p>
      </div>
    </div>
  );
};
