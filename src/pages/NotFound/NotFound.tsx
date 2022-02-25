import React from "react";
import { NotFoundContainer } from "./containers/NotFoundContainer/NotFoundContainer";

/**
 * A component for the not found page.
 * @constructor
 */
export const NotFound = () => {
  const { NotFoundModal } = NotFoundContainer();
  return <NotFoundModal />;
};
