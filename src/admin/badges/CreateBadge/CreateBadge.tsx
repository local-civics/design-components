import * as React   from "react"
import {Overlay}    from "../../../components";
import {withKey}    from "../../../utils/form";
import {FormDialog} from "../../components/Form/FormDialog/FormDialog";
import {FormInput}  from "../../components/Form/FormInput/FormInput";

const MIN_DISPLAY_NAME_LENGTH = 5

/**
 * CreateBadgeProps
 */
export type CreateBadgeProps = {
    onSubmit?: (badge: NewBadge) => Promise<void>;
    onCancel?: () => void;
    onFinish?: () => void;
}

/**
 * NewBadge
 */
export type NewBadge = {
    displayName: string
}

/**
 * CreateBadge
 * @param props
 * @constructor
 */
export const CreateBadge = (props: CreateBadgeProps) => {
    const [badge, setBadge] = React.useState({} as NewBadge)
    const [success, setSuccess] = React.useState(false)

    const submitDisabled = !badge.displayName || badge.displayName.length < MIN_DISPLAY_NAME_LENGTH

    const set = (k: string, v: any) => setBadge(withKey(badge, k, v))
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(props.onSubmit && badge.displayName){
            return props.onSubmit(badge)
                .then(() => setSuccess(true))
        }
    }
    const onFinish = () => {
        setSuccess(false)
        props.onFinish && props.onFinish()
    }

    return <Overlay onClick={props.onCancel}>
        { success && <FormDialog
            onClose={onFinish}
            title="Badge created!"
            description="We've received your request to create the badge. Please allow up to 5 mins. for changes to complete."
        /> }
        { !success && <form className="bg-white p-5 grid grid-cols-1 gap-y-4 rounded-md m-auto text-zinc-600 min-w-[30rem]" onSubmit={onSubmit}>
            <h1 className="text-xl my-auto grow font-bold">Create badge</h1>
            <FormInput
                required
                displayName="Name"
                description="You can change the badge name later in settings."
                textValue={badge.displayName}
                minLength={MIN_DISPLAY_NAME_LENGTH}
                onTextChange={v => set("displayName", v)}
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