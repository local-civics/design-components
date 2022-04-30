/**
 * A connected container for tasks.
 * @constructor
 */
import React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { OpenReflection } from "../../components/Reflection/OpenReflection/OpenReflection";
import { useActivity } from "../Activity/ActivityContainer";
import { useApi } from "../../contexts/App";
import { useMessage } from "../../contexts/Message";
import {useBadges} from "../Profile/ProfileContainer";

/**
 * Connected container for reflection.
 * @constructor
 */
export const ReflectionContainer = () => {
  const params = useParams();
  const tenantName = params.tenantName;
  const activityId = params.activityId;
  if (!tenantName || !activityId) {
    throw new Error("request must missing required params");
  }
  const location = useLocation();
  const navigate = useNavigate()
  const api = useApi();
  const message = useMessage();
  const [submitted, setSubmitted] = React.useState(false)
  const activity = useActivity(tenantName, activityId, submitted);
  const [isNewBadge, ] = useBadges(tenantName, submitted)
  const [changes, setChanges] = React.useState({ reflection: activity?.reflection, rating: activity?.rating, hasChanges: false})

  React.useEffect(() => {
    if(isNewBadge){
      message.send(`You've earned yourself a new badge.`, {
        severity: "success",
        icon: "badge",
        title: "New qualification!",
      });
    }
  }, [isNewBadge])

  return {
    Reflection: () => (
      <OpenReflection
        {...activity}
        reflection={activity?.reflection || changes.reflection}
        rating={activity?.rating || changes.rating}
        hasChanges={changes.hasChanges}
        onClose={() => navigate(-1)}
        onSave={async (reflection, rating) => {
          setSubmitted(false)
          setChanges({reflection: reflection, rating: rating, hasChanges: true})
          const ctx = { referrer: location.pathname };
          return api
            .do(ctx, "PATCH", "curriculum", `/tenants/${tenantName}/activities/${activity.activityId}`, {
              body: {
                reflection,
                rating,
                sagaId: activity.sagaId,
              },
            })
            .then((err) => {
              if (!err) {
                setSubmitted(true)
                message.send(`You've successfully submitted your reflection and earned your points.`, {
                  severity: "success",
                  icon: "reflection",
                  title: "Well done!",
                });
                setChanges({...changes, hasChanges: false})
              }
            });
        }}
      />
    ),
  };
};
