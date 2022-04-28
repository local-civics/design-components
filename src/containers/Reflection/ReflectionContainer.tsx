/**
 * A connected container for tasks.
 * @constructor
 */
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { OpenReflection } from "../../components/Reflection/OpenReflection/OpenReflection";
import { useActivity } from "../Activity/ActivityContainer";
import { useApi } from "../../contexts/App";
import { useMessage } from "../../contexts/Message";

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
  const api = useApi();
  const message = useMessage();
  const activity = useActivity(tenantName, activityId);
  return {
    Reflection: () => (
      <OpenReflection
        {...activity}
        onSave={async (reflection, rating) => {
          const ctx = { referrer: location.pathname };
          return api
            .do(ctx, "PATCH", "curriculum", `/tenants/${tenantName}/activities/${activity.activityId}`, {
              body: {
                reflection,
                rating,
              },
            })
            .then((err) => {
              if (!err) {
                message.send(`Your reflection has been saved.`, {
                  severity: "success",
                  icon: "reflection",
                  title: "Well done!",
                });
              }
            });
        }}
      />
    ),
  };
};
