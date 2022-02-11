import React from "react";
import { classname } from "../../utils/classname/classname";
import { Button, ButtonColor, ButtonSize, ButtonSpacing } from "../Button/Button";
import { Icon, IconName } from "../Icon/Icon";

/**
 * The width of the modal.
 */
export type ModalWidth = "sm" | "md" | "lg" | "full:lg";

/**
 * The content position of the modal.
 */
export type ModalContent = "top" | "pad";

/**
 * The severity of the information in the modal.
 */
export type ModalSeverity = "info" | "error" | "success";

/**
 * The title justification.
 */
export type ModalJustifyTitle = "center" | "left";

/**
 * The modal variant.
 */
export type ModalVariant = "info" | "input";

/**
 * The properties for the modal.
 */
export type ModalProps = {
  visible?: boolean;
  title?: string;
  justifyTitle?: ModalJustifyTitle;
  description?: string;
  embed?: boolean;
  icon?: IconName;
  cta?: string;
  close?: "x" | "esc";
  content?: ModalContent;
  severity?: ModalSeverity;
  width?: ModalWidth;
  variant?: ModalVariant;
  children?: React.ReactNode;
  onClose?: () => void;
  onCTAClick?: () => void;
};

/**
 * A component for displaying modals
 */
export const Modal = (props: ModalProps) => {
  const config = defaultModalConfig();
  const close = props.close || "x";
  withWidth(config, props.width || "sm");
  withSeverity(config, props.severity || "info");
  withVisibility(config, props.visible);
  withContent(config, props.content);
  withJustifyTitle(config, props.justifyTitle || "center");
  withVariant(config, props.variant || "info");

  return (
    <div className={classname(config.container)}>
      <div className="shadow-md w-full px-2 md:px-0 md:w-auto bg-white rounded-md relative">
        {close === "x" && (
          <div className="absolute top-3 right-3 z-50">
            <Button size="xs" filter="none" icon="menu-close" onClick={props.onClose} />
          </div>
        )}
        {close === "esc" && (
          <div className="absolute top-5 right-5 z-50">
            <Button spacing="xs" border="rounded" size="tiny" text="esc" onClick={props.onClose} />
          </div>
        )}
        <div className={classname(config.modal)}>
          {(props.icon || props.title) && (
            <div className="grid w-full justify-items-center content-center gap-2 grid-cols-1">
              {props.icon && (
                <div className={classname(config.icon)}>
                  <Icon name={props.icon} />
                </div>
              )}
              {props.title && <p className={classname(config.title)}>{props.title}</p>}
            </div>
          )}

          {!!props.embed && props.children && (
            <div className="grid grid-cols-1 py-2 gap-2 w-full max-h-[28rem] overflow-scroll">{props.children}</div>
          )}

          <div className={config.button.container}>
            {props.description && <p className="text-sm text-center text-slate-700">{props.description}</p>}
            {props.cta && (
              <div className="my-auto">
                <Button
                  size={config.button.size}
                  spacing={config.button.spacing}
                  border="rounded"
                  color={config.button.color}
                  theme="dark"
                  text={props.cta}
                  onClick={props.onCTAClick}
                />
              </div>
            )}
          </div>

          {!props.embed && props.children}
        </div>
      </div>
    </div>
  );
};

type ModalConfig = {
  container: {
    base: string;
    visibility: string;
    background: string;
    animation: string;
  };
  modal: {
    base: string;
    spacing: string;
    width: string;
  };
  icon: {
    base: string;
    color: string;
  };
  title: {
    base: string;
    color: string;
    justify: string;
  };
  button: {
    container: string;
    spacing: ButtonSpacing;
    size: ButtonSize;
    color: ButtonColor;
  };
};

const defaultModalConfig = () => {
  const config: ModalConfig = {
    container: {
      base: "grid grid-cols-1 overscroll-contain justify-items-center content-center fixed top-0 left-0 px-4 md:px-2",
      background: "w-screen h-screen bg-gray-500/75",
      animation: "transition ease-in-out duration-500",
      visibility: "",
    },
    modal: {
      base: "grid grid-cols-1 gap-2 justify-items-center",
      width: "",
      spacing: "",
    },
    icon: {
      base: "w-9 h-9",
      color: "",
    },
    title: {
      base: "font-bold text-md w-full",
      color: "",
      justify: "",
    },
    button: {
      size: "sm",
      spacing: "sm",
      container: "grid justify-items-center content-center grid-cols-1 gap-6",
      color: "slate",
    },
  };
  return config;
};

const withVisibility = (config: ModalConfig, visible?: boolean) => {
  if (visible) {
    config.container.visibility = "visible z-50 opacity-full";
  } else {
    config.container.visibility = "invisible -z-50 opacity-0";
  }
};

const withWidth = (config: ModalConfig, width?: ModalWidth) => {
  switch (width) {
    case "sm":
      config.modal.width = "w-[20rem]";
      config.modal.spacing = "p-4";
      break;
    case "md":
      config.modal.width = "w-full md:w-[28rem]";
      config.modal.spacing = "p-4";
      break;
    case "lg":
      config.modal.width = "w-full md:w-[36rem]";
      config.modal.spacing = "p-4";
      break;
    case "full:lg":
      config.modal.width = "w-full md:w-[36rem]";
      config.modal.spacing = "p-4";
      break;
  }
};

const withSeverity = (config: ModalConfig, severity?: ModalSeverity) => {
  switch (severity) {
    case "info":
      config.icon.color = "text-slate-500";
      config.title.color = "text-slate-500";
      config.button.color = "slate";
      break;
    case "error":
      config.icon.color = "text-rose-500";
      config.title.color = "text-rose-500";
      config.button.color = "rose";
      break;
    case "success":
      config.icon.color = "text-emerald-500";
      config.title.color = "text-emerald-500";
      config.button.color = "emerald";
      break;
  }
};

const withContent = (config: ModalConfig, content?: ModalContent) => {
  switch (content) {
    case "top":
      config.modal.spacing = "pb-8 px-5";
      break;
  }
};

const withJustifyTitle = (config: ModalConfig, justifyTitle?: ModalJustifyTitle) => {
  switch (justifyTitle) {
    case "left":
      config.title.justify = "text-left";
      break;
    case "center":
      config.title.justify = "text-center";
      break;
  }
};

const withVariant = (config: ModalConfig, variant?: ModalVariant) => {
  switch (variant) {
    case "info":
      config.button.size = "xs";
      config.button.spacing = "sm";
      config.title.justify = "text-center";
      config.button.container = "grid justify-items-center content-center grid-cols-1 gap-6 pt-2";
      break;
    case "input":
      config.button.size = "xs";
      config.button.spacing = "md";
      config.title.justify = "text-left";
      config.button.container = "w-full grid justify-items-end content-center grid-cols-1 gap-6 pt-2";
      break;
  }
};
