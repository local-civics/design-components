import { ReflectionContainer } from "./containers/ReflectionContainer/ReflectionContainer";

/**
 * A component for the reflection page.
 * @constructor
 */
export const Reflection = () => {
  const { Reflection } = ReflectionContainer();
  return <Reflection />;
};
