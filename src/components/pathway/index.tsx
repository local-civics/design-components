import React, {FunctionComponent} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {area, icon}             from "../../utilities/tags";
import {Icon}                   from "../icon";
import {Icons}                    from "../icon/icons";
import {Loader}                   from "../loader";
import {usePathway}               from "./hooks";

/**
 * Pathway
 * @constructor
 */
export const Pathway: FunctionComponent = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [pathway, isLoading] = usePathway(params.username || "", params.pathwayId || "")
    return (
        <div
            className="grid grid-cols-1 justify-items-center content-center transition ease-in-out duration-300 fixed top-0 w-screen h-screen p-5 bg-gray-500/80 z-50"
        >
            <div className="shadow-md overflow-hidden w-9/12 lg:w-5/12 bg-white rounded-md">
                <div className="pt-5 pb-5 w-full">
                    <div className="relative">
                        <Icon
                            onClick={() => navigate(-1)}
                            className="absolute right-5 transition ease-in-out cursor-pointer stroke-gray-300 fill-gray-300 hover:stroke-gray-400 hover:fill-gray-400 w-4"
                            icon="close"
                        />
                    </div>
                    <div className="w-full">
                        <Loader isLoading={isLoading}>
                            <div className="w-full pl-5 pr-10 pb-5 border-b border-gray-200">
                                <Icon className="inline-block w-7 h-7 stroke-gray-700 fill-gray-700" icon={icon("pathway", pathway.tags, "area:")}/>
                                <div className="align-middle ml-2 inline-block">
                                    <p className="font-semibold capitalize text-gray-700 text-lg">
                                        {pathway.name}
                                    </p>
                                    <div className="text-xs">
                                        <p className="inline-block capitalize text-gray-700">
                                            {area("pathway", pathway.tags)}
                                        </p>
                                        {pathway.weight && <p className="ml-1 font-semibold inline-block text-blue-500">
                                            {pathway.weight} pts
                                        </p>}
                                    </div>
                                </div>
                                {
                                    pathway.description &&
                                    <div className="mt-2 text-xs text-gray-700">
                                        { pathway.description }
                                    </div>
                                }
                            </div>

                            <div className="">

                            </div>

                            { pathway.journey && pathway.journey.length > 0 &&
                                <div className="w-full mt-5 px-5">
                                    <div className="mt-5 grid gap-10 w-full">
                                        {

                                            pathway.journey.map((waypoint, i) => {
                                                const color = (pathway.progress?.journey || [])[i]?.completedAt ? "stroke-green-500 fill-green-500" : "stroke-gray-300 fill-gray-300"
                                                return (
                                                    <div className="flex gap-5 items-center">
                                                        <Icon className={`h-3 w-3 ${color}`} icon="circle"/>

                                                        <div className="flex-grow">
                                                            <Icon className="inline-block w-7 h-7 stroke-gray-700 fill-gray-700" icon={waypoint.milestone ? "milestone" : icon("waypoint", waypoint.tags, "area:") as Icons}/>
                                                            <div className="align-middle ml-2 inline-block">
                                                                <p className="font-semibold capitalize text-gray-700 text-md">
                                                                    {waypoint.name}
                                                                </p>
                                                                <div className="text-xs">
                                                                    <p className="inline-block capitalize text-gray-700">
                                                                        {area("waypoint", waypoint.tags)}
                                                                    </p>
                                                                    {waypoint.weight && <p className="ml-1 font-semibold inline-block text-blue-500">
                                                                        {waypoint.weight} pts
                                                                    </p>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            }
                        </Loader>
                    </div>
                </div>
            </div>
        </div>
    )
}