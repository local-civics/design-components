import {BadgeView, WorkspaceView} from "@local-civics/js-client";
import React                      from "react";
import { Button, Modal } from "../../../../components";
import { builder } from "../../../../utils/classname/classname";
import { TaskProps } from "../Task/Task";

/**
 * The properties for the badge.
 */
export type BadgeModalProps = BadgeView & {
  workspace?: WorkspaceView
  badge?: BadgeView & {id?: number, marketId?: string, level?: number}
  resolving?: boolean;
  visible?: boolean;
  disabled?: boolean;
  children?: React.ReactElement<TaskProps> | React.ReactElement<TaskProps>[] | null;
  onClose?: () => void;
  onStart?: () => void;
};

/**
 * A component for the badge modal.
 * @param props
 * @constructor
 */
export const BadgeModal = (props: BadgeModalProps) => {
  const hasTasks = props.children && React.Children.count(props.children) > 0;
  const className = builder("w-full").if(!!props.resolving, "min-h-[20rem]").build();
  const objectives = props.workspace?.objectives?.filter(v => v.id === props.badge?.id && v.level === props.badge?.level && v.marketId === props.badge?.marketId)

  const BadgeTasks = () => {
    if (!hasTasks || props.disabled) {
      return null;
    }

    return (
      <div className="w-full mt-2 grid grid-cols-1 gap-y-5 px-4 pb-4">
        <p className="text-sm font-bold text-slate-500">Tasks</p>
        <div className="grid gap-10 w-full max-h-[24rem] overflow-scroll">{props.children}</div>
      </div>
    );
  };

  const BadgeButton = () => {
    if (props.disabled) {
      return null;
    }

    if (objectives && objectives.length > 0) {
      return (
        <div className="flex w-full pt-4 pb-2">
          <div className="grow">
            <Button
              spacing="lg"
              border="rounded"
              color="sky"
              theme="dark"
              text="Start"
              size="full:sm"
              onClick={props.onStart}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  const done = !!props.badge?.done && !props.badge.todo && !props.badge.inProgress
  const doing = props.badge?.todo || props.badge?.inProgress

  return (
    <Modal resolving={props.resolving} visible={props.visible} onClose={props.onClose}>
      <div className={className}>
        <div className="px-4 pb-4 border-b border-gray-200 w-[18rem] md:w-[24rem] lg:w-[28rem]">
          <div className="flex items-center gap-x-2 -mt-4">
            <div className="grow align-middle inline-block">
              <p className="font-semibold capitalize text-slate-500 text-lg">{props.headline}</p>
              {props.summary && (
                <div className="text-sm">
                  <p className="inline-block text-slate-500">{props.summary}</p>
                </div>
              )}
            </div>
          </div>
          <BadgeButton />
        </div>

        {done && !!props.imageURL && (
          <div className="w-full h-full bg-slate-100">
            <div className="p-14">
              <img
                className="max-w-[14rem] max-h-[18rem] drop-shadow-lg m-auto w-full h-full object-cover"
                alt={props.headline}
                src={props.imageURL}
              />
            </div>
          </div>
        )}

        {doing && !done && <BadgeTasks />}
      </div>
    </Modal>
  );
};
