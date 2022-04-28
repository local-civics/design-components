/**
 * A connected container for tasks.
 * @constructor
 */
import React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { useApi, useTenant } from "../../contexts/App";
import { useMessage } from "../../contexts/Message";
import { OpenActivity } from "../../components/Activity/OpenActivity/OpenActivity";

/**
 * Connected container for experience.
 * @constructor
 */
export const ActivityContainer = () => {
  const params = useParams()
  const tenantName = params.tenantName
  const activityId = params.activityId;
  if(!tenantName || !activityId){
    throw new Error("request must missing required params")
  }

  const navigate = useNavigate();
  const activity = useActivity(tenantName, activityId);
  const [subscribed, toggleSubscription] = useSubscription(activity)

  return {
    OpenActivity: () => (
      <OpenActivity
        {...activity}
        isSubscribed={subscribed}
        onRegister={toggleSubscription}
        onReflect={() => navigate(`/tenants/${tenantName}/reflections/${activityId}`)}
        onUnregister={toggleSubscription}
        onLaunch={() => activity?.link && window.open(activity?.link, "_blank")}
        onSkillClick={(skill: string) => navigate(`/tenants/${tenantName}/activities?skill=${encodeURIComponent(skill)}`)}
      />
    ),
  };
};

// A hook to fetch an activity
const useActivity = (tenantName: string, activityId: string) => {
  const [activity, setActivity] = React.useState({} as any)
  const api = useApi();
  const location = useLocation()
  React.useEffect(() => {
    setActivity(null);
    (async () => {
      const ctx = {referrer: location.pathname}
      setActivity(await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/activities/${activityId}`));
    })();
    return () => setActivity(null);
  });

  return activity;
};

// A hook to react to an event
const useSubscription = (activity: any) => {
  const [isSubscribed, setSubscribed] = React.useState(activity?.isSubscribed || false)
  const tenant = useTenant()
  const location = useLocation()
  const api = useApi()
  const message = useMessage();

  React.useEffect(() => {
    if(activity?.activityId){
      setSubscribed(activity?.isSubscribed)
    }
  }, [activity?.activityId, activity?.isSubscribed])

  return [isSubscribed, async () => {
      if(!tenant.tenantName || !tenant.email || !tenant.givenName || !activity?.activityId){
        throw new Error("missing required context for registration")
      }

      const ctx = {referrer: location.pathname}
      await api.do(ctx, "PATCH", "curriculum", `/tenants/${tenant.tenantName}/activities/${activity.activityId}`, {
        body: {
          email: tenant.email,
          contactName: tenant.givenName,
          isSubscribed: !isSubscribed,
        }
      }).then(() => {
        if(isSubscribed){
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
      })
      setSubscribed(!isSubscribed)
  }]
}
