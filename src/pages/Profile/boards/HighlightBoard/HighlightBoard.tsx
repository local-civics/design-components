import React from "react";
import { Board, Tab, Widget, WidgetBody } from "../../../../components";

/**
 * The properties for the highlight board.
 */
export type HighlightBoardProps = {
  disabled?: boolean;
  resolving?: boolean;
  active?: "badge" | "milestone" | "task";
  onBadgeWorkflow?: () => void;
  onMilestoneWorkflow?: () => void;
  onTaskWorkflow?: () => void;
  children?: React.ReactNode;
};

/**
 * A component for highlighting actionable content for residents.
 * @param props
 * @constructor
 */
export const HighlightBoard = (props: HighlightBoardProps) => {
  const active = props.active || "badge";
  const tabs = (
    <>
      <Tab
        disabled={props.disabled}
        icon="badges"
        title="badges"
        active={active === "badge"}
        onClick={props.onBadgeWorkflow}
      />
      <Tab
        disabled={props.disabled}
        icon="milestones"
        title="milestones"
        active={active === "milestone"}
        onClick={props.onMilestoneWorkflow}
      />
      <Tab
        disabled={props.disabled}
        icon="activity"
        title="tasks"
        active={active === "task"}
        onClick={props.onTaskWorkflow}
      />
    </>
  );
  return (
    <Widget headless>
      <WidgetBody spacing="none">
        <Board tabs={tabs} workflow={props.children} resolving={props.resolving} />
      </WidgetBody>
    </Widget>
  );
};
