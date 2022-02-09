import React from "react";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { SearchButton } from "./SearchButton/SearchButton";
import { SearchResultProps } from "./SearchResult/SearchResult";

export type SearchProps = {
  category?: string;
  visible?: boolean;
  children?: React.ReactElement<SearchResultProps> | React.ReactElement<SearchResultProps>[];
  onSearch: (search: string) => void;
};

export const Search = (props: SearchProps) => {
  const [visible, setVisible] = React.useState(props.visible);
  const toggleVisibility = () => setVisible(!visible);

  React.useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  return (
    <>
      {!visible && <SearchButton placeholder="Quick search..." onClick={toggleVisibility} />}
      <Modal visible={visible} width="lg" close="esc" content="top" onClose={toggleVisibility}>
        <div className="w-full">
          <label className="relative block w-full top-4 px-12 border-b border-slate-100">
            <span className="absolute inset-y-0 left-0 top-0 flex items-center px-5">
              <Button active icon="search" />
            </span>
            <input
              onChange={(e) => props.onSearch(e.target.value)}
              className="placeholder:text-slate-400 text-slate-400 block bg-white w-full -mt-4 py-4 pr-7 focus:outline-none text-xs"
              type="text"
              name="search"
              placeholder={`Search ${props.category || ""}`.trim()}
            />
          </label>
          {props.children && (
            <div className="grid grid-cols-1 w-full gap-1 mt-4 max-h-[24rem] overflow-scroll">{props.children}</div>
          )}
        </div>
      </Modal>
    </>
  );
};
