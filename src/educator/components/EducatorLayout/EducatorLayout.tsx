import * as React         from "react"
import {LoaderIcon, Logo} from "../../../components";

/**
 * EducatorPageName
 */
export type EducatorPageName = "Classes"
const PAGES: EducatorPageName[] = ["Classes"]
const DEFAULT_PAGE: EducatorPageName = "Classes"

/**
 * EducatorLayoutProps
 */
export type EducatorLayoutProps = {
    isLoading?: boolean
    pageName: EducatorPageName
    continueNav?: boolean
    givenName?: string
    familyName?: string
    avatarURL?: string
    children?: React.ReactNode

    onPageChange?: (next: EducatorPageName) => void;
    onSignOut?: () => void;
}

/**
 * EducatorLayout
 * @param props
 * @constructor
 */
export const EducatorLayout = (props: EducatorLayoutProps) => {
    return <div className="h-screen overflow-hidden font-proxima">
        <Header {...props} onPageChange={props.onPageChange}/>
        <Navigation {...props}
                    pageName={props.pageName}
                    onPageChange={props.onPageChange}
                    isLoading={props.isLoading}
        />
        <div className="flex h-full pb-60">
            <main className="h-full w-full">
                <div className="overflow-y-auto h-full grid grid-cols-1">
                    <div className="flex flex-col h-full w-full px-4 lg:px-36">
                        { props.isLoading && <div className="flex h-full"><div className="m-auto w-6 h-6 stroke-gray-400"><LoaderIcon  /></div></div> }
                        { !props.isLoading && props.children }
                    </div>
                </div>
            </main>
        </div>
    </div>
}

type HeaderProps = EducatorLayoutProps

const Header = (props: HeaderProps) => {
    const goHome = () => props.onPageChange && props.onPageChange(DEFAULT_PAGE)
    return <div className="flex h-16 sticky w-full p-2 bg-white border-b px-4 lg:px-36 md:shadow-md">
        <button type="button" onClick={goHome} className="my-auto w-36 h-6">
            <Logo />
        </button>
    </div>
}

type NavigationProps = EducatorLayoutProps

const Navigation = (props: NavigationProps) => {
    const hasDetails = !props.isLoading && (!!props.givenName || !!props.familyName)
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
                                disabled={!!props.isLoading || props.pageName === p}
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
                        { !props.isLoading && <button disabled className="w-11 h-11 border-gray-50 border-4 rounded-full overflow-hidden">
                            <img className="object-contain"
                                 referrerPolicy="no-referrer"
                                 alt="avatar"
                                 src={props.avatarURL}
                            />
                        </button> }
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