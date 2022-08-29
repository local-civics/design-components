import * as React        from "react"
import {Overlay}         from "../../../../components";
import {stopPropagation} from "../../../../utils/event";
import {FormDialog}      from "../../../components/Form/FormDialog/FormDialog";
import {FormInput}       from "../../../components/Form/FormInput/FormInput";

/**
 * AddMemberProps
 */
export type AddMemberProps = {
    onSubmit?: (email: string) => Promise<void>;
    onCancel?: () => void;
    onFinish?: () => void;
}

/**
 * AddMember
 * @param props
 * @constructor
 */
export const AddMember = (props: AddMemberProps) => {
    const [email, setEmail] = React.useState("")
    const [success, setSuccess] = React.useState(false)
    const onEmailChange = (value: string) => setEmail(value.trim())

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(props.onSubmit && email){
            return props.onSubmit(email).then(() => setSuccess(true))
        }
    }

    const submitDisabled = !email
    const onFinish = () => {
        setSuccess(false)
        props.onFinish && props.onFinish()
    }

    return <Overlay onClick={props.onCancel}>
        { success && <FormDialog
            onClose={onFinish}
            title="Member added!"
            description="We've received your request to add the member. Please allow up to 5 mins. for changes to complete."
        /> }
        { !success && <form onClick={stopPropagation} className="bg-white p-5 grid grid-cols-1 gap-y-4 rounded-md m-auto text-zinc-600 min-w-[30rem]" onSubmit={onSubmit}>
            <h1 className="text-xl my-auto grow font-bold">Add member</h1>
            <FormInput
                required
                displayName="Email"
                description="Enter the email address of the person you'd like to invite."
                textValue={email}
                onTextChange={onEmailChange}
            />

            <div className="flex">
                <div className="flex ml-auto gap-x-2">
                    <button type="button" onClick={props.onCancel} className="rounded-md border border-zinc-200 w-30 px-6 py-1.5 hover:bg-zinc-100">Cancel</button>
                    <button disabled={submitDisabled} type="submit" className="rounded-md flex gap-x-2 w-30 text-white bg-indigo-500 hover:bg-indigo-600 px-6 py-1.5 disabled:bg-inherit disabled:border disabled:border-zinc-200 disabled:text-zinc-600 disabled:hover:bg-inherit">
                        <span className="my-auto">Invite</span>
                    </button>
                </div>
            </div>
        </form> }
    </Overlay>
}