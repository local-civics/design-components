import React from "react";
import { Icon } from "../../../components/Icon";
import { linkify } from "../../../utils/url";

/**
 * FormItemProps
 */
export type FormItemProps = {
  itemId?: string;
  displayName?: string | React.ReactNode;
  description?: string;
  format?: "question" | "image" | "embed" | "text";
  questionType?: "radio" | "checkbox" | "drop down" | "file upload" | "text" | "date" | "time";
  options?: string[];
  paragraph?: boolean;
  required?: boolean;
  disabled?: boolean;
  url?: string;
  answerId?: string;
  journalId?: string;
  questionId?: string;
  responses?: string[];
  minText?: number;
  children?: React.ReactNode;

  onResponseChange?: (responses?: string[], file?: Blob) => void;
  onTextBlur?: () => void;
};

/**
 * FormItem
 * @param props
 * @constructor
 */
export const FormItem = (props: FormItemProps) => {
  const responses = props.responses || [];
  const notEmpty = responses.length > 0 && responses[0].trim() !== "";
  const minimum = props.minText !== undefined ? props.minText : 100;
  const isTextError = notEmpty && props.questionType === "text" && responses[0].trim().length < minimum;
  const isValidAnswer = notEmpty && (props.questionType !== "text" || !isTextError);
  const checkIconColor = isValidAnswer ? "text-green-500" : "text-gray-300";
  const contentMaxWidth = props.format === "question" ? "max-w-lg" : "";
  const [showError, setShowError] = React.useState(false);
  const itemContainerError = showError && isTextError ? "border-2 border-rose-300" : "";

  const onTextBlur = () => {
    if (isTextError) {
      setShowError(true);
    } else {
      setShowError(false);
    }

    if (props.onTextBlur) {
      props.onTextBlur();
    }
  };

  React.useEffect(() => {
    if (!isTextError) {
      setShowError(false);
    }
  }, [isTextError]);

  const marginBottom = props.format === "text" ? "-mb-7" : "";

  return (
    <div className={`bg-white rounded-md p-5 shadow-sm grid grid-cols-1 gap-y-8 ${itemContainerError} ${marginBottom}`}>
      {props.displayName && (
        <div className="flex gap-x-1">
          <div className="flex items-start gap-x-4">
            {props.format === "question" && (
              <div className={`${checkIconColor} w-5 h-5 mt-1`}>
                <Icon name="positive" />
              </div>
            )}
            <div className="grow max-w-lg">
              {props.displayName && (
                <p className="flex-auto text-lg text-slate-600 font-semibold whitespace-pre-line">
                  {linkify(props.displayName)}
                </p>
              )}
              {props.description && (
                <p className="text-sm text-slate-400 whitespace-pre-line">{linkify(props.description)}</p>
              )}
            </div>
          </div>
          {props.required && <p className="text-sm text-rose-600">*</p>}
        </div>
      )}

      {!props.children && props.format !== "text" && (
        <div className={`${contentMaxWidth} ml-1`}>
          <Switch {...props} onTextBlur={onTextBlur} />
          {showError && (
            <div className="text-rose-300 flex items-center gap-x-2 mt-4">
              <div className="w-4 h-4">
                <Icon name="negative" />
              </div>
              <span className="grow text-sm">Must be a minimum of {minimum} characters.</span>
            </div>
          )}
        </div>
      )}

      {props.children}
    </div>
  );
};

const Switch = (props: FormItemProps) => {
  switch (true) {
    case props.format === "embed":
      return <Embed {...props} />;
    case props.format === "image":
      return <Image {...props} />;
    case props.questionType === "radio":
      return <RadioQuestion {...props} />;
    case props.questionType === "checkbox":
      return <CheckboxQuestion {...props} />;
    case props.questionType === "drop down":
      return <DropDownQuestion {...props} />;
    case props.questionType === "file upload":
      return <FileUploadQuestion {...props} />;
    case props.questionType === "text":
      return <TextQuestion {...props} />;
    case props.questionType === "date":
      return <DateQuestion {...props} />;
    case props.questionType === "time":
      return <TimeQuestion {...props} />;
    default:
      return null;
  }
};

const RadioQuestion = (props: FormItemProps) => {
  const options = props.options || [];
  const responses = props.responses || [];
  const values: { [key: string]: boolean } = {};
  responses.forEach((key) => (values[key] = true));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onResponseChange) {
      props.onResponseChange([e.target.value]);
    }
  };

  return (
    <fieldset className="grid grid-cols-1 gap-y-8">
      {options.map((option, index) => {
        return (
          <div key={option}>
            <label className="flex gap-x-4 items-center">
              <input
                className="cursor-pointer"
                checked={values[option]}
                onChange={onChange}
                required={props.required}
                type="radio"
                value={option}
                disabled={props.disabled}
                name={displayNameString(props.displayName)}
              />
              <div>
                <span className="font-bold">{String.fromCharCode(65 + index)}.</span> {option}
              </div>
            </label>
          </div>
        );
      })}
    </fieldset>
  );
};

const CheckboxQuestion = (props: FormItemProps) => {
  const options = props.options || [];
  const responses = props.responses || [];
  const values: { [key: string]: boolean } = {};
  let rawResponse: string = "";
  for (const val of responses) {
    if (val.startsWith("Other: ")) {
      rawResponse = val;
      break
    }
  };



  const response = rawResponse && rawResponse.replace("Other: ", "");
  const isOtherResponse = rawResponse && rawResponse.startsWith("Other: ");

  responses.forEach((key) => (values[key] = true));

  const onOtherChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setResponseValue(e.target.value ? `Other: ${e.target.value}` : "");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setResponseValue(e.target.value);
  const setResponseValue = (value: string) => {
    if (value && props.onResponseChange) {
      const newResponses = [];
      responses.forEach((v) => {

        const outOfScope = !(v.startsWith("Other: ") && value.startsWith("Other: ")) && v !== value;
        if (outOfScope) {
          newResponses.push(v);
        }
      });

      if (!responses.includes(value)) {
        newResponses.push(value);
      }

      props.onResponseChange(newResponses);
    }
  };
  let isOneChecked = false;
  React.useEffect(() => { }, []);

  return (
    <fieldset className="grid grid-cols-1 gap-y-8">
      {options.map((option) => {
        isOneChecked = Object.keys(values).length ? true : false;
        return (
          <div key={option}>
            <label className="flex gap-x-4 items-center">
              <input
                id="checkbox"
                disabled={props.disabled}
                className="cursor-pointer shrink-0"
                required={option ? props.required && !isOneChecked && !!isOtherResponse : props.required && !isOneChecked}
                checked={values[option] || (!option && values[`Other: ${response}`])}
                onChange={option ? onChange : onOtherChange}
                type="checkbox"
                value={option || response}
                name={displayNameString(props.displayName)}
              />
              {option && <div>{option}</div>}
              {!option && (
                <>
                  Other:{" "}
                  <input
                    className="w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 text-sm placeholder-slate-400 border border-slate-300 rounded-sm shadow-sm
        focus:outline-none focus:ring-1 focus:ring-sky-500"
                    value={isOtherResponse ? response : ""}
                    required={props.required && !isOneChecked}
                    disabled={props.disabled}
                    onChange={onOtherChange}
                    placeholder="Input another option"

                  />
                </>
              )}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
};

const DropDownQuestion = (props: FormItemProps) => {
  const options = props.options || [];
  const responses = props.responses || [];
  const values: { [key: string]: boolean } = {};
  responses.forEach((key) => (values[key] = true));

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (props.onResponseChange) {
      props.onResponseChange([e.target.value]);
    }
  };

  return (
    <select
      disabled={props.disabled}
      className={`cursor-pointer appearance-none mt-1 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-sm text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-gray-600 disabled:border-slate-200 disabled:shadow-none`}
      required={props.required}
      name={displayNameString(props.displayName)}
      onChange={onChange}
    >
      <option className="cursor-pointer" value="">
        Select one
      </option>

      {options.map((option) => {
        return (
          <option key={option} selected={values[option]} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

const FileUploadQuestion = (props: FormItemProps) => {
  const responses = props.responses || [];
  const response = responses.length > 0 ? responses[0] : "";
  const [imageURL, setImageURL] = React.useState(response);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onResponseChange) {
      props.onResponseChange([e.target.value]);
    }
  };
  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImageURL(reader.result);
        if (props.onResponseChange) {
          props.onResponseChange(undefined, file);
        }
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  React.useEffect(() => {
    setImageURL(response);
  }, [props.questionId, response]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex items-center space-x-3">
        <label className="block">
          <span className="sr-only">Choose image photo</span>
          <input
            disabled={props.disabled}
            onChange={onImageUpload}
            name="image"
            type="file"
            className="block w-full text-sm text-slate-500 disabled:text-gray-600
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
          disabled={props.disabled}
          name={displayNameString(props.displayName)}
          required={props.required}
          onChange={onChange}
          value={imageURL}
          placeholder="Paste a url or select a file above"
          className="w-full mt-1 block px-3 py-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-sm text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-gray-600 disabled:border-slate-200 disabled:shadow-none"
        />
      </div>
    </div>
  );
};

const TextQuestion = (props: FormItemProps) => {
  const minimum = props.minText !== undefined ? props.minText : 100;
  const responses = props.responses || [];
  const response = responses.length > 0 ? responses[0] : "";

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (props.onResponseChange) {
      props.onResponseChange([e.target.value]);
    }
  };

  return (
    <>
      {!props.paragraph && (
        <input
          className="mt-1 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 text-sm placeholder-slate-400 border border-slate-300 rounded-sm shadow-sm
        focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500
        disabled:bg-slate-50 disabled:text-gray-600 disabled:border-slate-200 disabled:shadow-none"
          required={props.required}
          minLength={minimum}
          onChange={onChange}
          onBlur={props.onTextBlur}
          name={displayNameString(props.displayName)}
          disabled={props.disabled}
          type="text"
          placeholder="Your answer"
          value={response}
        />
      )}
      {props.paragraph && (
        <textarea
          className="resize-none text-slate-500 focus:text-slate-600 h-24 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-sm text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-gray-600 disabled:border-slate-200 disabled:shadow-none"
          required={props.required}
          minLength={minimum}
          onChange={onChange}
          onBlur={props.onTextBlur}
          name={displayNameString(props.displayName)}
          disabled={props.disabled}
          value={response}
          placeholder="Your answer"
        />
      )}
    </>
  );
};

const DateQuestion = (props: FormItemProps) => {
  const responses = props.responses || [];
  const response = responses.length > 0 ? responses[0] : "";

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (props.onResponseChange) {
      props.onResponseChange([e.target.value]);
    }
  };

  return (
    <input
      className="mt-1 block w-full px-3 pt-3 pb-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-sm text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-gray-600 disabled:border-slate-200 disabled:shadow-none"
      required={props.required}
      onChange={onChange}
      name={displayNameString(props.displayName)}
      disabled={props.disabled}
      type="date"
      value={response}
    />
  );
};

const TimeQuestion = (props: FormItemProps) => {
  const responses = props.responses || [];
  const response = responses.length > 0 ? responses[0] : "";

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (props.onResponseChange) {
      props.onResponseChange([e.target.value]);
    }
  };

  return (
    <input
      className="mt-1 block w-full px-3 pt-3 pb-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-sm text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-gray-600 disabled:border-slate-200 disabled:shadow-none"
      required={props.required}
      onChange={onChange}
      name={displayNameString(props.displayName)}
      disabled={props.disabled}
      type="time"
      value={response}
    />
  );
};

const Image = (props: FormItemProps) => {
  const [scale, setScale] = React.useState("");
  const scaleUp = () => {
    switch (scale) {
      case "scale-[0.50]":
        setScale("scale-[0.75]");
        return;
      case "scale-[0.75]":
        setScale("");
        return;
      case "":
        setScale("scale-[1.25]");
        return;
      case "scale-[1.25]":
        setScale("scale-[1.50]");
        return;
      case "scale-[1.50]":
        setScale("scale-[1.75]");
        return;
      case "scale-[1.75]":
        setScale("scale-[2.00]");
        return;
    }
  };

  const scaleDown = () => {
    switch (scale) {
      case "scale-[0.75]":
        setScale("scale-[0.50]");
        return;
      case "":
        setScale("scale-[0.75]");
        return;
      case "scale-[1.25]":
        setScale("");
        return;
      case "scale-[1.50]":
        setScale("scale-[1.25]");
        return;
      case "scale-[1.75]":
        setScale("scale-[1.50]");
        return;
      case "scale-[2.00]":
        setScale("scale-[1.75]");
        return;
    }
  };

  return (
    <div className="relative max-w-[25rem] md:max-w-[40rem] md:w-[40rem] overflow-hidden">
      <img
        referrerPolicy="no-referrer"
        className={`h-full max-h-[25rem] w-full object-cover ${scale}`}
        alt={displayNameString(props.displayName)}
        src={props.url}
      />
      <div className="absolute rounded-sm shadow-md bottom-5 right-5 z-5 bg-gray-100 font-bold">
        <span className="p-5 cursor-pointer text-md text-gray-400 hover:text-gray-600" onClick={scaleUp}>
          +
        </span>
        <span className="p-5 cursor-pointer text-xl text-gray-400 hover:text-gray-600" onClick={scaleDown}>
          -
        </span>
      </div>
    </div>
  );
};

const Embed = (props: FormItemProps) => {
  return (
    <div className="max-w-[25rem] md:max-w-[40rem] md:w-[40rem]">
      <iframe
        className="w-full"
        height="315"
        src={props.url}
        title={displayNameString(props.displayName)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

const displayNameString = (displayName: React.ReactNode) => {
  if (!displayName) {
    return "";
  }

  return displayName.toString();
};
