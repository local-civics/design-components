import * as React from "react"
import { Button } from "../../Button/Button";
import { IconName } from "../../Icon/v0/Icon";

export type SearchResultProps = {
  title?: string;
  icon?: IconName;
  onClick?: () => void;
};

export const SearchResult = (props: SearchResultProps) => {
  return (
    <Button
      spacing="lg"
      border="icon:circle"
      icon={props.icon}
      text={props.title}
      color="slate:sky"
      justify="start"
      size="full:sm"
      onClick={props.onClick}
    />
  );
};
