import React            from "react";
import {Card}           from "../../Card/Card";
import {Icon, IconName} from "../../Icon/Icon";

/**
 * FormDialogProps
 */
export type FormDialogProps = {
    title?: string
    description?: string
    icon?: IconName
    iconColor?: string
    onGoBack?: () => void;
    onClose?: () => void;
};

/**
 * FormDialog
 * @param props
 * @constructor
 */
export const FormDialog = (props: FormDialogProps) => {
    return (
        <Card onClose={props.onClose}>
            <div className="w-full shadow-sm px-8 pt-5 pb-12 grid grid-cols-1 gap-4 content-center justify-items-center">
                <div className="text-zinc-600 w-16 h-16">
                    <Icon title={props.title} name={props.icon || "confetti"} />
                </div>

                <div className="text-center">
                    <div className="text-zinc-600 font-bold text-lg">
                        <span>{props.title}</span>
                    </div>

                    { props.description && <div className="text-zinc-700 max-w-[18rem]">
                        <div className="mt-2 text-sm"> {props.description}</div>
                    </div> }
                </div>
            </div>
        </Card>
    );
};
