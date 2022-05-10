import { TaskContainer } from "../../containers/Task/TaskContainer";

/**
 * A component for the task page.
 * @constructor
 */
export const Task = () => {
  const { OpenTask } = TaskContainer();
  return <OpenTask />;
};
