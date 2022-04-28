import React from "react";
import { Button, Modal } from "../../index";
import { builder } from "../../../utils/classname/classname";

/**
 * The properties for the task.
 */
export type OpenTaskProps = {
  taskId?: string
  headline?: string
  isLoading?: boolean;
  status?: string;
  onStart?: () => void;
  onContinue?: () => void;
  onDone?: () => void;
};

/**
 * A component for the task modal.
 * @param props
 * @constructor
 */
export const OpenTask = (props: OpenTaskProps) => {
  const className = builder("w-full").if(!!props.isLoading, "min-h-[20rem]").build();

  const TaskButton = () => {
    if (props.status === "todo") {
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

    if (props.status === "in-progress") {
      return (
        <div className="flex gap-x-4 w-full pt-4 pb-2">
          <Button
            spacing="lg"
            border="rounded"
            color="sky"
            theme="dark"
            text="Launch"
            size="full:sm"
            onClick={props.onContinue}
          />

          <Button
            spacing="lg"
            border="rounded"
            color="slate"
            theme="dark"
            text="I'm Done"
            size="full:sm"
            onClick={props.onDone}
          />
        </div>
      );
    }

    if (props.status === "done") {
      return (
        <div className="flex w-full pt-4 pb-2">
          <div className="grow">
            <Button
              spacing="lg"
              border="rounded"
              color="sky"
              theme="dark"
              text="Re-open"
              size="full:sm"
              onClick={props.onStart}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Modal visible isLoading={!props.taskId}>
      <div className={className}>
        <div className="px-4 pb-4 border-b border-gray-200 w-[18rem] md:w-[24rem] lg:w-[28rem]">
          <div className="flex items-center gap-x-2 -mt-4">
            <div className="grow align-middle inline-block">
              <p className="font-semibold capitalize text-slate-500 text-lg">{props.headline}</p>
            </div>
          </div>
          <TaskButton />
        </div>
      </div>
    </Modal>
  );
};
