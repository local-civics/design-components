import { Badge, Resident, Task } from "@local-civics/js-client";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useApi, useIdentity } from "../../../../contexts/App";
import { getIconName } from "../../../../utils/icon/icon";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import { BadgeWorkflow } from "../../components/BadgeWorkflow/BadgeWorkflow";
import { TaskWorkflow } from "../../components/TaskWorkflow/TaskWorkflow";
import { BadgeComponent } from "../../components/Badge/Badge";
import { Task as TaskItem } from "../../components/Task/Task";
import { usePeer } from "../ResidentContainer/ResidentContainer";

/**
 * A connected container for the dashboard board.
 * @constructor
 */
export const DashboardContainer = () => {
  const identity = useIdentity();
  const dashboard = useDashboard(identity);
  const navigate = useNavigate();
  const peer = usePeer();

  return {
    Dashboard: () => (
      <Dashboard
        disabled={identity.residentName !== peer?.residentName}
        resolving={dashboard.resolvingTab}
        active={dashboard.tab}
        onBadgeWorkflow={() => dashboard.setTab("badges")}
        onTaskWorkflow={() => dashboard.setTab("tasks")}
      >
        {dashboard.tab === "badges" && (
          <BadgeWorkflow>
            {dashboard.badges &&
              dashboard.badges.map((badge) => (
                <BadgeComponent
                  {...badge}
                  key={badge.badgeName}
                  open={identity.residentName === peer?.residentName}
                  onOpen={() => navigate(`/residents/${identity.residentName}/badges/${badge.badgeName}`)}
                />
              ))}
          </BadgeWorkflow>
        )}

        {dashboard.tab === "tasks" && identity.residentName === peer?.residentName && (
          <TaskWorkflow
            resolving={dashboard.resolvingStatus}
            active={dashboard.status}
            onDone={() => dashboard.setStatus("done")}
            onTodo={() => dashboard.setStatus("todo")}
            onInProgress={() => dashboard.setStatus("in-progress")}
          >
            {dashboard.tasks &&
              dashboard.tasks.map((task) => (
                <TaskItem
                  {...task}
                  open
                  key={task.taskName}
                  onOpen={() => navigate(`/residents/${identity.residentName}/tasks/${task.taskName}`)}
                />
              ))}
          </TaskWorkflow>
        )}
      </Dashboard>
    ),
  };
};

/**
 * A hook to fetch dashboards for a resident.
 *
 * This hook must be called from the resident context.
 */
const useDashboard = (peer?: Resident) => {
  const location = useLocation();
  const params = useParams();
  const api = useApi();

  const residentName = peer?.residentName || "";
  const communityName = peer?.communityName || "";
  const [tab, setTab] = React.useState(getTab(params.tab || "badges"));
  const [status, setStatus] = React.useState(getStatus(params.status || "todo"));
  const [badges, setBadges] = React.useState(undefined as Badge[] | undefined);
  const [tasks, setTasks] = React.useState(undefined as Task[] | undefined);
  const [resolvingTab, setResolvingTab] = React.useState(true);
  const [resolvingStatus, setResolvingStatus] = React.useState(true);
  const fetch = async () => {
    if (!residentName || !communityName) {
      return;
    }

    switch (tab) {
      case "badges":
        setBadges(await api.badges.list(communityName, { residentName: residentName }));
        break;
      case "tasks":
        setTasks(await api.tasks.list(residentName, { status }));
        break;
    }
  };

  React.useEffect(() => {
    setResolvingTab(true);
    setResolvingStatus(true);
    (async () => {
      await fetch();
      setResolvingTab(false);
      setResolvingStatus(false);
    })();
    return () => setResolvingTab(true);
  }, [communityName, residentName, tab]);

  React.useEffect(() => {
    if (tab !== "tasks") {
      return;
    }

    setResolvingStatus(true);
    (async () => {
      await fetch();
      setResolvingStatus(false);
    })();
    return () => setResolvingStatus(true);
  }, [status, location.pathname]);

  return {
    resolvingTab: tab !== "tasks" && resolvingTab,
    resolvingStatus: resolvingStatus,
    tab: tab,
    status: status,
    badges: badges,
    tasks: tasks,
    setTab: setTab,
    setStatus: setStatus,
  };
};

const getTab = (name?: string) => {
  if (!name || name === "undefined") {
    return "badges";
  }

  if (!["badges", "tasks"].includes(name || "")) {
    throw new Error(`the provided tab "${name}" does not exist`);
  }

  return name as "badges" | "tasks";
};

const getStatus = (name?: string) => {
  if (!name || name === "undefined") {
    return "todo";
  }

  if (!["todo", "in-progress", "done"].includes(name || "")) {
    throw new Error(`the provided status "${name}" does not exist`);
  }

  return name as "todo" | "in-progress" | "done";
};
