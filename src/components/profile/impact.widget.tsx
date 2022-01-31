import React from "react";
import { Readiness } from "../../models/readiness";
import { Resident } from "../../models/resident";
import { compact } from "../../utilities/numbers";
import { Icon } from "../icon";
import { Loader } from "../loader";
import { ProgressBar } from "../progress-bar";

/**
 * ImpactWidgetProps
 */
export interface ImpactWidgetProps {
  resident: Resident | null;
  readiness: Readiness | null;
}

/**
 * ImpactWidget
 * @param props
 * @constructor
 */
export const ImpactWidget = (props: ImpactWidgetProps) => {
  const readiness = props.readiness;
  return (
    <div className="lg:flex lg:h-36 w-full grow">
      <Loader isLoading={readiness === null}>
        <div className="grow p-3 pt-6 shadow-sm rounded-md bg-sky-100">
          <div>
            <Icon
              className="w-5 h-5 animate-pulse stroke-slate-600 fill-slate-600 inline-block"
              icon="objective"
            />
            <h4 className="ml-2 align-middle font-semibold text-slate-600 inline-block">
              Impact Score
            </h4>
            <ProgressBar
              className="mt-3"
              start={readiness?.proficiency || 0}
              end={readiness?.nextProficiency || 1}
            />
            <div className="mt-2 flex">
              <div className="grow">
                <p className="font-bold text-slate-600 text-xl inline-block">
                  {compact(readiness?.proficiency || 0)}
                </p>
                <p className="ml-2 text-slate-600 text-xl inline-block">XP</p>
              </div>
              {readiness?.proficiency &&
                readiness?.nextProficiency &&
                readiness?.magnitude && (
                  <p className="text-sm text-gray-400">
                    {compact(
                      readiness?.nextProficiency - readiness?.proficiency
                    )}{" "}
                    exp. until level {readiness?.magnitude + 1}
                  </p>
                )}
            </div>
          </div>
        </div>
      </Loader>
    </div>
  );
};
