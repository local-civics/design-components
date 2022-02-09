import { useState, useEffect } from "react";

const getWindow = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

/**
 * Hook for window size.
 * @returns
 */
export const useWindow = () => {
  const [w, setWindow] = useState(getWindow());

  useEffect(() => {
    function handleResize() {
      setWindow(getWindow());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return w;
};
