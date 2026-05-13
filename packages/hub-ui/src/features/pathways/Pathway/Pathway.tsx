import * as React from "react";
import { PathwayCard } from "../PathwayCard/PathwayCard";
import { PathwayCardProps } from "../types";

/**
 * PathwayProps
 */
export type PathwayProps = PathwayCardProps & {
  pathwayId?: string;
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
