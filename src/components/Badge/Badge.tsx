import * as React from "react";
import { IconName } from "../Icon/Icon";
import { BadgeButton } from "./BadgeButton/BadgeButton";
import { BadgeCard } from "./BadgeCard/BadgeCard";

/**
 * CriterionProps
 */
export type CriterionProps = {
  displayName?: string;
  namespace?: string;
  options?: BadgeActivityProps[];
};

/**
 * BadgeActivityProps
 */
export type BadgeActivityProps = {
  activityId?: string;
  activityName?: string;
  namespace?: string;
  xp?: number;
  formId?: string;
  milestone?: boolean;
  badgeId?: string;
  criterionId?: string;
  completedAt?: string;
  chosenAt?: string;
  startTime?: string;
};

/**
 * BadgeProps
 */
export type BadgeProps = {
  badgeId?: string;
  displayName?: string;
  icon?: IconName;
  imageURL?: string;
  summary?: string;
  status?: string;
  startedAt?: string;
  finishedAt?: string;
  code?: string;
  level?: number;
  isLocked?: boolean;
  criteria?: CriterionProps[];
  choices?: BadgeActivityProps[];
  editChoices?: boolean;
  open?: boolean;

  onStart?: () => void;
  onSubmit?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
};

/**
 * Badge
 * @param props
 * @constructor
 */
export const Badge = (props: BadgeProps) => {
  const [open, setOpen] = React.useState(props.open || false);
  const target = props.criteria?.length || 0;
  const progress = props.choices?.map((v) => (v.completedAt ? 1 : 0)).reduce((acc, a) => acc + a, 0) || 0;

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
