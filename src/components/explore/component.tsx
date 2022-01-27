import React                 from "react";
import {Icon}                from "../icon";
import {Loader}              from "../loader";
import {Pathway}             from "../pathway";
import {PathwayFilterWidget} from "./widget";

/**
 * ExploreComponent props
 */
export interface ExploreComponentProps{
    isLoading?: boolean;
    onPathwayClick: (pathway: Pathway) => void;
}

/**
 * Pure presentational explore component
 * @constructor
 */
export const ExploreComponent = (props: ExploreComponentProps) => {

  return (
      <Loader isLoading={props.isLoading}>
          <div className="px-4 lg:px-24">
              {/* Body */}
              <div className="lg:flex w-full mt-5">
                  {/* Left Panel */}
                  <div className="lg:flex lg:flex-col w-full lg:w-60">
                      {/* About Me */}
                      <PathwayFilterWidget onPathwayClick={props.onPathwayClick} />

                      <p className="place-self-center inline-block mt-2 mb-2 text-xs text-gray-300">
                          Local Civics © {new Date().getFullYear()}
                      </p>
                  </div>

                  {/* Right Panel */}
                  <div className="lg:grow lg:flex-col lg:ml-9">
                        {/* Search bar */}
                        <label className="relative block">
                            <p className="mb-3 text-gray-700 font-semibold text-md">
                                Find Events
                            </p>
                            <span className="absolute inset-y-0 left-0 top-[2.2rem] flex items-center pl-2">
                                <Icon className="w-4 h-4 min-w-4 stroke-slate-300 fill-slate-300" icon="search"/>
                            </span>
                            <input className="placeholder:italic placeholder:text-slate-400 text-slate-500 block bg-white w-full border border-slate-300 rounded-md py-2 pl-8 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" name="search" placeholder="Search for community events..." />
                        </label>


                  </div>
              </div>
          </div>
      </Loader>
  );
};
