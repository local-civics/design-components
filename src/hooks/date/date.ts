import React from "react";
import { useParams } from "react-router-dom";

/**
 * A react hook to obtain and set dates.
 */
export const useDate = () => {
  const params = useParams();
  const [date, setDate] = React.useState((params.date || null) as Date | null);
  React.useEffect(() => {
    setDate(null);
    if (params.date) {
      try {
        setDate(new Date(params.date));
      } catch (err) {
        // todo: ???
      }
    }
  }, [params.date]);
  return [date, setDate] as const;
};
