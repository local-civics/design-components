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
  const [, badges] = useBadges(tenantName);
  const organization = useOrganization(tenantName);
  const impact = useImpact(tenantName);
  const [tab, setTab] = useTab();
  const [status, setStatus] = useStatus();
  const tasks = useTasks(tenantName, status);

  return {
    ResidentWidget: () => <ProfileWidget isLoading={tenant === null || peer === null} {...peer} online={true} />,

    AboutWidget: () => (
      <AboutWidget
        {...peer}
        isLoading={tenant === null || peer === null}
        edit={tenantName === tenant.tenantName}
        placeName={organization && organization.address}
        communityName={organization && organization.displayName}
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

    ImpactWidget: () => <ImpactWidget isLoading={impact === null} {...impact?.overall} />,

    AchievementWidget: () => <AchievementWidget isLoading={impact === null} {...impact?.overall} />,

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
            {badges && badges.map((badge: any) => (
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
            {tasks && tasks.map((task: any) => {
              return <TaskPreview
                  {...task}
                  full
                  status={status}
                  key={task.taskId}
                  onAction={() => navigate(`/tenants/${tenantName}/tasks/${task.taskId}`)}
              />
            })}
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
      setTenant(await api.do(ctx, "GET", "identity", `/tenants/${tenantName}`));
    })();
    return () => setTenant(null);
  }, [tenantName, api.accessToken]);

  return tenant;
};

// A hook to fetch badges
export const useBadges = (tenantName: string, refresh?: boolean) => {
  const [isNewBadge, setIsNewBadge] = React.useState(false)
  const [prev, setPrev] = React.useState(null as any);
  const [badges, setBadges] = React.useState(null as any);
  const api = useApi();
  const location = useLocation();

  const checkNewBadge = (badges: any) => {
    if(badges){
      if(prev && prev?.filter((b: any) => b.isAwarded).length < badges.filter((b: any) => b.isAwarded).length){
          setIsNewBadge(true)
      } else {
          setIsNewBadge(false)
      }
      setPrev(badges)
    }
  }

  React.useEffect(() => {
    setBadges(null);
    (async () => {
      const ctx = { referrer: location.pathname };
      const data = await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/badges`)
      setBadges(data);
      checkNewBadge(data)
    })();
    return () => setBadges(null);
  }, [tenantName, api.accessToken, refresh]);

  if(badges === null){
    return [isNewBadge, null] as [boolean, any]
  }

  const response = badges && badges.length > 0 ? badges : []
  return [isNewBadge, [
    {
      badgeId: "onboarding",
      isAwarded: true,
      headline: "Onboarding Badge",
      summary: "Getting started with Local",
      imageURL: "https://cdn.localcivics.io/badges/onboarding.png",
    },
    ...response,
  ]] as [boolean, any]
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
  }, [tenantName, api.accessToken, status]);

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
  const [status, setStatus] = React.useState(!!query.get("status") ? query.get("status") : "in-progress");
  const queryKey = JSON.stringify(query);

  React.useEffect(() => {
    setStatus(!!query.get("status") ? query.get("status") : "in-progress");
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
      const overall = await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/impact`)
      const career = await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/impact`, {
        query: {
          pathway: "college & career"
        }
      });
      const policy = await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/impact`, {
        query: {
          pathway: "policy & government"
        }
      });
      const culture = await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/impact`, {
        query: {
          pathway: "arts & culture"
        }
      });
      const volunteer = await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/impact`, {
        query: {
          pathway: "volunteer"
        }
      });
      const recreation = await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/impact`, {
        query: {
          pathway: "recreation"
        }
      });


      setImpact({overall, career, policy, culture, volunteer, recreation});
    })();
    return () => setImpact(null);
  }, [tenantName, api.accessToken]);

  return impact;
};

// A hook to fetch organizations
const useOrganization = (tenantName: string) => {
  const [organization, setOrganization] = React.useState(null as any);
  const api = useApi();
  const location = useLocation();

  React.useEffect(() => {
    setOrganization(null);
    (async () => {
      const ctx = { referrer: location.pathname };
      const organizations = await api.do(ctx, "GET", "identity", `/tenants/${tenantName}/organizations`)
      if(organizations && organizations.length > 0){
        setOrganization(await api.do(ctx, "GET", "identity", `/organizations/${organizations[0].name}`))
      }
    })();
    return () => setOrganization(null);
  }, [tenantName, api.accessToken]);

  return organization;
};
