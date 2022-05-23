import React from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useApi } from "../../contexts/App";
import { PathwayFilter } from "../../components/Pathway/PathwayFilter/PathwayFilter";
import { ActivityList } from "../../components/Activity/ActivityList/ActivityList";

/**
 * A connected container for the explore page
 * @constructor
 */
export const ExploreContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const tenantName = params.tenantName;
  if (!tenantName) {
    throw new Error("request is missing required params");
  }

  const [query, setQuery] = useSearchParams();
  const tags = query.getAll("tag");
  const pathways = query.getAll("pathway");
  const activities = useActivities(tenantName, {
    headline: query.get("headline"),
    directory: query.get("directory"),
    pathway: pathways,
    skill: query.getAll("skill"),
    tag: tags,
    day: query.get("day"),
    badgeId: query.get("badgeId"),
    status: query.get("status"),
  });

  const recommendation = useRecommendation(tenantName, {
    headline: query.get("headline"),
    directory: query.get("directory"),
    pathway: pathways,
    skill: query.getAll("skill"),
    tag: tags,
    day: query.get("day"),
    badgeId: query.get("badgeId"),
    status: query.get("status"),
  });

  return {
    PathwayFilter: () => (
      <PathwayFilter
        title="Explore"
        pathways={pathways}
        onChange={(pathways) => setQuery({ ...query, pathway: pathways })}
      />
    ),
    ActivityList: () => (
      <ActivityList
        isLoading={activities === null && recommendation === null}
        search={query.get("headline") || ""}
        onSearch={(q) => setQuery({ ...query, headline: q || [] })}
        tags={tags}
        onTagChange={(tags) => setQuery({ ...query, tag: tags })}
        activities={activities}
        top={recommendation?.top}
        upcoming={recommendation?.upcoming}
        milestones={recommendation?.milestones}
        onActivityClick={(activityId) => navigate(`${location.pathname}/${activityId}`)}
      />
    ),
  };
};

/**
 * A query object for activities
 */
type ActivityQuery = {
  headline: string | null;
  directory: string | null;
  pathway: string[] | null;
  skill: string[] | null;
  tag: string[] | null;
  day: string | null;
  badgeId: string | null;
  status: string | null;
};

// A hook to fetch activities
const useActivities = (tenantName: string, query: ActivityQuery) => {
  const [activities, setActivities] = React.useState(null as any);
  const api = useApi();
  const location = useLocation();
  const queryKey = JSON.stringify(query);

  React.useEffect(() => {
    setActivities(null);
    (async () => {
      const ctx = { referrer: location.pathname };
      setActivities(
        await api.do(ctx, "GET", "curriculum", `/activities`, {
          query: query,
        })
      );
    })();
    return () => setActivities(null);
  }, [tenantName, queryKey, api.accessToken]);

  return activities;
};

// A hook to fetch recommendations
const useRecommendation = (tenantName: string, query: ActivityQuery) => {
  const [recommendation, setRecommendation] = React.useState(null as any);
  const api = useApi();
  const location = useLocation();
  const queryKey = JSON.stringify(query);

  React.useEffect(() => {
    setRecommendation(null);
    (async () => {
      const ctx = { referrer: location.pathname };
      const promises = await Promise.all([
        api.do(ctx, "GET", "curriculum", `/activities`, {
          query: {
            ...query,
            startTime: new Date().toISOString(),
          },
        }),
        api.do(ctx, "GET", "curriculum", `/activities`, {
          query: {
            ...query,
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
        }),
        api.do(ctx, "GET", "curriculum", `/activities`, {
          query: {
            ...query,
            isMilestone: true,
          },
        }),
      ]);
      setRecommendation({
        top: promises[0],
        upcoming: promises[1],
        milestones: promises[2],
      });
    })();
    return () => setRecommendation(null);
  }, [tenantName, queryKey, api.accessToken]);

  return recommendation;
};
