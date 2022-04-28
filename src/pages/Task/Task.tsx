import { TaskContainer } from "../../containers/Task/TaskContainer";

/**
 * A component for the task page.
 * @constructor
 */
export const Task = () => {
  const { TaskModal } = TaskContainer();
  return <TaskModal />;
};
