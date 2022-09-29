import * as React        from "react";
import {Overlay}         from "../../../components";
import {stopPropagation} from "../../../utils/event";

/**
 * ConfirmDialogProps
 */
export type ConfirmDialogProps = {
    title?: string
    action?: string
    description?: string
    actionColor?: string
    onCancel?: () => void;
    onContinue?: () => void;
}

/**
 * ConfirmDialog
 * @param props
 * @constructor
 */
export const ConfirmDialog = (props: ConfirmDialogProps) => {
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        props.onContinue && props.onContinue()
    }

    return <Overlay onClick={props.onCancel}>
        <form onClick={stopPropagation} className="bg-white p-5 grid grid-cols-1 gap-y-4 rounded-md m-auto text-zinc-600 min-w-[30rem]" onSubmit={onSubmit}>
            <h1 className="text-xl my-auto grow font-bold">{props.title}</h1>
            <p className="my-auto">{props.description}</p>

            <div className="flex">
                <div className="flex ml-auto gap-x-2">
                    <button onClick={props.onCancel} className="rounded-md border border-zinc-200 w-30 px-6 py-1.5 hover:bg-zinc-100">Cancel</button>
                    <button type="submit" className={`rounded-md flex gap-x-2 w-30 text-white px-6 py-1.5 disabled:bg-inherit disabled:border disabled:border-zinc-200 disabled:text-zinc-600 disabled:hover:bg-inherit ${props.actionColor||""}`}>
                        <span className="my-auto capitalize">{props.action}</span>
                    </button>
                </div>
            </div>
        </form>
    </Overlay>
}