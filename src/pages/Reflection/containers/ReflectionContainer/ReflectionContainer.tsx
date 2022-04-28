/**
 * A connected container for tasks.
 * @constructor
 */
import { ActivityView, ReactionView } from "@local-civics/js-client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi, useTenant } from "../../../../contexts/App";
import { Card } from "../../components/Card/Card";

/**
 * Connected container for reflection.
 * @constructor
 */
export const ReflectionContainer = () => {
  const tenant = useTenant();
  const navigate = useNavigate();
  const close = () => navigate(-1);
  const [ref, setRef] = React.useState(null as ReactionView | null);
  const params = useParams();
  const activityId = parseInt(params.activityId || "");
  const reflection = useReflection();
  const api = useApi();
  const po = tenant?.organizations && tenant.organizations.length > 0 ? tenant.organizations[0] : {};
  return {
    Reflection: () => (
      <Card
        {...reflection}
        {...ref}
        isLoading={reflection === null}
        visible
        unavailable={reflection?.browsing}
        onClose={close}
        onSave={async (ref, rating) => {
          if (!tenant.nickname || !po.nickname || !activityId) {
            return;
          }

          return api.curriculum
            .changeReaction(tenant.nickname, po.nickname, activityId, {
              reflection: ref,
              rating: rating,
            })
            .then(() =>
              setRef({
                reflection: ref,
                rating: rating,
              })
            );
        }}
      />
    ),
  };
};

const useReflection = () => {
  const tenant = useTenant();
  const po = tenant?.organizations && tenant.organizations.length > 0 ? tenant.organizations[0] : {};
  const api = useApi();
  const params = useParams();
  const activityId = parseInt(params.activityId || "");
  const tenantName = params.tenantName;
  const browsing = tenant.nickname !== tenantName;
  const [experience, setExperience] = React.useState(null as ActivityView | null);
  React.useEffect(() => {
    (async () => {
      if (
        !tenant.nickname ||
        !po.nickname ||
        !activityId ||
        !tenantName ||
        activityId === 0 ||
        tenantName === "undefined"
      ) {
        return;
      }

      setExperience(await api.curriculum.viewWorkspaceActivity(tenant.nickname, po.nickname || "", activityId));
    })();
    return () => {
      setExperience(null);
    };
  }, [activityId, tenantName, tenant.nickname]);
  return experience ? { ...experience, browsing } : null;
};
