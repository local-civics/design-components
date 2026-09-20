import * as React from "react";
import { IconArrowLeft } from "@tabler/icons";
import { Emblem, EmblemAccent, EmblemIcon } from "../../media/Emblem/Emblem";

/**
 * PageHeaderBreadcrumbSegment
 */
export type PageHeaderBreadcrumbSegment = {
    label: string
    /** Omit on the final/current segment - it renders as plain text. */
    onClick?: () => void
}

/**
 * PageHeaderProps
 */
export type PageHeaderProps = {
    /** Omit for Lesson/Class/Student/People/Organization/FileLocker, none of which show an Emblem today. */
    icon?: EmblemIcon
    iconAccent?: EmblemAccent
    imageURL?: string
    onBackClick?: () => void
    backLabel?: string
    /** The already-proven "Go to Pathway" pattern (Badge/Pathway) - a second, deterministic named link. */
    onSecondaryClick?: () => void
    secondaryLabel?: string
    breadcrumb?: PageHeaderBreadcrumbSegment[]
    title: string
    description?: string
    /** Pathway's displayTags pill row. */
    tags?: string[]
    /** Right-hand slot - SplitButton, "Add students" button, etc. Unchanged position/behavior. */
    actions?: React.ReactNode
    /** Extra page-specific content rendered after the description, inside the same indented
     * column as the title (e.g. Pathway's criteria pills + Categories popup trigger). */
    children?: React.ReactNode
}

const NavLink = (props: { onClick: () => void; label: string }) => (
    <div onClick={props.onClick} className="flex w-max cursor-pointer items-center gap-1 text-xs font-bold text-sky-blue-400">
        <IconArrowLeft size={13} stroke={2.5} />
        {props.label}
    </div>
)

/**
 * PageHeader - the shared header for mgmt-ui's top-level pages: Emblem (optional), Back link,
 * a second deterministic named link (e.g. "Go to Pathway"), an orientation breadcrumb, title,
 * tags, description, and a right-hand actions slot. Consolidates what every page used to hand-roll
 * independently - each with its own slightly different Back-link styling (icon, color, element
 * type), which is exactly why at least 7 visually distinct "Back" treatments existed across the
 * app before this component. Not barrel-exported (matches Navbar/PathwayFilterPills/Tabs'
 * existing convention) - pages import it directly by relative path.
 * @param props
 * @constructor
 */
export const PageHeader = (props: PageHeaderProps) => {
    return (
        <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
                {props.icon && (
                    <Emblem imageURL={props.imageURL} alt={props.title} size="xl" icon={props.icon} accent={props.iconAccent || "cyan"} />
                )}
                <div className="space-y-1.5">
                    {!!props.breadcrumb?.length && (
                        <nav className="flex flex-wrap items-center gap-1 text-[11px] font-semibold text-slate-400">
                            {props.breadcrumb!.map((seg, i) => (
                                <React.Fragment key={i}>
                                    {i > 0 && <span className="text-slate-300">›</span>}
                                    {seg.onClick ? (
                                        <button type="button" onClick={seg.onClick} className="hover:text-sky-blue-400 hover:underline">
                                            {seg.label}
                                        </button>
                                    ) : (
                                        <span className="text-slate-500">{seg.label}</span>
                                    )}
                                </React.Fragment>
                            ))}
                        </nav>
                    )}
                    {props.onBackClick && <NavLink onClick={props.onBackClick} label={props.backLabel || "Back"} />}
                    {props.onSecondaryClick && props.secondaryLabel && (
                        <NavLink onClick={props.onSecondaryClick} label={props.secondaryLabel} />
                    )}
                    <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">{props.title || "Untitled"}</h1>
                    {!!props.tags?.length && (
                        <div className="flex flex-wrap gap-1.5">
                            {props.tags.map((tag) => (
                                <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <p className="max-w-xl text-sm text-slate-500">{props.description || "No description"}</p>
                    {props.children}
                </div>
            </div>
            {props.actions}
        </div>
    )
}
