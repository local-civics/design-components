import React from "react";
import { ExperienceProps } from "../Experience/Experience";

export type ExhibitionProps = {
  children?: React.ReactElement<ExperienceProps> | React.ReactElement<ExperienceProps>[];
};

export const Exhibition = (props: ExhibitionProps) => {
  return <article className="grid grid-cols-1 gap-2 overflow-scroll">{props.children}</article>;
};
