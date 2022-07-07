import React  from "react";
import {Icon} from "../../Icon";

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
    const checkIconColor = props.responses ? "text-green-500" : "text-gray-300"
    const contentMaxWidth = props.format === "question" ? "max-w-md" : ""
    const Body = () => {
        switch (true){
        case props.format === "embed":
            return <Embed {...props }/>
        case props.format === "image":
            return <Image {...props} />
        case props.questionType === "radio":
            return <RadioQuestion {...props} />
        case props.questionType === "checkbox":
            return <CheckboxQuestion {...props} />
        case props.questionType === "drop down":
            return <DropDownQuestion {...props} />
        case props.questionType === "file upload":
            return <FileUploadQuestion {...props} />
        case props.questionType === "text":
            return <TextQuestion {...props} />
        case props.questionType === "date":
            return <DateQuestion {...props} />
        case props.questionType === "time":
            return <TimeQuestion {...props} />
        default:
            return null
        }
    }

    return <div className="bg-white rounded-md p-5 shadow-sm grid grid-cols-1 gap-y-8">
        <div className="flex gap-x-1">
            <div className="flex items-start gap-x-4">
                { props.format === "question" && <div className={`${checkIconColor} w-5 h-5 mt-1`}>
                    <Icon name="positive" />
                </div> }
                <div className="grow max-w-md">
                    { props.headline && <p className="text-lg text-slate-600 font-semibold">{props.headline}</p> }
                    { props.summary && <p className="text-sm text-slate-500">{props.summary}</p> }
                </div>
            </div>
            { props.required && <p className="text-sm text-rose-600">*</p>}
        </div>

        <div className={`${contentMaxWidth} ml-1`}>
            <Body />
        </div>
    </div>
}

const RadioQuestion = (props: FormItemProps) => {
    const options = props.options || []
    const responses = props.responses || []
    const values: {[key: string]: boolean} = {}; responses.forEach(key => values[key] = true)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(props.onResponseChange){
            props.onResponseChange([e.target.value])
        }
    }

    return <fieldset className="grid grid-cols-1 gap-y-8">
        {
            options.map((option, index) => {
                return <div key={option}>
                    <label className="flex gap-x-4 items-center">
                        <input checked={values[option]} onChange={onChange} required={props.required} type="radio" value={option} name={props.headline}/>
                        <div><span className="font-bold">{String.fromCharCode(65 + index)}.</span> {option}</div>
                    </label>
                </div>
            })
        }
    </fieldset>
}

const CheckboxQuestion = (props: FormItemProps) => {
    const options = props.options || []
    const responses = props.responses || []
    const values: {[key: string]: boolean} = {}; responses.forEach(key => values[key] = true)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(props.onResponseChange){
            props.onResponseChange([e.target.value])
        }
    }

    return <fieldset className="grid grid-cols-1 gap-y-8">
        {
            options.map((option) => {
                return <div key={option}>
                    <label className="flex gap-x-4 items-center">
                        <input checked={values[option]} onChange={onChange} required={props.required} type="checkbox" value={option} name={props.headline}/>
                        <div>{option}</div>
                    </label>
                </div>
            })
        }
    </fieldset>
}

const DropDownQuestion = (props: FormItemProps) => {
    const options = props.options || []
    const responses = props.responses || []
    const values: {[key: string]: boolean} = {}; responses.forEach(key => values[key] = true)

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(props.onResponseChange){
            props.onResponseChange([e.target.value])
        }
    }

    return <select className={`appearance-none mt-1 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-sm text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none`}
                   required={props.required}
                   name={props.headline}
                   onChange={onChange}>
        {
            options.map((option) => {
                return <option selected={values[option]} value={option}>{option}</option>
            })
        }
    </select>
}

const FileUploadQuestion = (props: FormItemProps) => {
    throw new Error("not implemented")
}

const TextQuestion = (props: FormItemProps) => {
    const minimum = props.paragraph ? 100 : 400
    const responses = props.responses || []
    const response = responses.length > 0 ? responses[0] : ""

    const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        if(props.onResponseChange){
            props.onResponseChange([e.target.value])
        }
    }

    return <>
        { !props.paragraph && <input
            className="mt-1 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-sm text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            required={props.required}
            minLength={minimum}
            onChange={onChange}
            name={props.headline}
            type="text"
            placeholder="Your answer"
            value={response}
        /> }
        { props.paragraph && <textarea
            className="resize-none text-slate-500 focus:text-slate-600 h-24 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-sm text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            required={props.required}
            minLength={minimum}
            onChange={onChange}
            name={props.headline}
            placeholder="Your answer"
            value={response}
        /> }
    </>
}

const DateQuestion = (props: FormItemProps) => {
    const responses = props.responses || []
    const response = responses.length > 0 ? responses[0] : ""

    const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        if(props.onResponseChange){
            props.onResponseChange([e.target.value])
        }
    }

    return <input
        className="mt-1 block w-full px-3 pt-3 pb-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-sm text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        required={props.required}
        onChange={onChange}
        name={props.headline}
        type="date"
        value={response}
    />
}

const TimeQuestion = (props: FormItemProps) => {
    const responses = props.responses || []
    const response = responses.length > 0 ? responses[0] : ""

    const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        if(props.onResponseChange){
            props.onResponseChange([e.target.value])
        }
    }

    return <input
        className="mt-1 block w-full px-3 pt-3 pb-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-sm text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        required={props.required}
        onChange={onChange}
        name={props.headline}
        type="time"
        value={response}
    />
}

const Image = (props: FormItemProps) => {
    const [scale, setScale] = React.useState("")
    const scaleUp = () => {
        switch (scale){
        case "":
            setScale("scale-[1.25]")
            return
        case "scale-[1.25]":
            setScale("scale-[1.50]")
            return
        case "scale-[1.50]":
            setScale("scale-[1.75]")
            return
        case "scale-[1.75]":
            setScale("scale-[2.00]")
            return
        }
    }

    const scaleDown = () => {
        switch (scale){
        case "scale-[1.25]":
            setScale("")
            return
        case "scale-[1.50]":
            setScale("scale-[1.25]")
            return
        case "scale-[1.75]":
            setScale("scale-[1.50]")
            return
        case "scale-[2.00]":
            setScale("scale-[1.75]")
            return
        }
    }

    return <div className="relative max-w-[25rem] md:max-w-[40rem] md:w-[40rem] overflow-hidden">
        <img className={`h-full w-full object-cover ${scale}`} alt={props.headline} src={props.url} />
        <div className="absolute rounded-sm shadow-md bottom-5 right-5 z-5 bg-gray-100 font-bold">
            <span className="p-5 cursor-pointer text-md text-gray-400 hover:text-gray-600" onClick={scaleUp}>+</span>
            <span className="p-5 cursor-pointer text-xl text-gray-400 hover:text-gray-600" onClick={scaleDown}>-</span>
        </div>
    </div>
}

const Embed = (props: FormItemProps) => {
    throw new Error("not implemented")
}

