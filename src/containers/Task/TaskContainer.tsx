/**
 * A connected container for tasks.
 * @constructor
 */
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { OpenTask } from "../../components/Task/OpenTask/OpenTask";
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
  if (task?.activityName !== "") {
    search.set("headline", task?.activityName);
  }

  if (task?.directory !== "") {
    search.set("directory", task?.directory);
  }

  const link = `/tenants/${tenantName}/activities?${search.toString()}`;
  return {
    TaskModal: () => <OpenTask {...task} onContinue={() => navigate(link)} onStart={() => navigate(link)} />,
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
  }, [tenantName, taskId]);

  return task;
};
