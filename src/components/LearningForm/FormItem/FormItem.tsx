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
    children?: React.ReactNode

    onResponseChange?: (responses?: string[], file?: Blob) => void;
}

/**
 * FormItem
 * @param props
 * @constructor
 */
export const FormItem = (props: FormItemProps) => {
    const checkIconColor = props.responses ? "text-green-500" : "text-gray-300"
    const contentMaxWidth = props.format === "question" ? "max-w-lg" : ""

    return <div className="bg-white rounded-md p-5 shadow-sm grid grid-cols-1 gap-y-8">
        {props.headline && <div className="flex gap-x-1">
            <div className="flex items-start gap-x-4">
                { props.format === "question" && <div className={`${checkIconColor} w-5 h-5 mt-1`}>
                    <Icon name="positive" />
                </div> }
                <div className="grow max-w-lg">
                    { props.headline && <p className="text-lg text-slate-600 font-semibold">{props.headline}</p> }
                    { props.summary && <p className="text-sm text-slate-500">{props.summary}</p> }
                </div>
            </div>
            { props.required && <p className="text-sm text-rose-600">*</p>}
        </div>}

        { !props.children && <div className={`${contentMaxWidth} ml-1`}>
            <Switch {...props} />
        </div> }

        { props.children }
    </div>
}

const Switch = (props: FormItemProps) => {
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
    const responses = props.responses || []
    const response = responses.length > 0 ? responses[0] : ""
    const [imageURL, setImageURL] = React.useState(response);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(props.onResponseChange){
            props.onResponseChange([e.target.value])
        }
    }
    const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader();
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setImageURL(reader.result);
                if(props.onResponseChange){
                    props.onResponseChange(undefined, file)
                }
            }
        };
        reader.readAsDataURL(file);
    };

    React.useEffect(() => {
        setImageURL(response)
    }, [props.questionId, response])

    return (
        <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3">
                <div className="shrink-0">
                    <div
                        className={`${
                            imageURL ? "rounded-full -ml-4 p-2" : "rounded-full bg-gray-100 -ml-3 p-2"
                        }`}
                    >
                        <img
                            className={imageURL ? "h-8 w-8 object-cover rounded-full" : "h-6 w-6 object-cover"}
                            src={imageURL || "https://cdn.localcivics.io/hub/camera.png"}
                            alt="Current image answer"
                        />
                    </div>
                </div>
                <label className="block">
                    <span className="sr-only">Choose image photo</span>
                    <input
                        onChange={onImageUpload}
                        name="image"
                        type="file"
                        className="block w-full text-sm text-slate-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-violet-50 file:text-violet-700
                                      hover:file:bg-violet-100"
                    />
                </label>
            </div>

            <div className="-ml-2">
                <input
                    type="url"
                    name={props.headline}
                    required={props.required}
                    onChange={onChange}
                    value={imageURL}
                    placeholder="Paste a url or select a file above"
                    className="w-full mt-1 block px-3 py-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-sm text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
            </div>
        </div>
    );
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
            defaultValue={response}
        /> }
        { props.paragraph && <textarea
            className="resize-none text-slate-500 focus:text-slate-600 h-24 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-sm text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            required={props.required}
            minLength={minimum}
            onChange={onChange}
            name={props.headline}
            defaultValue={response}
            placeholder="Your answer"
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
    return <div className="max-w-[25rem] md:max-w-[40rem] md:w-[40rem]">
        <iframe
            className="w-full"
            height="315"
            src={props.url}
            title={props.headline}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    </div>
}

