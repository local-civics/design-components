import * as React                             from "react"
import {LoaderIcon}                           from "../../../components";
import {BadgeIcon, BadgeIconName, badgeIcons} from "../../../components/Icon/BadgeIcon";
import {changeSet, withKey}                   from "../../../utils/form";
import {ConfirmDialog}                   from "../../components/ConfirmDialog/ConfirmDialog";
import {FormInput}                       from "../../components/FormInput/FormInput";
import {ListCriteria, Criteria} from "../ListCriteria/ListCriteria";

/**
 * PatchBadge
 */
export type PatchBadgeProps = {
    isLoading?: boolean
    installed?: boolean
    badge?: Badge

    onSubmit?: (badge: Badge) => Promise<void>;
    onDelete?: () => Promise<void>
    onDownloadForm?: () => Promise<void>
}

/**
 * Badge
 */
export type Badge = {
    badgeId?: string
    projectId?: string
    parentId?: string
    displayName?: string
    imageURL?: string
    description?: string
    tags?: string[]
    skills?: string[]
    priority?: Priority
    icon?: BadgeIconName;
    level?: number;
    criteria?: Criteria
    hidden?: boolean
}

/**
 * Priority
 */
export type Priority = "Normal" | "Above Normal" | "High"

/**
 * PatchBadge
 * @param props
 * @constructor
 */
export const PatchBadge = (props: PatchBadgeProps) => {
    const [badge, setBadge] = React.useState({...(props.badge || {}),
        level: (props.badge?.level || 0) + 1,
    })
    const [saveWaiting, setSaveWaiting] = React.useState(false)
    const [confirmDelete, setConfirmDelete] = React.useState(false)
    const [deleteWaiting, setDeleteWaiting] = React.useState(false)

    const badgeKey = JSON.stringify(props.badge)
    const submitDisabled = saveWaiting || deleteWaiting
    const badgeIconOptions: any = {}

    const set = (k: string, v: any) => setBadge(withKey(badge, k, v))
    const onDelete = () => setConfirmDelete(true)


    badgeIcons.map(i => {
        badgeIconOptions[i] = <div className="w-16 h-16 m-auto text-slate-600">
            <BadgeIcon title={i} name={i} />
        </div>
    })

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setSaveWaiting(true)
        if(props.onSubmit){
            return props.onSubmit(changeSet(props.badge, {...badge, level: badge.level - 1}))
                .then(() => setSaveWaiting(false))
        }
    }

    const onDeleteSubmit = async () => {
        setDeleteWaiting(true)
        if(props.onDelete){
            return props.onDelete().then(() => setDeleteWaiting(false))
        }
    }

    React.useEffect(() => setBadge({...(props.badge || {}),
        level: (props.badge?.level || 0) + 1,
    }), [badgeKey])

    return <>
        { !!props.isLoading && <></>}

        {
            !props.isLoading &&
            <>
                { confirmDelete && <ConfirmDialog
                    title="Delete badge?"
                    description="This action is permanent and cannot be reversed."
                    action="Delete"
                    actionColor="bg-rose-500 hover:bg-rose-600"
                    onCancel={() => setConfirmDelete(false)}
                    onContinue={async () => {
                        setConfirmDelete(false)
                        await onDeleteSubmit()
                    }}
                />}

                <div className="text-zinc-600 h-full px-20 py-10">
                    <div className="flex gap-x-4">
                        <div className="flex shrink-0 bg-zinc-100 rounded-md p-2">
                            <div className="w-full flex h-16 shrink-0 overflow-hidden bg-gray-100">
                                <div className="m-auto">
                                    <BadgeEmblem {...props.badge}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col my-auto gap-y-1">
                            <div className="truncate w-max text-2xl flex gap-x-2">
                                <span className="font-bold text-zinc-600">{props.badge?.displayName}</span>
                                <span className="shrink-0 text-md my-auto text-zinc-500">Lv. {(props.badge?.level || 0) + 1}</span>
                            </div>
                            <div className="flex gap-x-2 text-sm">
                                <span className="my-auto">Badge ID</span>
                                <span className="my-auto bg-zinc-50 p-1 rounded-sm">{props.badge?.badgeId}</span>
                            </div>
                        </div>
                    </div>

                    <form className="mt-5 bg-white border border-zinc-200 p-5 grid grid-cols-1 gap-y-4 rounded-md m-auto text-zinc-600 min-w-[30rem]" onSubmit={onSubmit}>
                        { !props.installed && <>
                            <h1 className="text-md font-bold">Basic Settings</h1>
                            <div className="ml-auto w-full max-w-[40rem]">
                                <FormInput
                                    required
                                    displayName="Name"
                                    description="The display name of the badge."
                                    textValue={badge.displayName}
                                    onTextChange={v => set("displayName", v)}
                                />
                            </div>

                            <div className="ml-auto w-full max-w-[40rem]">
                                <FormInput
                                    type="paragraph"
                                    displayName="Description"
                                    description="A free form description of the badge. Max character count is 150."
                                    placeholder="Describe the badge in 150 characters or less."
                                    maxLength={150}
                                    textValue={badge.description}
                                    onTextChange={v => set("description", v)}
                                />
                            </div>

                            <hr className="my-2" />
                            <h1 className="text-md font-bold">Appearance</h1>
                            <div className="ml-auto w-full max-w-[40rem]">
                                <FormInput
                                    type="component"
                                    displayName="Icon"
                                    description="The name of the icon to display for the badge."
                                    componentValue={badge.icon}
                                    options={badgeIconOptions}
                                    onComponentChange={v => set("icon", v)}
                                />
                            </div>

                            <hr className="my-2" />
                            <h1 className="text-md font-bold">Requirements</h1>
                            <div className="ml-auto w-full max-w-[40rem]">
                                <ListCriteria
                                    criteria={badge.criteria}
                                    onCriteriaChange={v => set("criteria", v)}
                                />
                            </div>

                            <hr className="my-2" />
                            <h1 className="text-md font-bold">Pedagogy</h1>
                            <div className="ml-auto w-full max-w-[40rem]">
                                <FormInput
                                    type="tags"
                                    displayName="Tags"
                                    description="Comma-separated list of tags describing the badge allowing the badge to be more easily found."
                                    tagsValue={badge.tags}
                                    onTagsChange={v => set("tags", v)}
                                />
                            </div>
                            <div className="ml-auto w-full max-w-[40rem]">
                                <FormInput
                                    type="tags"
                                    displayName="Skills"
                                    description="Comma-separated list of tags describing which skills a learner can expect to improve upon completing the badge."
                                    tagsValue={badge.skills}
                                    onTagsChange={v => set("skills", v)}
                                />
                            </div>
                            <div className="ml-auto w-full max-w-[40rem]">
                                <FormInput
                                    type="select"
                                    displayName="Priority"
                                    description="The importance of the badge within the curriculum. Useful for increasing visibility to learners. Allowed values are: Normal, Above Normal, and High."
                                    options={{
                                        "Normal": "",
                                        "Above Normal": "",
                                        "High": "",
                                    }}
                                    selectedOption={badge.priority}
                                    onSelectChange={v => set("priority", v)}
                                />
                            </div>
                            <div className="ml-auto w-full max-w-[40rem]">
                                <FormInput
                                    required
                                    displayName="Project ID"
                                    description="The ID of the project that the badge belongs to."
                                    textValue={badge.projectId}
                                    onTextChange={v => set("projectId", v)}
                                />
                            </div>

                            <div className="ml-auto w-full max-w-[40rem]">
                                <FormInput
                                    displayName="Parent ID"
                                    description="The ID of the prerequisite badge needed before this badge can be started."
                                    textValue={badge.parentId}
                                    onTextChange={v => set("parentId", v)}
                                />
                            </div>

                            <div className="ml-auto w-full max-w-[40rem]">
                                <FormInput
                                    type="number"
                                    displayName="Level"
                                    description="The level of difficulty the learner can expect for the badge."
                                    numberValue={badge.level}
                                    min={1}
                                    onNumberChange={v => set("level", v)}
                                />
                            </div>

                            <hr className="my-2" />
                        </>}

                        <h1 className="text-md font-bold">Permissions</h1>
                        <div className="ml-auto w-full max-w-[40rem]">
                            <FormInput
                                type="toggle"
                                displayName={badge.hidden ? "Hidden" : "Visible"}
                                description="When visible, the badge will be shown workspace members."
                                toggleValue={!badge.hidden}
                                onToggleChange={v => set("hidden", !v)}
                            />
                        </div>

                        <div className="flex">
                            <button disabled={submitDisabled} type="submit" className="rounded-md ml-auto flex gap-x-1 w-30 text-white bg-indigo-500 hover:bg-indigo-600 px-6 py-1.5 disabled:bg-inherit disabled:border disabled:border-zinc-200 disabled:text-zinc-600 disabled:hover:bg-inherit">
                                {saveWaiting && <div className="w-4 h-4 my-auto stroke-zinc-400">
                                    <LoaderIcon />
                                </div>}
                                <span className="my-auto">Save changes</span>
                            </button>
                        </div>
                    </form>

                    { !props.installed && <div className="flex flex-col gap-y-3 mt-10 pb-10">
                        <h1 className="text-md font-bold">Danger</h1>
                        <div className="flex mt-2 p-6 rounded-md bg-zinc-100">
                            <div>
                                <p className="text-zinc-700">Delete badge</p>
                                <p className="text-sm">This is permanent and learners will loose their work.</p>
                            </div>
                            <button type="button" className="my-auto flex gap-x-1 ml-auto px-4 py-2 text-sm rounded-md text-white bg-rose-500 hover:bg-rose-600 disabled:bg-rose-500 disabled:hover:bg-rose-500"
                                    disabled={submitDisabled}
                                    onClick={onDelete}>
                                {deleteWaiting && <div className="w-4 h-4 my-auto stroke-white">
                                    <LoaderIcon />
                                </div>}
                                <span className="my-auto">Delete</span>
                            </button>
                        </div>
                    </div>}
                </div>
            </>
        }
  </>
}

const BadgeEmblem = (badge: Badge) => {
    return <div className="relative overflow-hidden h-max w-14">
        <>
            <svg
                className="h-full w-full drop-shadow-[inherit]"
                viewBox="0 0 940 1100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {!!badge.level && badge.level > 0 && (
                    <path
                        d="M482.921 47.8734L891.581 301.279C892.463 301.826 893 302.79 893 303.828V796.694C893 797.78 892.413 798.781 891.466 799.311L466.728 1037.16C465.809 1037.68 464.687 1037.67 463.772 1037.15L48.5103 799.603C47.5763 799.069 47 798.076 47 796.999V304.573C47 303.511 47.5618 302.528 48.4771 301.989L479.817 47.8383C480.777 47.2722 481.973 47.2857 482.921 47.8734Z"
                        fill="none"
                        stroke="#1EE2B0"
                        strokeWidth="94"
                    />
                )}

                {!!badge.level && badge.level > 1 && (
                    <path
                        className="-translate-y-3.5"
                        d="M494.044 136.608L824.747 341.5C832.987 346.606 838 355.609 838 365.302V764.144C838 774.282 832.52 783.628 823.672 788.579L479.785 980.994C471.211 985.791 460.749 985.744 452.219 980.868L116.106 788.758C107.383 783.773 102 774.496 102 764.449V366.047C102 356.129 107.247 346.95 115.795 341.918L465.092 136.281C474.055 131.004 485.203 131.13 494.044 136.608Z"
                        fill="none"
                        stroke="#FFD44D"
                        strokeWidth="44"
                    />
                )}

                <path
                    d="M467.125 26.2992C476.092 21.0157 487.25 21.1418 496.095 26.6267L904.756 280.032C912.991 285.138 918 294.139 918 303.828V796.694C918 806.828 912.523 816.172 903.681 821.124L478.943 1058.98C470.364 1063.78 459.894 1063.73 451.359 1058.85L36.0968 821.304C27.3791 816.317 22 807.043 22 796.999V304.573C22 294.658 27.2435 285.483 35.786 280.449L467.125 26.2992Z"
                    fill="none"
                    stroke="#3BD0F2"
                    strokeWidth="44"
                />
            </svg>
            <div className="absolute overflow-hidden left-0 right-0 top-0 bottom-0 m-auto text-dark-blue-400 w-8 h-8">
                <BadgeIcon name={badge.icon} />
            </div>
        </>
    </div>
}