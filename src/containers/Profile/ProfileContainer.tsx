import { BadgePreview, OrganizationSearchView, TaskView, TenantPreview, WorkspaceView } from "@local-civics/js-client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi, useTenant } from "../../contexts/App";
import { AboutWidget } from "../../components/Profile/AboutWidget/AboutWidget";
import { AchievementWidget } from "../../components/Profile/AchievementWidget/AchievementWidget";
import { PathwayProgress } from "../../components/Pathway/PathwayProgress/PathwayProgress";
import { BadgeComponent } from "../../components/Badge/BadgePreview/BadgePreview";
import { BadgeList } from "../../components/Badge/BadgeList/BadgeList";
import { Dashboard } from "../../components/Profile/Dashboard/Dashboard";
import { ImpactWidget } from "../../components/Profile/ImpactWidget/ImpactWidget";
import { PathwayWidget } from "../../components/Pathway/PathwayWidget/PathwayWidget";
import { ProfileWidget } from "../../components/Profile/ProfileWidget/ProfileWidget";
import { Task as TaskItem } from "../../components/Profile/Task/Task";
import { TaskList } from "../../components/Task/TaskList/TaskList";

/**
 * A connected container for the resident and about widget.
 * @constructor
 */
export const ProfileContainer = () => {
  const { tenant, workspace, navigation } = useWorkspace();
  const primaryOrganization =
    workspace?.organizations && workspace.organizations.length > 0 ? workspace.organizations[0] : {};
  const navigate = useNavigate();
  const awards = [...workspace?.awards || []];
  if (
    tenant.nickname &&
    tenant.organizations &&
    tenant.interests &&
    tenant.givenName &&
    tenant.familyName &&
    tenant.avatarURL
  ) {
    awards.push({
      id: 0,
      headline: "Onboarding BadgePreview",
      summary: "Getting started with Local",
      imageURL: "https://cdn.localcivics.io/badges/onboarding.png",
    });
  }
  const objectives = [...workspace?.objectives || []];
  const incentives = [...workspace?.incentives || []];
  const badges = awards.map((badge) => (
    <BadgeComponent
      {...badge}
      open={tenant.nickname === workspace?.nickname}
      award
      key={`${badge.marketId}:${badge.id}:${badge.level}`}
      onOpen={() => badge.id && navigate(`/tenants/${tenant.nickname}/${badgePath(primaryOrganization, badge)}`)}
    />
  ));

  badges.push(
    ...objectives.map((badge) => (
      <BadgeComponent
        {...badge}
        objective
        open={tenant.nickname === workspace?.nickname}
        key={`${badge.marketId}:${badge.id}:${badge.level}`}
        onOpen={() => badge.id && navigate(`/tenants/${tenant.nickname}/${badgePath(primaryOrganization, badge)}`)}
      />
    ))
  );

  badges.push(
    ...incentives.map((badge) => (
      <BadgeComponent
        {...badge}
        incentive
        open={tenant.nickname === workspace?.nickname}
        key={`${badge.marketId}:${badge.id}:${badge.level}`}
        onOpen={() => badge.id && navigate(`/tenants/${tenant.nickname}/${badgePath(primaryOrganization, badge)}`)}
      />
    ))
  );

  const tasks =
    navigation.status === "todo"
      ? workspace?.todo || []
      : navigation.status === "in-progress"
      ? workspace?.inProgress || []
      : navigation.status === "done"
      ? workspace?.done || []
      : [];

  return {
    ResidentWidget: () => (
      <ProfileWidget
        isLoading={workspace === null}
        avatarURL={workspace?.avatarURL}
        tenantName={workspace?.nickname}
        givenName={workspace?.givenName}
        familyName={workspace?.familyName}
        createdAt={workspace?.createdAt}
        online={true}
      />
    ),

    AboutWidget: () => (
      <AboutWidget
        isLoading={workspace === null}
        edit={workspace?.nickname === tenant?.nickname}
        impactStatement={workspace?.statement}
        placeName={primaryOrganization.location}
        communityName={primaryOrganization.name || primaryOrganization.nickname}
        onEdit={() => tenant?.nickname && navigate(`/tenants/${tenant.nickname}/settings`)}
      />
    ),

    PathwayWidget: () => (
      <PathwayWidget isLoading={workspace?.impact === null}>
        <PathwayProgress {...workspace?.impact?.career} icon="college & career" title="college & career" />
        <PathwayProgress {...workspace?.impact?.policy} icon="policy & government" title="policy & government" />
        <PathwayProgress {...workspace?.impact?.culture} icon="arts & culture" title="arts & culture" />
        <PathwayProgress {...workspace?.impact?.volunteer} icon="volunteer" title="volunteer" />
        <PathwayProgress {...workspace?.impact?.recreation} icon="recreation" title="recreation" />
      </PathwayWidget>
    ),

    ImpactWidget: () => <ImpactWidget isLoading={workspace?.impact === null} {...workspace?.impact} />,

    AchievementWidget: () => (
      <AchievementWidget
        isLoading={workspace?.impact === null}
        badges={awards?.length}
        milestones={workspace?.impact?.milestones}
        reflections={workspace?.impact?.reflections}
      />
    ),

    Dashboard: () => (
      <Dashboard
        disabled={workspace?.nickname !== tenant?.nickname}
        isLoading={workspace === null}
        active={navigation.tab}
        onBadgeWorkflow={() => navigation.setTab("badges")}
        onTaskWorkflow={() => navigation.setTab("tasks")}
      >
        {navigation.tab === "badges" && <BadgeList>{badges}</BadgeList>}

        {navigation.tab === "tasks" && workspace?.nickname === tenant?.nickname && (
          <TaskList
            isLoading={workspace === null}
            active={navigation.status}
            onDone={() => navigation.setStatus("done")}
            onTodo={() => navigation.setStatus("todo")}
            onInProgress={() => navigation.setStatus("in-progress")}
          >
            {tasks.map((task) => (
              <TaskItem
                {...task}
                open
                status={navigation.status}
                key={`${task.marketId}:${task.badgeId}:${task.level}:${task.title}`}
                onOpen={() => navigate(`/tenants/${tenant.nickname}/${taskPath(primaryOrganization, task)}`)}
              />
            ))}
          </TaskList>
        )}
      </Dashboard>
    ),
  };
};

/**
 * A hook to subscribe to the workspace.
 */
export const useWorkspace = () => {
  const params = useParams();
  const tenantName = params.tenantName;
  const api = useApi();
  const tenant = useTenant();
  const po = tenant?.organizations && tenant.organizations.length > 0 ? tenant.organizations[0] : {};
  const [tab, setTab] = React.useState(getTab(params.tab || "badges"));
  const [status, setStatus] = React.useState(getStatus(params.status || "todo"));
  const [workspace, setWorkspace] = React.useState(null as (WorkspaceView & TenantPreview) | null);
  React.useEffect(() => {
    if (tenant.nickname && tenantName) {
      (async () => {
        const space = await api.curriculum.viewWorkspace(tenantName || "", po.nickname || "");
        const tenant = await api.tenant.viewTenant(tenantName);
        setWorkspace({ ...space, ...tenant });
      })();
    } else {
      setWorkspace(null);
    }
  }, [tenantName, tenant?.nickname]);

  return {
    tenant,
    workspace,
    navigation: {
      tab,
      status,
      setTab,
      setStatus,
    },
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

const badgePath = (org: OrganizationSearchView, badge: BadgePreview) => {
  return `badges/${org.nickname}/${badge.id}` + ((badge.level || 0) > 0 ? `.${badge.level}` : "");
};

const taskPath = (org: OrganizationSearchView, task: TaskView) => {
  return `${badgePath(org, { marketId: task.marketId, id: task.badgeId, level: task.level })}/tasks/${task.id}`;
};
