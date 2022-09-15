import * as React from "react";

/**
 * AdminContextProps
 */
export type AdminContextProps = {
    givenName?: string
    familyName?: string
    avatarURL?: string
    menu?: boolean
    workspaces?: WorkspaceProps[]

    onClick?: () => void;
    onWorkspaceClick?: (workspace: WorkspaceProps) => void;
    onSignOut?: () => void;
    onEditProfile?: () => void;
}

export type WorkspaceProps = {
    workspaceId?: string
    displayName?: string
    active?: boolean
}

/**
 * AdminContext
 * @param props
 * @constructor
 */
export const AdminContext = (props: AdminContextProps) => {
    const workspaceKey = JSON.stringify(props.workspaces)
    const [menu, setMenu] = React.useState(props.menu || false)
    const [workspaces, setWorkspaces] = React.useState(props.workspaces)

    const onClick = () => {
        setMenu(!menu)
        props.onClick && props.onClick()
    }

    const onWorkspaceClick = (workspace: WorkspaceProps) => {
        props.onWorkspaceClick && props.onWorkspaceClick(workspace)
        setMenu(false)

        const newWorkspaces: WorkspaceProps[] = []
        workspaces?.forEach((w) => {
            if(w.workspaceId === workspace.workspaceId){
                newWorkspaces.push({...w, active: true})
            } else {
                newWorkspaces.push({...w, active: false})
            }
        })

        setWorkspaces(newWorkspaces)
    }

    React.useEffect(() => {
        setMenu(props.menu || false)
    }, [props.menu])

    React.useEffect(() => {
        setWorkspaces(props.workspaces)
    }, [workspaceKey])

    return <div className="h-10 my-auto">
        <AccountButton {...props}
                       menu={menu}
                       workspaces={workspaces}
                       onClick={onClick}/>
        <Workspaces {...props}
                     menu={menu}
                     workspaces={workspaces}
                     onWorkspaceClick={onWorkspaceClick}
        />
    </div>
}


const AccountButton = (props: AdminContextProps) => {
    const hasDetails = !!props.givenName || !!props.familyName
    const border = props.menu ? "border-zinc-50 shadow-md" : ""
    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }
    return <div onClick={stopPropagation} className="flex ml-auto w-max gap-x-2 justify-end">
        <button onClick={props.onClick} className={`w-9 h-9 cursor-pointer border-zinc-50 border-4 rounded-full transition ease-in-out duration-600 hover:border-zinc-200 active:border-zinc-100 active:shadow-md ${border}`}>
            <img className="object-contain"
                 referrerPolicy="no-referrer"
                 alt="avatar"
                 src={props.avatarURL}
            />
        </button>
        {hasDetails && <div className="my-auto">
            <div className="flex gap-x-1 font-bold text-sm text-zinc-600">
                { props.givenName && <span>{props.givenName}</span> }
                { props.familyName && <span>{props.familyName}</span> }
            </div>
            <p className="text-xs text-zinc-500">Administrator</p>
        </div>}
    </div>
}

const Workspaces = (props: AdminContextProps) => {
    const workspaces = props.workspaces || []
    const visibility = props.menu ? "opacity-100 visible border" : "opacity-0 invisible border-none"
    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    return <div onClick={stopPropagation} className={`mt-1 shadow-sm grid grid-cols-1 w-96 rounded-md bg-white border-zinc-200 transition ease-in-out duration-600 ${visibility}`}>
        <div className="grid grid-cols-1 gap-y-4 p-5 border-zinc-200">
            <button onClick={props.onEditProfile} className="w-full px-2 py-2.5 text-sm rounded-full border border-zinc-200 text-zinc-700 hover:bg-zinc-50">Edit profile</button>
        </div>

        <div className="max-h-72 border-t overflow-y-auto">
            {
                workspaces.map(w => {
                    const key = w.workspaceId || w.displayName
                    const radioVisibility = w.active ? "visible" : "invisible"
                    const onClick = () => props.onWorkspaceClick && props.onWorkspaceClick(w)
                    return <button key={key}
                                   disabled={w.active}
                                   className="px-5 py-2 w-full flex gap-x-2 text-zinc-600 hover:bg-zinc-50"
                                   onClick={onClick}>

                        <div className={`my-auto w-2 h-2 rounded-full bg-emerald-500 ${radioVisibility}`}/>

                        <div className="my-auto">
                            <p className="text-left text-sm font-bold">{w.displayName}</p>
                            { !!w.workspaceId && <p className="text-left text-xs text-zinc-600">{w.workspaceId}</p> }
                        </div>
                    </button>
                })
            }
        </div>

        <div className="grid grid-cols-1 gap-y-4 p-5 border-t border-zinc-200">
            <button onClick={props.onSignOut} className="m-auto rounded-lg rounded-md px-6 py-2.5 border border-zinc-200 text-zinc-700 hover:bg-zinc-50">Sign out</button>

            <div className="m-auto flex gap-x-2 text-zinc-200 text-xs">
                <button
                    className="hover:underline hover:text-zinc-400 cursor-pointer"
                    onClick={() => window.open("https://www.localcivics.io/terms-of-service", "_blank")}
                >
                    Terms of Service
                </button>

                <button
                    className="hover:underline hover:text-zinc-400 cursor-pointer"
                    onClick={() => window.open("https://www.localcivics.io/privacy-policy", "_blank")}
                >
                    Privacy Policy
                </button>
            </div>

        </div>
    </div>
}