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
  const activities = useActivities(tenantName, {
    headline: query.get("headline"),
    directory: query.get("directory"),
    pathways: query.getAll("pathway"),
    skills: query.getAll("skill"),
    tags: tags,
    day: query.get("day"),
    badgeId: query.get("badgeId"),
    status: query.get("status"),
  });

  const recommendation = useRecommendation(tenantName, {
    headline: query.get("headline"),
    directory: query.get("directory"),
    pathways: query.getAll("pathway"),
    skills: query.getAll("skill"),
    tags: tags,
    day: query.get("day"),
    badgeId: query.get("badgeId"),
    status: query.get("status"),
  });

  return {
    PathwayFilter: () => <PathwayFilter title="Explore" />,
    ActivityList: () => (
      <ActivityList
        isLoading={activities === null && recommendation === null}
        search={query.get("q") || ""}
        onSearch={(q) => setQuery({ ...query, q })}
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
  pathways: string[] | null;
  skills: string[] | null;
  tags: string[] | null;
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
        await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/activities`, {
          query: query,
        })
      );
    })();
    return () => setActivities(null);
  }, [tenantName, queryKey]);

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
      setRecommendation(
        await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/recommendations`, {
          query: query,
        })
      );
    })();
    return () => setRecommendation(null);
  }, [tenantName, queryKey]);

  return recommendation;
};
