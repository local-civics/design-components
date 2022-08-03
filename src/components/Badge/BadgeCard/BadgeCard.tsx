import * as React from "react";

import { Card } from "../../Card";

/**
 * BadgeCardProps
 */
export type BadgeCardProps = {
  onClose?: () => void;
};

/**
 * BadgeCard
 * @param props
 * @constructor
 */
export const BadgeCard = (props: BadgeCardProps) => {
  return (
    <Card onClose={props.onClose}>
      <div></div>
      <div></div>
      <div></div>
    </Card>
  );
};
