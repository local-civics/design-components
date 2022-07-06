import {FormItemProps} from "../FormItem/FormItem";

/**
 * FormProps
 */
export type FormProps = {
    formId?: string
    headline?: string
    summary?: string
    eta?: string
    imageURL?: string
    items?: FormItemProps[]

    onSubmit?: () => void
}

/**
 * Form
 * @param props
 * @constructor
 */
export const Form = (props: FormProps) => {
    throw new Error("not implemented")
}