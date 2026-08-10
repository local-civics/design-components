import * as React from 'react';
import {
    IconAlbum,
    IconBuilding,
    IconCategory2,
    IconClipboard,
    IconGauge,
    IconHome2,
    IconLambda,
    IconLogout,
    IconRoute,
    IconSwitchHorizontal,
    IconVideo,
    TablerIcon,
} from '@tabler/icons';
import { UserButton } from "../../users/UserButton/UserButton";
import { LinksGroup, LinksGroupAccent } from "../NavbarLinksGroups/NavbarLinksGroups";

/**
 * NavbarProps
 */
export interface NavbarProps {
    active?: string
    version: string
    image: string
    name: string
    email: string
    links: Record<string, {notifications: number, href: string, hidden?: boolean}>
    trial?: boolean
    loading?: boolean
    onLogout: () => void;
    onGettingStarted: () => void;
    onSwitchAccounts?: () => void;
}

const data: { label: string; icon: TablerIcon; accent: LinksGroupAccent; links?: { label: string }[] }[] = [
    { label: 'Home', icon: IconHome2, accent: "cyan" },
    { label: 'Dashboard', icon: IconGauge, accent: "mint" },
    { label: 'Classes', icon: IconCategory2, accent: "gold" },
    { label: 'Pathways', icon: IconRoute, accent: "cyan" },
    { label: 'Badges', icon: IconAlbum, accent: "mint" },
    { label: 'Lessons', icon: IconLambda, accent: "gold" },
    { label: 'File Locker', icon: IconClipboard, accent: "cyan" },
    { label: 'Organization', icon: IconBuilding, accent: "gold", links: [{ label: 'Overview' }, { label: 'People' }] },
]

const TRIAL_PAGES = [
    'Home',
    'Lessons',
    'Badges',
]

/**
 * The educator/admin left nav. Same behavior as before this round's restyle — item list, per-item
 * notification counts, the `hidden`/trial visibility rules, the Organization sub-menu — only the
 * markup/styling moved from Mantine's `createStyles` theme to Tailwind utility classes (matching
 * the flat cyan/mint/gold system already shipped on the student side), plus `active` is now
 * optional rather than required (it was forcing at least one caller to pass an empty string just
 * to satisfy the type, which meant no row ever highlighted for it).
 * @param props
 * @constructor
 */
export function Navbar(props: NavbarProps) {
    const links = data.map((item) => {
        const context = props.links[item.label] || {notifications: 0, href: ""}
        if(context.hidden || (props.trial && TRIAL_PAGES.indexOf(item.label) === -1)){
            return null
        }

        if(props.loading && item.label !== 'Home'){
            return null
        }

        return <LinksGroup
            key={item.label}
            active={props.active}
            {...item}
            {...context}
            links={(item.links || []).map((link) => {
                return {...link, ...(props.links[`${item.label}/${link.label}`] || {notifications: 0, href: ""})}
            })}
        />
    });

    return (
        <nav className="flex h-full w-[230px] shrink-0 flex-col border-r border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
                <div className="w-24">
                    <img className="w-full object-contain" src="https://cdn.localcivics.io/brand/localcivics.png" alt="Logo" />
                </div>
                {!!props.trial && (
                    <span className="rounded-full bg-gold-400/15 px-2.5 py-1 text-[10px] font-bold text-dark-blue-400">
                        Trial
                    </span>
                )}
            </div>

            {!props.loading && <UserButton image={props.image} name={props.name} email={props.email} />}

            <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2.5">{links}</div>

            {!props.loading && (
                <div className="flex flex-col gap-0.5 border-t border-slate-200 p-2.5">
                    {props.trial && <UtilLink label="Getting started" icon={IconVideo} onClick={props.onGettingStarted} />}
                    {!!props.onSwitchAccounts && (
                        <UtilLink label="Change account" icon={IconSwitchHorizontal} onClick={props.onSwitchAccounts} />
                    )}
                    <UtilLink label="Logout" icon={IconLogout} onClick={props.onLogout} />
                </div>
            )}
        </nav>
    );
}

const UtilLink = (props: { label: string; icon: TablerIcon; onClick: () => void }) => {
    const Icon = props.icon;
    return (
        <div
            onClick={props.onClick}
            className="flex cursor-pointer items-center gap-2.5 rounded-[10px] px-3.5 py-2 text-slate-400 hover:bg-slate-50 hover:text-slate-500"
        >
            <Icon size={13} stroke={1.75} />
            <span className="text-[11.5px]">{props.label}</span>
        </div>
    );
};
