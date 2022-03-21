/**
 * A connected container for tasks.
 * @constructor
 */
import {OrganizationSearchView, TaskView} from "@local-civics/js-client";
import React                              from "react";
import { useNavigate, useParams } from "react-router-dom";
import {AppError} from "../../../../contexts/Error/Error";
import {useWorkspace}              from "../../../Profile/containers/WorkspaceContainer/WorkspaceContainer";
import { TaskModal }              from "../../components/TaskModal/TaskModal";

export const TaskContainer = () => {
  const {identity, workspace} = useWorkspace()
  const primaryOrganization = workspace?.organizations && workspace.organizations.length > 0 ? workspace.organizations[0] : {}
  const navigate = useNavigate();
  const params = useParams()
  const close = () => navigate(-1);

  let tasks: TaskView[] = []
  let status = "todo"

  if(workspace !== null){
    tasks = workspace?.todo?.filter(v => v?.id === params.taskId && v?.badgeId === params.badgeId && v?.marketId === params.marketId && (!params.level || parseInt(params.level) === v?.level)) || []
    if(tasks.length === 0){
      status = "in-progress"
      tasks = workspace?.inProgress?.filter(v => v?.id === params.taskId && v?.badgeId === params.badgeId && v?.marketId === params.marketId && (!params.level || parseInt(params.level) === v?.level)) || []
    }

    if(tasks.length === 0){
      status = "done"
      tasks = workspace?.done?.filter(v => v?.id === params.taskId && v?.badgeId === params.badgeId && v?.marketId === params.marketId && (!params.level || parseInt(params.level) === v?.level)) || []
    }

    if(tasks.length === 0){
      throw new AppError("task not found", "try starting back from your profile page")
    }
  }
  const task = tasks.length > 0 ? tasks[0] : null
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
    return `/marketplace/${org.nickname}/activities?name=${encodeURIComponent(
      task.activityPrefix
    )}`;
  }

  return `/marketplace/${org.nickname}/activities`;
};
