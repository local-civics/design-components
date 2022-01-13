import React, {FunctionComponent} from "react";
import {Icon}                     from "../icon";
import {Loader}                   from "../loader";
import {useIdentity}              from "./hooks";

/**
 * IdentityWidget props
 */
export interface IdentityWidgetProps {
    username: string
    title: string
    onEdit?: () => void
}

/**
 * IdentityWidget
 * @param props
 * @constructor
 */
export const IdentityWidget: FunctionComponent<IdentityWidgetProps> = (props) => {
    const [identity, community, isLoading] = useIdentity(props.username)
    return (
            <div
                className="border-gray-200 border-2 rounded-md min-h-48 lg:w-60 w-full"
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
                                icon="user"
                            />
                            <h4 className="ml-2 capitalize align-middle font-semibold text-gray-700 inline-block">
                                {props.title}
                            </h4>
                        </div>
                        {
                            props.onEdit &&
                            <Icon
                                onClick={props.onEdit}
                                className="w-4 h-4 -mt-0.5 align-middle cursor-pointer stroke-gray-500 fill-gray-500 hover:stroke-gray-700 hover:fill-gray-700 inline-block"
                                icon="edit"
                            />
                        }
                    </div>
                    <Loader isLoading={isLoading}>
                        <p className="line-clamp-10 mt-3 text-sm text-gray-400">
                            {identity.statement}
                        </p>
                        {community.city && community.state && (
                            <div className="mt-2">
                                <Icon
                                    className="w-4 h-4 stroke-gray-700 fill-gray-700 inline-block"
                                    icon="pin"
                                />
                                <h4 className="ml-2 capitalize text-xs align-middle text-gray-500 inline-block">
                                    {community.city}, {community.state}
                                </h4>
                            </div>
                        )}
                        {community.name && (
                            <div className="mt-2">
                                <Icon
                                    className="w-4 h-4 stroke-gray-700 fill-gray-700 inline-block"
                                    icon="college & career"
                                />
                                <h4 className="ml-2 capitalize text-xs align-middle text-gray-500 inline-block">
                                    {community.name}
                                </h4>
                            </div>
                        )}
                    </Loader>
                </div>
            </div>
    )
}