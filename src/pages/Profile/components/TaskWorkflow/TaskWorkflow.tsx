import React from "react";
import { Board, Tab } from "../../../../components";
import { TaskProps } from "../Task/Task";

/**
 * The properties for the badge workflow.
 */
export type TaskWorkflowProps = {
  resolving?: boolean;
  active?: "todo" | "in-progress" | "done";
  onTodo?: () => void;
  onInProgress?: () => void;
  onDone?: () => void;
  children?: React.ReactElement<TaskProps> | React.ReactElement<TaskProps>[];
};

/**
 * A component for the badge workflow.
 * @param props
 * @constructor
 */
export const TaskWorkflow = (props: TaskWorkflowProps) => {
  const active = props.active || "todo";
  const tabs = (
    <>
      <Tab secondary icon="todo" title="todo" active={active === "todo"} onClick={props.onTodo} />
      <Tab secondary icon="review" title="in-progress" active={active === "in-progress"} onClick={props.onInProgress} />
      <Tab secondary icon="done" title="done" active={active === "done"} onClick={props.onDone} />
    </>
  );

  const hasContent = props.children && React.Children.count(props.children) > 0;
  const workflow = (
    <>
      {!hasContent && (
        <div className="grid justify-items-center content-center h-[12rem] lg:h-[18rem]">
          <p className="text-sm text-center align-middle leading-6 font-semibold text-slate-300">
            No content to display.
          </p>
        </div>
      )}
      {hasContent && (
        <div className="grid grid-cols-1 gap-1 overflow-scroll">
          {props.children}
        </div>
      )}
    </>
  );
  return (
    <div className="h-[16rem] lg:h-[22rem] w-full">
      <Board resolving={props.resolving} tabs={tabs} workflow={workflow} secondary />
    </div>
  );
};
