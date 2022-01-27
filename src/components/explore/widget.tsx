import React, {FunctionComponent} from "react";
import {Icon}                     from "../icon";
import {Pathway}                  from "../pathway";

/**
 * PathwayWidget props
 */
export interface PathwayFilterWidgetProps {
    onPathwayClick: (pathway: Pathway) => void;
}

/**
 * PathwayWidget
 * @param props
 * @constructor
 */
export const PathwayFilterWidget: FunctionComponent<PathwayFilterWidgetProps> = (
    props
) => {
    /**
     * Pathways
     */
    const pathways: Pathway[] = [
        "policy & government",
        "volunteer",
        "recreation",
        "arts & culture",
        "college & career",
    ]


    return (
        <div
            className="border-gray-200 border-2 rounded-md min-h-48 lg:w-60 w-full"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="px-2 py-2 bg-gray-200" />
            <div className="grid grid-cols-1 min-h-60">
                <div className="p-2 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="grow">
                            <h4 className="capitalize align-middle font-semibold text-gray-700 inline-block">
                                Explore
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1">
                    {
                        pathways.map((pathway) => {
                            return <button className="px-2 py-4 text-left cursor-pointer bg-gray-100 hover:bg-white active:bg-white focus:bg-white">
                                <Icon className="inline-block w-4 h-4 min-w-4 stroke-gray-700 fill-gray-700" icon={pathway}/>
                                <span className="ml-2 capitalize font-semibold text-sm text-gray-700"> {pathway} </span>
                            </button>
                        })
                    }
                </div>
            </div>
        </div>
    );
};