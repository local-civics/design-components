import React from "react";

/**
 * The properties for progress.
 */
export type ProgressProps = {
  start: number;
  end: number;
  rounded?: boolean;
  color?: "green" | "sky-blue" | "mint" | "gold";
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
      case "mint":
        return ["bg-mint-400/20", "bg-mint-400"];
      case "gold":
        return ["bg-gold-400/20", "bg-gold-400"];
      default:
        return ["bg-gray-200", "bg-green-400"];
    }
  })();
  return (
    <div className={`w-full h-full overflow-hidden ${roundedClass} ${colorClass[0]}`}>
      <div className={`h-8 ${colorClass[1]}`} style={{ width: `${percentage}%` }} />
    </div>
  );
};
