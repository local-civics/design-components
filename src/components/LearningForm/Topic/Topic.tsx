import {Modal} from "../../Modal/Modal";
import {Icon} from "../../Icon/Icon";
import React from "react";

/**
 * Topic props
 */
export type TopicProps = {
    isLoading?: boolean
    contentURL?: string
    headline?: string
    onClose?: () => void;
}


/**
 * <Quesion />
 * Topic component
 * @param props
 * @constructor
 */
export const Topic = (props: TopicProps) => {
    return (
        <Modal visible transparent isLoading={props.isLoading} onClose={props.onClose}>
            <div className="w-full shadow-sm">
                <div className="w-full px-8 py-5 grid grid-cols-1 gap-5">
                    {
                        props.headline && <div className="pr-32 flex gap-4 md:w-[36rem]">
                            <div className="shrink-0 text-green-500 w-8 h-8 -ml-2">
                                <Icon name="positive" />
                            </div>
                            <div className="text-slate-500 font-bold text-lg">
                                <span>{props.headline}</span>
                            </div>
                        </div>
                    }

                    {
                        props.contentURL && <iframe className="w-full" height="315" src={props.contentURL}
                             title={props.headline} frameBorder="0"
                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                             allowFullScreen
                        />
                    }
                </div>
            </div>
        </Modal>
    )
}