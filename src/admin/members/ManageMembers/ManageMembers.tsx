import * as React         from "react"
import {onScrollBottom}   from "../../../utils/pagination";
import {Icon}                 from "../../components/Icon/Icon";
import {AddMember, NewMember} from "../AddMember/AddMember";
import {ChangeMemberRole}     from "../ChangeMemberRole/ChangeMemberRole";
import {RemoveMember}         from "../RemoveMember/RemoveMember";
import {RenameMember}         from "../RenameMember/RenameMember";

/**
 * ManageMembers
 */
export type ManageMembersProps = {
    loading?: React.ReactNode
    members?: ManagedMember[]

    onSearch?: (value: string) => void;
    onMemberClick?: (member: ManagedMember) => void;
    onAddMember?: (member: NewMember) => Promise<void>;
    onRenameMember?: (member: ManagedMember, displayName: string) => Promise<void>;
    onChangeMemberRole?: (member: ManagedMember, role: string) => Promise<void>;
    onRemoveMember?: (member: ManagedMember) => Promise<void>;
    onMoreMembers?: () => void;
}

/**
 * ManagedMember
 */
export type ManagedMember = {
    memberId?: string
    displayName?: string
    email?: string
    avatarURL?: string
    lastActivity?: string
    role?: MemberRole
}

/**
 * MemberRole
 */
export type MemberRole = "Member" | "Educator" | "Workspace admin"

const DEFAULT_ROLE = "Member"

/**
 * ManageMembers
 * @param props
 * @constructor
 */
export const ManageMembers = (props: ManageMembersProps) => {
    const members = props.members || []
    const [createMember, setAddMember] = React.useState(false)
    const [activeId, setActiveId] = React.useState("")

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(props.onSearch){
            props.onSearch(e.target.value)
        }
    }

    return <>
        { createMember && <AddMember
            onCancel={() => setAddMember(false)}
            onSubmit={props.onAddMember}
            onFinish={() => setAddMember(false)}
        /> }
        <div onClick={() => setActiveId("")} className="text-zinc-600 h-full px-20 py-10">
            <div className="flex">
                <p className="text-2xl font-bold">Members</p>
                { !props.loading && <button
                    onClick={() => setAddMember(true)}
                    className="ml-auto py-2.5 px-5 rounded-md text-white bg-emerald-500 flex gap-x-2 hover:bg-emerald-600">
                    <div className="my-auto w-2.5 h-2.5">
                        <Icon title="Add member" name="plus" />
                    </div>

                    <div className="my-auto">
                        <p className="text-sm text-left">Add Member</p>
                    </div>
                </button> }
            </div>

            { props.loading }

            { !props.loading && <>
                <p>Manage workspace members.</p>

                <div className="h-full mt-5">
                    <div className="relative px-1 flex gap-y-4 flex-col overflow-hidden h-full max-h-full w-full">
                        <div className="relative">
                            <div className="absolute left-4 top-4 text-zinc-500 h-3.5 w-3.5">
                                <Icon name="search"/>
                            </div>
                            <input
                                className="rounded-lg mt-1 block w-full px-8 pr-3 py-2 bg-white hover:border-zinc-500 text-slate-500 focus:text-slate-600 text-sm placeholder-zinc-400 border border-zinc-300 rounded-sm shadow-sm
                                focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500
                                disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                                placeholder="Search for members"
                                type="search"
                                onChange={onSearch}
                            />
                        </div>

                        <div className="overflow-y-auto h-full" onScroll={onScrollBottom(props.onMoreMembers)}>
                            { members.length > 0 && members.map(m => <MemberItem
                                key={m.memberId}
                                {...props}
                                {...m}
                                activeId={activeId}
                                setActiveId={setActiveId}
                            />)}
                        </div>
                    </div>
                </div>
            </>}
        </div>
  </>
}

type MemberItemProps = ManageMembersProps & ManagedMember & {
    activeId?: string;
    setActiveId: (activeId: string) => void;
}

const MemberItem = (props: MemberItemProps) => {
    const onClick = () => props.onMemberClick && props.onMemberClick(props)
    return <button onClick={onClick} className="w-full p-2 border-b border-zinc-100 hover:bg-zinc-50 active:bg-zinc-50 text-zinc-600">
        <div className="flex gap-x-4">
            <div className="flex p-2 bg-zinc-100 rounded-md w-max">
                <div className="my-auto w-8 h-8">
                    <img className="object-contain rounded-full"
                         referrerPolicy="no-referrer"
                         alt={props.displayName}
                         src={props.avatarURL}
                    />
                </div>
            </div>

            <div>
                <p className="w-max text-md font-bold">{props.displayName}</p>
                <div className="flex gap-x-2 text-sm">
                    <span className="my-auto">{props.email}</span>
                </div>
            </div>

            <div className="flex ml-auto items-center gap-x-4">
                {InviteSent(props)}
                {Role(props)}
                {More(props)}
            </div>
        </div>
    </button>
}

const Role = (m: ManagedMember) => {
    return <p className="text-sm rounded-md border border-zinc-100 p-1 bg-zinc-50">{m.role||DEFAULT_ROLE}</p>
}

const InviteSent = (m: ManagedMember) => {
    return !m.lastActivity && <div className="flex gap-x-1 text-sm rounded-md border border-zinc-100 p-1 bg-zinc-50">
        <div className="w-3 h-3 my-auto text-zinc-600">
            <Icon title="Pending invite acceptance" name="chessClock"/>
        </div>
        <span>Pending</span>
    </div>
}

const More = (m: MemberItemProps) => {
    const [menu, setMenu] = React.useState(false)
    const [modal, setModal] = React.useState(null as React.ReactNode)

    React.useEffect(() => {
        if(m.activeId && m.memberId !== m.activeId){
            setMenu(false)
            setModal(null)
        } else if(!m.activeId) {
            setMenu(false)
            setModal(null)
        }
    }, [m.activeId])

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        if(!menu){
            m.setActiveId(m.memberId||"")
        } else {
            m.setActiveId("")
        }
        setMenu(!menu)
    }

    const showRename = () => {
        setMenu(false)
        setModal(<RenameMember
            displayName={m.displayName}
            onFinish={() => setModal(null)}
            onSubmit={async (displayName) => {
                if(m.onRenameMember){
                    return m.onRenameMember(m, displayName)
                }
            }}
            onCancel={() => setModal(null)}
        />)
    }

    const showChangeRole = () => {
        setMenu(false)
        setModal(<ChangeMemberRole
            role={m.role}
            onFinish={() => setModal(null)}
            onSubmit={async (role) => {
                if(m.onChangeMemberRole){
                    return m.onChangeMemberRole(m, role)
                }
            }}
            onCancel={() => setModal(null)}
        />)
    }

    const showRemove = () => {
        setMenu(false)
        setModal(<RemoveMember
            displayName={m.displayName}
            onFinish={() => setModal(null)}
            onSubmit={async () => {
                if(m.onRemoveMember){
                    return m.onRemoveMember(m)
                }
            }}
            onCancel={() => setModal(null)}
        />)
    }

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    return <>
        {modal}
        <div onClick={stopPropagation} className="relative">
            {menu && <div className="absolute z-10 top-7 right-0">
                <div className="border mt-1 text-sm shadow-sm grid grid-cols-1 w-60 rounded-md bg-white border-zinc-200 transition ease-in-out duration-600">
                    <ul className="text-left">
                        <li onClick={showRename} className="hover:bg-zinc-100 border-b border-zinc-200">
                            <p className="p-2">Rename</p>
                        </li>
                        <li onClick={showChangeRole} className="hover:bg-zinc-100 border-b border-zinc-200">
                            <p className="p-2">Change role</p>
                        </li>
                        <li onClick={showRemove} className="hover:bg-zinc-100">
                            <p className="p-2">Remove from workspace</p>
                        </li>
                    </ul>
                </div>
            </div>}
            <div onClick={toggleMenu} className="cursor-pointer border border-zinc-100 p-1 bg-white hover:bg-zinc-100 rounded-md w-max">
                <div className="my-auto w-4 h-4">
                    <Icon title="More" name="more" />
                </div>
            </div>
        </div>
    </>
}