import React from "react";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { SearchButton } from "./SearchButton/SearchButton";
import { SearchResultProps } from "./SearchResult/SearchResult";

export type SearchProps = {
  category?: string;
  open?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onOpen?: () => void;
  onClose?: () => void;
  results?: React.ReactElement<SearchResultProps> | React.ReactElement<SearchResultProps>[] | null;
  onSearch?: (search: string) => void;
};

export const Search = (props: SearchProps) => {
  const hasResults = props.results && React.Children.count(props.results) > 0;
  const placeholder = props.placeholder || "Quick search...";
  const searchRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [props.open]);

  return (
    <>
      <SearchButton disabled={props.disabled} placeholder={placeholder} onClick={props.onOpen} />
      <Modal visible={props.open}>
        <div className="w-full md:w-[28rem]">
          <label className="relative block w-full top-4 px-12 border-b border-slate-100">
            <span className="absolute inset-y-0 left-0 top-0 flex items-center px-5">
              <Button active icon="search" />
            </span>
            <input
              ref={searchRef}
              autoComplete="off"
              onChange={(e) => props.onSearch && props.onSearch(e.target.value)}
              className="placeholder:text-slate-400 text-slate-400 block bg-white w-full -mt-4 py-4 pr-7 focus:outline-none text-xs"
              type="text"
              name="search"
              placeholder={`Search ${props.category || ""}`.trim()}
            />
            <span className="absolute inset-y-0 right-0 top-0 flex items-center px-5">
              <Button spacing="xs" border="rounded" size="tiny" text="esc" onClick={props.onClose} />
            </span>
          </label>
          {hasResults && (
            <div className="grid grid-cols-1 w-full gap-1 mt-4 max-h-[24rem] overflow-scroll">{props.results}</div>
          )}

          {!hasResults && <div className="h-4" />}
        </div>
      </Modal>
    </>
  );
};
