import * as React                                        from "react"
import {Icon as LogoIcon, LoaderIcon}                    from "../../../components"
import {Icon}                                            from "../Icon/Icon";
import {ManageBundlesTab}                                from "../../bundles/ManageBundles/ManageBundles";
import {AdminContext, AdminContextProps, WorkspaceProps} from "../AdminContext/AdminContext";

/**
 * AdminPageName
 */
export type AdminPageName = "Home" | "Organizations" |
    "Insights" | "Classes" | "Members" |  "Settings" | "Bundles" |
    "Curricula" | "Activities" | "Badges"
const PAGES: AdminPageName[] = ["Home", "Organizations", "Members", "Bundles", "Curricula", "Classes", "Insights", "Settings"]
const DEFAULT_PAGE: AdminPageName = "Home"
export type AdminPageMap = (params: AdminPageParams) => React.ReactNode;
export type AdminPageParams = {
    loading?: React.ReactNode
    pageName: AdminPageName
    projectTab?: ManageBundlesTab

    onManageBundlesTabChange?: (next: ManageBundlesTab) => Promise<void>
}

const CURRICULA_PAGES: AdminPageName[] = ["Activities", "Badges"]

/**
 * AdminLayoutProps
 */
export type AdminLayoutProps = {
    loading?: boolean
    pageName: AdminPageName
    ctx?: AdminContextProps
    map?: AdminPageMap

    onPageChange?: (next: AdminPageName) => Promise<void>;
    onManageBundlesTabChange?: (next: ManageBundlesTab) => Promise<void>
}

/**
 *
 * @param props
 * @constructor
 */
export const AdminLayout = (props: AdminLayoutProps) => {
    const map = props.map || (() => null)
    const workspaceKey = JSON.stringify(props.ctx?.workspaces)
    const [workspaceName, setWorkspaceName] = React.useState("")
    const [pageName, setPageName] = React.useState(props.pageName || DEFAULT_PAGE)
    const [loading, setLoading] = React.useState(props.loading)
    const [page, setPage] = React.useState(map({...props, pageName}))
    const [menu, setMenu] = React.useState(false)
    const [subNav, setSubNav] = React.useState("")

    const toggleSubNav = (next: string) => setSubNav(subNav === next ? "" : next)

    const onWorkspaceClick = (w: WorkspaceProps) => {
        setWorkspaceName(w.displayName||"")
        props.ctx && props.ctx.onWorkspaceClick && props.ctx.onWorkspaceClick(w)
    }

    const onPageChange = async (next: AdminPageName) => {
        if(hasSubNav(next)){
            toggleSubNav(next)
            return
        }

        if(!isSubNavItem(next)){
            setSubNav("")
        }

        if(pageName === next || loading){
            return
        }

        setPageName(next)
        setPage(map({
            ...props,
            pageName: next,
            loading: <div className="flex h-full"><div className="m-auto w-6 h-6 stroke-zinc-400"><LoaderIcon  /></div></div>,
        }))
        setLoading(true)

        if(props.onPageChange){
            return props.onPageChange(next).then(() => {
                setPage(map({...props, pageName: next}))
                setLoading(false)
            })
        }
    }

    React.useEffect(() => {
        (async () => {
            await onPageChange(props.pageName || DEFAULT_PAGE)
        })()
    }, [props.loading, props.pageName])

    React.useEffect(() => {
        props.ctx?.workspaces?.map((w) => {
            if(w.active){ setWorkspaceName(w.displayName||"") }
        })
    }, [workspaceKey])

    return <div onClick={() => setMenu(false)} className="h-screen overflow-hidden font-proxima">
        <Header {...props}
                onPageChange={onPageChange}
                ctx={{...props.ctx, onWorkspaceClick: onWorkspaceClick, menu: menu, onClick: () => setMenu(!menu)}}
                workspaceName={workspaceName}
        />
        <div className="flex h-full pb-20">
            <Navigation {...props}
                        pageName={pageName}
                        onPageChange={onPageChange}
                        loading={loading}
                        subNav={subNav}
            />
            <main className="h-full w-full">
                <div className="overflow-y-auto h-full grid grid-cols-1">
                    <div className="flex flex-col h-full w-full">
                        { page }
                    </div>
                </div>
            </main>
        </div>
    </div>
}

/**
 * HeaderProps
 */
type HeaderProps = AdminLayoutProps & {
    workspaceName?: string
}

/**
 * Header
 * @param props
 * @constructor
 */
const Header = (props: HeaderProps) => {
    const goHome = () => props.onPageChange && props.onPageChange("Home")
    return <div className="flex sticky h-16 w-full p-2 bg-zinc-50">
        <div className="border-r border-zinc-100 pr-2">
            <button onClick={goHome} className="p-2 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-600">
                <div className="h-6 w-6">
                    <LogoIcon name="sponsored"/>
                </div>
            </button>
        </div>
        <div className="pl-2 my-auto text-zinc-600">
            <p className="text-sm">Local Civics</p>
            { props.workspaceName && <div className="text-xs flex gap-x-1">
                <span className="font-bold">{props.workspaceName}</span>
                <span>| </span>
                <span className="italic">Workspace</span>
            </div> }
        </div>
        <div className="ml-auto my-auto z-10">
            <AdminContext {...props.ctx} />
        </div>
    </div>
}

/**
 * NavigationProps
 */
type NavigationProps = AdminLayoutProps & {
    subNav: string
}

/**
 * Navigation
 * @param props
 * @constructor
 */
const Navigation = (props: NavigationProps) => {
    return <nav className="shrink-0 flex flex-col h-auto grow justify-between overflow-x-hidden border-r px-2 border-zinc-100 w-60">
        <ul className="mt-1.5 overflow-y-auto w-full justify-items-start grid grid-cols-1 gap-y-2">
            {
                PAGES.map(p => {
                    const active = props.pageName === p || isSubNavParent(p, props.pageName) ? "text-emerald-500" : "text-zinc-600"
                    const icon = iconName(p)
                    return <li key={p} className="w-full">
                        {
                            !hasSubNav(p) && <button
                                type="button"
                                onClick={() => props.onPageChange && props.onPageChange(p)}
                                disabled={props.loading || navDisabled(p) || props.pageName === p}
                                className={`flex w-full justify-items-start gap-x-3 capitalize p-2 hover:text-emerald-500 active:text-emerald-500 ${active}`}>

                                { icon && <div className="w-4 h-4 my-auto"><Icon title={p} name={icon} /></div>}
                                <p className="text-sm my-auto">{ p }</p>
                                {navSuffix(p, props.subNav)}
                            </button>
                        }

                        {
                            hasSubNav(p) && <>
                                <div
                                    onClick={() => props.onPageChange && props.onPageChange(p)}
                                    className={`cursor-pointer flex w-full justify-items-start gap-x-3 capitalize p-2 hover:text-emerald-500 active:text-emerald-500 ${active}`}>

                                    { icon && <div className="w-4 h-4 my-auto"><Icon title={p} name={icon} /></div>}
                                    <p className="text-sm my-auto">{ p }</p>
                                    {navSuffix(p, props.subNav)}
                                </div>

                                { subNavigation(props, props.subNav) }
                            </>
                        }
                    </li>
                })
            }
        </ul>
    </nav>
}

/**
 * subNavigation
 * @param props
 * @param subNav
 */
const subNavigation = (props: NavigationProps, subNav: string) => {
    const pages = subNavigationPages(subNav)
    if(!pages){
        return null
    }

    return <ul className="pl-9 pt-1 overflow-y-auto w-full justify-items-start grid grid-cols-1 gap-y-3">
        {
            pages.map(p => {
                const active = props.pageName === p ? "text-emerald-500" : "text-zinc-500"
                const icon = iconName(p)
                return <li key={p} className="w-full">
                    <button
                        onClick={() => props.onPageChange && props.onPageChange(p)}
                        disabled={props.loading || navDisabled(p) || props.pageName === p}
                        className={`flex w-full justify-items-start gap-x-3 capitalize hover:text-emerald-500 active:text-emerald-500 ${active}`}>

                        { icon && <div className="w-4 h-4 my-auto"><Icon title={p} name={icon} /></div>}
                        <p className="text-[.8rem] my-auto">{ p }</p>
                        {navSuffix(p, props.subNav)}
                    </button>
                </li>
            })
        }
    </ul>
}

/**
 * iconName
 * @param pageName
 */
const iconName = (pageName: AdminPageName) => {
    switch (pageName){
    case "Home":
        return "home"
    case "Insights":
        return "histogram"
    case "Organizations":
        return "building"
    case "Members":
        return "users"
    case "Classes":
        return "backpack"
    case "Bundles":
        return "folder"
    case "Curricula":
        return "highlighter"
    case "Settings":
        return "sliders"
    }
}

/**
 * navSuffix
 * @param p
 * @param subNav
 */
const navSuffix = (p: AdminPageName, subNav: string) => {
    switch (p){
    case "Home":
        return <div className="my-auto rounded-md text-xs py-1 px-2 text-emerald-800 bg-emerald-100">Getting started</div>
    case "Insights":
        return <div className="my-auto rounded-md text-xs py-1 px-2 text-fuchsia-800 bg-fuchsia-100">Coming Soon</div>
    case "Curricula":
        const iconName = subNav === "Curricula" ? "caretDown" : "caretRight";
        return <div className="ml-auto my-auto w-3 h-3">
            <Icon name={iconName}/>
        </div>
    }

    return null
}

/**
 * navDisabled
 * @param p
 */
const navDisabled = (p: AdminPageName) => {
    switch (p){
    case "Insights":
        return true
    }

    return false
}

/**
 * hasSubNav
 * @param p
 */
const hasSubNav = (p: AdminPageName) => {
    switch (p){
    case "Curricula":
        return true
    }

    return false
}

/**
 * isSubNavParent
 * @param parent
 * @param child
 */
const isSubNavParent = (parent: AdminPageName, child?: AdminPageName) => {
    if(!child){
        return false
    }

    const pages = subNavigationPages(parent)
    return pages && pages.indexOf(child) > -1
}

/**
 * subNavigationPages
 * @param subNav
 */
const subNavigationPages = (subNav: string) => {
    switch (subNav){
    case "Curricula":
        return CURRICULA_PAGES
    default:
        return null
    }
}

/**
 * isSubNavItem
 * @param page
 */
const isSubNavItem = (page: AdminPageName) => {
    const subNavItems = [...CURRICULA_PAGES]
    return subNavItems.indexOf(page) > -1
}