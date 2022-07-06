/**
 * FormItemProps
 */
export type FormItemProps = {
    itemId?: string
    headline?: string
    summary?: string
    format?: "question" | "image" | "embed"
    questionType?: "radio" | "checkbox" | "drop down" | "file upload" | "text" | "date" | "time"
    options?: string[]
    paragraph?: boolean
    required?: boolean
    url?: string
    answerId?: string
    journalId?: string
    questionId?: string
    responses?: string[]

    onResponseChange?: (responses?: string[], file?: Blob) => void;
}

/**
 * FormItem
 * @param props
 * @constructor
 */
export const FormItem = (props: FormItemProps) => {
    throw new Error("not implemented")
}