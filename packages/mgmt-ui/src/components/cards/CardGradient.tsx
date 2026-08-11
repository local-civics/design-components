import * as React from 'react';

export type CardGradientAccent = "cyan" | "mint" | "gold";

const ACCENT_BORDER: Record<CardGradientAccent, string> = {
    cyan: "border-l-sky-blue-400",
    mint: "border-l-mint-400",
    gold: "border-l-gold-400",
};

const ACCENT_GRADIENT: Record<CardGradientAccent, string> = {
    cyan: "from-sky-blue-400",
    mint: "from-mint-400",
    gold: "from-gold-400",
};

export type CardGradientProps = {
    title: string;
    description: string;
    onClick: () => void;
    icon?: React.ReactNode
    accent?: CardGradientAccent
}

/**
 * A clickable link-card used on Teacher Home. Same title/description/onClick contract as before
 * this round's restyle; the Mantine from/to gradient color-name props are replaced with a single
 * accent prop matching the app-wide cyan/mint/gold rotation (see Navbar.tsx's own per-item accent
 * mapping, reused here for the same 5 sections). Not part of the public barrel - Home.tsx is its
 * only consumer, so this prop-contract change carries no other blast radius.
 */
export function CardGradient(props: CardGradientProps) {
    const accent = props.accent || "cyan"
    return (
        <div
            onClick={props.onClick}
            className={`flex cursor-pointer items-center gap-[18px] rounded-2xl border border-l-4 border-slate-200 bg-white px-[22px] py-[18px] transition-transform hover:scale-[1.02] hover:shadow-md ${ACCENT_BORDER[accent]}`}
        >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br ${ACCENT_GRADIENT[accent]} to-dark-blue-400 text-white`}>
                {props.icon}
            </div>
            <div>
                <div className="text-[15.5px] font-extrabold text-dark-blue-400">{props.title}</div>
                <div className="mt-0.5 text-xs text-slate-500">{props.description}</div>
            </div>
        </div>
    );
}
