import React, { FunctionComponent } from "react";
import { Icon } from "../icon";
import { Loader } from "../loader";
import { Pathway } from "../pathway";
import { ProgressBar } from "../progress-bar";
import { useReadiness } from "./hooks";
import { Readiness } from "./model";

/**
 * PathwayWidget props
 */
export interface PathwayWidgetProps {
  title: string;
  bearerName: string;
  onHelpClick: () => void;
  onClick: (pathway: Pathway) => void;
}

/**
 * PathwayWidget
 * @param props
 * @constructor
 */
export const PathwayWidget: FunctionComponent<PathwayWidgetProps> = (props) => {
  const bearerName = props.bearerName;
  const [cc, ccIsLoading] = useReadiness(bearerName, "college & career");
  const [pg, pgIsLoading] = useReadiness(bearerName, "policy & government");
  const [ac, acIsLoading] = useReadiness(bearerName, "arts & culture");
  const [vt, vtIsLoading] = useReadiness(bearerName, "volunteer");
  const [rc, rcIsLoading] = useReadiness(bearerName, "recreation");
  const isLoading =
    ccIsLoading || pgIsLoading || acIsLoading || vtIsLoading || rcIsLoading;
  const pathways: { name: Pathway; readiness: Readiness }[] = [
    {
      name: "policy & government",
      readiness: pg,
    },
    {
      name: "college & career",
      readiness: cc,
    },
    {
      name: "volunteer",
      readiness: vt,
    },
    {
      name: "recreation",
      readiness: rc,
    },
    {
      name: "arts & culture",
      readiness: ac,
    },
  ];

  return (
    <div
      className="border-gray-200 border shadow-sm rounded-md pb-2 lg:w-60 w-full mt-3"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="px-2 py-2 bg-gray-200" />
      <div className="p-2">
        <div className="flex items-center">
          <div className="grow">
            <Icon
              className="w-5 h-5 stroke-slate-700 fill-slate-700 inline-block"
              icon="pathway"
            />
            <h4 className="ml-2 capitalize align-middle font-semibold text-slate-700 inline-block">
              {props.title}
            </h4>
          </div>
          <Icon
            onClick={props.onHelpClick}
            className="w-5 h-5 mt-0.5 align-middle cursor-pointer stroke-slate-400 fill-slate-400 hover:stroke-slate-700 hover:fill-slate-700 inline-block"
            icon="help"
          />
        </div>
        <div className="grid grid-cols-1 min-h-60">
          <Loader isLoading={isLoading}>
            {pathways.map((pathway) => {
              return (
                <div key={pathway.name} className="mt-5 flex items-center">
                  <Icon
                    onClick={() => props.onClick(pathway.name)}
                    className="cursor-pointer transition ease-in-out w-5 h-5 stroke-slate-500 fill-slate-500 hover:stroke-slate-700 hover:fill-slate-700 inline-block"
                    icon={pathway.name}
                  />
                  <div className="grow ml-2">
                    <p className="capitalize text-xs text-slate-400">
                      {pathway.name}
                    </p>
                    <ProgressBar
                      className="h-3"
                      start={pathway.readiness.proficiency || 0}
                      end={pathway.readiness.nextProficiency || 1}
                    />
                  </div>
                </div>
              );
            })}
          </Loader>
        </div>
      </div>
    </div>
  );
};
