import * as React from 'react';
import {IconAward, IconCheck, IconExternalLink, IconSearch} from "@tabler/icons";
import {Checkbox, Text} from "@mantine/core";
import {closeAllModals, openConfirmModal, openModal} from "@mantine/modals";
import {Emblem} from "../../components/media/Emblem/Emblem";
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {PathwayFilterPills} from "../../components/navigation/PathwayFilterPills/PathwayFilterPills";
import {classOptionLabels} from "../../utils/classOptions";
import {
    alreadyCreditedCount,
    eligibleStudents,
    filterBadges,
    filterByName,
    filterByPathway,
    NO_PATHWAY,
    pathwayChoices,
    recipientIds,
    resolvePathwayFilter,
    rosterMatchesScope,
    Scope,
} from "./scope";

/**
 * ValidationCenterClass
 */
export type ValidationCenterClass = { classId: string, name: string, active: boolean, description?: string, numberOfStudents?: number }

/**
 * ValidationCenterBadge
 */
export type ValidationCenterBadge = {
    badgeId: string
    displayName: string
    // Shown beside the name when supplied, to tell similar badges apart, and offered as a filter above the list.
    pathwayName?: string
    // Which pathway the badge is in, for the filter. Optional: without it the pathway's name is used, which is only
    // a problem if two pathways share a name.
    pathwayId?: string
    // Points the badge is worth (its weight).
    points?: number
    // For the "Details" preview, so an educator can tell what a badge is before crediting it. All optional:
    // whatever is missing is simply left out of the preview.
    description?: string
    imageURL?: string
    // The names of the lessons the badge is made of.
    lessonNames?: string[]
    // Where the badge's own page lives; the preview offers to open it in a new tab.
    href?: string
}

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
    // The class the roster below is for. "" means every class the signed-in educator can see (for an
    // administrator, every class in the organization).
    classId: string
    badges: ValidationCenterBadge[]
    badgeId: string
    students: ValidationCenterStudent[]
    onClassChange: (classId: string) => void
    onBadgeChange: (badgeId: string) => void
    // Validates credit for every currently-checked student against the currently selected badge,
    // after the educator confirms. The caller owns the API call and refreshes the roster itself.
    // Resolve to true on success to clear the checked boxes; false (or a void return) leaves them.
    onSubmit: (userIds: string[]) => void | Promise<boolean | void>
    // Only changes wording ("All classes" instead of "All my classes"); who can be credited is decided
    // by the roster the caller supplies, not by this flag.
    isAdmin?: boolean
    // Which "Who are you crediting?" option starts selected. Defaults to choosing students one by one.
    defaultScope?: Scope
}

const initials = (name: string) => name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase()

const SCOPES: { value: Scope, label: (isAdmin: boolean) => string }[] = [
    {value: "choose", label: () => "Choose students"},
    {value: "class", label: () => "Entire class"},
    {value: "all", label: (isAdmin) => isAdmin ? "All students" : "All my students"},
]

const SELECT_CLASS = "w-full max-w-xs rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-dark-blue-400 focus:border-sky-blue-400 focus:outline-none"
const LABEL_CLASS = "text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400"

const Card = (props: { step?: number, title: string, hint?: string, disabled?: boolean, children: React.ReactNode }) => (
    <section className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${props.disabled ? "opacity-60" : ""}`}>
        <h2 className="text-sm font-extrabold text-dark-blue-400">
            {props.step ? `${props.step}. ` : ""}{props.title}
        </h2>
        {props.hint && <p className="mt-1 text-xs text-slate-500">{props.hint}</p>}
        <div className="mt-4">{props.children}</div>
    </section>
)

const SearchField = (props: { value: string, onChange: (value: string) => void, placeholder: string, label: string }) => (
    <div className="relative">
        <IconSearch size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
            type="search"
            aria-label={props.label}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-dark-blue-400 placeholder:text-slate-400 focus:border-sky-blue-400 focus:outline-none"
        />
    </div>
)

const Avatar = (props: { name: string, avatar?: string }) => props.avatar
    ? <img className="h-8 w-8 shrink-0 rounded-full object-cover" src={props.avatar} alt="" />
    : <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint-400/20 text-[10px] font-bold text-dark-blue-400">
        {initials(props.name)}
    </div>

/**
 * BadgePreview. What the "Details" dialog shows: the badge's picture, name, pathway, points, its full description
 * and the lessons it is made of, with a way to pick it and a link to its own page. Nothing here needs a request; it is
 * all from the badge list the page already has.
 */
const BadgePreview = (props: { badge: ValidationCenterBadge, selected: boolean, onSelect: () => void }) => {
    const b = props.badge
    const lessons = b.lessonNames || []
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
                <Emblem imageURL={b.imageURL} alt="" size="lg" icon={IconAward} accent="mint" />
                <div className="min-w-0">
                    <div className="text-base font-extrabold text-dark-blue-400">{b.displayName}</div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-mint-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-dark-blue-400">Badge</span>
                        {b.pathwayName && <span className="text-xs text-slate-500">{b.pathwayName}</span>}
                        {b.points != null && b.points > 0 && <span className="text-xs font-bold text-slate-500">{b.points} pt{b.points === 1 ? "" : "s"}</span>}
                    </div>
                </div>
            </div>

            <div>
                <div className={LABEL_CLASS}>About this badge</div>
                {b.description && b.description.trim()
                    ? <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-dark-blue-400">{b.description.trim()}</p>
                    : <p className="mt-1.5 text-sm text-slate-500">No description has been added for this badge.</p>}
            </div>

            {lessons.length > 0 && (
                <div>
                    <div className={LABEL_CLASS}>{lessons.length} lesson{lessons.length === 1 ? "" : "s"} in this badge</div>
                    <ul className="mt-1.5 flex max-h-40 flex-col gap-1 overflow-y-auto pl-4 text-sm text-dark-blue-400" style={{listStyle: "disc"}}>
                        {lessons.map((name, i) => <li key={`${i}-${name}`}>{name}</li>)}
                    </ul>
                </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                {b.href ? (
                    <a href={b.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-dark-blue-400 hover:underline">
                        Open the badge page <IconExternalLink size={14} />
                    </a>
                ) : <span />}
                {props.selected ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-dark-blue-400"><IconCheck size={14} stroke={3} className="text-mint-400" /> Selected</span>
                ) : (
                    <button type="button" onClick={props.onSelect} className="rounded-lg bg-dark-blue-400 px-4 py-2 text-xs font-bold text-white">Select this badge</button>
                )}
            </div>
        </div>
    )
}

/**
 * ValidationCenter. Lets an educator directly credit students for a badge - superseding
 * lesson/criteria requirements and any outstanding comments, exactly like study's
 * BadgeActivity.Validate() (used via the bulk :validate endpoint). A student who already has credit
 * shows as credited instead of a checkbox, since re-validating an already-finished badge is a no-op
 * on the backend (Validate guards on FinishedAt != nil just like Submit).
 *
 * Three steps, in the order an educator thinks about it: which badge, who gets it (chosen students, an
 * entire class, or everyone the educator can see), and a review panel that says exactly how many people
 * will be credited before the one confirmation. Badges only: lessons cannot be credited yet, and how a
 * credit was awarded is not recorded, so neither is offered.
 * @param props
 * @constructor
 */
export const ValidationCenter = (props: ValidationCenterProps) => {
    const isAdmin = !!props.isAdmin
    const classLabels = classOptionLabels(props.classes || [])
    const [scope, setScope] = React.useState<Scope>(props.defaultScope || "choose")
    const [selected, setSelected] = React.useState<Record<string, boolean>>({})
    const [badgeQuery, setBadgeQuery] = React.useState("")
    const [pathwayFilter, setPathwayFilter] = React.useState("")
    const [studentQuery, setStudentQuery] = React.useState("")

    // Clear selections whenever the visible roster changes (a different class or badge) so a stale
    // selection from a previous badge is never silently carried into this one's submission.
    React.useEffect(() => {
        setSelected({})
    }, [props.classId, props.badgeId])

    const badge = props.badges.find((b) => b.badgeId === props.badgeId)
    const badgeName = badge?.displayName || "this badge"
    const eligible = eligibleStudents(props.students)
    const rosterReady = !props.loading && rosterMatchesScope(scope, props.classId)
    // Only students who can still receive credit count as selected, and nobody is credited from a roster
    // that is not the one the chosen scope names (see scope.ts).
    const recipients = props.loading ? [] : recipientIds({scope, classId: props.classId, students: props.students, selected})
    const skipped = alreadyCreditedCount({scope, classId: props.classId, students: props.students})
    const pathways = pathwayChoices(props.badges)
    const activePathway = resolvePathwayFilter(pathwayFilter, pathways)
    const visibleBadges = filterBadges(filterByPathway(props.badges, activePathway), badgeQuery)
    const badgesNarrowed = badgeQuery.trim() !== "" || activePathway !== ""
    const clearBadgeFilters = () => { setBadgeQuery(""); setPathwayFilter("") }
    const visibleStudents = filterByName(props.students, studentQuery)
    const className = props.classId ? (classLabels[props.classId] || props.classes.find((c) => c.classId === props.classId)?.name || "") : ""

    const toggle = (userId: string, checked: boolean) => setSelected((prev) => ({...prev, [userId]: checked}))

    // Opens the details dialog for a badge without choosing it. "Select this badge" inside it does that.
    const previewBadge = (b: ValidationCenterBadge) => openModal({
        title: <span className="text-sm font-extrabold text-dark-blue-400">Badge details</span>,
        centered: true,
        size: "lg",
        children: (
            <BadgePreview
                badge={b}
                selected={b.badgeId === props.badgeId}
                onSelect={() => { props.onBadgeChange(b.badgeId); closeAllModals() }}
            />
        ),
    })

    const onScopeChange = (next: Scope) => {
        setScope(next)
        setStudentQuery("")
        // "All students" is the roster with no class chosen. Switching to it asks the page for that roster.
        if (next === "all" && props.classId) {
            props.onClassChange("")
        }
    }

    // Crediting bypasses lesson/criteria requirements and open comments, and can't be undone from
    // here, so it gets an explicit confirmation step like the other destructive actions.
    const onConfirmSubmit = () => {
        const userIds = recipients
        const count = userIds.length
        openConfirmModal({
            title: `Credit ${count} student${count === 1 ? "" : "s"} for "${badgeName}"?`,
            centered: true,
            children: (
                <Text size="sm">
                    They'll get credit for this badge even if they haven't finished its lessons or have
                    open comments on it. Credit can't be removed once it's given.
                </Text>
            ),
            labels: { confirm: 'Give Credit', cancel: "Cancel" },
            onConfirm: () => {
                Promise.resolve(props.onSubmit(userIds))
                    .then((ok) => { if (ok === true) setSelected({}) })
                    .catch(() => {})
            },
        })
    }

    const onSelectAll = (checked: boolean) => {
        const next: Record<string, boolean> = {}
        if (checked) eligible.forEach((s) => { next[s.userId] = true })
        setSelected(next)
    }

    const selectedCount = recipients.length
    const classOptions = props.classes.map((c) => <option key={c.classId} value={c.classId}>{classLabels[c.classId] || c.name}</option>)

    return (
        <div className="flex w-full flex-col gap-5 px-4 py-8">
            <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">Validation Center</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Give credit for a badge a student earned outside PathLink: one student, a class, or {isAdmin ? "everyone" : "all of your students"}.
                </p>
            </div>

            <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
                <div className="flex min-w-0 flex-col gap-5">
                    <Card step={1} title="What are you crediting?">
                        {props.badges.length === 0 ? (
                            <PlaceholderBanner
                                title="No badges to display"
                                description="There are no badges to give credit for yet."
                                loading={props.loading}
                                icon="badges"
                            />
                        ) : (
                            <div className="flex flex-col gap-3">
                                {(pathways.choices.length > 0) && (
                                    <div className="flex flex-col gap-2" role="group" aria-label="Filter badges by pathway">
                                        <div className={LABEL_CLASS}>Pathway</div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <PathwayFilterPills
                                                pathways={pathways.choices.map((c) => ({pathwayId: c.key, title: c.label}))}
                                                selected={activePathway}
                                                onChange={setPathwayFilter}
                                            />
                                            {pathways.withoutPathway > 0 && (
                                                <button
                                                    type="button"
                                                    aria-pressed={activePathway === NO_PATHWAY}
                                                    onClick={() => setPathwayFilter(NO_PATHWAY)}
                                                    className={`rounded-full border px-3.5 py-1.5 text-xs font-bold ${
                                                        activePathway === NO_PATHWAY
                                                            ? "border-sky-blue-400/40 bg-sky-blue-400/20 text-dark-blue-400"
                                                            : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                                                    }`}
                                                >
                                                    Other
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <SearchField value={badgeQuery} onChange={setBadgeQuery} placeholder="Search badges" label="Search badges" />
                                {badgesNarrowed && (
                                    <div className="flex items-center justify-between gap-3 text-xs text-slate-500" aria-live="polite">
                                        <span>Showing {visibleBadges.length} of {props.badges.length} badges</span>
                                        <button type="button" onClick={clearBadgeFilters} className="font-bold text-dark-blue-400 hover:underline">Clear filters</button>
                                    </div>
                                )}
                                <div className="max-h-72 overflow-y-auto rounded-xl border border-slate-100" role="group" aria-label="Badges">
                                    {visibleBadges.length === 0 && (
                                        <div className="px-4 py-6 text-center text-sm text-slate-500">
                                            No badges match {badgeQuery.trim() ? <>"{badgeQuery.trim()}"</> : "this pathway filter"}
                                            {badgeQuery.trim() && activePathway ? " with this pathway filter" : ""}.
                                        </div>
                                    )}
                                    {visibleBadges.map((b, i) => {
                                        const isSelected = b.badgeId === props.badgeId
                                        return (
                                            <div
                                                key={b.badgeId}
                                                className={`flex items-center ${i < visibleBadges.length - 1 ? "border-b border-slate-100" : ""} ${isSelected ? "bg-mint-400/15" : "bg-white hover:bg-slate-50"}`}
                                            >
                                                <button
                                                    type="button"
                                                    aria-pressed={isSelected}
                                                    onClick={() => props.onBadgeChange(b.badgeId)}
                                                    className="flex min-w-0 flex-1 items-center justify-between gap-4 px-4 py-3 text-left"
                                                >
                                                    <div className="min-w-0">
                                                        <div className="truncate text-sm font-bold text-dark-blue-400">{b.displayName}</div>
                                                        <div className="mt-1 flex flex-wrap items-center gap-2">
                                                            <span className="rounded-full bg-mint-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-dark-blue-400">Badge</span>
                                                            {b.pathwayName && <span className="truncate text-xs text-slate-500">{b.pathwayName}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 items-center gap-3">
                                                        {b.points != null && b.points > 0 && (
                                                            <span className="text-xs font-bold text-slate-500">{b.points} pt{b.points === 1 ? "" : "s"}</span>
                                                        )}
                                                        {isSelected && <IconCheck size={18} stroke={3} className="text-mint-400" />}
                                                    </div>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => previewBadge(b)}
                                                    aria-label={`Details for ${b.displayName}`}
                                                    className="mr-3 shrink-0 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-dark-blue-400 hover:bg-slate-50"
                                                >
                                                    Details
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </Card>

                    <Card
                        step={2}
                        title="Who are you crediting?"
                        hint={props.badgeId ? undefined : "Choose a badge first. Credit already given is shown once a badge is selected."}
                        disabled={!props.badgeId}
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex w-fit max-w-full flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1" role="tablist" aria-label="Who to credit">
                                {SCOPES.map((s) => (
                                    <button
                                        key={s.value}
                                        type="button"
                                        role="tab"
                                        aria-selected={scope === s.value}
                                        disabled={!props.badgeId}
                                        onClick={() => onScopeChange(s.value)}
                                        className={`rounded-lg px-4 py-2 text-xs font-bold ${scope === s.value ? "bg-sky-blue-400/20 text-dark-blue-400" : "text-slate-400 hover:text-slate-600"}`}
                                    >
                                        {s.label(isAdmin)}
                                    </button>
                                ))}
                            </div>

                            {scope === "choose" && (
                                <div className="flex flex-col gap-1.5">
                                    <label className={LABEL_CLASS} htmlFor="vc-class-choose">Class</label>
                                    <select
                                        id="vc-class-choose"
                                        value={props.classId}
                                        disabled={!props.badgeId}
                                        onChange={(e) => props.onClassChange(e.target.value)}
                                        className={SELECT_CLASS}
                                    >
                                        <option value="">{isAdmin ? "All classes" : "All my classes"}</option>
                                        {classOptions}
                                    </select>
                                </div>
                            )}

                            {scope === "class" && (
                                <div className="flex flex-col gap-1.5">
                                    <label className={LABEL_CLASS} htmlFor="vc-class-entire">Class</label>
                                    <select
                                        id="vc-class-entire"
                                        value={props.classId}
                                        disabled={!props.badgeId}
                                        onChange={(e) => props.onClassChange(e.target.value)}
                                        className={SELECT_CLASS}
                                    >
                                        <option value="">Select a class</option>
                                        {classOptions}
                                    </select>
                                </div>
                            )}

                            {props.badgeId && scope === "class" && !props.classId ? (
                                <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-6 text-center text-sm text-slate-500">
                                    Select a class to credit everyone in it who doesn't have credit yet.
                                </div>
                            ) : props.badgeId && props.students.length === 0 && !props.loading ? (
                                <PlaceholderBanner
                                    title="No students to display"
                                    description={props.classId ? "There are no students in this class yet." : "There are no students in your classes yet."}
                                    loading={props.loading}
                                    icon="groups"
                                />
                            ) : props.badgeId ? (
                                <div className="flex flex-col gap-3">
                                    <SearchField value={studentQuery} onChange={setStudentQuery} placeholder="Search students" label="Search students" />
                                    <div className="overflow-hidden rounded-xl border border-slate-100">
                                        <div className="grid grid-cols-[2.2fr_1fr] items-center gap-3 border-b border-slate-100 bg-slate-50/60 px-5 py-3">
                                            <div className={LABEL_CLASS}>Student</div>
                                            <div className={`flex items-center justify-center gap-2 ${LABEL_CLASS}`}>
                                                {scope === "choose" ? (
                                                    <>
                                                        <Checkbox
                                                            aria-label="Select every student who does not have credit"
                                                            checked={eligible.length > 0 && selectedCount === eligible.length}
                                                            indeterminate={selectedCount > 0 && selectedCount < eligible.length}
                                                            onChange={(e) => onSelectAll(e.currentTarget.checked)}
                                                            disabled={eligible.length === 0}
                                                        />
                                                        Give Credit
                                                    </>
                                                ) : "Status"}
                                            </div>
                                        </div>
                                        <div className="max-h-80 overflow-y-auto">
                                            {visibleStudents.length === 0 && (
                                                <div className="px-5 py-6 text-center text-sm text-slate-500">No students match "{studentQuery.trim()}".</div>
                                            )}
                                            {visibleStudents.map((row, i) => (
                                                <div
                                                    key={row.userId}
                                                    className={`grid grid-cols-[2.2fr_1fr] items-center gap-3 px-5 py-3 ${i < visibleStudents.length - 1 ? "border-b border-slate-100" : ""}`}
                                                >
                                                    <div className="flex min-w-0 items-center gap-2.5">
                                                        <Avatar name={row.name} avatar={row.avatar} />
                                                        <div className="truncate text-xs font-bold text-dark-blue-400">{row.name}</div>
                                                    </div>
                                                    <div className="flex justify-center">
                                                        {row.hasCredit ? (
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                                                <IconCheck size={12} stroke={3} className="text-mint-400" />
                                                                Credited
                                                            </span>
                                                        ) : scope === "choose" ? (
                                                            <Checkbox
                                                                aria-label={`Give credit to ${row.name}`}
                                                                checked={!!selected[row.userId]}
                                                                onChange={(e) => toggle(row.userId, e.currentTarget.checked)}
                                                            />
                                                        ) : (
                                                            <span className="rounded-full bg-mint-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-dark-blue-400">
                                                                {rosterReady ? "Will be credited" : "Updating"}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </Card>
                </div>

                <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
                    <h2 className={LABEL_CLASS}>Review &amp; confirm</h2>
                    {badge ? (
                        <div className="mt-3">
                            <div className="text-sm font-bold text-dark-blue-400">{badge.displayName}</div>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-mint-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-dark-blue-400">Badge</span>
                                {badge.points != null && badge.points > 0 && <span className="text-xs text-slate-500">{badge.points} pt{badge.points === 1 ? "" : "s"}</span>}
                            </div>
                            {badge.description && badge.description.trim() && (
                                <p className="mt-2.5 text-xs leading-relaxed text-slate-500 line-clamp-3">{badge.description.trim()}</p>
                            )}
                            <button type="button" onClick={() => previewBadge(badge)} className="mt-2 text-xs font-bold text-dark-blue-400 hover:underline">
                                View badge details →
                            </button>
                        </div>
                    ) : (
                        <p className="mt-3 text-sm text-slate-500">Choose a badge to continue.</p>
                    )}

                    <div className="mt-5 border-t border-slate-100 pt-4">
                        <div className={LABEL_CLASS}>Recipients</div>
                        <div className="mt-1 text-sm font-bold text-dark-blue-400" aria-live="polite">
                            {!props.badgeId ? "None yet"
                                : props.loading ? "Loading students…"
                                : scope === "class" && !props.classId ? "Select a class"
                                : !rosterReady ? "Updating…"
                                : `${selectedCount} student${selectedCount === 1 ? "" : "s"} will receive credit`}
                        </div>
                        {props.badgeId && rosterReady && scope !== "choose" && className && scope === "class" && (
                            <div className="mt-1 text-xs text-slate-500">Everyone in {className} without credit.</div>
                        )}
                        {skipped > 0 && (
                            <div className="mt-1 text-xs text-slate-500">
                                {skipped} already credited, skipped.
                            </div>
                        )}
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-slate-500">
                        Credit applies even if the lessons aren't finished or comments are open, and can't be removed once it's given.
                    </p>

                    <button
                        type="button"
                        onClick={onConfirmSubmit}
                        disabled={selectedCount === 0 || !props.badgeId}
                        className="mt-4 w-full rounded-lg bg-dark-blue-400 px-5 py-2.5 text-xs font-bold text-white disabled:opacity-40"
                    >
                        Credit {selectedCount > 0 ? `${selectedCount} ` : ""}Student{selectedCount === 1 ? "" : "s"}
                    </button>
                </aside>
            </div>
        </div>
    )
}
