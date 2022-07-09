import React from "react";
import { Board, Tab } from "../../Board";
import { Widget, WidgetBody } from "../../Widget";

/**
 * The properties for the dashboard.
 */
export type DashboardProps = {
  disabled?: boolean;
  isLoading?: boolean;
  active?: "badges" | "tasks";
  onBadgeWorkflow?: () => void;
  onTaskWorkflow?: () => void;
  children?: React.ReactNode;
};

/**
 * A component for highlighting actionable content for tenants.
 * @param props
 * @constructor
 */
export const Dashboard = (props: DashboardProps) => {
  const active = props.active || "badges";
  const tabs = (
    <>
      <Tab
        disabled={props.disabled && active !== "badges"}
        icon="badges"
        title="badges"
        active={active === "badges"}
        onClick={props.onBadgeWorkflow}
      />
      {!props.disabled && (
        <Tab icon="activity" title="tasks" active={active === "tasks"} onClick={props.onTaskWorkflow} />
      )}
      {!props.disabled && <Tab disabled icon="cohort" title="cohorts" />}
    </>
  );
  return (
    <Widget headless>
      <WidgetBody spacing="none">
        <Board tabs={tabs} workflow={props.children} isLoading={props.isLoading} />
      </WidgetBody>
    </Widget>
  );
};
