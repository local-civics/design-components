import React, { FunctionComponent } from "react";
import { PathwayProps } from "../Pathway/Pathway";

/**
 * PathwayList props
 */
export interface PathwayListProps {
  children?: React.ReactElement<PathwayProps> | React.ReactElement<PathwayProps>[];
}

/**
 * PathwayList
 * @param props
 * @constructor
 */
export const PathwayList: FunctionComponent<PathwayListProps> = (props) => {
  return (
    <div
      className="border-gray-200 border shadow-sm rounded-md min-h-48 lg:w-60 w-full overflow-hidden"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="px-2 py-2 bg-gray-200" />
      <div className="grid grid-cols-1">
        <div className="p-2 border-b border-gray-200">
          <div className="flex items-center">
            <div className="grow">
              <h4 className="capitalize align-middle font-semibold text-slate-600 inline-block">Explore</h4>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1">{props.children}</div>
      </div>
    </div>
  );
};
