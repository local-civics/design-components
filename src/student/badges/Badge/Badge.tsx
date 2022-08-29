import * as React                        from "react";
import { BadgeButton, BadgeButtonProps } from "../BadgeButton/BadgeButton";
import { BadgeCard, BadgeCardProps }     from "../BadgeCard/BadgeCard";
import { Overlay }                       from "../../../components";

/**
 * BadgeProps
 */
export type BadgeProps = BadgeCardProps &
  BadgeButtonProps & {
    badgeId?: string;
    summary?: string;
    status?: string;
    code?: string;
    editChoices?: boolean;
    open?: boolean;

    onOpen?: () => void;
  };

/**
 * Badge
 * @param props
 * @constructor
 */
export const Badge = (props: BadgeProps) => {
  const [open, setOpen] = React.useState(props.open || false);
  const target = props.target || props.criteria?.length || 0;
  const progress =
    props.progress || props.choices?.map((v) => (v.completedAt ? 1 : 0) as number).reduce((acc, a) => acc + a, 0) || 0;

  const onOpen = () => {
    setOpen(true);
    if (props.onOpen) {
      props.onOpen();
    }
  };

  const onClose = () => {
    setOpen(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <>
      <BadgeButton {...props} progress={progress} target={target} onClick={onOpen} />

      {open && (
        <Overlay>
          <BadgeCard {...props} onClose={onClose} />
        </Overlay>
      )}
    </>
  );
};
