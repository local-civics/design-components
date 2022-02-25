/**
 * A connected container for tasks.
 * @constructor
 */
import { Resident, Task } from "@local-civics/js-client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi, useRequester } from "../../../../contexts/App";
import { TaskModal } from "../../components/TaskModal/TaskModal";

export const TaskContainer = () => {
  const requester = useRequester();
  const navigate = useNavigate();
  const close = () => navigate(-1);
  const [started, setStarted] = React.useState(false);
  const task = useTask(started);
  const api = useApi();

  const start = async () => {
    requester.residentName && task?.taskName && (await api.tasks.start(requester.residentName, task.taskName));
    setStarted(true);
  };
  const finish = async () => {
    requester.residentName && task?.taskName && (await api.tasks.done(requester.residentName, task.taskName));
    close();
  };

  const nextURL = actionURL(requester, task);
  const launch = () => nextURL && navigate(nextURL);

  return {
    TaskModal: () => (
      <TaskModal
        {...task}
        resolving={task === null}
        visible
        disabled={false}
        onStart={start}
        onContinue={launch}
        onDone={finish}
        onClose={close}
      />
    ),
  };
};

const useTask = (started?: boolean) => {
  const requester = useRequester();
  const api = useApi();
  const params = useParams();
  const taskName = params.taskName;
  const [task, setTask] = React.useState(null as Task | null);
  React.useEffect(() => {
    setTask(null);

    (async () => {
      if (!requester.residentName || !taskName) {
        return;
      }

      setTask(await api.tasks.view(requester.residentName, taskName));
    })();
    return () => setTask(null);
  }, [taskName, requester.residentName, started]);

  return task;
};

/**
 * Action URL builder.
 * @param requester
 * @param task
 */
const actionURL = (requester?: Resident, task?: Task | null) => {
  if (!requester || !task || !task.actionName) {
    return "";
  }

  const actionName = task.actionName;
  if (actionName === "reflections.create" && !!task.experienceName) {
    return `/residents/${requester.residentName}/reflections/${task.experienceName}`;
  }

  if (actionName === "avatar.set") {
    return `/residents/${requester.residentName}/settings`;
  }

  if (!!task.experienceName) {
    return `/communities/${requester.communityName}/explore/experiences/${task.experienceName}`;
  }

  if (!!task.experienceNamePrefix) {
    return `/communities/${requester.communityName}/explore/experiences?experienceName=${encodeURIComponent(
      task.experienceNamePrefix
    )}`;
  }

  return "";
};
