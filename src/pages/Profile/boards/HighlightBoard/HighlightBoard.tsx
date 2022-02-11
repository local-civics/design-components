import React from "react";
import { Board, Tab, Widget, WidgetBody } from "../../../../components";

/**
 * The properties for the highlight board.
 */
export type HighlightBoardProps = {
  disabled?: boolean;
  resolving?: boolean;
  active?: "badge" | "material" | "task";
  onBadgeWorkflow?: () => void;
  onMaterialWorkflow?: () => void;
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
        disabled={props.disabled && active !== "badge"}
        icon="badges"
        title="badges"
        active={active === "badge"}
        onClick={props.onBadgeWorkflow}
      />
      <Tab
        disabled={props.disabled && active !== "task"}
        icon="activity"
        title="tasks"
        active={active === "task"}
        onClick={props.onTaskWorkflow}
      />
      <Tab
        disabled={props.disabled && active !== "material"}
        icon="materials"
        title="materials"
        active={active === "material"}
        onClick={props.onMaterialWorkflow}
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
