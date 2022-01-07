import React, { FunctionComponent } from "react";

/**
 * Configurable properties for ProgressBar component
 */
export interface ProgressBarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**
   * Starting point for progress
   */
  start: number;

  /**
   * Ending point for progress
   */
  end: number;
}

/**
 * ProgressBar component
 */
export const ProgressBar: FunctionComponent<ProgressBarProps> = (props) => {
  const percentage = Math.min(100, Math.round((props.start / props.end) * 100))
  return (
      <div className={["w-full bg-gray-200 overflow-hidden", props.className].filter(n => n).join(" ")}>
          <div className="bg-green-400 h-8 border-r-8 border-green-200" style={{width: `${percentage}%`}}/>
      </div>
  );
};
