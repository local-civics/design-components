import * as React from 'react';
import { Modal } from "@mantine/core";
import { buildCategoryTree, CategoryTreeNode, PathwayCategory } from "./buildCategoryTree";

/**
 * CategoriesModalProps
 */
export type CategoriesModalProps = {
    opened: boolean
    onClose: () => void
    categories: PathwayCategory[]
    criteria: Record<string, number>
}

/**
 * CategoriesModal. Structural rubric view of a pathway's full category hierarchy - names,
 * descriptions where populated, minimum-required thresholds (from criteria), and point caps
 * (maxPoints), nested to reflect real parent/child relationships. No badge lists, no earned-points
 * computation - a reference view of how the pathway is configured, not a progress tracker.
 * @param props
 * @constructor
 */
export function CategoriesModal(props: CategoriesModalProps) {
    const tree = React.useMemo(() => buildCategoryTree(props.categories || []), [props.categories]);

    return (
        <Modal opened={props.opened} onClose={props.onClose} title="Category structure" size="lg" centered>
            <div className="flex max-h-[70vh] flex-col gap-2 overflow-y-auto pr-1">
                {tree.length === 0 && <p className="text-sm text-slate-400">No categories to display.</p>}
                {tree.map((node) => (
                    <CategoryNode key={node.categoryId} node={node} criteria={props.criteria} depth={0} />
                ))}
            </div>
        </Modal>
    );
}

const CategoryNode = (props: { node: CategoryTreeNode, criteria: Record<string, number>, depth: number }) => {
    const hasChildren = props.node.children.length > 0;
    const required = props.criteria[props.node.categoryId];

    return (
        <div className={hasChildren ? "rounded-lg border border-slate-100 bg-slate-50/60 p-3" : "rounded-lg px-3 py-2 hover:bg-slate-50"}>
            <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={props.depth === 0 ? "text-sm font-extrabold text-dark-blue-400" : "text-xs font-bold text-dark-blue-400"}>
                    {props.node.name}
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                    {required !== undefined && (
                        <span className="rounded-full bg-sky-blue-400/15 px-2 py-0.5 text-[10px] font-bold text-dark-blue-400">
                            min. {required} pts
                        </span>
                    )}
                    {!!props.node.maxPoints && (
                        <span className="rounded-full bg-gold-400/15 px-2 py-0.5 text-[10px] font-bold text-dark-blue-400">
                            cap {props.node.maxPoints} pts
                        </span>
                    )}
                </div>
            </div>

            {!!props.node.description?.trim() && (
                <p className="mt-0.5 text-xs text-slate-500">{props.node.description}</p>
            )}

            {hasChildren && (
                <div className="mt-3 flex flex-col gap-2 border-l-2 border-slate-200 pl-4">
                    {props.node.children.map((child) => (
                        <CategoryNode key={child.categoryId} node={child} criteria={props.criteria} depth={props.depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}
