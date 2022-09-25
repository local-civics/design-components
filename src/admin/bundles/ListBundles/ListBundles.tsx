import * as React                          from "react"
import {LoaderIcon}                        from "../../../components";
import {onScrollBottom}                    from "../../../utils/pagination";
import {Icon}                            from "../../components/Icon/Icon";
import {CreateBundle, NewBundle}         from "../CreateBundle/CreateBundle";
import {PatchBundle, PatchBundleProps} from "../PatchBundle/PatchBundle";

export type ListBundlesTab = "All bundles" | "My bundles" | "Installed bundles"
const TABS: ListBundlesTab[] = ["All bundles", "My bundles", "Installed bundles"]
const DEFAULT_TAB: ListBundlesTab = "All bundles"

/**
 * ListBundles
 */
export type ListBundlesProps = {
    loading?: React.ReactNode
    tab?: ListBundlesTab
    bundles?: Bundle[]

    onTabChange?: (tab: ListBundlesTab) => Promise<void>;
    onSearch?: (value: string) => void;
    onBundleClick?: (bundle: Bundle) => void;
    onCreateBundle?: (bundle: NewBundle) => Promise<void>;
    onDeleteBundle?: (bundle: Bundle) => Promise<void>;
    onInstallBundle?: (bundle: Bundle) => Promise<void>;
    onUninstallBundle?: (bundle: Bundle) => Promise<void>;
    onMoreBundles?: () => void;
}

/**
 * Bundle
 */
export type Bundle = {
    bundleId?: string
    displayName?: string
    installed?: boolean
    workspace?: boolean
}


/**
 * ListBundles
 * @param props
 * @constructor
 */
export const ListBundles = (props: ListBundlesProps) => {
    const [createBundle, setCreateBundle] = React.useState(false)
    const [activeId, setActiveId] = React.useState("")
    const [tab, setTab] = React.useState(props.tab || DEFAULT_TAB)
    const [tabLoading, setTabLoading] = React.useState(false)

    const onTabChange = async (next: ListBundlesTab) => {
        if(tab === next || tabLoading){
            return
        }

        setTab(next)
        setTabLoading(true)

        if(props.onTabChange){
            return props.onTabChange(next).then(() => {
                setTabLoading(false)
            })
        }
    }

    return <>
        { createBundle && <CreateBundle
            onCancel={() => setCreateBundle(false)}
            onSubmit={props.onCreateBundle}
            onFinish={() => setCreateBundle(false)}
        /> }
        <div onClick={() => setActiveId("")} className="text-zinc-600 h-full px-20 py-10">
            <div className="flex">
                <p className="text-2xl font-bold">Bundles</p>
                { !props.loading && <button
                    onClick={() => setCreateBundle(true)}
                    className="ml-auto py-2.5 px-5 rounded-md text-white bg-emerald-500 flex gap-x-2 hover:bg-emerald-600">
                    <div className="my-auto w-2.5 h-2.5">
                        <Icon title="Create bundle" name="plus" />
                    </div>

                    <div className="my-auto">
                        <p className="text-sm text-left">Create Bundle</p>
                    </div>
                </button> }
            </div>

            { props.loading }

            { !props.loading && <>
                <p>Create and manage curricula resource groups.</p>

                <div className="h-full mt-5">
                    <div className="relative flex p-1 gap-y-4 flex-col overflow-hidden h-full max-h-full w-full">
                        <Navigation {...props}
                                    tab={tab}
                                    tabLoading={tabLoading}
                                    activeId={activeId}
                                    onTabChange={onTabChange}
                                    setActiveId={setActiveId}
                        />

                        <Body {...props}
                              tab={tab}
                              tabLoading={tabLoading}
                              activeId={activeId}
                              setActiveId={setActiveId}
                        />

                    </div>
                </div>
            </>}
        </div>
  </>
}

type listBundlesProps = ListBundlesProps & {
    tabLoading?: boolean
    activeId?: string;
    setActiveId: (activeId: string) => void;
}

const Navigation = (props: listBundlesProps) => {
    return <div className="w-full border-b border-zinc-100 flex gap-x-8">
        {
            TABS.map(t => {
                const active = props.tab === t ? "border-emerald-600 text-emerald-600" : "border-transparent"
                return <button key={t}
                               onClick={() => props.onTabChange && props.onTabChange(t)}
                               disabled={!!props.tabLoading || props.tab === t}
                               className={`py-2 border-b-2 hover:text-emerald-600 ${active}`}>
                    {t}
                </button>
            })
        }
    </div>
}

const Body = (props: listBundlesProps) => {
    const bundles = props.bundles || []
    const [bundle, setBundle] = React.useState(null as PatchBundleProps | null)

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(props.onSearch){
            props.onSearch(e.target.value)
        }
    }

    const onBundleClick = (bundle: Bundle) => {
        setBundle({
            ...bundle,
            onDelete: async () => {
                if(props.onDeleteBundle){
                    return props.onDeleteBundle(bundle)
                }
            },
            onInstall: async () => {
              if(props.onInstallBundle){
                  return props.onInstallBundle(bundle)
              }
            },
            onUninstall: async () => {
                if(props.onUninstallBundle){
                    return props.onUninstallBundle(bundle)
                }
            },
            onFinish: () => setBundle(null),
            onCancel: () => setBundle(null)
        })
        props.onBundleClick && props.onBundleClick(bundle)
    }

    return <>
        {props.tabLoading && <div className="flex h-full"><div className="m-auto w-6 h-6 stroke-zinc-400"><LoaderIcon  /></div></div>}
        {!props.tabLoading && <>
            { bundle && <PatchBundle {...bundle} />}

            <div className="relative px-1">
                <div className="absolute left-4 top-4 text-zinc-500 h-3.5 w-3.5">
                    <Icon name="search"/>
                </div>
                <input
                    className="rounded-lg mt-1 block w-full px-8 pr-3 py-2 bg-white hover:border-zinc-500 text-slate-500 focus:text-slate-600 text-sm placeholder-zinc-400 border border-zinc-300 rounded-sm shadow-sm
                                focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500
                                disabled:bg-zinc-50 disabled:text-zinc-500 disabled:border-zinc-200 disabled:shadow-none"
                    placeholder="Search for bundles"
                    type="search"
                    onChange={onSearch}
                />
            </div>

            <div className="overflow-y-auto px-1 pb-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" onScroll={onScrollBottom(props.onMoreBundles)}>
                { bundles.length > 0 && bundles.map(o => <BundleItem
                        key={o.bundleId}
                        {...props}
                        {...o}
                        onBundleClick={onBundleClick}
                        activeId={props.activeId}
                        setActiveId={props.setActiveId}
                    />
                )}
            </div>
        </>}
    </>

}

type BundleItemProps = listBundlesProps & Bundle

const BundleItem = (props: BundleItemProps) => {
    const onClick = () => props.onBundleClick && props.onBundleClick(props)
    const iconName = props.installed ? "cloudCheck" : props.workspace ? "shieldCheck" : ""
    const iconTitle = props.installed ? "Installed" : "Workspace"
    const iconColor = props.installed ? "text-green-500" : "text-slate-500"
    const description = props.installed ? "INSTALLED BUNDLE" : props.workspace ? "WORKSPACE BUNDLE" : "BUNDLE"

    return <button onClick={onClick} className="px-5 py-10 w-full text-left rounded-lg border border-zinc-200 hover:shadow-md">
        <div className="flex gap-x-4 text-zinc-600">
            <div className="flex bg-zinc-100 rounded-md p-3">
                <div className="my-auto w-7 h-7">
                    <Icon title={props.displayName} name="apps"/>
                </div>
            </div>

            <div className="my-auto">
                <p className="w-max text-md font-bold">{props.displayName}</p>
                <p className="flex gap-x-2 text-xs">{description}</p>
            </div>

            <div className="flex ml-auto items-center gap-x-4">
                {!!iconName && <div className={`my-auto h-5 w-5 ${iconColor}`}>
                    <Icon title={iconTitle} name={iconName}/>
                </div>}
            </div>
        </div>
    </button>
}