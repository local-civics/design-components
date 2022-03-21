import { IsBadRequest, IsNotAuthorized, IsNotFound } from "@local-civics/js-client";
import * as Sentry                                   from "@sentry/react";
import React                                         from "react";
import {useNavigate}                                 from "react-router-dom";
import { Button, Icon, IconName }                    from "../../components";
import { Modal }                                     from "../../components";
import { builder }                                   from "../../utils/classname/classname";
import { AppError }                                  from "../Error/Error";

/**
 * Message state.
 */
type MessageState = {
  message?: Message;
  send: (message: any, context?: { severity?: "info" | "success"; icon?: IconName; title?: string }) => void;
  clear: () => void;
};

/* Message context */
const MessageContext = React.createContext({} as MessageState);

/**
 * A hook for subscribing to and emitting messages.
 */
export const useMessage = () => {
  const context = React.useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessage must be used within a MessageProvider");
  }

  return context;
};

/**
 * The properties for the message context provider.
 */
export type MessageProviderProps = {
  message?: string;
  children?: React.ReactNode;
};

/**
 * A provider for providing message context.
 * @param props
 * @constructor
 */
export const MessageProvider = (props: MessageProviderProps) => {
  const Sender = React.memo(() => {
    return <>{props.children}</>;
  });
  const Messenger = () => {
    const context = useContext(props.message);
    return (
      <MessageContext.Provider value={context}>
        <Sender />
        <Receiver />
      </MessageContext.Provider>
    );
  };
  return <Messenger />;
};

/**
 * Use context internal.
 */
const useContext = (value?: string) => {
  const navigate = useNavigate()
  const [message, setMessage] = React.useState(value ? ({ description: value } as Message) : undefined);
  const clear = () => {
    const unrecoverable = message?.unrecoverable;
    setMessage(undefined)
    if(unrecoverable){
      navigate(-1)
    }
  }
  const send = (message: any, context?: { icon?: IconName; title?: string }) => {
    const msg: Message = { ...context };
    if (message instanceof Error) {
      msg.severity = "error";
      if (IsBadRequest(message)) {
        msg.title = "Try again";
        msg.description = message.message;
      } else if (IsNotAuthorized(message)) {
        msg.title = "Not authorized";
        msg.description = message.message;
        msg.unrecoverable = true
      } else if (IsNotFound(message)) {
        msg.title = "Not found";
        msg.description = "sorry, we're unable to find this";
        msg.unrecoverable = true
      } else {
        msg.title = "Something went wrong";
        msg.description = "If the issue persists, please contact support@localcivics.io.";
        msg.unrecoverable = true
      }
    } else {
      msg.description = message;
    }

    if (message instanceof AppError) {
      const error = message as AppError;
      Sentry.captureException(error.cause);
      console.log(error.cause);
    } else {
      const error = message as Error;
      Sentry.captureException(error);
      console.log(error);
    }

    setMessage(msg);
  };

  return {
    message,
    send,
    clear,
  };
};

/**
 * A component for catching component messages while rendering.
 */
const Receiver = () => {
  const message = useMessage();
  const iconColor = (() => {
    switch (message.message?.severity) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-rose-500";
      default:
        return "text-slate-500";
    }
  })();

  const className = builder().if(!!message.message, "relative z-40").build();
  return (
    <>
      <div className={className}>
        <Modal visible={!!message.message} onClose={message.clear}>
          <div className="grid grid-cols-1 px-14 pb-4 justify-items-center text-slate-500 gap-y-2">
            <div className="grid grid-cols-1 justify-items-center gap-y-2">
              <div className={`w-8 h-8 ${iconColor}`}>
                <Icon name={message.message?.icon || "bolt"} />
              </div>
              <p className="text-sm font-semibold">{message.message?.title || "New message"}</p>
            </div>

            <p className="text-sm text-center text-slate-700 max-w-[15rem]">{message.message?.description}</p>

            <div className="mt-4">
              <Button spacing="xs" border="rounded" color="slate" theme="dark" text="ok" onClick={message.clear} />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

type Message = {
  icon?: IconName;
  title?: string;
  description?: string;
  unrecoverable?: boolean
  severity?: "info" | "error" | "success";
};
