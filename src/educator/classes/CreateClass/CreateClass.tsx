import * as React        from "react"
import {Overlay}         from "../../../components";
import {stopPropagation} from "../../../utils/event";

const MIN_DISPLAY_NAME_LENGTH = 5

/**
 * CreateClassProps
 */
export type CreateClassProps = {
    onSubmit?: (displayName: string) => void;
    onCancel?: () => void;
}

/**
 * CreateClass
 * @param props
 * @constructor
 */
export const CreateClass = (props: CreateClassProps) => {
    const [displayName, setDisplayName] = React.useState("")
    const submitDisabled = !displayName || displayName.length < MIN_DISPLAY_NAME_LENGTH
    const onDisplayNameChange = (value: string) => setDisplayName(value)
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(props.onSubmit && displayName){
            props.onSubmit(displayName)
        }
    }

    return <Overlay onClick={props.onCancel}>
        <form onClick={stopPropagation} className="bg-white p-5 grid grid-cols-1 gap-y-4 rounded-md m-auto text-gray-600 min-w-[30rem]" onSubmit={onSubmit}>
            <h1 className="text-xl my-auto grow font-bold border-b border-gray-300 pb-5">Class Creator</h1>

            <div className="grid grid-cols-1 gap-x-8 gap-y-12 mt-2">
                <label>
                    <div className="flex gap-x-1">
                        <span className="text-gray-700">Class Name</span>
                        <span className="text-xs my-auto">(Required)</span>
                    </div>
                    <input
                        className="w-full rounded-md py-1 px-2 border border-gray-300"
                        required
                        value={displayName}
                        minLength={MIN_DISPLAY_NAME_LENGTH}
                        onChange={(e) => onDisplayNameChange(e.target.value)}
                    />
                </label>
            </div>

            <div className="flex mt-8">
                <div className="flex ml-auto gap-x-2">
                    <button disabled={submitDisabled} type="submit" className="rounded-md flex gap-x-2 w-30 text-white bg-blue-600 px-6 py-3 disabled:bg-inherit disabled:border disabled:border-gray-300 disabled:text-gray-600 disabled:hover:bg-inherit">
                        <span className="my-auto">Create Class</span>
                    </button>
                </div>
            </div>
        </form>
    </Overlay>
}