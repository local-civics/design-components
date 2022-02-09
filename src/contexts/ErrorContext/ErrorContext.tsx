import React from "react";
import * as Sentry from "@sentry/react";
import { Modal } from "../../components";

type ErrorContextState = {
  error: AppError | null;
  emit: (error: any) => void;
  reset: () => void;
};

const defaultErrorContext = () => {
  const ctx: ErrorContextState = {
    error: null,
    emit: (error: Error) => {
      Sentry.captureException(error);
      console.log(error);
      throw new Error("error context provider not found");
    },
    reset: () => {},
  };
  return ctx;
};

const ErrorContext = React.createContext(defaultErrorContext());

/**
 * A hook for subscribing to and emitting errors.
 */
export const useErrorContext = () => React.useContext(ErrorContext);

/**
 * The properties for the error context provider.
 */
export type ErrorContextProviderProps = {
  value?: any;
  children?: React.ReactNode;
};

/**
 * A provider for providing error context.
 * @param props
 * @constructor
 */
export const ErrorContextProvider = (props: ErrorContextProviderProps) => {
  const [state, setState] = React.useState(defaultErrorContext());
  React.useEffect(() => {
    setState({ ...state, error: asAppError(props.value) });
  }, [props.value]);

  const reset = () => setState({ ...state, error: null });
  const emit = (error: any) => {
    error = asAppError(error);
    Sentry.captureException(error.cause);
    console.log(error.cause);
    setState({ ...state, error: error });
  };

  const value = { ...state, emit: emit, reset: reset };
  return (
    <ErrorContext.Provider value={value}>
      <ErrorBoundary context={value}>{props.children}</ErrorBoundary>
    </ErrorContext.Provider>
  );
};

/**
 * The properties for the error boundary.
 */
type ErrorBoundaryProps = {
  context: ErrorContextState;
  children: React.ReactNode;
};

/**
 * A component for catching component errors while rendering.
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    error.stack = errorInfo.componentStack;
    this.props.context.emit(error);
  }

  render() {
    const error = this.props.context.error;
    return (
      <>
        {!!error && (
          <img
            className="object-cover w-screen h-screen -z-10"
            alt="landing"
            src="https://cdn.localcivics.io/hub/landing.jpg"
          />
        )}
        <Modal
          visible={!!error}
          severity="error"
          icon="negative"
          title={error?.title}
          cta="ok"
          description={error?.message}
          onCTAClick={this.props.context.reset.bind(this)}
          onClose={this.props.context.reset.bind(this)}
        />

        {!error && this.props.children}
      </>
    );
  }
}

/**
 * Custom error object for application errors.
 */
export class AppError extends Error {
  public readonly title: string;
  public readonly cause: Error;

  constructor(title: string, message: string, cause?: Error) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    this.title = title;
    this.cause = cause || this;
  }
}

const asAppError = (error: any) => {
  if (!error) {
    return error;
  }

  if (typeof error === "string") {
    return new AppError("Something went wrong", error);
  }

  if (!(error instanceof AppError)) {
    return new AppError("Something went wrong", "If the issue persists, please contact support@localcivics.io.", error);
  }

  return error as AppError;
};
