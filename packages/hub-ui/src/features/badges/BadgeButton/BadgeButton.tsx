import * as React from "react";

import { Icon, IconName } from "../../../components/Icon/Icon";
import { Progress } from "../../../components/Progress/Progress";
import { BadgeEmblem } from "../BadgeEmblem/BadgeEmblem";
import { ordNumber } from "../../../utils/date";

/**
 * BadgeButtonProps
 */
export type BadgeButtonProps = {
  displayName?: string;
  icon?: IconName;
  imageURL?: string;
  startedAt?: string;
  finishedAt?: string;
  level?: number;
  isLocked?: boolean;
  progress?: number;
  target?: number;
  readonly?: boolean

  onClick?: () => void;
};

/**
 * BadgeButton
 * @param props
 * @constructor
 */
export const BadgeButton = (props: BadgeButtonProps) => {
  const hasProgress: boolean = !!props.startedAt || !!props.finishedAt || !!props.progress && props.progress > 0;
  const isDisabled: boolean = props.readonly || props.isLocked || !props.onClick;
  const statusIconName = props.isLocked
    ? "lock"
    : props.finishedAt
    ? "check & circle dark"
    : hasProgress
    ? "progress"
    : "14-point star";
  const buttonCursor = isDisabled ? "cursor-default" : "cursor-pointer";
  const buttonBg = isDisabled ? "" : props.finishedAt ? "bg-sky-50 hover:bg-gray-50" : "hover:bg-sky-50";
  const statusIconColor = props.finishedAt ? "text-green-500" : "text-zinc-600";
  const emblemSize = hasProgress ? "md" : "lg";
  const emblemOpacity = props.isLocked ? "opacity-50" : "";
  const progressPrefix = props.finishedAt ? "Collected" : "Started";
  const progressDate = new Date(props.finishedAt || props.startedAt || new Date());
  const onClick = () => !isDisabled && props.onClick && props.onClick()

  return (
    <div className="grid grid-cols-1 w-64 gap-y-3 text-zinc-600">
      <div className="flex flex-col h-max w-64 overflow-hidden border border-zinc-100 rounded-md bg-gray-100">
        <div
          onClick={onClick}
          className={`relative overflow-hidden p-5 transition ease-in-out duration-600 ${buttonCursor} ${buttonBg}`}
        >
          <div className={`absolute top-2 right-2 w-7 h-7 ${statusIconColor}`}>
            <Icon name={statusIconName} />
          </div>
          <div className={`w-max m-auto ${emblemOpacity}`}>
            <BadgeEmblem
              icon={props.icon}
              imageURL={props.imageURL}
              alt={props.displayName}
              level={props.level}
              size={emblemSize}
            />
          </div>
        </div>

        {hasProgress && (
          <div className="grow grid grid-cols-1 gap-2 w-full h-20 bg-white shadow-sm p-4">
            <div className="h-2">
              <Progress rounded color="sky-blue" start={props.progress || 0} end={props.target || 0} />
            </div>
            {
              <p className="text-xs">
                {progressPrefix} {Intl.DateTimeFormat("en-US", { month: "long" }).format(progressDate)}{" "}
                {ordNumber(progressDate.getDate())}
              </p>
            }
          </div>
        )}
      </div>

      {!!props.displayName && (
        <div className="text-sm m-auto flex gap-x-2">
          <span className="font-semibold text-zinc-600">{props.displayName}</span>
          <span className="shrink-0 text-slate-500">Lv. {(props.level || 0) + 1}</span>
        </div>
      )}
    </div>
  );
};
