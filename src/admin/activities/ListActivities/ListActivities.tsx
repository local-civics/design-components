import * as React                    from "react"
import {onScrollBottom}              from "../../../utils/pagination";
import {Icon}                        from "../../components/Icon/Icon";
import {CreateActivity, NewActivity} from "../CreateActivity/CreateActivity";

/**
 * ListActivities
 */
export type ListActivitiesProps = {
    isLoading?: React.ReactNode
    activities?: Activity[]

    onSearch?: (value: string) => void;
    onActivityClick?: (activity: Activity) => void;
    onCreateActivity?: (activity: NewActivity) => Promise<void>;
    onMoreActivities?: () => void;
}

/**
 * Activity
 */
export type Activity = {
    activityId?: string
    displayName?: string
    imageURL?: string
    description?: string
    hidden?: boolean
}


/**
 * ListActivities
 * @param props
 * @constructor
 */
export const ListActivities = (props: ListActivitiesProps) => {
    const activities = props.activities || []
    const [createActivity, setCreateActivity] = React.useState(false)
    const [activeId, setActiveId] = React.useState("")

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(props.onSearch){
            props.onSearch(e.target.value)
        }
    }

    return <>
        { createActivity && <CreateActivity
            onCancel={() => setCreateActivity(false)}
            onSubmit={props.onCreateActivity}
            onFinish={() => setCreateActivity(false)}
        /> }
        <div onClick={() => setActiveId("")} className="text-zinc-600 h-full px-20 py-10">
            <div className="flex">
                <p className="text-2xl font-bold">Activities</p>
                { !props.isLoading && <button
                    onClick={() => setCreateActivity(true)}
                    className="ml-auto py-2.5 px-5 rounded-md text-white bg-emerald-500 flex gap-x-2 hover:bg-emerald-600">
                    <div className="my-auto w-2.5 h-2.5">
                        <Icon title="Create activity" name="plus" />
                    </div>

                    <div className="my-auto">
                        <p className="text-sm text-left">Create Activity</p>
                    </div>
                </button> }
            </div>

            { props.isLoading }

            { !props.isLoading && <>
                <p>Create and manage learning experiences.</p>

                <div className="h-full mt-5">
                    <div className="relative flex gap-y-4 flex-col overflow-hidden h-full max-h-full w-full">
                        <div className="relative pl-1">
                            <div className="absolute left-4 top-4 text-zinc-500 h-3.5 w-3.5">
                                <Icon name="search"/>
                            </div>
                            <input
                                className="rounded-lg mt-1 block w-full px-8 pr-3 py-2 bg-white hover:border-zinc-500 text-slate-500 focus:text-slate-600 text-sm placeholder-zinc-400 border border-zinc-300 rounded-sm shadow-sm
                                focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500
                                disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                placeholder="Search for activities"
                                type="search"
                                onChange={onSearch}
                            />
                        </div>

                        <div className="overflow-y-auto pb-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" onScroll={onScrollBottom(props.onMoreActivities)}>
                            { activities.length > 0 && activities.map(o => <ActivityItem
                                    key={o.activityId}
                                    {...props}
                                    {...o}
                                    activeId={activeId}
                                    setActiveId={setActiveId}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </>}
        </div>
  </>
}

type ActivityItemProps = ListActivitiesProps & Activity & {
    activeId?: string;
    setActiveId: (activeId: string) => void;
}

const ActivityItem = (props: ActivityItemProps) => {
    const onClick = () => props.onActivityClick && props.onActivityClick(props)
    return <button onClick={onClick} className="flex flex-col overflow-hidden h-64 rounded-lg border border-zinc-200 hover:shadow-md">
        <div className="w-full h-40 shrink-0 overflow-hidden">
            <img
                className="object-cover"
                alt={props.displayName}
                src={props.imageURL}
                referrerPolicy="no-referrer"
            />
        </div>

        <div className="p-5 h-full w-full flex overflow-hidden text-left">
            <div className="w-11/12">
                <p className="truncate w-max text-md font-bold">{props.displayName}</p>
                <p className="truncate mt-2 text-md text-zinc-500">{props.description}</p>
            </div>
            {
                !!props.hidden && <div className="ml-auto my-auto w-4 h-4 text-zinc-300">
                    <Icon title="Hidden" name="eyeCrossed" />
                </div>
            }
        </div>
    </button>
}