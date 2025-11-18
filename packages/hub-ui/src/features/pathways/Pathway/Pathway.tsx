import * as React from "react";
import { PathwayCard, PathwayCardProps } from "../PathwayCard/PathwayCard";

/**
 * PathwayProps
 */
export type PathwayProps = PathwayCardProps & {
  pathwayId?: string;
  title?: string;
  description?: string;
  imageURL?: string;
  displayTags?: string[];

    onClose?: () => void;
  };

/**
 * Pathway
 * @param props
 * @constructor
 */
export const Pathway = (props: PathwayProps) => {

  return (
    <>
          <PathwayCard {...props} />
    </>
  );
};
