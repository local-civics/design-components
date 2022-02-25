import React from "react";
import { Icon, IconName } from "../../../../components";

/**
 * The properties for the badge task.
 */
export type TaskProps = {
  action?: boolean;
  title?: string;
  status?: "todo" | "review" | "done";
  onAction?: () => void;
};

/**
 * A component for badge task.
 * @param props
 * @constructor
 */
export const Task = (props: TaskProps) => {
  const color = props.status === "done" ? "text-green-500" : "text-gray-300";
  const border = props.status === "done" ? "border rounded border-gray-200" : "border rounded border-gray-200";
  const opacity = props.status === "done" ? "opacity-50" : "";
  const icon: IconName = props.status === "done" ? "accept" : "circle";
  const cursor =
    props.status === "done" || !props.action ? "" : "cursor-pointer hover:text-cyan-400 hover:border-gray-300";
  return (
    <div
      onClick={() => props.action && props.onAction && props.onAction()}
      className={`flex px-3 py-2 gap-5 align-middle leading-6 items-center ${color} ${cursor} ${border} ${opacity}`}
    >
      <div className="h-3 w-3">
        <Icon name={icon} />
      </div>
      <p className="grow font-semibold text-slate-500 text-sm">{props.title}</p>
    </div>
  );
};
