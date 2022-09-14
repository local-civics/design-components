import * as React        from "react"
import {Overlay}         from "../../../components";
import {stopPropagation} from "../../../utils/event";
import {FormDialog}      from "../../components/Form/FormDialog/FormDialog";
import {FormInput}       from "../../components/Form/FormInput/FormInput";

/**
 * RenameMemberProps
 */
export type RenameMemberProps = {
    displayName?: string

    onSubmit?: (displayName: string) => Promise<void>;
    onCancel?: () => void;
    onFinish?: () => void;
}

/**
 * RenameMember
 * @param props
 * @constructor
 */
export const RenameMember = (props: RenameMemberProps) => {
    const [displayName, setDisplayName] = React.useState(props.displayName)
    const [success, setSuccess] = React.useState(false)
    const onDisplayNameChange = (value: string) => setDisplayName(value.trim())

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(props.onSubmit && displayName){
            return props.onSubmit(displayName).then(() => setSuccess(true))
        }
    }

    const submitDisabled = !displayName || displayName === props.displayName
    const onFinish = () => {
        setSuccess(false)
        props.onFinish && props.onFinish()
    }

    return <Overlay onClick={props.onCancel}>
        { success && <FormDialog
            onClose={onFinish}
            title="Member renamed!"
            description="We've received your request to rename the member. Please allow up to 5 mins. for changes to complete."
        /> }
        { !success && <form onClick={stopPropagation} className="bg-white p-5 grid grid-cols-1 gap-y-4 rounded-md m-auto text-zinc-600 min-w-[30rem]" onSubmit={onSubmit}>
            <h1 className="text-xl my-auto grow font-bold">Rename member?</h1>
            <FormInput
                required
                displayName="Name"
                description="The name the member goes by"
                textValue={displayName}
                onTextChange={onDisplayNameChange}
            />

            <div className="flex">
                <div className="flex ml-auto gap-x-2">
                    <button type="button" onClick={props.onCancel} className="rounded-md border border-zinc-200 w-30 px-6 py-1.5 hover:bg-zinc-100">Cancel</button>
                    <button disabled={submitDisabled} type="submit" className="rounded-md flex gap-x-2 w-30 text-white bg-indigo-500 hover:bg-indigo-600 px-6 py-1.5 disabled:bg-inherit disabled:border disabled:border-zinc-200 disabled:text-zinc-600 disabled:hover:bg-inherit">
                        <span className="my-auto">Rename</span>
                    </button>
                </div>
            </div>
        </form> }
    </Overlay>
}