import React from "react";
import { Button } from "../../Button";
import { Search, SearchProps } from "../../Search";

/**
 * CommunitySearchProps
 */
export type CommunitySearchProps = SearchProps & {
  disabled?: boolean;
  name?: string;
  accessCode?: string;
  onSearch?: (search: string) => void;
  onJoin?: (accessCode?: string) => void;
};

/**
 * A component for searching for communities
 * @param props
 * @constructor
 */
export const CommunitySearch = (props: CommunitySearchProps) => {
  const [accessCode, setAccessCode] = React.useState("");
  return (
    <div className="w-full md:w-[30rem] bg-white grid grid-cols-1 gap-4 rounded-md border border-slate-200 px-8 py-5 shadow-sm">
      <div className="text-slate-600">
        <p className="font-bold text-2xl">Which is your community?</p>
        <p className="text-sm">Pick your community.</p>
      </div>

      <Search {...props} autofocus={!accessCode} placeholder={props.name} />

      {!!props.name && (
        <div className="text-slate-600 grid-cols-1 gap-2">
          <div>
            <span className="text-sm">Enter the access code for</span>
            <span className="ml-1 font-semibold text-sm">{props.name}</span>
            <span className="text-sm">.</span>
          </div>

          <div className="mt-2 content-center grid grid-cols-3 gap-x-2">
            <input
              disabled={props.disabled}
              autoFocus={!!accessCode}
              type="password"
              onChange={(e) => setAccessCode(e.target.value)}
              defaultValue={props.accessCode}
              className="col-span-2 h-full w-full block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
        invalid:border-pink-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />

            <div className="col-span-1">
              <Button
                disabled={!accessCode || props.disabled}
                spacing="md"
                border="rounded"
                color="sky"
                theme="dark"
                text="Join"
                size="full:sm"
                onClick={() => props.onJoin && props.onJoin(accessCode)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
