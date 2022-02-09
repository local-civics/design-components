import { Button } from "../../Button/Button";
import { IconName } from "../../Icon/Icon";

export type SearchResultProps = {
  name?: string;
  title?: string;
  icon?: IconName;
  onClick?: (name?: string) => void;
};

export const SearchResult = (props: SearchResultProps) => {
  const onClick = () => props.onClick && props.onClick(props.name);
  return (
    <Button
      spacing="lg"
      border="icon:circle"
      icon={props.icon}
      text={props.title}
      color="slate:sky"
      justify="start"
      size="full:sm"
      onClick={onClick}
    />
  );
};
