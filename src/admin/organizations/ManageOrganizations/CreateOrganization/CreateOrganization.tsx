import * as React        from "react"
import {Overlay}         from "../../../../components";
import {stopPropagation} from "../../../../utils/event";
import {FormDialog}      from "../../../components/Form/FormDialog/FormDialog";
import {FormInput}       from "../../../components/Form/FormInput/FormInput";

const MIN_DISPLAY_NAME_LENGTH = 5

/**
 * CreateOrganizationProps
 */
export type CreateOrganizationProps = {
    onSubmit?: (displayName: string) => Promise<void>;
    onCancel?: () => void;
    onFinish?: () => void;
}

/**
 * CreateOrganization
 * @param props
 * @constructor
 */
export const CreateOrganization = (props: CreateOrganizationProps) => {
    const [displayName, setDisplayName] = React.useState("")
    const [success, setSuccess] = React.useState(false)
    const onDisplayNameChange = (value: string) => {
        setDisplayName(value.trim())
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(props.onSubmit && displayName){
            return props.onSubmit(displayName).then(() => setSuccess(true))
        }
    }

    const submitDisabled = !displayName || displayName.length < MIN_DISPLAY_NAME_LENGTH
    const onFinish = () => {
        setSuccess(false)
        props.onFinish && props.onFinish()
    }

    return <Overlay onClick={props.onCancel}>
        { success && <FormDialog
            onClose={onFinish}
            title="Organization created!"
            description="We've received your request to create the organization. Please allow up to 5 mins. for changes to complete."
        /> }
        { !success && <form onClick={stopPropagation} className="bg-white p-5 grid grid-cols-1 gap-y-4 rounded-md m-auto text-zinc-600 min-w-[30rem]" onSubmit={onSubmit}>
            <h1 className="text-xl my-auto grow font-bold">Create organization</h1>
            <FormInput
                required
                displayName="Name"
                description="You can change the organization name later in settings."
                textValue={displayName}
                minLength={MIN_DISPLAY_NAME_LENGTH}
                onTextChange={onDisplayNameChange}
            />

            <div className="flex">
                <div className="flex ml-auto gap-x-2">
                    <button type="button" onClick={props.onCancel} className="rounded-md border border-zinc-200 w-30 px-6 py-1.5 hover:bg-zinc-100">Cancel</button>
                    <button disabled={submitDisabled} type="submit" className="rounded-md flex gap-x-2 w-30 text-white bg-indigo-500 hover:bg-indigo-600 px-6 py-1.5 disabled:bg-inherit disabled:border disabled:border-zinc-200 disabled:text-zinc-600 disabled:hover:bg-inherit">
                        <span className="my-auto">Create</span>
                    </button>
                </div>
            </div>
        </form> }
    </Overlay>
}