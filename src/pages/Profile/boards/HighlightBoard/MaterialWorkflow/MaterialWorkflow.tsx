import React from "react";
import { MaterialProps } from "../../../components/Material/Material";

/**
 * The properties for the badge workflow.
 */
export type MaterialWorkflowProps = {
  children?: React.ReactElement<MaterialProps> | React.ReactElement<MaterialProps>[];
};

/**
 * A component for the badge workflow.
 * @param props
 * @constructor
 */
export const MaterialWorkflow = (props: MaterialWorkflowProps) => {
  const hasContent = props.children && React.Children.count(props.children) > 0;
  const count = React.Children.count(props.children || []);
  const columns = 3;
  const gridSize = columns * 2;
  return (
    <>
      {!hasContent && (
        <div className="grid justify-items-center content-center h-[16rem] lg:h-[21rem]">
          <p className="text-xs text-center align-middle leading-6 font-semibold text-slate-300">
            No content to display.
          </p>
        </div>
      )}
      {hasContent && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-2 overflow-scroll">
          {props.children}
          {count < gridSize &&
            [...Array(gridSize - count).keys()].map((k) => {
              return <div key={`material.${k}`} className="bg-gray-100 p-4 shadow-md rounded-md h-28 lg:h-40" />;
            })}
        </div>
      )}
    </>
  );
};
