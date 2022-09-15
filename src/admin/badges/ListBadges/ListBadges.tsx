import * as React                 from "react"
import {BadgeIcon, BadgeIconName} from "../../../components/Icon/BadgeIcon";
import {onScrollBottom}           from "../../../utils/pagination";
import {Icon}                  from "../../components/Icon/Icon";
import {CreateBadge, NewBadge} from "../CreateBadge/CreateBadge";

/**
 * ListBadges
 */
export type ListBadgesProps = {
    loading?: React.ReactNode
    badges?: Badge[]

    onSearch?: (value: string) => void;
    onBadgeClick?: (badge: Badge) => void;
    onCreateBadge?: (badge: NewBadge) => Promise<void>;
    onMoreBadges?: () => void;
}

/**
 * Badge
 */
export type Badge = {
    badgeId?: string
    displayName?: string
    icon?: BadgeIconName;
    level?: number;
    description?: string
    hidden?: boolean
}

/**
 * ListBadges
 * @param props
 * @constructor
 */
export const ListBadges = (props: ListBadgesProps) => {
    const badges = props.badges || []
    const [createBadge, setCreateBadge] = React.useState(false)
    const [activeId, setActiveId] = React.useState("")

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(props.onSearch){
            props.onSearch(e.target.value)
        }
    }

    return <>
        { createBadge && <CreateBadge
            onCancel={() => setCreateBadge(false)}
            onSubmit={props.onCreateBadge}
            onFinish={() => setCreateBadge(false)}
        /> }
        <div onClick={() => setActiveId("")} className="text-zinc-600 h-full px-20 py-10">
            <div className="flex">
                <p className="text-2xl font-bold">Badges</p>
                { !props.loading && <button
                    onClick={() => setCreateBadge(true)}
                    className="ml-auto py-2.5 px-5 rounded-md text-white bg-emerald-500 flex gap-x-2 hover:bg-emerald-600">
                    <div className="my-auto w-2.5 h-2.5">
                        <Icon title="Create badge" name="plus" />
                    </div>

                    <div className="my-auto">
                        <p className="text-sm text-left">Create Badge</p>
                    </div>
                </button> }
            </div>

            { props.loading }

            { !props.loading && <>
                <p>Create and manage micro-credentials for learners.</p>

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
                                placeholder="Search for badges"
                                type="search"
                                onChange={onSearch}
                            />
                        </div>

                        <div className="overflow-y-auto pb-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" onScroll={onScrollBottom(props.onMoreBadges)}>
                            { badges.length > 0 && badges.map(o => <BadgeItem
                                    key={o.badgeId}
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

type BadgeItemProps = ListBadgesProps & Badge & {
    activeId?: string;
    setActiveId: (activeId: string) => void;
}

const BadgeItem = (props: BadgeItemProps) => {
    const onClick = () => props.onBadgeClick && props.onBadgeClick(props)
    return <button onClick={onClick} className="flex flex-col overflow-hidden h-64 rounded-lg border border-zinc-200 hover:shadow-md">
        <div className="w-full flex h-40 shrink-0 overflow-hidden bg-gray-100">
            <div className="m-auto">
                <BadgeEmblem {...props}/>
            </div>
        </div>

        <div className="p-5 h-full w-full flex overflow-hidden text-left">
            <div className="w-11/12">
                <div className="truncate w-max text-md flex gap-x-2">
                    <span className="font-bold text-zinc-600">{props.displayName}</span>
                    <span className="shrink-0 text-sm my-auto text-zinc-500">Lv. {(props.level || 0) + 1}</span>
                </div>
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

const BadgeEmblem = (badge: Badge) => {
    return <div className="relative overflow-hidden h-max w-28">
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
            <div className="absolute overflow-hidden left-0 right-0 top-0 bottom-0 m-auto text-dark-blue-400 w-14 h-14">
                <BadgeIcon name={badge.icon} />
            </div>
        </>
    </div>
}