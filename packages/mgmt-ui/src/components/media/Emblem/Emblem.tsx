import * as React from 'react';
import "external-svg-loader";

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
 * Emblem. Renders an entity's imageURL (its logo/badge/emblem) via the same external-svg-loader
 * mechanism the student side uses (hub-ui's BadgeEmblem), falling back to a tinted icon tile -
 * using the same icon/accent already assigned to that entity type elsewhere (Navbar's icon/accent
 * mapping) - if imageURL is absent, or if the icon hasn't loaded within LOAD_TIMEOUT_MS (the
 * loader has no error signal of its own; a failed/invalid fetch is caught and silently logged,
 * leaving the target permanently empty, so a timeout is the only way to detect that case). A
 * tinted rounded square, not a circle - rounded-full is reserved for human avatars throughout
 * this package.
 * @param props
 * @constructor
 */
const LOAD_TIMEOUT_MS = 3000

export function Emblem(props: EmblemProps) {
    const s = SIZE[props.size || "sm"]
    const a = ACCENT[props.accent]
    const Icon = props.icon
    const [failed, setFailed] = React.useState(false)
    const ref = React.useRef<SVGSVGElement>(null)

    React.useEffect(() => {
        setFailed(false)
        if (!props.imageURL) {
            return
        }
        const el = ref.current
        const onLoad = () => setFailed(false)
        el?.addEventListener("iconload", onLoad)
        const timer = setTimeout(() => setFailed(true), LOAD_TIMEOUT_MS)
        return () => {
            el?.removeEventListener("iconload", onLoad)
            clearTimeout(timer)
        }
    }, [props.imageURL])

    if (props.imageURL && !failed) {
        return (
            <svg
                ref={ref}
                data-cache="disabled"
                data-src={props.imageURL}
                className={`${s.box} shrink-0 ${s.rounded} object-cover`}
                viewBox="0 0 32 32"
                width="32"
                height="32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            />
        )
    }

    return (
        <div className={`flex ${s.box} shrink-0 items-center justify-center ${s.rounded} ${a.bg}`}>
            <Icon size={s.icon} stroke={1.75} className={a.text} />
        </div>
    )
}
