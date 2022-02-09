import React from "react";
import { Board, Tab } from "../../../../../components";
import { TaskProps } from "../../../components/Task/Task";

/**
 * The properties for the badge workflow.
 */
export type TaskWorkflowProps = {
  resolving?: boolean;
  active?: "todo" | "urgent" | "done";
  onTodo?: () => void;
  onUrgent?: () => void;
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
      <Tab secondary icon="urgent" title="urgent" active={active === "urgent"} onClick={props.onUrgent} />
      <Tab secondary icon="done" title="done" active={active === "done"} onClick={props.onDone} />
    </>
  );

  const hasContent = props.children && React.Children.count(props.children) > 0;
  const workflow = hasContent && <div className="w-full grid gap-1 overflow-scroll">{props.children}</div>;
  return <Board resolving={props.resolving} tabs={tabs} workflow={workflow} secondary />;
};
