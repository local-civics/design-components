import { request } from "@local-civics/js-client";
import React from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { ResidentContextState, useResidentContext } from "../../../../contexts/ResidentContext/ResidentContext";
import {useErrorContext, AppError}                            from "../../../../contexts/ErrorContext/ErrorContext";
import { getIconName } from "../../../../utils/icon/icon";
import { BadgeWorkflow } from "../../boards/HighlightBoard/BadgeWorkflow/BadgeWorkflow";
import { HighlightBoard } from "../../boards/HighlightBoard/HighlightBoard";
import { MilestoneWorkflow } from "../../boards/HighlightBoard/MilestoneWorkflow/MilestoneWorkflow";
import { TaskWorkflow } from "../../boards/HighlightBoard/TaskWorkflow/TaskWorkflow";
import { Badge } from "../../components/Badge/Badge";
import { Milestone } from "../../components/Milestone/Milestone";
import { Task } from "../../components/Task/Task";

/**
 * A connected container for the highlight board.
 * @constructor
 */
export const HighlightContainer = () => {
  const highlight = useHighlight();

  return {
    HighlightBoard: () => (
      <HighlightBoard
        disabled={highlight.browsing}
        resolving={highlight.resolvingTab}
        active={highlight.tab}
        onBadgeWorkflow={() => highlight.setTab("badge")}
        onMilestoneWorkflow={() => highlight.setTab("milestone")}
        onTaskWorkflow={() => highlight.setTab("task")}
      >
        {highlight.tab === "badge" && (
          <BadgeWorkflow>
            {highlight.badges &&
              highlight.badges.map((badge) => (
                <Badge
                  open={!!badge.open}
                  title={badge.title}
                  icon={getIconName(badge.pathway)}
                  statusIcon={getIconName(badge.status)}
                  status={badge.status}
                  imageURL={badge.imageURL}
                  onOpen={badge.open}
                  intensity={getBadgeIntensity(badge.status)}
                />
              ))}
          </BadgeWorkflow>
        )}

        {highlight.tab === "milestone" && !highlight.browsing && (
          <MilestoneWorkflow>
            {highlight.milestones &&
              highlight.milestones.map((milestone) => (
                <Milestone
                  open={!!milestone.open}
                  title={milestone.title}
                  icon={getIconName(milestone.pathway)}
                  status={milestone.status}
                  onOpen={milestone.open}
                />
              ))}
          </MilestoneWorkflow>
        )}

        {highlight.tab === "task" && !highlight.browsing && (
          <TaskWorkflow
            resolving={highlight.resolvingStatus}
            active={highlight.status}
            onDone={() => highlight.setStatus("done")}
            onTodo={() => highlight.setStatus("todo")}
            onUrgent={() => highlight.setStatus("urgent")}
          >
            {highlight.tasks &&
              highlight.tasks.map((task) => (
                <Task
                  open={!!task.open}
                  title={task.title}
                  icon={getIconName(task.pathway)}
                  status={task.status}
                  onOpen={task.open}
                />
              ))}
          </TaskWorkflow>
        )}
      </HighlightBoard>
    ),
  };
};

type BadgeState = {
  badgeName?: string;
  title?: string;
  pathway?: "policy & government" | "arts & culture" | "college & career" | "volunteer" | "recreation";
  imageURL?: string;
  status?: "bearing" | "contingent" | "unqualified";
  open?: () => void;
};

type MilestoneState = {
  eventName?: string;
  title?: string;
  pathway?: "policy & government" | "arts & culture" | "college & career" | "volunteer" | "recreation";
  notBefore?: string;
  open?: () => void;
  status?: "todo" | "done";
};

type TaskState = {
  eventName?: string;
  title?: string;
  pathway?: "policy & government" | "arts & culture" | "college & career" | "volunteer" | "recreation";
  notBefore?: string;
  open?: () => void;
  status?: "todo" | "done";
};

/**
 * A hook to fetch highlights for a resident.
 *
 * This hook must be called from the resident context.
 */
const useHighlight = () => {
  const ctx = useResidentContext();
  const navigate = useNavigate();
  const params = useParams();
  const errors = useErrorContext();
  const residentName = params.residentName;
  const communityName = params.communityName || ctx?.resident?.communityName;
  const [tab, setTab] = React.useState(getTab(params.tab || "badge"));
  const [status, setStatus] = React.useState(getStatus(params.status || "todo"));
  const [badges, setBadges] = React.useState(undefined as BadgeState[] | undefined);
  const [milestones, setMilestones] = React.useState(undefined as MilestoneState[] | undefined);
  const [tasks, setTasks] = React.useState(undefined as TaskState[] | undefined);
  const [resolvingTab, setResolvingTab] = React.useState(true);
  const [resolvingStatus, setResolvingStatus] = React.useState(true);
  const fetch = async () => {
    if (!ctx?.accessToken || !residentName || !communityName) {
      return;
    }

    try {
      switch (tab) {
        case "badge":
          setBadges(await fetchBadges(ctx, navigate, communityName, residentName));
          break;
        case "milestone":
          setMilestones(await fetchMilestones(ctx, navigate, communityName, residentName));
          break;
        case "task":
          setTasks(await fetchTasks(ctx, navigate, communityName, residentName, status));
          break;
      }
    } catch (e) {
      errors.emit(e);
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
  }, [ctx?.accessToken, communityName, residentName, tab]);

  React.useEffect(() => {
    setResolvingStatus(true);
    (async () => {
      await fetch();
      setResolvingStatus(false);
    })();
    return () => setResolvingStatus(true);
  }, [status]);

  return {
    resolvingTab: tab !== "task" && resolvingTab,
    resolvingStatus: resolvingStatus,
    browsing: residentName !== ctx?.resident?.residentName,
    tab: tab,
    status: status,
    badges: badges,
    milestones: milestones,
    tasks: tasks,
    setTab: setTab,
    setStatus: setStatus,
  };
};

const fetchBadges = async (
  ctx: ResidentContextState,
  navigate: NavigateFunction,
  communityName?: string,
  residentName?: string
) => {
  const openBadge = (badgeName?: string) => navigate(`/residents/${residentName}/badges/${badgeName}`);
  const endpoint = `/caliber/v0/communities/${communityName}/badges`;
  const query = {
    residentName: residentName,
    fields: ["badgeName", "title", "pathway", "imageURL", "status"],
  };
  const badges: BadgeState[] = await request(ctx.accessToken, "GET", endpoint, { params: query });
  badges.map((badge) => {
    if (residentName === ctx.resident?.residentName) {
      badge.open = () => openBadge(badge.badgeName);
    }
  });
  return badges;
};

const fetchMilestones = async (
  ctx: ResidentContextState,
  navigate: NavigateFunction,
  communityName?: string,
  residentName?: string
) => {
  const openEvent = (eventName?: string) => navigate(`/residents/${residentName}/events/${eventName}/edit`);
  const endpoint = `/curriculum/v0/communities/${communityName}/events`;
  const query = {
    residentName: residentName,
    timePeriod: "milestone",
    fields: ["eventName", "title", "pathway", "notBefore", "status"],
  };

  const milestones: MilestoneState[] = await request(ctx.accessToken, "GET", endpoint, { params: query });
  milestones.map((milestone) => {
    if (residentName === ctx.resident?.residentName) {
      milestone.open = () => openEvent(milestone.eventName);
    }
  });

  return milestones;
};

const fetchTasks = async (
  ctx: ResidentContextState,
  navigate: NavigateFunction,
  communityName?: string,
  residentName?: string,
  taskStatus?: "todo" | "urgent" | "done"
) => {
  const openEvent = (eventName?: string) => navigate(`/residents/${residentName}/events/${eventName}/edit`);
  const endpoint = `/curriculum/v0/communities/${communityName}/events`;
  const query = {
    residentName: residentName,
    status: taskStatus,
    fields: ["eventName", "title", "pathway", "notBefore", "status"],
  };

  const tasks: MilestoneState[] = await request(ctx.accessToken, "GET", endpoint, { params: query });
  tasks.map((task) => {
    if (residentName === ctx.resident?.residentName) {
      task.open = () => openEvent(task.eventName);
    }
  });

  return tasks;
};

const getTab = (name?: string) => {
  if (!["badge", "milestone", "task"].includes(name || "")) {
    throw new AppError("Bad Request", `the provided tab "${name}" does not exist`);
  }

  return name as "badge" | "milestone" | "task";
};

const getStatus = (name?: string) => {
  if (!["todo", "urgent", "done"].includes(name || "")) {
    throw new AppError("Bad Request", `the provided status "${name}" does not exist`);
  }

  return name as "todo" | "urgent" | "done";
};

const getBadgeIntensity = (name?: string) => {
  if (["normal", "faded"].includes(name || "")) {
    return name as "normal" | "faded";
  }
};
