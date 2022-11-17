import React from "react";
import { Form, FormProps } from "../Form/Form";
import { Button } from "../../../components/Button/Button";

/**
 * LogServiceButtonProps
 */
export type LogServiceButtonProps = {
  text?: string;
  isOpen?: boolean;
  form?: FormProps;

  onSubmit?: (responses: any) => Promise<any>;
  onClick?: () => void;
};

/**
 * LogServiceButton
 * @param props
 * @constructor
 */
export const LogServiceButton = (props: LogServiceButtonProps) => {
  const [isOpen, setIsOpen] = React.useState(!!props.isOpen);
  const text = props.text || "Log Service";
  const onOpen = () => {
    if (props.onClick) {
      props.onClick();
    }
    setIsOpen(true);
  };
  const onClose = () => {
    if (props.form && props.form.onClose) {
      props.form.onClose();
    }
    setIsOpen(false);
  };

  React.useEffect(() => {
    setIsOpen(!!props.isOpen);
  }, [props.isOpen]);

  return (
    <>
      <Button
        wide
        spacing="md"
        border="rounded"
        color="dark-blue"
        theme="dark"
        text={text}
        size="full:md"
        onClick={onOpen}
      />

      {isOpen && <Form onSubmit={props.onSubmit} {...props.form} onClose={onClose} />}
    </>
  );
};
