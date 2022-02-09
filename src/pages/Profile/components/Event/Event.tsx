import React from "react";
import { Button } from "../../../../components";

/**
 * The properties for the event preview.
 */
export type EventProps = {
  open?: boolean;
  title?: string;
  notBefore?: string;
  onOpen?: () => void;
};

/**
 * A component for previewing events.
 * @param props
 * @constructor
 */
export const Event = (props: EventProps) => {
  const date =
    props.notBefore &&
    new Date(props.notBefore).toLocaleString("default", {
      month: "short",
      day: "2-digit",
    });

  return (
    <Button
      disabled={props.open}
      spacing="lg"
      filter="shadow"
      border="rounded-sm"
      color="slate:sky"
      justify="start"
      size="full:sm"
      text={props.title}
      footer={date}
      onClick={props.onOpen}
    />
  );
};
