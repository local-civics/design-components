import { useDate } from "../../../../hooks";
import { DateSelectionWidget } from "../../widgets/DateSelectionWidget/DateSelectionWidget";

/**
 * A date selection container component connected to the global state.
 * @constructor
 */
export const DateSelectionContainer = () => {
  const [date, setDate] = useDate();
  return <DateSelectionWidget date={date} setDate={setDate} />;
};
