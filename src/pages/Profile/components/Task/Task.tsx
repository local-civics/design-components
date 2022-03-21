import React from "react";
import { Icon } from "../../../../components";
import { builder } from "../../../../utils/classname/classname";
import { background } from "../../../../utils/colors";

/**
 * The properties for the task.
 */
export type TaskProps = {
  open?: boolean;
  headline?: string;
  status?: "todo" | "review" | "in-progress" | "done";
  startTime?: string;
  notAfter?: string;
  onOpen?: () => void;
};

/**
 * A component for displaying tasks.
 * @param props
 * @constructor
 */
export const Task = (props: TaskProps) => {
  const icon = "objective";
  const status = props.status || "todo";
  const now = new Date();
  const statusIcon = (() => {
    if (props.status && props.status !== "done") {
      if (props.notAfter) {
        const notAfter = new Date(props.notAfter);
        if (now < notAfter && Math.abs(notAfter.getTime() - now.getTime()) < 1000 * 86400) {
          return "review";
        }
      }

      if (props.status === "in-progress") {
        return "asynchronous";
      }
    }

    return props.status;
  })();

  const tooEarly = !!props.startTime && now < new Date(props.startTime);
  const tooLate = !!props.notAfter && now > new Date(props.notAfter);
  const disabled = !props.status || tooEarly || tooLate;
  const className = builder("flex gap-3 flex-col shadow-md transition ease-in-out")
    .append(background(icon, status === "done", !props.open || disabled))
    .append("p-4 text-gray-500")
    .if(!disabled, "cursor-pointer")
    .build();

  const onOpen = () => !!props.open && !disabled && props.onOpen && props.onOpen();

  return (
    <div onClick={onOpen} className={className}>
      <div className="flex justify-start">
        <div className="grow">
          <div className="w-4 h-4 min-h-4 drop-shadow-md stroke-slate-600 fill-slate-600">
            <Icon name={icon} />
          </div>
        </div>
        {!disabled && statusIcon && (
          <div className="h-4 w-4 text-slate-600">
            <Icon name={statusIcon} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1">
        <p className="font-semibold text-slate-600 text-md">{props.headline}</p>
      </div>
    </div>
  );
};
