import * as React from 'react';
import { Modal } from '@mantine/core';

/**
 * AccountPendingModalProps
 */
export type AccountPendingModalProps = {
    opened: boolean
    onClose: () => void
    loading?: boolean
    name?: string
    email?: string
    // Already-credited badge names for this email - the only kind of "preloaded material" an
    // account-less roster entry can have (they've never taken a real lesson, so File Locker's own
    // file/link submissions are always empty for them; this is bulk-upload/manual-validation credit
    // instead, fetched separately by the caller). Omitted while `loading` is true.
    credits?: string[]
    // Jumps to the student's full profile page (Student.tsx's own AccountPendingNotice) - only
    // rendered when the caller supplies it.
    onViewProfile?: () => void
}

/**
 * AccountPendingModal. File Locker's own local, non-navigating answer to "who is this and what's
 * already been recorded for them" for a roster entry with no real account - same honest framing as
 * Student.tsx's AccountPendingNotice, just in a pop-up rather than a full page, so an educator
 * skimming many students' submissions doesn't have to leave File Locker to check one. A student's
 * own submitted files are still reachable the normal way (expand their row, same as any other
 * student) - this pop-up is specifically about account status and credited badges, not a second
 * copy of the file list.
 * @param props
 * @constructor
 */
export function AccountPendingModal(props: AccountPendingModalProps) {
    return (
        <Modal
            opened={props.opened}
            onClose={props.onClose}
            title={<span className="text-base font-extrabold text-dark-blue-400">No account yet</span>}
            size="md"
            centered
        >
            <div className="flex flex-col gap-4">
                <div>
                    <div className="text-sm font-extrabold text-dark-blue-400">{props.name || props.email || "This student"}</div>
                    {!!props.name && !!props.email && <div className="text-xs text-slate-400">{props.email}</div>}
                </div>

                <p className="text-sm text-slate-500">
                    This email was added to a class roster, but no one has signed up under it in your
                    organization yet. Detailed progress can&apos;t be shown until they create an account.
                </p>

                {props.loading ? (
                    <p className="text-xs text-slate-400">Loading credited badges…</p>
                ) : props.credits && props.credits.length > 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                            Already credited for this email
                        </div>
                        <ul className="flex flex-col gap-2">
                            {props.credits.map((label, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-dark-blue-400">
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-400/20 text-xs font-bold text-mint-400">✓</span>
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-xs text-slate-400">No badges have been credited for this email yet.</p>
                )}

                {props.onViewProfile && (
                    <button
                        type="button"
                        onClick={props.onViewProfile}
                        className="self-start text-sm font-bold text-dark-blue-400 hover:underline"
                    >
                        View full profile →
                    </button>
                )}
            </div>
        </Modal>
    );
}
