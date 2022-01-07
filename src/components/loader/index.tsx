import React, { FunctionComponent } from "react";

/**
 * Configurable properties for Loader component
 */
export interface LoaderProps {
  /**
   * Shows loading component if set, otherwise child component(s)
   */
  isLoading?: boolean;

  /**
   * Content to be displayed after loading finishes
   */
  children: React.ReactNode;
}

/**
 * Loader component
 */
export const Loader: FunctionComponent<LoaderProps> = (props) => {
  return props.isLoading ? (
    <div className="flex h-screen">
      <svg className="m-auto center w-9 animate-spin" viewBox="0 0 117 116" xmlns="http://www.w3.org/2000/svg">
        <circle cx="59" cy="58" r="47" stroke="#A4EEFF" strokeWidth="7" fill="none"/>
        <path d="M12.0379 63C10.5008 32.5 32.501 11 59.0012 11"
          stroke="#3BD0F2" strokeWidth="7" strokeLinecap="round" fill="none"/>
      </svg>
    </div>
  ) : (
    <div>{props.children}</div>
  );
};
