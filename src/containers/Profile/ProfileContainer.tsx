import React from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useApi, useTenant } from "../../contexts/App";
import { AboutWidget } from "../../components/Profile/AboutWidget/AboutWidget";
import { AchievementWidget } from "../../components/Profile/AchievementWidget/AchievementWidget";
import { PathwayProgress } from "../../components/Pathway/PathwayProgress/PathwayProgress";
import { BadgePreview } from "../../components/Badge/BadgePreview/BadgePreview";
import { BadgeList } from "../../components/Badge/BadgeList/BadgeList";
import { Dashboard } from "../../components/Profile/Dashboard/Dashboard";
import { ImpactWidget } from "../../components/Profile/ImpactWidget/ImpactWidget";
import { PathwayWidget } from "../../components/Pathway/PathwayWidget/PathwayWidget";
import { ProfileWidget } from "../../components/Profile/ProfileWidget/ProfileWidget";
import { TaskList } from "../../components/Task/TaskList/TaskList";
import { TaskPreview } from "../../components/Task/TaskPreview/TaskPreview";

/**
 * A connected container for the resident and about widget.
 * @constructor
 */
export const ProfileContainer = () => {
  const params = useParams();
  const navigate = useNavigate();
  const tenantName = params.tenantName;
  if (!tenantName) {
    throw new Error("request must missing required params");
  }

  const tenant = useTenant();
  const peer = usePeer(tenantName);
  const badges = useBadges(tenantName);
  const organizations = useOrganizations(tenantName);
  const impact = useImpact(tenantName);
  const [tab, setTab] = useTab();
  const [status, setStatus] = useStatus();
  const tasks = useTasks(tenantName, status);

  return {
    ResidentWidget: () => <ProfileWidget {...peer} online={true} />,

    AboutWidget: () => (
      <AboutWidget
        {...peer}
        isLoading={tenant === null}
        edit={tenantName === tenant.tenantName}
        placeName={organizations && organizations.length > 0 && organizations[0].address}
        communityName={organizations && organizations.length > 0 && organizations[0].displayName}
        onEdit={() => navigate(`/tenants/${tenantName}/settings`)}
      />
    ),

    PathwayWidget: () => (
      <PathwayWidget isLoading={impact === null}>
        <PathwayProgress {...impact?.career} icon="college & career" title="college & career" />
        <PathwayProgress {...impact?.policy} icon="policy & government" title="policy & government" />
        <PathwayProgress {...impact?.culture} icon="arts & culture" title="arts & culture" />
        <PathwayProgress {...impact?.volunteer} icon="volunteer" title="volunteer" />
        <PathwayProgress {...impact?.recreation} icon="recreation" title="recreation" />
      </PathwayWidget>
    ),

    ImpactWidget: () => <ImpactWidget isLoading={impact === null} {...impact} />,

    AchievementWidget: () => <AchievementWidget isLoading={impact === null} {...impact} />,

    Dashboard: () => (
      <Dashboard
        disabled={tenant.tenantName !== tenantName}
        isLoading={peer === null}
        active={tab}
        onBadgeWorkflow={() => setTab("badges")}
        onTaskWorkflow={() => setTab("tasks")}
      >
        {tab === "badges" && (
          <BadgeList>
            {badges.map((badge) => (
              <BadgePreview
                {...badge}
                key={`${badge.badgeId}`}
                onOpen={() => navigate(`/tenants/${tenantName}/badges/${badge.badgeId}`)}
              />
            ))}
          </BadgeList>
        )}

        {tab === "tasks" && tenant.tenantName === tenantName && (
          <TaskList
            isLoading={tasks === null}
            active={status}
            onDone={() => setStatus("done")}
            onTodo={() => setStatus("todo")}
            onInProgress={() => setStatus("in-progress")}
          >
            {tasks.map((task: any) => (
              <TaskPreview
                {...task}
                status={status}
                key={task.taskId}
                onOpen={() => navigate(`/tenants/${tenantName}/tasks/${task.taskId}`)}
              />
            ))}
          </TaskList>
        )}
      </Dashboard>
    ),
  };
};

// A hook for fetching a tenant
const usePeer = (tenantName: string) => {
  const [tenant, setTenant] = React.useState(null as any);
  const api = useApi();
  const location = useLocation();

  React.useEffect(() => {
    setTenant(null);
    (async () => {
      const ctx = { referrer: location.pathname };
      setTenant(await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}`));
    })();
    return () => setTenant(null);
  }, [tenantName]);

  return tenant;
};

// A hook to fetch badges
const useBadges = (tenantName: string) => {
  const [badges, setBadges] = React.useState(null as any);
  const api = useApi();
  const location = useLocation();

  React.useEffect(() => {
    setBadges(null);
    (async () => {
      const ctx = { referrer: location.pathname };
      setBadges(await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/badges`));
    })();
    return () => setBadges(null);
  }, [tenantName]);

  return [
    ...badges,
    {
      badgeId: "onboarding",
      isAwarded: true,
      headline: "Onboarding Badge",
      summary: "Getting started with Local",
      imageURL: "https://cdn.localcivics.io/badges/onboarding.png",
    },
  ];
};

// A hook for fetching tasks
const useTasks = (tenantName: string, status: string) => {
  const [tasks, setTasks] = React.useState(null as any);
  const api = useApi();
  const location = useLocation();

  React.useEffect(() => {
    setTasks(null);
    (async () => {
      const ctx = { referrer: location.pathname };
      setTasks(
        await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/tasks`, {
          query: {
            status,
          },
        })
      );
    })();
    return () => setTasks(null);
  }, [tenantName]);

  return tasks;
};

// A hook for subscribing and updating tab
const useTab = () => {
  const [query] = useSearchParams();
  const [tab, setTab] = React.useState(!!query.get("tab") ? query.get("tab") : "badges");
  const queryKey = JSON.stringify(query);

  React.useEffect(() => {
    setTab(!!query.get("tab") ? query.get("tab") : "badges");
  }, [queryKey]);

  return [tab, setTab] as [any, any];
};

// A hook for subscribing and updating status
const useStatus = () => {
  const [query] = useSearchParams();
  const [status, setStatus] = React.useState(!!query.get("status") ? query.get("status") : "todo");
  const queryKey = JSON.stringify(query);

  React.useEffect(() => {
    setStatus(!!query.get("status") ? query.get("status") : "todo");
  }, [queryKey]);

  return [status, setStatus] as [any, any];
};

// A hook to fetch impact
const useImpact = (tenantName: string) => {
  const [impact, setImpact] = React.useState(null as any);
  const api = useApi();
  const location = useLocation();

  React.useEffect(() => {
    setImpact(null);
    (async () => {
      const ctx = { referrer: location.pathname };
      setImpact(await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/impact`));
    })();
    return () => setImpact(null);
  }, [tenantName]);

  return impact;
};

// A hook to fetch organizations
const useOrganizations = (tenantName: string) => {
  const [organizations, setOrganizations] = React.useState(null as any);
  const api = useApi();
  const location = useLocation();

  React.useEffect(() => {
    setOrganizations(null);
    (async () => {
      const ctx = { referrer: location.pathname };
      setOrganizations(await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/organizations`));
    })();
    return () => setOrganizations(null);
  }, [tenantName]);

  return organizations;
};
