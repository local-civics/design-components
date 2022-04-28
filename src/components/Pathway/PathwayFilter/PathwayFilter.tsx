import React, { FunctionComponent } from "react";
import {PathwayButton} from "../PathwayButton/PathwayButton";

/**
 * PathwayFilter props
 */
export interface PathwayFilterProps {
  title: string
  pathways?: string[]
  onChange?: (pathways: string[]) => void;
}

/**
 * PathwayFilter
 * @param props
 * @constructor
 */
export const PathwayFilter: FunctionComponent<PathwayFilterProps> = (props) => {
  const [pathways, setPathways] = React.useState({} as Record<string, boolean>);
  const togglePathway = (pathway: string) => {
    setPathways({ ...pathways, [pathway]: !pathways[pathway] })
    if(props.onChange){
      props.onChange(Object.entries(pathways)
          .filter(([, present]) => present)
          .map(([v]) => v))
    }
  };

  const pathwaysKey = JSON.stringify(props.pathways)
  React.useEffect(() => {
    setPathways({})
    props.pathways?.map((pathway) => {
      togglePathway(pathway)
    })
  }, [pathwaysKey])

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
              <h4 className="capitalize align-middle font-semibold text-slate-600 inline-block">{props.title}</h4>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1">
          <PathwayButton
              onClick={() => togglePathway("policy & government")}
              active={pathways["policy & government"]}
              name="policy & government"
          />
          <PathwayButton
              onClick={() => togglePathway("arts & culture")}
              active={pathways["arts & culture"]}
              name="arts & culture"
          />
          <PathwayButton onClick={() => togglePathway("recreation")} active={pathways["recreation"]} name="recreation" />
          <PathwayButton onClick={() => togglePathway("volunteer")} active={pathways["volunteer"]} name="volunteer" />
          <PathwayButton
              onClick={() => togglePathway("college & career")}
              active={pathways["college & career"]}
              name="college & career"
          />
        </div>
      </div>
    </div>
  );
};
