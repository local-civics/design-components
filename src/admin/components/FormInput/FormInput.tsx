import LinkifyIt    from "linkify-it";
import reactStringReplace from "react-string-replace"
import React    from "react";
import { Icon } from "../Icon/Icon";

/**
 * FormInputProps
 */
export type FormInputProps = {
  displayName?: string;
  description?: string;
  type?: "text" | "paragraph" | "select" | "toggle" | "image" | "tags" | "url" | "number" | "datetime" | "component";
  required?: boolean;
  preferred?: boolean
  placeholder?: string
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  textValue?: string
  numberValue?: number
  selectedOption?: string
  options?: Record<string, any>
  toggleValue?: boolean
  imageValue?: string
  tagsValue?: string[]
  urlValue?: string
  dateTimeValue?: string
  componentValue?: string
  disabled?: boolean

  onTextChange?: (next: string) => void;
  onTextBlur?: () => void;
  onSelectChange?: (next: string) => void;
  onToggleChange?: (next: boolean) => void;
  onImageChange?: (next: string) => void;
  onTagsChange?: (next: string[]) => void;
  onURLChange?: (next: string) => void;
  onDateTimeChange?: (next: string) => void;
  onComponentChange?: (next: string) => void;
  onNumberChange?: (number: number) => void;
};

/**
 * FormInput
 * @param props
 * @constructor
 */
export const FormInput = (props: FormInputProps) => {
  const errorMsg = error(props)
  const empty = isEmpty(props)

  const checkIconColor = !empty && !errorMsg ? "text-emerald-500" : "text-gray-300";
  const [showError, setShowError] = React.useState(false);

  const onTextBlur = () => {
    if (errorMsg) {
      setShowError(true);
    } else {
      setShowError(false);
    }

    if (props.onTextBlur) {
      props.onTextBlur();
    }
  };

  React.useEffect(() => {
    if(!errorMsg){
      setShowError(false);
    }
  }, [errorMsg])

  return (
    <div className="bg-white rounded-md grid grid-cols-1 gap-y-2">
      {props.displayName && (
        <div>
          <div className="flex gap-x-1">
          <div className="flex items-start gap-x-2">
            { props.required || props.preferred && <div className={`${checkIconColor} my-auto w-4 h-4`}>
              <Icon name="textCheck" />
            </div> }
            <div className="grow my-auto">
              {props.displayName && <p className="text-sm text-slate-600 whitespace-pre-line">{linkify(props.displayName)}</p>}
            </div>
          </div>
          {props.required || props.preferred && <p className="text-sm text-rose-600">*</p>}
        </div>
          {props.description && <p className="mt-2 text-xs text-zinc-500 whitespace-pre-line">{linkify(props.description)}</p>}
        </div>
      )}

      <Switch {...props} onTextBlur={onTextBlur} />
      {showError && (
          <div className="text-rose-300 flex items-center gap-x-2 mt-">
            <span className="grow text-xs">{errorMsg}</span>
          </div>
      )}
    </div>
  );
};

/**
 * Switch
 * @param props
 * @constructor
 */
const Switch = (props: FormInputProps) => {
  switch (props.type) {
  case "select":
    return <Select {...props} />
  case "paragraph":
    return <Paragraph {...props} />
  case "toggle":
    return <Toggle {...props} />
  case "image":
    return <Image {...props} />
  case "tags":
    return <Tags {...props} />
  case "url":
    return <URL {...props} />
  case "datetime":
    return <DateTime {...props} />
  case "component":
    return <Component {...props} />
  case "number":
    return <Number {...props} />
  default:
    return <Text {...props} />
  }
};

/**
 * Select
 * @param props
 * @constructor
 */
const Select = (props: FormInputProps) => {
  const options = props.options || {}
  const keys = Object.keys(options)
  const [selected, setSelected] = React.useState(props.selectedOption)
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value)
    if (props.onSelectChange) {
      props.onSelectChange(e.target.value);
    }
  };

  React.useEffect(() => {
    setSelected(props.selectedOption)
  }, [props.selectedOption])

  return <select
      className="appearance-none rounded-lg mt-1 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 text-sm placeholder-slate-400 border border-slate-300 shadow-sm
        focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      value={selected}
      disabled={props.disabled}
      onChange={onChange}
  >
    {
      keys.map(k => {
        return <option key={k} value={options[k] === null ? "" : k}>
          {k}
        </option>
      })
    }
  </select>
}

/**
 * Text
 * @param props
 * @constructor
 */
const Text = (props: FormInputProps) => {
  const minLength = props.minLength || 0
  const maxLength = props.maxLength
  const [textValue, setTextValue] = React.useState(props.textValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value)
    if (props.onTextChange) {
      props.onTextChange(e.target.value);
    }
  };

  React.useEffect(() => {
    setTextValue(props.textValue)
  }, [props.textValue])

  return <input
      className="rounded-lg mt-1 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 text-sm placeholder-slate-400 border border-slate-300 shadow-sm
        focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      required={props.required}
      minLength={minLength}
      maxLength={maxLength}
      name={props.displayName}
      type="text"
      placeholder={props.placeholder}
      value={textValue}
      disabled={props.disabled}
      onChange={onChange}
      onBlur={props.onTextBlur}
  />
};

/**
 * Paragraph
 * @param props
 * @constructor
 */
const Paragraph = (props: FormInputProps) => {
  const minLength = props.minLength || 0
  const maxLength = props.maxLength
  const [textValue, setTextValue] = React.useState(props.textValue)
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextValue(e.target.value)
    if (props.onTextChange) {
      props.onTextChange(e.target.value);
    }
  };

  React.useEffect(() => {
    setTextValue(props.textValue)
  }, [props.textValue])

  return <textarea
      className="rounded-lg mt-1 h-28 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 text-sm placeholder-slate-400 border border-slate-300 shadow-sm
        focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      required={props.required}
      minLength={minLength}
      maxLength={maxLength}
      name={props.displayName}
      placeholder={props.placeholder}
      value={textValue}
      disabled={props.disabled}
      onChange={onChange}
      onBlur={props.onTextBlur}
  />
};

/**
 * Toggle
 * https://medium.com/front-end-weekly/build-a-css-only-toggle-switch-using-tailwindcss-d2739882934
 * @param props
 * @constructor
 */
const Toggle = (props: FormInputProps) => {
  const [toggleValue, setToggleValue] = React.useState(props.toggleValue)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToggleValue(e.target.checked)
    if (props.onToggleChange) {
      props.onToggleChange(e.target.checked);
    }
  };

  React.useEffect(() => {
    setToggleValue(props.toggleValue)
  }, [props.toggleValue])

  return <label className="relative flex justify-between items-center group">
    <input
        type="checkbox"
        className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
        checked={toggleValue}
        disabled={props.disabled}
        onChange={onChange}
    />
    <span
        className="w-16 h-10 flex items-center flex-shrink-0 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
  </label>
};

/**
 * Image
 * @param props
 * @constructor
 */
const Image = (props: FormInputProps) => {
  const [imageValue, setImageValue] = React.useState(props.imageValue)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageValue(e.target.value)
    if (props.onImageChange) {
      props.onImageChange(e.target.value);
    }
  };

  React.useEffect(() => {
    setImageValue(props.imageValue)
  }, [props.imageValue])

  return <div className="flex p-1 flex-col overflow-hidden mt-1 block w-full bg-white text-slate-500 text-sm placeholder-slate-400">
    <img
        className="rounded-t border-t border-slate-300 object-cover h-36"
        alt={props.imageValue}
        referrerPolicy="no-referrer"
        src={imageValue}
    />
    <div className="relative w-full">
      <div className="absolute left-4 top-5 text-zinc-500 h-3.5 w-3.5">
        <Icon name="link"/>
      </div>
      <input
          className="w-full px-9 pr-3 py-2 rounded-b overflow-x-auto border border-slate-300 focus:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          placeholder="https://path.to/my/image.jpg"
          value={imageValue}
          disabled={props.disabled}
          onChange={onChange}
      />
    </div>
  </div>
};

/**
 * URL
 * @param props
 * @constructor
 */
const URL = (props: FormInputProps) => {
  const [urlValue, setURLValue] = React.useState(props.urlValue)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setURLValue(e.target.value)
    if (props.onURLChange) {
      props.onURLChange(e.target.value);
    }
  };

  React.useEffect(() => {
    setURLValue(props.urlValue)
  }, [props.urlValue])

  return <div className="flex flex-col mt-1 block w-full bg-white text-slate-500 text-sm placeholder-slate-400">
    <div className="relative w-full">
      <div className="absolute left-4 top-5 text-zinc-500 h-3.5 w-3.5">
        <Icon name="link"/>
      </div>
      <input
          className="w-full px-9 pr-3 py-2 rounded-lg overflow-x-auto border border-slate-300 focus:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          placeholder="https://path.to/my/url"
          value={urlValue}
          disabled={props.disabled}
          onChange={onChange}
      />
    </div>
  </div>
};

/**
 * Tags
 * @param props
 * @constructor
 */
const Tags = (props: FormInputProps) => {
  const [tagsValue, setTagsValue] = React.useState(props.tagsValue)
  const [textValue, setTextValue] = React.useState(props.textValue)
  const ref: any = React.useRef(null);

  const onClick = () => ref.current.focus();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value)
  };

  const onDelete = (tag: string) => {
    const next = tagsValue?.filter(t => t !== tag)
    setTagsValue(next)
  };

  React.useEffect(() => {
    if(!tagsValue && !textValue){
      return
    }

    const next = [...(tagsValue || [])]
    if(textValue){
      next.push(textValue.replace(/,$/, ""))
    }

    if(!textValue?.endsWith(",")){
      return
    }

    if(textValue.trim() && textValue.trim() !== ","){
      setTagsValue(next)
      if (props.onTagsChange) {
        props.onTagsChange(next);
      }
    }

    setTextValue("")
  }, [textValue])

  React.useEffect(() => {
    setTagsValue(props.tagsValue)
  }, [props.tagsValue])

  return <div
      className="rounded-lg mt-1 h-28 overflow-y-auto flex flex-wrap gap-1 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 text-sm placeholder-slate-400 border border-slate-300 shadow-sm flex gap-x-1"
      onClick={onClick}>

    {
      tagsValue?.map(t => {
        return <div key={t} className="flex shadow-sm gap-x-1.5 text-xs h-max w-max p-2 bg-zinc-100 rounded-md">
          <div className="my-auto h-4 w-4 text-slate-600">
            <Icon title="Tag" name="tags" />
          </div>
          <div className="my-auto text-slate-500">{t}</div>
          <div className="cursor-pointer text-slate-400 my-auto w-2 h-2"
               onClick={() => onDelete(t)}>
            <Icon title="Remove" name="crossCircle" />
          </div>
        </div>
      })
    }

    <input
        ref={ref}
        className="h-max leading-8 appearance-none focus:outline-none"
        value={textValue}
        disabled={props.disabled}
        type="text"
        onChange={onChange}
    />
  </div>
};

/**
 * DateTime
 * @param props
 * @constructor
 */
const DateTime = (props: FormInputProps) => {
  const [dateTimeValue, setDateTimeValue] = React.useState(props.dateTimeValue)
  const [checkboxValue, setCheckboxValue] = React.useState(!!dateTimeValue)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTimeValue(e.target.value)
    setCheckboxValue(true)
    if (props.onDateTimeChange) {
      props.onDateTimeChange(e.target.value);
    }
  };

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(e.target.checked)
    if(!e.target.checked){
      setDateTimeValue("")
      if (props.onDateTimeChange) {
        props.onDateTimeChange("");
      }
    }
  }

  React.useEffect(() => {
    setDateTimeValue(props.dateTimeValue)
    setCheckboxValue(!!(props.dateTimeValue))
  }, [props.dateTimeValue])

  return <div className="flex flex-col mt-1 block w-full bg-white text-slate-500 text-sm placeholder-slate-400">
    <div className="relative w-full">
      <div className="absolute left-3 top-3 text-zinc-500 h-3.5 w-3.5">
        <input
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="checkbox"
            checked={checkboxValue}
            disabled={props.disabled}
            onChange={onCheckboxChange}
        />
      </div>
      <input
          className="w-full px-9 pr-3 py-2 rounded-lg overflow-x-auto border border-slate-300 focus:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          type="datetime-local"
          value={dateTimeValue}
          disabled={props.disabled}
          onChange={onChange}
      />
    </div>
  </div>
};

/**
 * Component
 * @param props
 * @constructor
 */
const Component = (props: FormInputProps) => {
  const options = props.options || {}
  const keys = Object.keys(options)

  const [componentValue, setComponentValue] = React.useState(props.componentValue)
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setComponentValue(e.target.value)
    if (props.onComponentChange) {
      props.onComponentChange(e.target.value);
    }
  };

  React.useEffect(() => {
    setComponentValue(props.componentValue)
  }, [props.componentValue])

  return <div className="flex flex-col mt-1 block w-full bg-white text-slate-500 text-sm placeholder-slate-400">
    <div className="relative w-full">
      <select
        className="appearance-none rounded-lg w-full px-3 py-2 rounded-lg overflow-x-auto border border-slate-300 focus:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        value={componentValue}
        disabled={props.disabled}
        onChange={onChange}>
          {
            keys.map(k => {
              return <option key={k}>
                {k}
              </option>
            })
          }
      </select>

      <div className="mt-5 flex rounded-lg overflow-hidden max-h-36 border border-zinc-100 bg-zinc-50 p-5">
        { componentValue && options[componentValue] }
      </div>
    </div>
  </div>
};

/**
 * Number
 * @param props
 * @constructor
 */
const Number = (props: FormInputProps) => {
  const min = props.min || 0
  const max = props.max
  const [numberValue, setNumberValue] = React.useState(props.numberValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberValue(parseInt(e.target.value, 10))
    if (props.onNumberChange) {
      props.onNumberChange(parseInt(e.target.value, 10));
    }
  };

  React.useEffect(() => {
    setNumberValue(props.numberValue)
  }, [props.numberValue])

  return <input
      className="rounded-lg mt-1 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 text-sm placeholder-slate-400 border border-slate-300 shadow-sm
        focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      required={props.required}
      min={min}
      max={max}
      name={props.displayName}
      type="number"
      placeholder={props.placeholder}
      value={numberValue}
      disabled={props.disabled}
      onChange={onChange}
      onBlur={props.onTextBlur}
  />
};

const error = (props: FormInputProps) => {
  switch (props.type) {
  case "text":
  case undefined:
    const textValue = props.textValue || "";
    const minLength = props.minLength || 0
    const maxLength = props.maxLength || 0
    const textLength = textValue.trim().length
    if(!isEmpty(props)){
      if(textLength < minLength){
        return `Must be a minimum of ${minLength} characters.`
      } else if(maxLength > 0 && textLength > maxLength){
        return `Must be a maximum of ${maxLength} characters.`
      }
    }
  }

  return ""
}

const isEmpty = (props: FormInputProps) => {
  switch (props.type) {
  case "text":
  case undefined:
    const textValue = props.textValue || "";
    return textValue.trim() === ""
  }

  return false
}

const linkify = (text: string) => {
  const matches = LinkifyIt().match(text)
  let replacedText = reactStringReplace(text)
  matches?.forEach(match => {
      replacedText = reactStringReplace(replacedText, match.raw, () => <a
          key={match.url}
          href={match.url}
          target="_blank"
          rel="noreferrer"
          className="hover:underline text-blue-500"
        >{match.text}</a>)
  })

  return replacedText
}
