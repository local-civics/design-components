/**
 * A connected container for badges.
 * @constructor
 */
import {BadgeView, TaskView}      from "@local-civics/js-client";
import React                      from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi, useIdentity }    from "../../../../contexts/App";
import {AppError}                 from "../../../../contexts/Error/Error";
import {useWorkspace}             from "../../../Profile/containers/WorkspaceContainer/WorkspaceContainer";
import {actionURL}                from "../../../Task/containers/TaskContainer/TaskContainer";
import { Task as TaskItem }       from "../../components/Task/Task";
import { BadgeModal }             from "../../components/BadgeModal/BadgeModal";

export const BadgeContainer = () => {
  const identity = useIdentity();
  const po = identity?.organizations && identity.organizations.length > 0 ? identity.organizations[0] : {}
  const navigate = useNavigate();
  const params = useParams();
  const {workspace} = useWorkspace()
  const close = () => navigate(-1);
  const api = useApi();
  const [started, setStarted] = React.useState(false);
  const badgeId = parseInt(params.badgeId||"0")
  const level = parseInt(params.level||"0")
  const badge = useBadge(badgeId, level, started);
  const start = async () => {
    if (!identity.nickname || !po.nickname || !badgeId) {
      return;
    }

    await api.curriculum.startBadge(identity.nickname, po.nickname, badgeId, level);
    setStarted(true);
  };

  let tasks: TaskView[] = []
  let status: "todo" | "in-progress" | "done" = "todo"
  const todo = badge?.todo || []
  const inProgress = badge?.inProgress || []
  const done = badge?.done || []

  if(todo.length > 0 ||inProgress.length > 0 || done.length > 0){
    if(todo.length > 0){
      tasks = todo
    } else if(inProgress.length > 0){
      tasks = inProgress
    } else {
      tasks = done
    }
  }

  return {
    BadgeModal: () => (
      <BadgeModal badge={badge||undefined} workspace={workspace||undefined} resolving={badge === null} visible disabled={false} onStart={start} onClose={close}>
        {tasks && tasks.map((task) => {
          const link = actionURL(identity.nickname, po, task)
          return (
            <TaskItem
              action
              key={`${task.marketId}${task.badgeId}${task.level}${task.id}`}
              title={task.title}
              status={status}
              onAction={() => link && navigate(link)}
            />
          );
        })}
      </BadgeModal>
    ),
  };
};

const useBadge = (badgeId?: number, badgeLevel?: number, started?: boolean) => {
  const identity = useIdentity();
  const po = identity?.organizations && identity.organizations.length > 0 ? identity.organizations[0] : {}
  const api = useApi();
  const params = useParams()
  const [badge, setBadge] = React.useState(null as BadgeView | null);
  React.useEffect(() => {
    (async () => {
      if (badgeId && identity.nickname && po.nickname) {
        setBadge(
          await api.curriculum.viewWorkspaceBadge(identity.nickname, po.nickname, params.marketName||"", badgeId, badgeLevel || 0)
        );
      } else {
        setBadge(null);
      }
    })();

    return () => setBadge(null);
  }, [badgeId, badgeLevel, identity.nickname, po.nickname, started]);

  return badge;
};
