import React from "react";
import { IconName } from "../../components";
import { Modal }    from "../../components";

type MessageContextState = {
  message: Message | null;
  send: (severity: "info" | "success", icon: IconName, title: string, description: string) => void;
  reset: () => void;
};

const defaultMessageContext = () => {
  const ctx: MessageContextState = {
    message: null,
    send: () => {
      throw new Error("message context provider not found");
    },
    reset: () => {},
  };
  return ctx;
};

const MessageContext = React.createContext(defaultMessageContext());

/**
 * A hook for subscribing to and emitting messages.
 */
export const useMessageContext = () => React.useContext(MessageContext);

/**
 * The properties for the message context provider.
 */
export type MessageContextProviderProps = {
  value?: Message | null;
  children?: React.ReactNode;
};

/**
 * A provider for providing message context.
 * @param props
 * @constructor
 */
export const MessageContextProvider = (props: MessageContextProviderProps) => {
  const [state, setState] = React.useState(defaultMessageContext());
  React.useEffect(() => {
    setState({ ...state, message: props.value || null });
  }, [props.value]);

  const reset = () => setState({ ...state, message: null });
  const send = (severity: "info" | "success", icon: IconName, title: string, description: string) => {
    const message = {
      severity: severity,
      icon: icon,
      title: title,
      description: description,
    };
    setState({ ...state, message: message });
  };

  const value = { ...state, send: send, reset: reset };
  return (
    <MessageContext.Provider value={value}>
      <MessageBoundary context={value}>{props.children}</MessageBoundary>
    </MessageContext.Provider>
  );
};

/**
 * The properties for the message boundary.
 */
type MessageBoundaryProps = {
  context: MessageContextState;
  children: React.ReactNode;
};

/**
 * A component for catching component messages while rendering.
 */
const MessageBoundary = (props: MessageBoundaryProps) => {
  const message = props.context.message;
  return (
    <>
      <Modal
        visible={!!message}
        severity={message?.severity}
        icon={message?.icon}
        title={message?.title}
        cta="ok"
        description={message?.description}
        onCTAClick={props.context.reset}
        onClose={props.context.reset}
      />

      {props.children}
    </>
  );
};

export type Message = {
  severity: "info" | "success";
  icon: IconName;
  title: string;
  description: string;
};
