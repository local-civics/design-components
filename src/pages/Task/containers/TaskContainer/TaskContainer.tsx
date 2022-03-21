/**
 * A connected container for tasks.
 * @constructor
 */
import { OrganizationSearchView, TaskView } from "@local-civics/js-client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWorkspace } from "../../../Profile/containers/WorkspaceContainer/WorkspaceContainer";
import { TaskModal } from "../../components/TaskModal/TaskModal";

export const TaskContainer = () => {
  const { identity, workspace } = useWorkspace();
  const primaryOrganization =
    workspace?.organizations && workspace.organizations.length > 0 ? workspace.organizations[0] : {};
  const navigate = useNavigate();
  const params = useParams();
  const close = () => navigate(-1);
  const [tasks, setTasks] = React.useState([] as TaskView[]);
  let status = "todo";

  React.useEffect(() => {
    let filtered: TaskView[] = [];
    if (workspace !== null) {
      // TODO this is a nasty bug waiting to happen. looks like we need an endpoint to fetch a task.
      filtered =
        workspace?.todo?.filter(
          (v) =>
            v?.id === parseInt(params.taskId || "") &&
            v?.badgeId === parseInt(params.badgeId || "") &&
            (!params.level || !v.level || parseInt(params.level) === v.level)
        ) || [];
      if (filtered.length === 0) {
        status = "in-progress";
        filtered =
          workspace?.inProgress?.filter(
            (v) =>
              v?.id === parseInt(params.taskId || "") &&
              v?.badgeId === parseInt(params.badgeId || "") &&
              (!params.level || !v.level || parseInt(params.level) === v.level)
          ) || [];
      }

      if (filtered.length === 0) {
        status = "done";
        filtered =
          workspace?.done?.filter(
            (v) =>
              v?.id === parseInt(params.taskId || "") &&
              v?.badgeId === parseInt(params.badgeId || "") &&
              (!params.level || !v.level || parseInt(params.level) === v.level)
          ) || [];
      }

      setTasks(filtered);
    }
  }, [workspace?.id]);

  const task = tasks.length > 0 ? tasks[0] : null;
  const nextURL = actionURL(identity.nickname, primaryOrganization, task);
  const launch = () => nextURL && navigate(nextURL);

  return {
    TaskModal: () => (
      <TaskModal
        {...task}
        status={status}
        resolving={task === null}
        visible
        disabled={false}
        onContinue={launch}
        onStart={launch}
        onClose={close}
      />
    ),
  };
};

/**
 * Action URL builder.
 * @param workspaceName
 * @param org
 * @param task
 */
export const actionURL = (workspaceName?: string, org?: OrganizationSearchView, task?: TaskView | null) => {
  if (!task || !workspaceName || !org) {
    return "";
  }

  if (!!task.activityId) {
    return `/marketplace/${org.nickname}/activities/${task.activityId}`;
  }

  if (!!task.activityPrefix) {
    return `/marketplace/${org.nickname}/activities?name=${encodeURIComponent(task.activityPrefix)}`;
  }

  return `/marketplace/${org.nickname}/activities`;
};
