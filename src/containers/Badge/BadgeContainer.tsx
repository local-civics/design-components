import React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useApi} from "../../contexts/App";
import { TaskPreview } from "../../components/Task/TaskPreview/TaskPreview";
import { OpenBadge } from "../../components/Badge/OpenBadge/OpenBadge";

/**
 * A connected container for badges.
 * @constructor
 */
export const BadgeContainer = () => {
  const navigate = useNavigate();
  const params = useParams()
  const tenantName = params.tenantName
  const badgeId = params.badgeId;
  if(!tenantName || !badgeId){
    throw new Error("request must missing required params")
  }
  const badge = useBadge(tenantName, badgeId);
  const startBadge = useStartBadge(tenantName, badgeId)
  return {
    OpenBadge: () => (
      <OpenBadge
        { ...badge }
        onStart={startBadge}
        showTasks={!!badge.tasks && badge.tasks.length > 0}
      >
        {badge.tasks &&
          badge.tasks.map((task: any) => {
            const search = new URLSearchParams()
            if(task?.activityName !== ""){
                search.set("headline", task?.activityName)
            }

            if(task?.directory !== ""){
              search.set("directory", task?.directory)
            }

            const link = `/tenants/${tenantName}/activities?${search.toString()}`;
            return (
              <TaskPreview
                key={`${task.criterionId}`}
                action
                {...task}
                onAction={() => link && navigate(link)}
              />
            );
          })}
      </OpenBadge>
    ),
  };
};

// A hook to fetch a badge
const useBadge = (tenantName: string, badgeId: string) => {
  const [badge, setBadge] = React.useState({} as any)
  const api = useApi();
  const location = useLocation()
  React.useEffect(() => {
    (async () => {
      const ctx = {referrer: location.pathname}
      setBadge({ ...await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/badges/${badgeId}`)})
    })();

    return () => setBadge({});
  }, [tenantName, badgeId])

  return badge
}

// A hook to start a badge
const useStartBadge = (tenantName: string, badgeId: string) => {
  const api = useApi();
  const location = useLocation()
  return async () => {
    const ctx = {referrer: location.pathname}
    await api.do(ctx, "POST", "curriculum", `/tenants/${tenantName}/badges/${badgeId}`)
  }
}