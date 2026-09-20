import * as React from 'react';
import {IconCheck} from "@tabler/icons";
import {Checkbox} from "@mantine/core";
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * ValidationCenterClass
 */
export type ValidationCenterClass = { classId: string, name: string, active: boolean }

/**
 * ValidationCenterBadge
 */
export type ValidationCenterBadge = { badgeId: string, displayName: string }

/**
 * ValidationCenterStudent
 */
export type ValidationCenterStudent = { userId: string, name: string, avatar?: string, hasCredit: boolean }

/**
 * ValidationCenterProps
 */
export type ValidationCenterProps = {
    loading: boolean
    classes: ValidationCenterClass[]
    classId: string
    badges: ValidationCenterBadge[]
    badgeId: string
    students: ValidationCenterStudent[]
    onClassChange: (classId: string) => void
    onBadgeChange: (badgeId: string) => void
    // Validates credit for every currently-checked student against the currently selected badge.
    // The caller owns the actual API call and, per spec, reloads the page afterward to reflect the
    // new state - this component only ever hands back the selected student ids.
    onSubmit: (userIds: string[]) => void
}

const initials = (name: string) => name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase()

/**
 * ValidationCenter. Lets an educator directly credit one or more students for a badge - superseding
 * lesson/criteria requirements and any outstanding comments, exactly like study's
 * BadgeActivity.Validate() (used via the bulk :validate endpoint). A student who already has credit
 * shows a checkmark instead of a checkbox, since re-validating an already-finished badge is a no-op
 * on the backend (Validate guards on FinishedAt != nil just like Submit).
 * @param props
 * @constructor
 */
export const ValidationCenter = (props: ValidationCenterProps) => {
    const [selected, setSelected] = React.useState<Record<string, boolean>>({})

    // Clear selections whenever the visible roster changes (a different class or badge) so a stale
    // selection from a previous badge is never silently carried into this one's submission.
    React.useEffect(() => {
        setSelected({})
    }, [props.classId, props.badgeId])

    const toggle = (userId: string, checked: boolean) => setSelected((prev) => ({...prev, [userId]: checked}))
    const selectedIds = Object.keys(selected).filter((userId) => selected[userId])
    const eligible = props.students.filter((s) => !s.hasCredit)

    const onSelectAll = (checked: boolean) => {
        const next: Record<string, boolean> = {}
        if (checked) eligible.forEach((s) => { next[s.userId] = true })
        setSelected(next)
    }

    return (
        <div className="flex w-full flex-col gap-5 px-4 py-8">
            <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">Validation Center</h1>
                <p className="mt-1 text-sm text-slate-500">Directly credit students for a badge</p>
            </div>

            <div className="flex flex-wrap gap-3">
                <select
                    value={props.classId}
                    onChange={(e) => props.onClassChange(e.target.value)}
                    className="w-64 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-dark-blue-400 focus:border-sky-blue-400 focus:outline-none"
                >
                    <option value="">Select a class</option>
                    {props.classes.map((c) => <option key={c.classId} value={c.classId}>{c.name}</option>)}
                </select>

                <select
                    value={props.badgeId}
                    onChange={(e) => props.onBadgeChange(e.target.value)}
                    className="w-64 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-dark-blue-400 focus:border-sky-blue-400 focus:outline-none"
                >
                    <option value="">Select a badge</option>
                    {props.badges.map((b) => <option key={b.badgeId} value={b.badgeId}>{b.displayName}</option>)}
                </select>
            </div>

            {!props.badgeId ? (
                <PlaceholderBanner
                    title="Select a badge"
                    description="Choose a badge above to see which students already have credit and give it to the rest."
                    loading={props.loading}
                    icon="badges"
                />
            ) : props.students.length === 0 ? (
                <PlaceholderBanner
                    title="No students to display"
                    description="There are no students in this class yet."
                    loading={props.loading}
                    icon="groups"
                />
            ) : (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="grid grid-cols-[2.2fr_1fr] items-center gap-3 border-b border-slate-100 px-5 py-3">
                        <div className="text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400">Student</div>
                        <div className="flex items-center justify-center gap-2 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400">
                            <Checkbox
                                checked={eligible.length > 0 && selectedIds.length === eligible.length}
                                indeterminate={selectedIds.length > 0 && selectedIds.length < eligible.length}
                                onChange={(e) => onSelectAll(e.currentTarget.checked)}
                                disabled={eligible.length === 0}
                            />
                            Give Credit
                        </div>
                    </div>
                    {props.students.map((row, i) => (
                        <div
                            key={row.userId}
                            className={`grid grid-cols-[2.2fr_1fr] items-center gap-3 px-5 py-3.5 ${i < props.students.length - 1 ? "border-b border-slate-100" : ""}`}
                        >
                            <div className="flex min-w-0 items-center gap-2.5">
                                {row.avatar
                                    ? <img className="h-8 w-8 shrink-0 rounded-full object-cover" src={row.avatar} alt="" />
                                    : <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint-400/20 text-[10px] font-bold text-dark-blue-400">
                                        {initials(row.name)}
                                    </div>}
                                <div className="truncate text-xs font-bold text-dark-blue-400">{row.name}</div>
                            </div>
                            <div className="flex justify-center">
                                {row.hasCredit
                                    ? <IconCheck size={18} stroke={3} className="text-mint-400" />
                                    : <Checkbox checked={!!selected[row.userId]} onChange={(e) => toggle(row.userId, e.currentTarget.checked)} />}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {props.badgeId && props.students.length > 0 && (
                <div className="flex justify-end">
                    <button
                        onClick={() => props.onSubmit(selectedIds)}
                        disabled={selectedIds.length === 0}
                        className="rounded-lg bg-dark-blue-400 px-5 py-2.5 text-xs font-bold text-white disabled:opacity-40"
                    >
                        Validate {selectedIds.length > 0 ? `${selectedIds.length} ` : ""}Student{selectedIds.length === 1 ? "" : "s"}
                    </button>
                </div>
            )}
        </div>
    )
}
