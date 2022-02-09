import React, { FunctionComponent } from "react";
import { pathways } from "../../models/pathway";
import { Icon } from "../../../components";
import { Pathway } from "../pathway";

/**
 * PathwayWidget props
 */
export interface PathwayWidgetProps {
  pathways: Pathway[] | null;
  onPathwayClick: (pathway: Pathway[]) => void;
}

/**
 * PathwayWidget
 * @param props
 * @constructor
 */
export const PathwayWidget: FunctionComponent<PathwayWidgetProps> = (props) => {
  const init: Record<Pathway, boolean> = {
    "arts & culture": false,
    "college & career": false,
    "policy & government": false,
    recreation: false,
    volunteer: false,
  };
  props.pathways?.map((pathway) => {
    init[pathway] = true;
  });

  const [active, setActive] = React.useState(init);
  const onPathwayClick = (pathway: Pathway) => {
    if (active[pathway]) {
      setActive({ ...active, [pathway]: false });
    } else {
      setActive({ ...active, [pathway]: true });
    }
  };

  React.useEffect(() => {
    const pathways = Object.entries(active)
      .filter(([, active]) => active)
      .map(([pathway]) => pathway as Pathway);
    props.onPathwayClick(pathways);
  }, [active]);

  return (
    <div
      className="border-gray-200 border shadow-sm rounded-md min-h-48 lg:w-60 w-full overflow-hidden"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="px-2 py-2 bg-gray-200" />
      <div className="grid grid-cols-1 h-full">
        <div className="p-2 border-b border-gray-200">
          <div className="flex items-center">
            <div className="grow">
              <h4 className="capitalize align-middle font-semibold text-slate-600 inline-block">Explore</h4>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1">
          {pathways.map((pathway, i) => {
            const base = "px-2 py-4 text-left cursor-pointer hover:bg-white active:bg-white";
            const bg = active[pathway] ? "bg-sky-100" : "bg-gray-50";
            const className = [base, bg].join(" ");
            return (
              <button onClick={() => onPathwayClick(pathway)} key={pathway + i} className={className}>
                <Icon className="inline-block w-4 h-4 min-w-4 stroke-slate-600 fill-slate-600" icon={pathway} />
                <span className="ml-2 capitalize font-semibold text-sm text-slate-600"> {pathway} </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
