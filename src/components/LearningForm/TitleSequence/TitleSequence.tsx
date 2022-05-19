import {Modal} from "../../Modal/Modal";
import {Icon, IconName} from "../../Icon/Icon";
import React from "react";

/**
 * TitleSequence props
 */
export type TitleSequenceProps = {
    isLoading?: boolean
    headline?: string
    imageURL?: string
    pathway?: string
    xp?: number
    onClose?: () => void;
}


/**
 * <Quesion />
 * TitleSequence component
 * @param props
 * @constructor
 */
export const TitleSequence = (props: TitleSequenceProps) => {
    return (
        <Modal visible transparent isLoading={props.isLoading} onClose={props.onClose}>
            <div className="w-full md:w-[45rem] shadow-sm">
                <div className="w-full min-h-[20rem]">
                    <img className="w-full h-60 object-cover" alt={props.headline} src={props.imageURL} />
                    <div className="w-full grid grid-cols-1 gap-2 sm:flex p-5 border-b border-gray-200">
                        <div className="flex items-start grow md:max-w-[26rem]">
                            <div className="inline-block min-w-6 w-6 h-6 text-slate-600">
                                <Icon name={(props.pathway as IconName) || "explore"} />
                            </div>

                            <div className="grow align-top ml-2 inline-block leading-none">
                                <p className="font-semibold capitalize text-slate-600 text-lg -mt-1.5">{props.headline}</p>
                                <div>
                                    <p className="text-sm inline-block capitalize text-slate-600">{props.pathway}</p>
                                    {props.xp && <p className="ml-1 font-semibold inline-block text-sm text-green-500">{props.xp} pts</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full px-8 py-5 grid grid-cols-1 gap-5">
                    <div className="flex shrink-0 items-center gap-2 max-h-[12rem]">
                        <div className="text-slate-600 font-bold text-md">
                            <span>Complete the questions to earn your points. You can stop and save at any point. </span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}