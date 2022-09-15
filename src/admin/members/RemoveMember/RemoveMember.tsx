import * as React        from "react"
import {Overlay}         from "../../../components";
import {stopPropagation} from "../../../utils/event";
import {Dialog}      from "../../components/Dialog/Dialog";

/**
 * RemoveMemberProps
 */
export type RemoveMemberProps = {
    displayName?: string

    onSubmit?: () => Promise<void>;
    onCancel?: () => void;
    onFinish?: () => void;
}

/**
 * RemoveMember
 * @param props
 * @constructor
 */
export const RemoveMember = (props: RemoveMemberProps) => {
    const [success, setSuccess] = React.useState(false)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(props.onSubmit){
            return props.onSubmit().then(() => setSuccess(true))
        }
    }

    const onFinish = () => {
        setSuccess(false)
        props.onFinish && props.onFinish()
    }

    return <Overlay onClick={props.onCancel}>
        { success && <Dialog
            onClose={onFinish}
            title="Member removed!"
            description="We've received your request to remove the member. Please allow up to 5 mins. for changes to complete."
        /> }
        { !success && <form onClick={stopPropagation} className="bg-white p-5 grid grid-cols-1 gap-y-4 rounded-md m-auto text-zinc-600 max-w-xs" onSubmit={onSubmit}>
            <h1 className="text-xl my-auto grow font-bold">Remove member?</h1>
            <div className="text-sm">
                <span>Removing </span>
                <span className="font-bold">{props.displayName||"this member"} </span>
                <span>will prevent them from accessing workspace.</span>
            </div>

            <div className="flex">
                <div className="flex ml-auto gap-x-2">
                    <button type="button" onClick={props.onCancel} className="rounded-md border border-zinc-200 w-30 px-6 py-1.5 hover:bg-zinc-100">Cancel</button>
                    <button type="submit" className="rounded-md flex gap-x-2 w-30 text-white bg-rose-400 px-6 py-1.5 hover:bg-rose-500 disabled:bg-inherit disabled:border disabled:border-zinc-200 disabled:text-zinc-600 disabled:hover:bg-inherit">
                        <span className="my-auto">Remove</span>
                    </button>
                </div>
            </div>
        </form> }
    </Overlay>
}