import * as React           from "react"
import {onScrollBottom}     from "../../../utils/pagination";
import {Icon}                                from "../../components/Icon/Icon";
import {CreateOrganization, NewOrganization} from "../CreateOrganization/CreateOrganization";
import {RemoveOrganization}                  from "../RemoveOrganization/RemoveOrganization";
import {RenameOrganization}                  from "../RenameOrganization/RenameOrganization";

/**
 * ListOrganizations
 */
export type ListOrganizationsProps = {
    loading?: React.ReactNode
    organizations?: Organization[]

    onSearch?: (value: string) => void;
    onOrganizationClick?: (organization: Organization) => void;
    onCreateOrganization?: (organization: NewOrganization) => Promise<void>;
    onRenameOrganization?: (organization: Organization, displayName: string) => Promise<void>;
    onRemoveOrganization?: (organization: Organization) => Promise<void>;
    onMoreOrganizations?: () => void;
}

/**
 * Organization
 */
export type Organization = {
    organizationId?: string
    displayName?: string
}


/**
 * ListOrganizations
 * @param props
 * @constructor
 */
export const ListOrganizations = (props: ListOrganizationsProps) => {
    const organizations = props.organizations || []
    const [createOrganization, setCreateOrganization] = React.useState(false)
    const [activeId, setActiveId] = React.useState("")

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(props.onSearch){
            props.onSearch(e.target.value)
        }
    }

    return <>
        { createOrganization && <CreateOrganization
            onCancel={() => setCreateOrganization(false)}
            onSubmit={props.onCreateOrganization}
            onFinish={() => setCreateOrganization(false)}
        /> }
        <div onClick={() => setActiveId("")} className="text-zinc-600 h-full px-20 py-10">
            <div className="flex">
                <p className="text-2xl font-bold">Organizations</p>
                { !props.loading && <button
                    onClick={() => setCreateOrganization(true)}
                    className="ml-auto py-2.5 px-5 rounded-md text-white bg-emerald-500 flex gap-x-2 hover:bg-emerald-600">
                    <div className="my-auto w-2.5 h-2.5">
                        <Icon title="Create organization" name="plus" />
                    </div>

                    <div className="my-auto">
                        <p className="text-sm text-left">Create Organization</p>
                    </div>
                </button> }
            </div>

            { props.loading }

            { !props.loading && <>
                <p>Create and manage schools, teams, and partners.</p>

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
                                placeholder="Search for organizations"
                                type="search"
                                onChange={onSearch}
                            />
                        </div>

                        <div className="overflow-y-auto" onScroll={onScrollBottom(props.onMoreOrganizations)}>
                            { organizations.length > 0 && organizations.map(o => <OrganizationItem
                                    key={o.organizationId}
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

type OrganizationItemProps = ListOrganizationsProps & Organization & {
    activeId?: string;
    setActiveId: (activeId: string) => void;
}

const OrganizationItem = (props: OrganizationItemProps) => {
    const onClick = () => props.onOrganizationClick && props.onOrganizationClick(props)
    return <button onClick={onClick} className="p-2 w-full border-b border-zinc-100 hover:bg-zinc-50 active:bg-zinc-50">
        <div className="flex gap-x-4 text-zinc-600">
            <div className="flex bg-zinc-100 rounded-md px-3 py-2">
                <div className="my-auto w-7 h-7">
                    <Icon title={props.displayName} name="briefcase"/>
                </div>
            </div>

            <div>
                <p className="w-max text-md font-bold">{props.displayName}</p>
                <div className="flex gap-x-2 text-sm">
                    <span className="my-auto">Organization ID</span>
                    <span className="my-auto bg-zinc-50 p-1 rounded-sm">{props.organizationId}</span>
                </div>
            </div>

            <div className="flex ml-auto items-center gap-x-4">
                {More(props)}
            </div>
        </div>
    </button>
}

const More = (o: OrganizationItemProps) => {
    const [menu, setMenu] = React.useState(false)
    const [modal, setModal] = React.useState(null as React.ReactNode)

    React.useEffect(() => {
        if(o.activeId && o.organizationId !== o.activeId){
            setMenu(false)
            setModal(null)
        } else if(!o.activeId) {
            setMenu(false)
            setModal(null)
        }
    }, [o.activeId])

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        if(!menu){
            o.setActiveId(o.organizationId||"")
        } else {
            o.setActiveId("")
        }
        setMenu(!menu)
    }

    const showRename = () => {
        setMenu(false)
        setModal(<RenameOrganization
            displayName={o.displayName}
            onFinish={() => setModal(null)}
            onSubmit={async (displayName) => {
                if(o.onRenameOrganization){
                    return o.onRenameOrganization(o, displayName)
                }
            }}
            onCancel={() => setModal(null)}
        />)
    }

    const showRemove = () => {
        setMenu(false)
        setModal(<RemoveOrganization
            displayName={o.displayName}
            onFinish={() => setModal(null)}
            onSubmit={async () => {
                if(o.onRemoveOrganization){
                    return o.onRemoveOrganization(o)
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
                        <li onClick={showRemove} className="hover:bg-zinc-100">
                            <p className="p-2">Remove organization</p>
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