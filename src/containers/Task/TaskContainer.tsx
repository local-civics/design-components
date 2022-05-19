/**
 * A connected container for tasks.
 * @constructor
 */
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TaskWorkflow } from "../../workflows/TaskWorkflow/TaskWorkflow";
import { useApi } from "../../contexts/App";

/**
 * A connected container for tasks
 * @constructor
 */
export const TaskContainer = () => {
  const navigate = useNavigate();
  const params = useParams();
  const tenantName = params.tenantName;
  const taskId = params.taskId;
  if (!tenantName || !taskId) {
    throw new Error("request is missing required params");
  }

  const task = useTask(tenantName, taskId);
  const search = new URLSearchParams();
  if (task.activityName && task.activityName !== "") {
    search.set("headline", task.activityName);
  }

  if (task.directory && task.directory !== "") {
    search.set("directory", task.directory);
  }

  const link = `/tenants/${tenantName}/activities?${search.toString()}`;
  return {
    OpenTask: () => <TaskWorkflow {...task} onExplore={() => navigate(link)} onClose={() => navigate(-1)} />,
  };
};

// A hook for fetching a task
const useTask = (tenantName: string, taskId: string) => {
  const [task, setTask] = React.useState({} as any);
  const api = useApi();
  const location = useLocation();
  React.useEffect(() => {
    (async () => {
      const ctx = { referrer: location.pathname };
      setTask({ ...(await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/tasks/${taskId}`)) });
    })();

    return () => setTask({});
  }, [tenantName, taskId, api.accessToken]);

  return task;
};
