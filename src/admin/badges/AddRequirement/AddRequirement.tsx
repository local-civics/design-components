import * as React        from "react"
import {Overlay}         from "../../../components";
import {stopPropagation} from "../../../utils/event";
import {FormInput}       from "../../components/FormInput/FormInput";

const MIN_DISPLAY_NAME_LENGTH = 5

/**
 * AddRequirementProps
 */
export type AddRequirementProps = {
    onSubmit?: (displayName: string, tags: string[], skills: string[], activityIds: string[]) => void;
    onCancel?: () => void;
}

/**
 * AddRequirement
 * @param props
 * @constructor
 */
export const AddRequirement = (props: AddRequirementProps) => {
    const [displayName, setDisplayName] = React.useState("")
    const [tags, setTags] = React.useState([] as string[])
    const [skills, setSkills] = React.useState([] as string[])
    const [activityIds, setActivityIds] = React.useState([] as string[])
    const onDisplayNameChange = (value: string) => setDisplayName(value.trim())
    const onTagsChange = (next: string[]) => setTags(next)
    const onSkillsChange = (next: string[]) => setSkills(next)
    const onActivityIdsChange = (next: string[]) => setActivityIds(next)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        props.onSubmit && props.onSubmit(displayName, tags, skills, activityIds)
    }

    const submitDisabled = !displayName || displayName.length < MIN_DISPLAY_NAME_LENGTH
    return <Overlay onClick={props.onCancel}>
        <div onClick={stopPropagation} className="bg-white p-5 grid grid-cols-1 gap-y-4 rounded-md m-auto text-zinc-600 min-w-[30rem]">
            <h1 className="text-xl my-auto grow font-bold">Add requirement</h1>
            <div className="flex flex-col px-1 gap-y-4 max-h-96 overflow-y-auto">
                <FormInput
                    preferred
                    displayName="Name"
                    description="IMPORTANT: You will not be able to change this later."
                    textValue={displayName}
                    minLength={MIN_DISPLAY_NAME_LENGTH}
                    onTextChange={onDisplayNameChange}
                />

                <FormInput
                    type="tags"
                    displayName="Tags"
                    description="Comma-separated list of tags describing which activity tags qualify for the requirement."
                    tagsValue={tags}
                    onTagsChange={onTagsChange}
                />

                <FormInput
                    type="tags"
                    displayName="Skills"
                    description="Comma-separated list of tags describing which activity skills qualify for the requirement."
                    tagsValue={skills}
                    onTagsChange={onSkillsChange}
                />

                <FormInput
                    type="tags"
                    displayName="Activity IDs"
                    description="Comma-separated list of IDs describing which activities qualify for the requirement."
                    tagsValue={activityIds}
                    onTagsChange={onActivityIdsChange}
                />
            </div>

            <div className="flex">
                <div className="flex ml-auto gap-x-2">
                    <button type="button" onClick={props.onCancel} className="rounded-md border border-zinc-200 w-30 px-6 py-1.5 hover:bg-zinc-100">Cancel</button>
                    <button disabled={submitDisabled} type="button" onClick={onSubmit} className="rounded-md flex gap-x-2 w-30 text-white bg-indigo-500 hover:bg-indigo-600 px-6 py-1.5 disabled:bg-inherit disabled:border disabled:border-zinc-200 disabled:text-zinc-600 disabled:hover:bg-inherit">
                        <span className="my-auto">Add</span>
                    </button>
                </div>
            </div>
        </div>
    </Overlay>
}