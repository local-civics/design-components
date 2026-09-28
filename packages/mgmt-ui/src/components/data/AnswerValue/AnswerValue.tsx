import * as React from 'react';
import {IconDownload, IconExternalLink} from "@tabler/icons";

const isUrl = (value: string): boolean => /^https?:\/\/\S+$/i.test(value.trim())

// Files students upload through a lesson's file question are stored by relay under this path.
const isUpload = (value: string): boolean => /\/\/cdn\.localcivics\.io\/v1\/store\//i.test(value)

const hostOf = (value: string): string => {
    try {
        return new URL(value).hostname.replace(/^www\./, "")
    } catch {
        return value
    }
}

/**
 * AnswerValueProps
 */
export type AnswerValueProps = {
    answer: string[]
    // Shown when there's nothing to show. Omit it to render nothing.
    emptyText?: string
    className?: string
}

/**
 * AnswerValue. One lesson question's recorded answer. Plain answers render as text, joined the way
 * they always were; any answer that's a web address renders as a button instead of the raw address,
 * so an educator can open it: "Download" for a file uploaded to the platform (same button as File
 * Locker's), "Open link" plus the site name for a pasted link. Must not be placed inside another
 * link.
 * @param props
 * @constructor
 */
export function AnswerValue(props: AnswerValueProps) {
    const values = (props.answer || []).filter((v) => typeof v === "string" && v.trim() !== "")
    const text = values.filter((v) => !isUrl(v))
    const links = values.filter(isUrl)

    if (values.length === 0) {
        return props.emptyText ? <div className={props.className}>{props.emptyText}</div> : null
    }

    return (
        <div className={`flex flex-col gap-2 ${props.className || ""}`}>
            {text.length > 0 && <div>{text.join(", ")}</div>}
            {links.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {links.map((link) => {
                        const upload = isUpload(link)
                        return (
                            <a
                                key={link}
                                href={link}
                                download={upload || undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={link}
                                className="flex w-fit items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 no-underline hover:bg-slate-50"
                            >
                                {upload ? <IconDownload size={12} stroke={2}/> : <IconExternalLink size={12} stroke={2}/>}
                                {upload ? "Download" : `Open link (${hostOf(link)})`}
                            </a>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
