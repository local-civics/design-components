import React from "react";
import { BadgeProps } from "../../../components/Badge/Badge";

/**
 * The properties for the badge workflow.
 */
export type BadgeWorkflowProps = {
  children?: React.ReactElement<BadgeProps> | React.ReactElement<BadgeProps>[];
};

/**
 * A component for the badge workflow.
 * @param props
 * @constructor
 */
export const BadgeWorkflow = (props: BadgeWorkflowProps) => {
  const hasContent = props.children && React.Children.count(props.children) > 0;
  const count = React.Children.count(props.children || []);
  const columns = 3;
  const gridSize = columns * 2;
  return (
    <>
      {!hasContent && (
        <div className="h-full grid justify-items-center content-center h-[21rem]">
          <p className="text-xs text-center align-middle leading-6 font-semibold text-slate-300">
            No content to display.
          </p>
        </div>
      )}
      {hasContent && (
        <div className="grid md:grid-cols-3 gap-3 p-2 h-full overflow-scroll">
          {props.children}
          {count < gridSize &&
            [...Array(gridSize - count).keys()].map((k) => {
              return <div key={`badge.${k}`} className="bg-gray-100 p-4 shadow-md rounded-md h-40" />;
            })}
        </div>
      )}
    </>
  );
};
