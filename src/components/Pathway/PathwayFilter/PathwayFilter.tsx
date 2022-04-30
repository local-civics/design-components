import React, { FunctionComponent } from "react";
import { PathwayButton } from "../PathwayButton/PathwayButton";

/**
 * PathwayFilter props
 */
export interface PathwayFilterProps {
  title: string;
  pathways?: string[];
  onChange?: (pathways: string[]) => void;
}

/**
 * PathwayFilter
 * @param props
 * @constructor
 */
export const PathwayFilter: FunctionComponent<PathwayFilterProps> = (props) => {
  const pathways = props.pathways || []
  const togglePathway = (pathway: string) => {
    const newPathways = [...pathways]
    const i = newPathways.indexOf(pathway)
    if(i >= 0){
        newPathways.splice(i, 1)
    } else {
      newPathways.push(pathway)
    }
    if (props.onChange) {
      props.onChange(newPathways);
    }
  };

  return (
    <div
      className="border-gray-200 border shadow-sm rounded-md min-h-48 w-full overflow-hidden"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="px-2 py-2 bg-gray-200" />
      <div className="grid grid-cols-1">
        <div className="p-2 border-b border-gray-200">
          <div className="flex items-center">
            <div className="grow">
              <h4 className="capitalize align-middle font-semibold text-slate-600 inline-block">{props.title}</h4>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1">
          <PathwayButton
            onClick={() => togglePathway("policy & government")}
            active={pathways.indexOf("policy & government") >= 0}
            name="policy & government"
          />
          <PathwayButton
            onClick={() => togglePathway("arts & culture")}
            active={pathways.indexOf("arts & culture") >= 0}
            name="arts & culture"
          />
          <PathwayButton
            onClick={() => togglePathway("recreation")}
            active={pathways.indexOf("recreation") >= 0}
            name="recreation"
          />
          <PathwayButton
              onClick={() => togglePathway("volunteer")}
              active={pathways.indexOf("volunteer") >= 0}
              name="volunteer"
          />
          <PathwayButton
            onClick={() => togglePathway("college & career")}
            active={pathways.indexOf("college & career") >= 0}
            name="college & career"
          />
        </div>
      </div>
    </div>
  );
};
