import React from "react";

/**
 * The properties for progress.
 */
export type ProgressProps = {
  start: number;
  end: number;
};

/**
 * A component for displaying progress.
 */
export const Progress = (props: ProgressProps) => {
  const percentage = Math.min(100, Math.round((props.start / props.end) * 100));
  return (
    <div className={"w-full h-full bg-gray-200 overflow-hidden"}>
      <div className="bg-green-400 h-8 border-r-8 border-green-200" style={{ width: `${percentage}%` }} />
    </div>
  );
};
