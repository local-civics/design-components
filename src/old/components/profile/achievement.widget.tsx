import React from "react";
import { Report } from "../../models/readiness";
import { Resident } from "../../models/resident";
import { compact } from "../../../utils/numbers";
import { Icon } from "../../../components";
import { Loader } from "../../../components";

/**
 * AchievementWidgetProps
 */
export interface AchievementWidgetProps {
  resident: Resident | null;
  readiness: Report | null;
}

/**
 * AchievementWidget
 * @param props
 * @constructor
 */
export const AchievementWidget = (props: AchievementWidgetProps) => {
  const readiness = props.readiness;
  return (
    <div className="lg:flex lg:h-36 w-full">
      <Loader isLoading={readiness === null}>
        <div
          className="border-gray-200 border shadow-sm overflow-hidden rounded-md mt-5 lg:mt-0 lg:ml-3 w-full"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="px-2 py-2 bg-gray-200" />
          <div className="p-2">
            <div>
              <Icon className="w-5 h-5 stroke-slate-600 fill-slate-600 inline-block" icon="achievements" />
              <h4 className="ml-2 align-middle font-semibold text-slate-600 inline-block">My Achievements</h4>
            </div>

            <div className="grid grid-cols-3 justify-items-center">
              <div className="mt-3">
                <p className="font-bold text-3xl w-max m-auto text-green-500">{compact(readiness?.reflections || 0)}</p>
                <p className="text-xs w-max m-auto text-gray-400">Reflections</p>
              </div>

              <div className="mt-3">
                <p className="font-bold text-3xl w-max m-auto text-green-500">{compact(readiness?.badges || 0)}</p>
                <p className="text-xs w-max m-auto text-gray-400">Badges</p>
              </div>

              <div className="mt-3">
                <p className="font-bold text-3xl w-max m-auto text-green-500">{compact(readiness?.milestones || 0)}</p>
                <p className="text-xs w-max m-auto text-gray-400">Milestones</p>
              </div>
            </div>
          </div>
        </div>
      </Loader>
    </div>
  );
};
