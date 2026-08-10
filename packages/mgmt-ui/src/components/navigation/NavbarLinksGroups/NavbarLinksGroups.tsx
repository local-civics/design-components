import * as React from 'react';
import { useState } from 'react';
import { TablerIcon, IconChevronRight } from '@tabler/icons';
import { Link } from "react-router-dom";
import { compact } from "../../../utils/numbers";

/**
 * The accent color cycled across sidebar rows, same fixed rotation as the rest of the app.
 */
export type LinksGroupAccent = "cyan" | "mint" | "gold";

const ACCENT_CLASSNAMES: Record<LinksGroupAccent, { row: string; chip: string; icon: string; pill: string }> = {
    cyan: {
        row: "bg-sky-blue-400/15 border-sky-blue-400/30",
        chip: "bg-sky-blue-400/25",
        icon: "text-sky-blue-400",
        pill: "bg-sky-blue-400/15 text-dark-blue-400",
    },
    mint: {
        row: "bg-mint-400/15 border-mint-400/30",
        chip: "bg-mint-400/25",
        icon: "text-mint-400",
        pill: "bg-mint-400/15 text-dark-blue-400",
    },
    gold: {
        row: "bg-gold-400/15 border-gold-400/30",
        chip: "bg-gold-400/25",
        icon: "text-gold-400",
        pill: "bg-gold-400/15 text-dark-blue-400",
    },
};

interface LinksGroupProps {
    icon: TablerIcon;
    label: string;
    accent?: LinksGroupAccent;
    initiallyOpened?: boolean;
    active?: string
    notifications: number
    href: string
    links?: { notifications: number, label: string, href: string;}[];
}

/**
 * A single sidebar row — a plain link, or (when `links` is non-empty) a chevron-toggled group that
 * auto-opens when one of its children is active and auto-closes when it isn't, while still
 * allowing manual toggling in between. Same behavior as before this round's restyle (chevron/
 * auto-open/notification-badge logic unchanged) — only the markup/styling moved from Mantine's
 * `createStyles` theme to Tailwind utility classes, plus a new optional `accent` for the
 * cyan/mint/gold rotation the redesigned sidebar uses (defaults to cyan if omitted).
 */
export function LinksGroup({ icon: Icon, href, label, accent = "cyan", initiallyOpened, links, active, notifications}: LinksGroupProps) {
    const hasLinks = Array.isArray(links) && links.length > 0;
    const hasActiveLinks = Array.isArray(links) && links.map(l => !!active && active === `${label}/${l.label}`).reduce((a, b) => a || b, false)
    const [opened, setOpened] = useState(initiallyOpened || hasActiveLinks || false);

    React.useEffect(() => {
        setOpened(hasActiveLinks)
    }, [hasActiveLinks])

    const isActive = !!active && !hasLinks && label === active;
    const accentClasses = ACCENT_CLASSNAMES[accent];

    const items = (hasLinks ? links : []).map((link) => {
        const linkActive = !!active && active === `${label}/${link.label}`;
        return (
            <Link
                key={link.label}
                to={link.href}
                className={`flex items-center justify-between gap-2 rounded-[8px] border px-3 py-2 text-xs no-underline transition-colors ${
                    linkActive
                        ? `${accentClasses.row} font-bold text-dark-blue-400`
                        : "border-transparent font-medium text-slate-500 hover:bg-slate-50"
                }`}
            >
                {link.label}
                {!!link.notifications && (
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${accentClasses.pill}`}>
                        {compact(link.notifications)}
                    </span>
                )}
            </Link>
        );
    });

    const rowInner = (
        <div className="flex flex-1 items-center gap-2.5">
            <div className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg ${isActive ? accentClasses.chip : "bg-slate-50"}`}>
                <Icon size={14} stroke={isActive ? 2.2 : 1.75} className={isActive ? accentClasses.icon : "text-slate-400"} />
            </div>
            <span className={`flex-1 text-xs ${isActive ? "font-bold text-dark-blue-400" : "font-medium text-slate-500"}`}>{label}</span>
        </div>
    );

    return (
        <div>
            <div
                onClick={() => hasLinks && setOpened((o) => !o)}
                className={`flex items-center gap-2.5 rounded-[10px] border px-3.5 py-2.5 transition-colors ${
                    isActive ? accentClasses.row : "border-transparent hover:bg-slate-50"
                } ${hasLinks ? "cursor-pointer" : ""}`}
            >
                {hasLinks ? rowInner : <Link to={href} className="flex flex-1 items-center gap-2.5 no-underline">{rowInner}</Link>}

                {!!notifications && (
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${accentClasses.pill}`}>
                        {compact(notifications)}
                    </span>
                )}

                {hasLinks && (
                    <IconChevronRight
                        size={13}
                        stroke={2.2}
                        className={`shrink-0 text-slate-300 transition-transform ${opened ? "rotate-90" : ""}`}
                    />
                )}
            </div>
            {hasLinks && opened && (
                <div className="ml-[29px] mt-0.5 flex flex-col gap-0.5 border-l border-slate-100 pl-2.5">{items}</div>
            )}
        </div>
    );
}
