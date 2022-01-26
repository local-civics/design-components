import React, { FunctionComponent } from "react";
import { Icon } from "../icon";
import { Loader } from "../loader";
import { ProgressBar } from "../progress-bar";
import { usePassport } from "./hooks";

/**
 * PassportWidget props
 */
export interface PassportWidgetProps {
  owner: string;
}

/**
 * PassportWidget
 * @param props
 * @constructor
 */
export const PassportWidget: FunctionComponent<PassportWidgetProps> = (
  props
) => {
  const [passport, isLoading] = usePassport(props.owner);
  return (
    <div className="lg:flex lg:h-36 w-full">
      <Loader isLoading={isLoading}>
        {/* Impact Score */}
        <div className="flex-grow p-3 pt-6 rounded-md bg-sky-100">
          <div>
            <Icon
              className="w-5 h-5 animate-pulse stroke-gray-700 fill-gray-700 inline-block"
              icon="objective"
            />
            <h4 className="ml-2 align-middle font-semibold text-gray-700 inline-block">
              Impact Score
            </h4>
            <ProgressBar
              className="mt-3"
              start={passport.xp || 0}
              end={passport.nextXP || 1}
            />
            <div className="mt-2 flex">
              <div className="flex-grow">
                <p className="font-bold text-gray-700 text-xl inline-block">
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(passport.xp || 0)}
                </p>
                <p className="ml-2 text-gray-700 text-xl inline-block">XP</p>
              </div>
              {passport.xp && passport.nextXP && passport.stage && (
                <p className="text-sm text-gray-400">
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(passport.nextXP - passport.xp)}{" "}
                  exp. until level {passport.stage + 1}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div
          className="border-gray-200 border-2 rounded-md mt-5 lg:mt-0 lg:ml-3 lg:w-5/12"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="px-2 py-2 bg-gray-200" />
          <div className="p-2">
            <div>
              <Icon
                className="w-5 h-5 stroke-gray-700 fill-gray-700 inline-block"
                icon="achievements"
              />
              <h4 className="ml-2 align-middle font-semibold text-gray-700 inline-block">
                My Achievements
              </h4>
            </div>

            <div className="grid grid-cols-3 justify-items-center">
              <div className="mt-3">
                <p className="font-bold text-3xl w-max m-auto text-green-500">
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(passport.reflections || 0)}
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
                  }).format(passport.badges || 0)}
                </p>
                <p className="text-xs w-max m-auto text-gray-400">Badges</p>
              </div>

              <div className="mt-3">
                <p className="font-bold text-3xl w-max m-auto text-green-500">
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(passport.milestones || 0)}
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
