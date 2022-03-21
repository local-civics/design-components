import {BadgePreview, OrganizationSearchView, TaskView, TenantPreview, WorkspaceView} from "@local-civics/js-client";
import React                                                                          from "react";
import { useNavigate, useParams }             from "react-router-dom";
import { useApi, useIdentity }                from "../../../../contexts/App";
import { AboutWidget }                        from "../../components/AboutWidget/AboutWidget";
import {AchievementWidget}                    from "../../components/AchievementWidget/AchievementWidget";
import {ActivityProgress}                     from "../../components/ActivityProgress/ActivityProgress";
import {BadgeComponent}                       from "../../components/Badge/Badge";
import {BadgeWorkflow}                        from "../../components/BadgeWorkflow/BadgeWorkflow";
import {Dashboard}                            from "../../components/Dashboard/Dashboard";
import {ImpactWidget}                         from "../../components/ImpactWidget/ImpactWidget";
import {PathwayWidget}                        from "../../components/PathwayWidget/PathwayWidget";
import { ResidentWidget }                     from "../../components/ResidentWidget/ResidentWidget";
import {Task as TaskItem}                     from "../../components/Task/Task";
import {TaskWorkflow}                         from "../../components/TaskWorkflow/TaskWorkflow";

/**
 * A connected container for the resident and about widget.
 * @constructor
 */
export const WorkspaceContainer = () => {
  const {identity, workspace, navigation} = useWorkspace()
  const primaryOrganization = workspace?.organizations && workspace.organizations.length > 0 ? workspace.organizations[0] : {}
  const navigate = useNavigate();
  return {
    ResidentWidget: () => (
      <ResidentWidget
        resolving={workspace === null}
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
        resolving={workspace === null}
        edit={workspace?.nickname === identity?.nickname}
        impactStatement={workspace?.statement}
        placeName={primaryOrganization.location}
        communityName={primaryOrganization.name || primaryOrganization.nickname}
        onEdit={() => identity?.nickname && navigate(`/tenants/${identity.nickname}/settings`)}
      />
    ),

    PathwayWidget: () => (
        <PathwayWidget resolving={workspace?.impact === null}>
          <ActivityProgress {...workspace?.impact?.career} icon="college & career" title="college & career" />
          <ActivityProgress {...workspace?.impact?.policy} icon="policy & government" title="policy & government" />
          <ActivityProgress {...workspace?.impact?.culture} icon="arts & culture" title="arts & culture" />
          <ActivityProgress {...workspace?.impact?.volunteer} icon="volunteer" title="volunteer" />
          <ActivityProgress {...workspace?.impact?.recreation} icon="recreation" title="recreation" />
        </PathwayWidget>
    ),

    ImpactWidget: () => <ImpactWidget resolving={workspace?.impact === null} {...workspace?.impact} />,

    AchievementWidget: () => (
        <AchievementWidget
            resolving={workspace?.impact === null}
            badges={workspace?.awards?.length}
            milestones={workspace?.impact?.milestones}
            reflections={workspace?.impact?.reflections}
        />
    ),

    Dashboard: () => (
        <Dashboard
            disabled={workspace?.nickname !== identity?.nickname}
            resolving={workspace === null}
            active={navigation.tab}
            onBadgeWorkflow={() => navigation.setTab("badges")}
            onTaskWorkflow={() => navigation.setTab("tasks")}
        >
          {navigation.tab === "badges" && (
              <BadgeWorkflow>
                {workspace?.awards &&
                workspace?.awards.map((badge) => (
                    <BadgeComponent
                        {...badge}
                        key={`${badge.marketId}:${badge.id}:${badge.level}`}
                        onOpen={() => navigate(`/tenants/${identity.nickname}/${badgePath(primaryOrganization, badge)}`)}
                    />
                ))}
              </BadgeWorkflow>
          )}

          {navigation.tab === "tasks" && workspace?.nickname !== identity?.nickname && (
              <TaskWorkflow
                  resolving={workspace === null}
                  active={navigation.status}
                  onDone={() => navigation.setStatus("done")}
                  onTodo={() => navigation.setStatus("todo")}
                  onInProgress={() => navigation.setStatus("in-progress")}
              >
                {
                  workspace?.todo?.map((task) => (
                    <TaskItem
                        {...task}
                        open
                        key={`${task.marketId}:${task.badgeId}:${task.level}:${task.title}`}
                        onOpen={() => navigate(`/tenants/${identity.nickname}/${taskPath(primaryOrganization, task)}`)}
                    />
                ))}
              </TaskWorkflow>
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
  const identity = useIdentity();
  const [tab, setTab] = React.useState(getTab(params.tab || "badges"));
  const [status, setStatus] = React.useState(getStatus(params.status || "todo"));
  const [workspace, setWorkspace] = React.useState(null as (WorkspaceView & TenantPreview) | null);
  React.useEffect(() => {
    if (identity.nickname && tenantName) {
      (async () => {
        const space = await api.curriculum.viewWorkspace(tenantName || "")
        const tenant = await api.identity.viewTenant(tenantName)
        setWorkspace({...space, ...tenant});
      })();
    } else {
      setWorkspace(null);
    }
  }, [tenantName, identity?.nickname]);

  return {
    identity,
    workspace,
    navigation: {
      tab,
      status,
      setTab,
      setStatus,
    }
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
  return `badges/${org.nickname}/${badge.id}` + ((badge.level || 0) > 0 ? `${badge.level}` : '')
}

const taskPath = (org: OrganizationSearchView, task: TaskView) => {
  return `${badgePath(org, {marketId: task.marketId, id: task.badgeId, level: task.level})}/tasks/${task.id}`
}