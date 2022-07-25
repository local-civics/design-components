import React from "react";

/**
 * The properties for the badge workflow.
 */
export type BadgeListProps = {
  children?: React.ReactNode;
};

/**
 * A component for the badge workflow.
 * @param props
 * @constructor
 */
export const BadgeList = (props: BadgeListProps) => {
  const hasContent = props.children && React.Children.count(props.children) > 0;
  const count = React.Children.count(props.children || []);
  const columns = 3;
  const gridSize = columns * 2;

  return (
    <>
      {!hasContent && (
        <div className="grid justify-items-center content-center h-[16rem] lg:h-[22rem]">
          <p className="text-sm text-center align-middle leading-6 font-semibold text-slate-300">
            No content to display.
          </p>
        </div>
      )}
      {hasContent && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-2 max-h-[16rem] md:max-h-[24rem] overflow-auto">
          {props.children}
          {count < gridSize &&
            [...Array.from(Array(gridSize - count).keys())].map((k) => {
              return <div key={`badge.${k}`} className="bg-gray-100 p-4 shadow-md rounded-md h-28 md:h-36 lg:h-44" />;
            })}
        </div>
      )}
    </>
  );
};
