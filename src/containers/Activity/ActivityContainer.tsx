/**
 * A connected container for tasks.
 * @constructor
 */
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useApi, useTenant } from "../../contexts/App";
import { useMessage } from "../../contexts/Message";
import { OpenActivity } from "../../components/Activity/OpenActivity/OpenActivity";

/**
 * Connected container for experience.
 * @constructor
 */
export const ActivityContainer = () => {
  const tenant = useTenant()
  const params = useParams();
  const tenantName = params.tenantName || tenant.tenantName;
  const activityId = params.activityId;
  const navigate = useNavigate();

  return {
    OpenActivity: () => {
      if(tenant.isLoading){
        return null
      }

      if (!tenantName || !activityId) {
        throw new Error("request must missing required params");
      }

      const activity = useActivity(tenantName, activityId);
      const [subscribed, toggleSubscription] = useSubscription(activityId, activity);

      return <OpenActivity
          {...activity}
          isBookmarked={subscribed}
          onRegister={toggleSubscription}
          onReflect={() => navigate(`${location.pathname}/reflection`)}
          onUnregister={toggleSubscription}
          onLaunch={() => activity?.link && window.open(activity?.link, "_blank")}
          onSkillClick={(skill: string) =>
              navigate(`/tenants/${tenantName}/activities?skill=${encodeURIComponent(skill)}`)
          }
          onClose={() => navigate(-1)}
      />
    },
  };
};

// A hook to fetch an activity
export const useActivity = (tenantName: string, activityId: string, refresh?: boolean) => {
  const [activity, setActivity] = React.useState({} as any);
  const api = useApi();
  const location = useLocation();
  React.useEffect(() => {
    setActivity(null);
    (async () => {
      const ctx = { referrer: location.pathname };
      setActivity(await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/activities/${activityId}`));
    })();
    return () => setActivity(null);
  }, [tenantName, activityId, api.accessToken, refresh]);

  return activity;
};

// A hook to react to an event
const useSubscription = (activityId: string, activity: any) => {
  const [isBookmarked, setSubscribed] = React.useState(activity?.isBookmarked || false);
  const tenant = useTenant();
  const location = useLocation();
  const api = useApi();
  const message = useMessage();

  React.useEffect(() => {
    if (activityId) {
      setSubscribed(activity?.isBookmarked);
    }
  }, [activityId, activity?.isBookmarked, api.accessToken]);

  return [
    isBookmarked,
    async () => {
      if (!tenant.tenantName || !tenant.email || !tenant.givenName || !activityId) {
        throw new Error("missing required context for registration");
      }

      const ctx = { referrer: location.pathname };
      let body: any = {
        sagaId: activity.sagaId,
      }
      let method: "PATCH" | "DELETE" = "PATCH"
      if(isBookmarked){
        method = "DELETE"
      } else {
        body = {...body, email: tenant.email,
          contactName: tenant.givenName,}
      }

      await api
        .do(ctx, method, "curriculum", `/tenants/${tenant.tenantName}/activities/${activityId}/bookmark`, {body})
        .then((err) => {
          if(!!err){
            return
          }

          setSubscribed(!isBookmarked);
          if (!isBookmarked) {
            if (activity?.rsvpRequired) {
              message.send(`Please be aware that this activity may require additional registration.`, {
                severity: "success",
                icon: "calendar",
                title: "Nice! You're registered.",
              });
            } else {
              message.send(`Check your email for confirmation.`, {
                severity: "success",
                icon: "calendar",
                title: "Nice! You're registered.",
              });
            }
          }
        });
    },
  ];
};
