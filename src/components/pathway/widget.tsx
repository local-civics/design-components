import {PathwayQuery}             from "@local-civics/js-gateway";
import React, {FunctionComponent} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {icon}                     from "../../utilities/tags";
import {Icon}                     from "../icon";
import {Icons}                    from "../icon/icons";
import {Loader}                   from "../loader";
import {ProgressBar}              from "../progress-bar";
import {usePathways}              from "./hooks";

/**
 * PathwayWidget props
 */
export interface PathwayWidgetProps{
    title: string
    username: string
    query?: PathwayQuery
    onHelp: () => void
}

/**
 * PathwayWidget
 * @param props
 * @constructor
 */
export const PathwayWidget: FunctionComponent<PathwayWidgetProps> = (props) => {
    const [pathways, isLoading] = usePathways(props.username, props.query)
    const navigate = useNavigate()
    const location = useLocation();
    return (
        <div
            className="border-gray-200 border-2 rounded-md pb-2 lg:w-60 w-full mt-3"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="px-2 py-2 bg-gray-200"/>
            <div className="p-2">
                <div className="flex items-center">
                    <div className="flex-grow">
                        <Icon
                            className="w-5 h-5 stroke-gray-700 fill-gray-700 inline-block"
                            icon="pathway"
                        />
                        <h4 className="ml-2 capitalize align-middle font-semibold text-gray-700 inline-block">
                            {props.title}
                        </h4>
                    </div>
                    <Icon
                        onClick={props.onHelp}
                        className="w-5 h-5 mt-0.5 align-middle cursor-pointer stroke-gray-500 fill-gray-500 hover:stroke-gray-700 hover:fill-gray-700 inline-block"
                        icon="help"
                    />
                </div>
                <div className="grid grid-cols-1 min-h-60">
                    <Loader isLoading={isLoading}>
                        {pathways.map((pathway) => {
                            return (
                                <div
                                    key={pathway.pathwayId}
                                    className="mt-5 flex items-center"
                                >
                                    <Icon
                                        onClick={() => navigate(`${location.pathname}/pathways/${pathway.pathwayId}`)}
                                        className="transition ease-in-out cursor-pointer w-5 h-5 stroke-gray-700 fill-gray-700 hover:stroke-gray-700 hover:fill-gray-700 inline-block"
                                        icon={icon("pathway", pathway.tags, "area:")}
                                    />
                                    <div className="flex-grow ml-2">
                                        <p className="text-xs text-gray-400">
                                            {pathway.name}
                                        </p>
                                        <ProgressBar
                                            className="h-3"
                                            start={
                                                pathway.progress?.journey?.filter(
                                                    (w) => w.completedAt
                                                ).length || 0
                                            }
                                            end={pathway.journey?.length || 1}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </Loader>
                </div>
            </div>
        </div>
    )
}