import React, { FunctionComponent } from "react";
import {IconProps, Icons}           from "../icon";

/**
 * Configurable properties for Wing component
 */
export interface WingProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    /**
     * Optional header for the wing
     */
    header?: React.ReactNode;


    /**
     * Content of the wing
     */
    children?: React.ReactNode;
}

/**
 * Wing component
 */
export const Wing: FunctionComponent<WingProps> = (props) => {
    return (
        <div {...props}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true">

            <div className="px-2 py-2 bg-gray-200">{props.header}</div>
            <div className="p-2">{props.children}</div>
        </div>
    )
}