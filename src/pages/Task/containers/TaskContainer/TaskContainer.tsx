/**
 * A connected container for tasks.
 * @constructor
 */
import { Resident, Task } from "@local-civics/js-client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi, useIdentity } from "../../../../contexts/App";
import { TaskModal } from "../../components/TaskModal/TaskModal";

export const TaskContainer = () => {
  const identity = useIdentity();
  const navigate = useNavigate();
  const close = () => navigate(-1);
  const [started, setStarted] = React.useState(false);
  const task = useTask(started);
  const api = useApi();

  const start = async () => {
    identity.residentName && task?.taskName && (await api.tasks.start(identity.residentName, task.taskName));
    setStarted(true);
  };
  const finish = async () => {
    identity.residentName && task?.taskName && (await api.tasks.done(identity.residentName, task.taskName));
    close();
  };

  const nextURL = actionURL(identity, task);
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
  const identity = useIdentity();
  const api = useApi();
  const params = useParams();
  const taskName = params.taskName;
  const [task, setTask] = React.useState(null as Task | null);
  React.useEffect(() => {
    setTask(null);

    (async () => {
      if (!identity.residentName || !taskName || taskName === "undefined") {
        return;
      }

      setTask(await api.tasks.view(identity.residentName, taskName));
    })();
    return () => setTask(null);
  }, [taskName, identity.residentName, started]);

  return task;
};

/**
 * Action URL builder.
 * @param identity
 * @param task
 */
const actionURL = (identity?: Resident, task?: Task | null) => {
  if (!identity || !task || !task.actionName) {
    return "";
  }

  const actionName = task.actionName;
  if (actionName === "reflections.create" && !!task.experienceName) {
    return `/residents/${identity.residentName}/reflections/${task.experienceName}`;
  }

  if (actionName === "avatar.set") {
    return `/residents/${identity.residentName}/settings`;
  }

  if (!!task.experienceName) {
    return `/communities/${identity.communityName}/explore/${task.experienceName}`;
  }

  if (!!task.experienceNamePrefix) {
    return `/communities/${identity.communityName}/explore?p=${encodeURIComponent(
      task.experienceNamePrefix
    )}`;
  }

  return "";
};
