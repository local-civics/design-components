import React from "react";
import { Icon, IconName } from "../../../../components";

/**
 * The properties for the forms.
 */

export type FormsProps = {
  headline?: string;
  contentURL?: string;
  isActive?: boolean;
  options?: [] => string;
  imageUpload?: boolean;
  response?: string;
  image?: string;
  link?: string;
  children?: React.ReactNode;
  onSubmit?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onChange?: () => void;
}
/**
 * A component for forms.
 * @param props
 * @constructor
 */
export const Forms = (props: FormsProps) => {
  const Topic = () => {
    headline?: string
    contentURL?: string
    children?: React.ReactNode
    onSubmit?: () => void
  }
  const Question = () => {
    if(!props.isActive){
      return null;
    }

    return{
      isActive?: boolean
      headline?: string
      imageUpload?: boolean;
      children?: React.ReactNode;
    }
  }
  const Answer = () => {
    image?: string;
    link?: string;
    response?: string;
    onChange?: () => void;
  }
}