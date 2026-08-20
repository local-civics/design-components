import {IconArrowLeft, IconCategory2, IconRoute} from "@tabler/icons";
import {useState} from "react";
import * as React from 'react';
import {StatsGroup} from "../../components/data/StatsGroup/StatsGroup";
import {Emblem} from "../../components/media/Emblem/Emblem";
import {SplitButton} from "./SplitButton";
import {Table, Item} from "./Table";
import {Table as BadgeTable, Item as BadgeItem} from "./BadgeTable";
import {CategoriesModal} from "./CategoriesModal";
import {PathwayCategory} from "./buildCategoryTree";

/**
 * PathwayUserItem
 */
export type PathwayUserItem = Item

/**
 * PathwayClass
 */
export type PathwayClass = {
    classId: string
    name: string
    active: boolean
}

/**
 * PathwayProps
 */
export type PathwayProps = {
    loading: boolean
    title: string,
    description: string
    imageURL?: string
    displayTags?: string[]
    criteria?: Record<string, number>
    classes: PathwayClass[]
    badges: BadgeItem[]
    classId: string
    students: PathwayUserItem[]
    categories: { categoryId: string; name: string; maxPoints?: number }[]
    allCategories?: PathwayCategory[]
    href: string
    trial?: boolean
    badgesCompleted?: number

    onBackClick: () => void;
    onClassChange: (classId: string) => void;
    onCopyLinkClick: () => void;
    onExportDataClick: () => void;
}

const TABS = [
    {label: "By Badge", value: "badges"},
    {label: "By student", value: "students"},
]

/**
 * Pathway
 * @param props
 * @constructor
 */
export const Pathway = (props: PathwayProps) => {
    const [tab, setTab] = useState("badges")
    const [categoriesOpen, setCategoriesOpen] = useState(false)

    const numberOfStudents = props.students.length
    const numberOfBadgesEarned = numberOfStudents > 0 ? props.students.filter(u => u.isComplete).length : 0

    const criteria = props.criteria || {}
    // Sourced from `categories` (not Object.keys(criteria)) so this only renders once readable
    // names have arrived - criteria lands on the first data resolve, category names a tick later.
    const criteriaCategories = (props.categories || []).filter((c) => criteria[c.categoryId] !== undefined)

    // The pathway's own root category (no parentCategoryId - only known via `allCategories`,
    // since the narrower `categories` doesn't carry it) is redundant as a badge-grouping section:
    // every badge tagged with it is also tagged with a more specific descendant category, so its
    // group would just repeat every badge already shown elsewhere. Excluded from badge groupings
    // only - the criteria pills below still show the root's own overall threshold.
    const rootCategoryIds = new Set(
        (props.allCategories || []).filter((c) => !c.parentCategoryId).map((c) => c.categoryId)
    )
    const badgeGroupCategories = criteriaCategories.filter((c) => !rootCategoryIds.has(c.categoryId))

    return (
        <div className="flex flex-col gap-5 px-4 py-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <Emblem imageURL={props.imageURL} alt={props.title} size="lg" icon={IconRoute} accent="cyan" />
                    <div className="space-y-1.5">
                        <div onClick={props.onBackClick} className="flex w-max cursor-pointer items-center gap-1 text-xs font-bold text-sky-blue-400">
                            <IconArrowLeft size={13} stroke={2.5} />
                            Back
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">{props.title || "Pathway"}</h1>

                        {!!props.displayTags?.length && (
                            <div className="flex flex-wrap gap-1.5">
                                {props.displayTags.map((tag) => (
                                    <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">{tag}</span>
                                ))}
                            </div>
                        )}

                        <p className="max-w-xl text-sm text-slate-500">{props.description || "No description"}</p>

                        {(criteriaCategories.length > 0 || !!props.allCategories?.length) && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                                {criteriaCategories.length > 0 && (
                                    <>
                                        <span className="text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400">Criteria</span>
                                        {criteriaCategories.map((c) => (
                                            <span key={c.categoryId} className="rounded-full bg-sky-blue-400/15 px-2.5 py-1 text-[10px] font-bold text-dark-blue-400">
                                                {c.name}: {criteria[c.categoryId]}+{c.maxPoints ? ` of ${c.maxPoints}` : ""} pts
                                            </span>
                                        ))}
                                    </>
                                )}
                                {!!props.allCategories?.length && (
                                    <button
                                        onClick={() => setCategoriesOpen(true)}
                                        className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-dark-blue-400 hover:bg-slate-50"
                                    >
                                        <IconCategory2 size={12} stroke={2} /> Categories
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {!props.trial && (
                    <SplitButton
                        href={props.href}
                        onCopyLinkClick={props.onCopyLinkClick}
                        onExportDataClick={props.onExportDataClick}
                    />
                )}
            </div>

            <StatsGroup data={[
                {
                    title: props.trial ? "BADGES SUBMITTED" : "PATHWAY COMPLETION",
                    value: props.trial ? 0 : numberOfBadgesEarned,
                },
            ]}/>

            {!props.trial && (
                <div className="relative w-full max-w-xs">
                    <IconCategory2 size={16} stroke={2} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                        value={props.classId}
                        onChange={(e) => props.onClassChange(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-dark-blue-400 focus:border-sky-blue-400 focus:outline-none"
                    >
                        <option value="">All classes</option>
                        {props.classes.map((c) => <option key={c.classId} value={c.classId}>{c.name}</option>)}
                    </select>
                </div>
            )}

            <div className="flex flex-col gap-3">
                {!props.trial && (
                    <div className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-white p-1">
                        {TABS.map((t) => (
                            <button
                                key={t.value}
                                onClick={() => setTab(t.value)}
                                className={`rounded-lg px-4 py-2 text-xs font-bold ${tab === t.value ? "bg-sky-blue-400/20 text-dark-blue-400" : "text-slate-400 hover:text-slate-600"}`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                )}

                {(!!props.trial || tab === "badges") && <BadgeTable loading={props.loading} badges={props.badges} categories={badgeGroupCategories} />}
                {(!props.trial && tab === "students") && <Table loading={props.loading} items={props.students} categories={props.categories} />}
            </div>

            <CategoriesModal
                opened={categoriesOpen}
                onClose={() => setCategoriesOpen(false)}
                categories={props.allCategories || []}
                criteria={criteria}
            />
        </div>
    )
}
