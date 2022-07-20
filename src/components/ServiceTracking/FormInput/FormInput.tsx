import React from "react";

/**
 * FormInputProps
 */
export type FormInputProps = {
    headline?: string
    summary?: string
    value?: string
    type?: "text" | "number" | "tel" | "email" | "date" | "dropdown"
    options?: string[]
    placeholder?: string
    paragraph?: boolean;
    readonly?: boolean
    required?: boolean

    onChange?: (value: string) => void;
}

/**
 * FormInput
 * @param props
 * @constructor
 */
export const FormInput = (props: FormInputProps) => {
    return <div className="grid grid-cols-1 gap-y-2">
        {props.headline && (
            <div className="flex gap-x-1">
                <div className="flex items-start gap-x-4">
                    <div className="grow">
                        {props.headline && <p className="text-sm text-slate-600 font-semibold">{props.headline}</p>}
                        {props.summary && <p className="text-xs text-slate-500">{props.summary}</p>}
                    </div>
                </div>
                {!props.readonly && props.required && <p className="text-sm text-rose-600">*</p>}
            </div>
        )}

        <div>
            {
                (() => {
                    switch (props.type){
                        case "dropdown":
                            return <DropDownInput {...props}/>
                        default:
                            return <Input {...props}/>
                    }
                })()
            }
        </div>
    </div>
}


const DropDownInput = (props: FormInputProps) => {
    const writeClass = props.readonly ? "cursor-default" : "cursor-pointer px-3 py-2 border border-slate-300 shadow-sm focus:text-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
    const options = props.options || [];

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    };

    return (
        <select
            disabled={props.readonly}
            className={`appearance-none focus:outline-none mt-1 block w-full bg-white text-slate-500 ${writeClass} rounded-sm text-sm placeholder-slate-400`}
            required={props.required}
            name={props.headline}
            onChange={onChange}
        >
            <option value="">
                {props.readonly && !props.value ? "N/A" : "Select one"}
            </option>

            {options.map((option) => {
                return (
                    <option key={option} selected={props.value === option} value={option}>
                        {option}
                    </option>
                );
            })}
        </select>
    );
};

const Input = (props: FormInputProps) => {
    const type = props.readonly ? "text" : props.type
    const value = props.readonly ? props.value || "N/A" : props.value
    const writeClass = props.readonly ? "appearance-none cursor-default" : "px-3 py-2 border border-slate-300 shadow-sm focus:text-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    };

    return (
        <>
            {!props.paragraph && (
                <input
                    className={`mt-1 block w-full bg-white text-slate-500 ${writeClass} focus:outline-none rounded-sm text-sm placeholder-slate-400`}
                    required={props.required}
                    readOnly={props.readonly}
                    onChange={onChange}
                    name={props.headline}
                    type={type}
                    placeholder={props.placeholder}
                    value={value}
                />
            )}
            {props.paragraph && (
                <textarea
                    className={`resize-none text-slate-500 h-24 mt-1 block w-full bg-white focus:outline-none ${writeClass} rounded-sm text-sm placeholder-slate-400`}
                    readOnly={props.readonly}
                    required={props.required}
                    onChange={onChange}
                    name={props.headline}
                    value={value}
                    placeholder={props.placeholder}
                />
            )}
        </>
    );
};