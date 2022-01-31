import React from "react";

export const useEffect = (
  callback: React.EffectCallback,
  deps?: React.DependencyList
) => {
  React.useEffect(
    callback,
    deps?.map((value) => {
      const ref = React.useRef();
      if (JSON.stringify(value) !== JSON.stringify(ref.current)) {
        ref.current = value;
      }
      return ref.current;
    })
  );
};
