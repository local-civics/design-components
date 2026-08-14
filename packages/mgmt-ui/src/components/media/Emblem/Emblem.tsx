import * as React from 'react';

/**
 * EmblemAccent
 */
export type EmblemAccent = "cyan" | "mint" | "gold"

/**
 * EmblemIcon. Untyped props - @tabler/icons doesn't publicly export its own icon component type
 * (TablerIcon is a private alias), so this accepts any icon component rather than hand-rolling
 * an interface that has to track that library's exact, looser prop-types (e.g. size: string|number).
 */
export type EmblemIcon = React.ComponentType<any>

/**
 * EmblemProps
 */
export type EmblemProps = {
    imageURL?: string
    alt?: string
    size?: "sm" | "lg"
    icon: EmblemIcon
    accent: EmblemAccent
}

const SIZE = {
    sm: {box: "h-11 w-11", rounded: "rounded-xl", icon: 20},
    lg: {box: "h-16 w-16", rounded: "rounded-2xl", icon: 28},
}

const ACCENT = {
    cyan: {bg: "bg-sky-blue-400/15", text: "text-sky-blue-400"},
    mint: {bg: "bg-mint-400/15", text: "text-mint-400"},
    gold: {bg: "bg-gold-400/15", text: "text-gold-400"},
}

/**
 * Emblem. Renders an entity's imageURL (its logo/badge/emblem), falling back to a tinted icon
 * tile using the same icon/accent already assigned to that entity type elsewhere (Navbar's
 * icon/accent mapping) so a missing image still visually reads as "a pathway"/"a badge." A
 * tinted rounded square, not a circle - rounded-full is reserved for human avatars throughout
 * this package.
 * @param props
 * @constructor
 */
export function Emblem(props: EmblemProps) {
    const s = SIZE[props.size || "sm"]
    const a = ACCENT[props.accent]
    const Icon = props.icon

    if (props.imageURL) {
        return <img src={props.imageURL} alt={props.alt || ""} className={`${s.box} shrink-0 ${s.rounded} object-cover`} />
    }

    return (
        <div className={`flex ${s.box} shrink-0 items-center justify-center ${s.rounded} ${a.bg}`}>
            <Icon size={s.icon} stroke={1.75} className={a.text} />
        </div>
    )
}
