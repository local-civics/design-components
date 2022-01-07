import { Logo } from "../logo";

import React, { FunctionComponent } from "react";
import {Icon}                from "../icon";

/**
 * Configurable properties for NavigationBar component
 */
export interface NavigationBarProps {
    /**
     * Navigation should display management
     */
    management?: boolean;

    /**
     * On profile click handler
     */
    onProfileClick?: () => void

    /**
     * On calendar click handler
     */
    onCalendarClick?: () => void

    /**
     * On explore click handler
     */
    onExploreClick?: () => void

    /**
     * On management click handler
     */
    onManagementClick?: () => void

    /**
     * On logo click handler
     */
    onLogoClick?: () => void

    /**
     * Active page
     */
    page?: "profile" | "explore" | "calendar" | "management"
}

/**
 * NavigationBar component
 */
export const NavigationBar: FunctionComponent<NavigationBarProps> = (props) => {
    // todo: responsive menu
    // todo: logout
    return (
        <nav className="flex items-center justify-between flex-wrap sticky top-0 z-50 w-full h-16 border-b md:border-none md:border-monochrome-100 bg-white overflow-hidden px-4 md:px-24 py text-center md:shadow-md">
            <div className="flex-grow items-center flex-shrink-0 md:mr-6">
                <Logo className="-ml-2 w-36 cursor-pointer" variant="localcivics" onClick={props.onLogoClick} />
            </div>
            <div className="w-full block flex items-center w-auto">
                {props.management && <Icon onClick={props.page !== "management" ? props.onManagementClick : undefined} className={`transition ease-in-out w-5 h-5 ${props.page == "management" ? "stroke-slate-800" : "stroke-slate-600"} ${props.page == "management" ? "fill-slate-800" : "fill-slate-600"} hover:stroke-slate-800 hover:fill-slate-800 mr-8 ${props.page !== "management" && "cursor-pointer"}`} icon="settings"/>}
                <Icon onClick={props.page !== "profile" ? props.onProfileClick : undefined} className={`transition ease-in-out w-5 h-5 ${props.page == "profile" ? "stroke-slate-800" : "stroke-slate-600"} ${props.page == "profile" ? "fill-slate-800" : "fill-slate-600"} hover:stroke-slate-800 hover:fill-slate-800 mr-8 ${props.page !== "profile" && "cursor-pointer"}`} icon="user"/>
                <Icon onClick={props.page !== "explore" ? props.onExploreClick : undefined} className={`transition ease-in-out w-5 h-5 ${props.page == "explore" ? "stroke-slate-800" : "stroke-slate-600"} ${props.page == "explore" ? "fill-slate-800" : "fill-slate-600"} hover:stroke-slate-800 hover:fill-slate-800 mr-8 ${props.page !== "explore" && "cursor-pointer"}`} icon="explore"/>
                <Icon onClick={props.page !== "calendar" ? props.onCalendarClick : undefined} className={`transition ease-in-out w-5 h-5 ${props.page == "calendar" ? "stroke-slate-800" : "stroke-slate-600"} ${props.page == "calendar" ? "fill-slate-800" : "fill-slate-600"} hover:stroke-slate-800 hover:fill-slate-800 ${props.page !== "calendar" && "cursor-pointer"}`} icon="calendar"/>
            </div>
        </nav>
    );
};
