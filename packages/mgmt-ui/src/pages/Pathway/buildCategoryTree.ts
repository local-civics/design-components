/**
 * PathwayCategory
 */
export type PathwayCategory = {
    categoryId: string
    name: string
    description?: string
    parentCategoryId?: string
    maxPoints?: number
}

/**
 * CategoryTreeNode
 */
export type CategoryTreeNode = PathwayCategory & { children: CategoryTreeNode[] }

/**
 * buildCategoryTree. Converts a flat parent-pointer list into an N-level tree. A category is a
 * root when its parentCategoryId is falsy, self-referential, or points at an id absent from this
 * list (orphaned reference) - it is never dropped. Cyclical references are defused via
 * ancestry-tracking during recursion, and no category is ever attached twice.
 * @param categories
 */
export function buildCategoryTree(categories: PathwayCategory[]): CategoryTreeNode[] {
    const byId = new Map<string, PathwayCategory>();
    categories.forEach((c) => byId.set(c.categoryId, c));

    const childrenByParent = new Map<string, PathwayCategory[]>();
    categories.forEach((c) => {
        const parentId = c.parentCategoryId;
        const hasValidParent = !!parentId && parentId !== c.categoryId && byId.has(parentId);
        if (!hasValidParent) return;
        const siblings = childrenByParent.get(parentId!) || [];
        siblings.push(c);
        childrenByParent.set(parentId!, siblings);
    });

    const attached = new Set<string>();

    const attach = (category: PathwayCategory, ancestry: Set<string>): CategoryTreeNode => {
        attached.add(category.categoryId);
        const childAncestry = new Set(ancestry).add(category.categoryId);
        const children = (childrenByParent.get(category.categoryId) || [])
            .filter((child) => !childAncestry.has(child.categoryId))
            .map((child) => attach(child, childAncestry));
        return { ...category, children };
    };

    const roots = categories.filter((c) => {
        const parentId = c.parentCategoryId;
        return !parentId || parentId === c.categoryId || !byId.has(parentId);
    });

    const tree = roots.map((root) => attach(root, new Set()));

    categories.forEach((c) => {
        if (!attached.has(c.categoryId)) tree.push(attach(c, new Set()));
    });

    return tree;
}
