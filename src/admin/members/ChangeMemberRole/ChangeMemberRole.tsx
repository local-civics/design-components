import * as React        from "react"
import {Overlay}         from "../../../components";
import {stopPropagation} from "../../../utils/event";
import {FormDialog}      from "../../components/Form/FormDialog/FormDialog";
import {FormInput}       from "../../components/Form/FormInput/FormInput";

/**
 * ChangeMemberRoleProps
 */
export type ChangeMemberRoleProps = {
    role?: MemberRole

    onSubmit?: (role: MemberRole) => Promise<void>;
    onCancel?: () => void;
    onFinish?: () => void;
}

export type MemberRole = "Member" | "Educator" | "Workspace admin"

const ROLE_DESCRIPTIONS = {
    "Member": "",
    "Educator": "",
    "Workspace admin": ""
}

const ROLES = Object.keys(ROLE_DESCRIPTIONS)

/**
 * ChangeMemberRole
 * @param props
 * @constructor
 */
export const ChangeMemberRole = (props: ChangeMemberRoleProps) => {
    const [role, setRole] = React.useState(props.role)
    const [success, setSuccess] = React.useState(false)
    const onRoleChange = (value: string) => {
        if(ROLES.indexOf(value)){
            setRole(value as MemberRole)
        }
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(props.onSubmit && role){
            return props.onSubmit(role).then(() => setSuccess(true))
        }
    }

    const submitDisabled = !role || role === props.role
    const onFinish = () => {
        setSuccess(false)
        props.onFinish && props.onFinish()
    }

    return <Overlay onClick={props.onCancel}>
        { success && <FormDialog
            onClose={onFinish}
            title="Role changed!"
            description="We've received your request to change the member role. Please allow up to 5 mins. for changes to complete."
        /> }
        { !success && <form onClick={stopPropagation} className="bg-white p-5 grid grid-cols-1 gap-y-4 rounded-md m-auto text-zinc-600 min-w-[30rem]" onSubmit={onSubmit}>
            <h1 className="text-xl my-auto grow font-bold">Change member role?</h1>
            <FormInput
                required
                displayName="Role"
                description="Select role to assign to the member."
                selectedOption={role}
                options={ROLE_DESCRIPTIONS}
                onSelectChange={onRoleChange}
            />

            <div className="flex">
                <div className="flex ml-auto gap-x-2">
                    <button type="button" onClick={props.onCancel} className="rounded-md border border-zinc-200 w-30 px-6 py-1.5 hover:bg-zinc-100">Cancel</button>
                    <button disabled={submitDisabled} type="submit" className="rounded-md flex gap-x-2 w-30 text-white bg-indigo-500 hover:bg-indigo-600 px-6 py-1.5 disabled:bg-inherit disabled:border disabled:border-zinc-200 disabled:text-zinc-600 disabled:hover:bg-inherit">
                        <span className="my-auto">Change role</span>
                    </button>
                </div>
            </div>
        </form> }
    </Overlay>
}