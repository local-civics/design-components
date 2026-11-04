import * as React from 'react';
import {Modal} from "@mantine/core";
import {Item, formatDate} from "./shared";

/**
 * InvalidateModalProps
 */
export type InvalidateModalProps = {
    // The entry being invalidated. The modal is open exactly when this is set.
    item?: Item
    onClose: () => void
    // Resolves when the request has finished (successfully or not). The modal closes either way, so
    // a stale entry (the student edited it meanwhile) is never left open for a second attempt.
    onSubmit: (reason: string) => Promise<any>
}

const MAX_REASON = 500

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-dark-blue-400 focus:border-sky-blue-400 focus:outline-none"

/**
 * InvalidateModal. Asks for the reason an educator is invalidating a service hours entry. A reason is
 * required because the student sees it and has to be able to act on it.
 * @param props
 * @constructor
 */
export function InvalidateModal(props: InvalidateModalProps) {
    const [reason, setReason] = React.useState("")
    const [busy, setBusy] = React.useState(false)
    const entryId = props.item?.entryId

    React.useEffect(() => {
        setReason("")
        setBusy(false)
    }, [entryId])

    const canSubmit = !!reason.trim() && !busy

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!canSubmit) return
        setBusy(true)
        const finish = () => {
            setBusy(false)
            props.onClose()
        }
        Promise.resolve(props.onSubmit(reason.trim())).then(finish, finish)
    }

    const item = props.item

    return (
        <Modal
            opened={!!item}
            onClose={props.onClose}
            title={<span className="text-base font-extrabold text-dark-blue-400">Invalidate Service Hours</span>}
            size="md"
            centered
        >
            {item && (
                <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
                    <div className="rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs text-slate-600">
                        <span className="font-bold text-dark-blue-400">{item.studentName || "Student"}</span>
                        {" · "}{item.hostName || item.serviceType}
                        {" · "}{formatDate(item.serviceDate)}
                        {" · "}{item.hours} hr{item.hours === 1 ? "" : "s"}
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-bold text-slate-500">
                            Reason (the student will see this)
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            maxLength={MAX_REASON}
                            placeholder="Tell the student what is missing or needs to change..."
                            rows={4}
                            className={`${inputClass} resize-none`}
                        />
                        <div className="mt-1 text-right text-[11px] text-slate-400">{reason.length}/{MAX_REASON}</div>
                    </div>

                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className="mt-1 rounded-lg bg-dark-blue-400 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-40"
                    >
                        {busy ? "Invalidating..." : "Invalidate"}
                    </button>
                </form>
            )}
        </Modal>
    );
}
