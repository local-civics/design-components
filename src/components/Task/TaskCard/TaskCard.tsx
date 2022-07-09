import React from "react";
import { Button } from "../../Button";
import { Modal } from "../../Modal";
import { Progress } from "../../Progress";

/**
 * TaskDetailsProps
 */
export type TaskDetailsProps = {
  headline?: string;
  summary?: string;
  isLoading?: boolean;
  progress?: number;
  target?: number;
  status?: string;
  onExplore?: () => void;
  onClose?: () => void;
};

/**
 * TaskDetails
 * @param props
 * @constructor
 */
export const TaskDetails = (props: TaskDetailsProps) => {
  const TaskButton = () => {
    if (props.status === "todo" || props.status === "in-progress") {
      return (
        <div className="flex w-full pt-4 pb-2">
          <div className="grow">
            <Button
              spacing="lg"
              border="rounded"
              color="sky"
              theme="dark"
              text="Explore"
              size="full:sm"
              onClick={props.onExplore}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Modal visible isLoading={!props.headline} onClose={props.onClose}>
      <div>
        <div className="px-6 pb-2 border-b border-gray-200">
          <div className="flex items-center gap-x-2">
            <div className="grow align-middle inline-block">
              <p className="font-semibold text-slate-500 text-lg max-w-[20rem]">{props.headline}</p>
              {props.summary && <p className="text-slate-500 text-md">{props.summary}</p>}
            </div>
          </div>

          {props.target && (
            <div className="py-5">
              <Progress start={props.progress || 0} end={props.target} />
            </div>
          )}

          <TaskButton />
        </div>
      </div>
    </Modal>
  );
};
