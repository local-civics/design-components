import * as React         from "react"
import {LoaderIcon, Logo} from "../../../components";

/**
 * EducatorPageName
 */
export type EducatorPageName = "Classes"
const PAGES: EducatorPageName[] = ["Classes"]
const DEFAULT_PAGE: EducatorPageName = "Classes"
export type EducatorPageMap = (params: EducatorPageParams) => React.ReactNode;
export type EducatorPageParams = {
    loading?: React.ReactNode
    pageName: EducatorPageName
}

/**
 * EducatorLayoutProps
 */
export type EducatorLayoutProps = {
    loading?: boolean
    pageName: EducatorPageName
    continueNav?: boolean
    map?: EducatorPageMap
    givenName?: string
    familyName?: string
    avatarURL?: string

    onPageChange?: (next: EducatorPageName) => Promise<void>;
    onSignOut?: () => void;
}

/**
 * EducatorLayout
 * @param props
 * @constructor
 */
export const EducatorLayout = (props: EducatorLayoutProps) => {
    const map = props.map || (() => null)
    const [loading, setLoading] = React.useState(props.loading)
    const [pageName, setPageName] = React.useState(props.pageName || DEFAULT_PAGE)
    const [page, setPage] = React.useState(map({...props, pageName}))

    const onPageChange = async (next: EducatorPageName) => {
        if(pageName === next || loading){
            return
        }

        setPageName(next)
        setPage(map({
            ...props,
            pageName: next,
            loading: <div className="flex h-full"><div className="m-auto w-6 h-6 stroke-gray-400"><LoaderIcon  /></div></div>,
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

    return <div className="h-screen overflow-hidden font-proxima">
        <Header {...props} onPageChange={onPageChange}/>
        <Navigation {...props}
                    pageName={pageName}
                    onPageChange={onPageChange}
                    loading={loading}
        />
        <div className="flex h-full pb-60">
            <main className="h-full w-full">
                <div className="overflow-y-auto h-full grid grid-cols-1">
                    <div className="flex flex-col h-full w-full px-4 lg:px-36">
                        { page }
                    </div>
                </div>
            </main>
        </div>
    </div>
}

type HeaderProps = EducatorLayoutProps & {

}

const Header = (props: HeaderProps) => {
    const goHome = () => props.onPageChange && props.onPageChange(DEFAULT_PAGE)
    return <div className="flex h-16 sticky w-full p-2 bg-white border-b px-4 lg:px-36 md:shadow-md">
        <button type="button" onClick={goHome} className="my-auto w-36 h-6">
            <Logo />
        </button>
    </div>
}

type NavigationProps = EducatorLayoutProps & EducatorPageParams & {}

const Navigation = (props: NavigationProps) => {
    const hasDetails = !!props.givenName || !!props.familyName
    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    const borderRounded = props.continueNav ? "" : "rounded-bl-md rounded-br-lg"

    return <nav className="flex flex-col w-full px-4 lg:px-36">
        <div className={`flex w-full h-20 px-6 py-2 border-gray-200 border-x-2 border-b-2 ${borderRounded}`}>
            <ul className="flex w-full">
                {
                    PAGES.map(p => {
                        const active = props.pageName === p ? "text-gray-700" : "text-gray-600 hover:text-gray-700"
                        return <li key={p} className="mt-auto w-full">
                            <button
                                type="button"
                                onClick={() => props.onPageChange && props.onPageChange(p)}
                                disabled={!!props.loading || props.pageName === p}
                                className={`flex font-bold w-full justify-items-start gap-x-2 capitalize p-2 ${active}`}>

                                <p className="text-md my-auto">{ p }</p>
                            </button>
                        </li>
                    })
                }
            </ul>
            <div className="ml-auto my-auto z-10">
                <div className="h-10 my-auto">
                    <div onClick={stopPropagation} className="flex ml-auto w-max gap-x-2 justify-end">
                        <button disabled className="w-11 h-11 border-gray-50 border-4 rounded-full">
                            <img className="object-contain"
                                 referrerPolicy="no-referrer"
                                 alt="avatar"
                                 src={props.avatarURL}
                            />
                        </button>
                        {hasDetails && <div className="my-auto">
                            <div className="flex gap-x-1 font-bold text-sm text-gray-600">
                                { props.givenName && <span>{props.givenName}</span> }
                                { props.familyName && <span>{props.familyName}</span> }
                                <div className="text-xs my-auto font-normal">
                                    <span>(</span>
                                    <a className="cursor-pointer hover:underline" onClick={props.onSignOut}>Sign out</a>
                                    <span>)</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">Educator</p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    </nav>
}