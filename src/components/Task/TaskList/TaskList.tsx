import React from "react";
import { Board, Tab } from "../../index";

/**
 * The properties for the task workflow.
 */
export type TaskListProps = {
  isLoading?: boolean;
  active?: "todo" | "in-progress" | "done";
  onTodo?: () => void;
  onInProgress?: () => void;
  onDone?: () => void;
  children?: React.ReactNode;
};

/**
 * A component for the task workflow.
 * @param props
 * @constructor
 */
export const TaskList = (props: TaskListProps) => {
  const active = props.active || "todo";
  const tabs = (
    <>
      <Tab disabled secondary icon="todo" title="todo" active={active === "todo"} onClick={props.onTodo} />
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
      {hasContent && <div className="grid grid-cols-1 gap-1 overflow-scroll">{props.children}</div>}
    </>
  );
  return (
    <div className="h-[16rem] lg:h-[22rem] w-full">
      <Board isLoading={props.isLoading} tabs={tabs} workflow={workflow} secondary />
    </div>
  );
};
