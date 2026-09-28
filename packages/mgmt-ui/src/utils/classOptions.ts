/**
 * The fields a class dropdown option needs. description and numberOfStudents are optional: hub
 * passes its classes through untyped, and both are present on them.
 */
export type ClassOption = {
    classId: string
    name: string
    description?: string
    numberOfStudents?: number
}

const studentCount = (n: number) => `${n} student${n === 1 ? "" : "s"}`

/**
 * Labels for a class dropdown, keyed by classId. A class whose name is unique keeps its plain name.
 * Classes that share a name get told apart: "Test Class - A PathLink Demo" when the description
 * adds something, otherwise "Test Class (6 students)". Picking the wrong "Test Class" in Validation
 * Center credits the wrong roster, so this matters more than it looks.
 * @param classes
 */
export const classOptionLabels = (classes: ClassOption[]): Record<string, string> => {
    const key = (value?: string) => (value || "").trim().toLowerCase()
    const byName: Record<string, ClassOption[]> = {}
    classes.forEach((c) => {
        byName[key(c.name)] = [...(byName[key(c.name)] || []), c]
    })

    const labels: Record<string, string> = {}
    Object.values(byName).forEach((group) => {
        if (group.length < 2) {
            group.forEach((c) => (labels[c.classId] = c.name))
            return
        }

        // Use the description only when it says something the name doesn't, and only when it's
        // different from the other same-named classes' descriptions; otherwise the student count.
        const descriptions = group.map((c) => key(c.description))
        group.forEach((c, i) => {
            const description = (c.description || "").trim()
            const distinct = !!description
                && key(description) !== key(c.name)
                && descriptions.filter((d) => d === descriptions[i]).length === 1
            if (distinct) {
                labels[c.classId] = `${c.name} — ${description}`
            } else if (typeof c.numberOfStudents === "number") {
                labels[c.classId] = `${c.name} (${studentCount(c.numberOfStudents)})`
            } else {
                labels[c.classId] = c.name
            }
        })
    })
    return labels
}
