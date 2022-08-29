import * as React from "react";

/**
 * stopPropagation
 * @param e
 */
export const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
}