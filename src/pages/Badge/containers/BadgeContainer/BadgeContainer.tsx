/**
 * A connected container for badges.
 * @constructor
 */
import { Badge, Task } from "@local-civics/js-client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi, useIdentity } from "../../../../contexts/App";
import { Task as TaskItem } from "../../components/Task/Task";
import { BadgeModal } from "../../components/BadgeModal/BadgeModal";

export const BadgeContainer = () => {
  const identity = useIdentity();
  const navigate = useNavigate();
  const params = useParams();
  const close = () => navigate(-1);
  const api = useApi();
  const [started, setStarted] = React.useState(false);
  const badge = useBadge(params.badgeName, started);
  const tasks = useTasks(badge?.badgeName, badge?.status);
  const start = async () => {
    if (!identity.residentName || !badge?.badgeName) {
      return;
    }

    await api.badges.start(identity.residentName, badge.badgeName);
    setStarted(true);
  };

  return {
    BadgeModal: () => (
      <BadgeModal {...badge} resolving={badge === null} visible disabled={false} onStart={start} onClose={close}>
        {tasks && tasks.map((task) => {
          return (
            <TaskItem
              action
              key={task.taskName}
              displayName={task.displayName}
              status={task.status}
              onAction={() => navigate(`/residents/${identity.residentName}/tasks/${task.taskName}`)}
            />
          );
        })}
      </BadgeModal>
    ),
  };
};

const useBadge = (badgeName?: string, started?: boolean) => {
  const identity = useIdentity();
  const api = useApi();
  const [badge, setBadge] = React.useState(null as Badge | null);
  React.useEffect(() => {
    (async () => {
      if (badgeName && identity.communityName) {
        setBadge(
          await api.badges.view(identity.communityName, badgeName, {
            residentName: identity.residentName,
          })
        );
      } else {
        setBadge(null);
      }
    })();

    return () => setBadge(null);
  }, [badgeName, identity.residentName, started]);

  return badge;
};

const useTasks = (badgeName?: string, status?: string) => {
  const identity = useIdentity();
  const api = useApi();
  const [tasks, setTasks] = React.useState(null as Task[] | null);
  React.useEffect(() => {
    (async () => {
      if (badgeName && badgeName !== "undefined") {
        setTasks(
          await api.tasks.list(identity.residentName || "", {
            badgeName: badgeName,
          })
        );
      } else {
        setTasks(null);
      }
    })();
    return () => setTasks(null);
  }, [badgeName, identity.residentName, status]);
  return tasks;
};
