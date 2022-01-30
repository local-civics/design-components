import React, { FunctionComponent } from "react";
import {useReadiness}               from "../../hooks/readiness";
import {Resident}                   from "../../models/resident";
import { Icon }                     from "../icon";
import { Loader }                   from "../loader";
import { ProgressBar }              from "../progress-bar";

/**
 * PassportWidget props
 */
export interface PassportWidgetProps {
  resident: Resident | null
}

/**
 * PassportWidget
 * // todo: presentational
 * @param props
 * @constructor
 */
export const PassportWidget: FunctionComponent<PassportWidgetProps> = (
  props
) => {
  const readiness = useReadiness(props.resident?.residentName)
  return (
    <div className="lg:flex lg:h-36 w-full">
      <Loader isLoading={readiness === null}>
        {/* Impact Score */}
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
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(readiness?.proficiency || 0)}
                </p>
                <p className="ml-2 text-slate-600 text-xl inline-block">XP</p>
              </div>
              {readiness?.proficiency && readiness?.nextProficiency && readiness?.magnitude && (
                <p className="text-sm text-gray-400">
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(readiness?.nextProficiency - readiness?.proficiency)}{" "}
                  exp. until level {readiness?.magnitude + 1}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div
          className="border-gray-200 border shadow-sm overflow-hidden rounded-md mt-5 lg:mt-0 lg:ml-3 lg:w-5/12"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="px-2 py-2 bg-gray-200" />
          <div className="p-2">
            <div>
              <Icon
                className="w-5 h-5 stroke-slate-600 fill-slate-600 inline-block"
                icon="achievements"
              />
              <h4 className="ml-2 align-middle font-semibold text-slate-600 inline-block">
                My Achievements
              </h4>
            </div>

            <div className="grid grid-cols-3 justify-items-center">
              <div className="mt-3">
                <p className="font-bold text-3xl w-max m-auto text-green-500">
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(readiness?.reflections || 0)}
                </p>
                <p className="text-xs w-max m-auto text-gray-400">
                  Reflections
                </p>
              </div>

              <div className="mt-3">
                <p className="font-bold text-3xl w-max m-auto text-green-500">
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(readiness?.badges || 0)}
                </p>
                <p className="text-xs w-max m-auto text-gray-400">Badges</p>
              </div>

              <div className="mt-3">
                <p className="font-bold text-3xl w-max m-auto text-green-500">
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(readiness?.milestones || 0)}
                </p>
                <p className="text-xs w-max m-auto text-gray-400">Milestones</p>
              </div>
            </div>
          </div>
        </div>
      </Loader>
    </div>
  );
};
