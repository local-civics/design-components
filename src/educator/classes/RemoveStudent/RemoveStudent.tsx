import * as React        from "react"
import {Overlay}         from "../../../components";
import {Icon}            from "../../../components/Icon/Icon";
import {stopPropagation} from "../../../utils/event";

/**
 * RemoveStudentProps
 */
export type RemoveStudentProps = {
    displayName?: string

    onSubmit?: () => void;
    onCancel?: () => void;
}

/**
 * RemoveStudent
 * @param props
 * @constructor
 */
export const RemoveStudent = (props: RemoveStudentProps) => {
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        props.onSubmit && props.onSubmit()
    }

    return <Overlay onClick={props.onCancel}>
        <form onClick={stopPropagation} className="bg-white text-center p-10 grid grid-cols-1 gap-y-1 rounded-md m-auto text-gray-600 max-w-sm" onSubmit={onSubmit}>
            <div className="w-16 h-16 mx-auto">
                <Icon title="Remove student" name="formal pencil" />
            </div>
            <h1 className="text-md my-auto grow font-bold">Remove {props.displayName||"student"}?</h1>
            <div className="text-sm mx-auto w-52">
                <span>Student will be removed from this class.</span>
            </div>

            <div className="flex mt-5">
                <div className="flex mx-auto gap-x-8">
                    <button type="submit" className="rounded-md flex gap-x-2 text-white bg-blue-600 px-12 py-1 disabled:bg-inherit disabled:border disabled:border-gray-200 disabled:text-gray-600 disabled:hover:bg-inherit">
                        <span className="my-auto">Yes</span>
                    </button>
                    <button type="button" onClick={props.onCancel} className="rounded-md border text-white border-gray-200 px-12 py-1 bg-dark-blue-600">No</button>
                </div>
            </div>
        </form>
    </Overlay>
}