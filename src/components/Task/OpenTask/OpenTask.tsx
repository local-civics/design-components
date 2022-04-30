import React from "react";
import {Button, Modal, Progress} from "../../index";

/**
 * The properties for the task.
 */
export type OpenTaskProps = {
  taskId?: string
  headline?: string
  summary?: string
  isLoading?: boolean
  progress?: number
  target?: number
  status?: string
  onExplore?: () => void
  onClose?: () => void
};

/**
 * A component for the task modal.
 * @param props
 * @constructor
 */
export const OpenTask = (props: OpenTaskProps) => {
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
    <Modal visible isLoading={!props.taskId} onClose={props.onClose}>
      <div>
        <div className="px-4 pb-4 border-b border-gray-200 w-[18rem] md:w-[24rem] lg:w-[28rem]">
          <div className="flex items-center gap-x-2 -mt-4">
            <div className="grow align-middle inline-block">
              <p className="font-semibold text-slate-500 text-lg">{props.headline}</p>
              { props.summary && <p className="text-slate-500 text-md">{props.summary}</p> }
            </div>
          </div>

          { props.target &&
              <div className="py-5">
                <Progress start={props.progress||0} end={props.target} />
              </div>
          }

          <TaskButton />
        </div>
      </div>
    </Modal>
  );
};
