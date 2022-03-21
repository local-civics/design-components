import React from "react";
import { builder } from "../../../utils/classname/classname";
import { Button } from "../../Button/Button";

/**
 * The properties for the search button.
 */
export type SearchButtonProps = {
  disabled?: boolean;
  placeholder?: string;
  onClick?: () => void;
};

/**
 * A component for starting a search via click.
 * @param props
 * @constructor
 */
export const SearchButton = (props: SearchButtonProps) => {
  const className = builder("placeholder:text-slate-400 text-slate-400")
    .append("block bg-white w-full text-sm border border-slate-300")
    .append("rounded-md py-3 px-8 shadow-sm")
    .if(!props.disabled, "cursor-pointer")
    .if(!props.disabled, "focus:outline-none focus:border-sky-100 focus:ring-sky-100 focus:ring-1")
    .if(!props.disabled, "hover:bg-sky-50 hover:border-sky-100")
    .if(!props.disabled, "hover:text-slate-500 hover:placeholder:text-slate-600")
    .build();

  return (
    <label onClick={() => !props.disabled && props.onClick && props.onClick()} className="relative block">
      <span className="absolute inset-y-0 left-0 top-0 flex items-center pl-2">
        <Button icon="search" />
      </span>
      <input disabled className={className} type="text" name="search" placeholder={props.placeholder} />
    </label>
  );
};
