import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../contexts/App";
import { TaskPreview } from "../../components/Task/TaskPreview/TaskPreview";
import { BadgeWorkflow } from "../../workflows/BadgeWorkflow/BadgeWorkflow";
import { useMessage } from "../../contexts/Message";

/**
 * A connected container for badges.
 * @constructor
 */
export const BadgeContainer = () => {
  const navigate = useNavigate();
  const params = useParams();
  const tenantName = params.tenantName;
  const badgeId = params.badgeId;
  if (!tenantName || !badgeId) {
    throw new Error("request must missing required params");
  }
  const [started, setStarted] = React.useState(false);
  const badge = useBadge(tenantName, badgeId, started);
  const startBadge = useStartBadge(tenantName, badge.sagaId, badgeId, setStarted);
  return {
    OpenBadge: () => (
      <BadgeWorkflow
        {...badge}
        onStart={startBadge}
        onClose={() => navigate(-1)}
        showTasks={!!badge.tasks && badge.tasks.length > 0}
      >
        {badge.tasks &&
          badge.tasks.map((task: any) => {
            const link = `/tenants/${tenantName}/tasks/${task.taskId}`;
            return <TaskPreview key={`${task.criterionId}`} action {...task} onAction={() => navigate(link)} />;
          })}
      </BadgeWorkflow>
    ),
  };
};

// A hook to fetch a badge
const useBadge = (tenantName: string, badgeId: string, started: boolean) => {
  const [badge, setBadge] = React.useState({} as any);
  const api = useApi();
  const location = useLocation();
  React.useEffect(() => {
    if (badgeId === "onboarding") {
      setBadge({
        badgeId: "onboarding",
        isAwarded: true,
        headline: "Onboarding Badge",
        summary: "Getting started with Local",
        imageURL: "https://cdn.localcivics.io/badges/onboarding.png",
      });
      return;
    }

    (async () => {
      const ctx = { referrer: location.pathname };
      const promises = await Promise.all([
        api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/badges/${badgeId}`),
        api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/badges/${badgeId}/tasks`),
      ]);
      setBadge({ ...promises[0], tasks: promises[1] });
    })();

    return () => setBadge({});
  }, [tenantName, badgeId, api.accessToken, started]);

  return badge;
};

// A hook to start a badge
const useStartBadge = (
  tenantName: string,
  sagaId: string,
  badgeId: string,
  setStarted: (isStarted: boolean) => void
) => {
  const api = useApi();
  const location = useLocation();
  const message = useMessage();
  return async () => {
    const ctx = { referrer: location.pathname };
    await api
      .do(ctx, "PUT", "curriculum", `/tenants/${tenantName}/badges/${badgeId}/start`, {
        body: {
          sagaId,
        },
      })
      .then((err) => {
        if (!err) {
          setStarted(true);
          message.send(`You've just started a badge.`, {
            severity: "success",
            icon: "badge",
            title: "Good work!",
          });
        }
      });
  };
};
