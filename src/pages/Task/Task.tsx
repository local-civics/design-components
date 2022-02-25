import { TaskContainer } from "./containers/TaskContainer/TaskContainer";

/**
 * A component for the task page.
 * @constructor
 */
export const Task = () => {
  const { TaskModal } = TaskContainer();
  return <TaskModal />;
};
