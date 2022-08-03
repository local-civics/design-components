import React from "react";

/**
 * The properties for progress.
 */
export type ProgressProps = {
  start: number;
  end: number;
  rounded?: boolean;
  color?: "green" | "sky-blue";
};

/**
 * A component for displaying progress.
 */
export const Progress = (props: ProgressProps) => {
  const percentage = Math.min(100, Math.round((props.start / props.end) * 100));
  const roundedClass = props.rounded ? "rounded-full" : "";
  const colorClass = (() => {
    switch (props.color) {
      case "sky-blue":
        return ["bg-sky-blue-200", "bg-sky-blue-400"];
      default:
        return ["bg-green-200", "bg-green-400"];
    }
  })();
  return (
    <div className={`w-full h-full overflow-hidden ${roundedClass} ${colorClass[0]}`}>
      <div className={`h-8 ${colorClass[1]}`} style={{ width: `${percentage}%` }} />
    </div>
  );
};
