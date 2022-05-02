import { ReflectionContainer } from "../../containers/Reflection/ReflectionContainer";

/**
 * A component for the reflection page.
 * @constructor
 */
export const Reflection = () => {
  const { Reflection } = ReflectionContainer();
  return <Reflection />;
};
