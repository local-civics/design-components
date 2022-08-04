import * as React from "react";
import { BadgeButton } from "./BadgeButton/BadgeButton";
import { BadgeCard, BadgeCardProps } from "./BadgeCard/BadgeCard";

/**
 * BadgeProps
 */
export type BadgeProps = BadgeCardProps & {
  badgeId?: string;
  summary?: string;
  status?: string;
  startedAt?: string;
  finishedAt?: string;
  code?: string;
  isLocked?: boolean;
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
  const target = props.criteria?.length || 0;
  const progress = props.choices?.map((v) => (v.completedAt ? 1 : 0) as number).reduce((acc, a) => acc + a, 0) || 0;

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

  if (open) {
    return <BadgeCard {...props} onClose={onClose} />;
  }

  return <BadgeButton {...props} progress={progress} target={target} onClick={onOpen} />;
};

// todo: fix submit button visibility for learning forms
// todo: add text input type to learning forms
// todo: fix select all that apply for learning forms
