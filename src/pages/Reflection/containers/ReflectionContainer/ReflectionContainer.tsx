/**
 * A connected container for tasks.
 * @constructor
 */
import {ActivityView, ReactionView} from "@local-civics/js-client";
import React                        from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi, useIdentity }    from "../../../../contexts/App";
import { Card }                   from "../../components/Card/Card";

/**
 * Connected container for reflection.
 * @constructor
 */
export const ReflectionContainer = () => {
  const identity = useIdentity();
  const navigate = useNavigate();
  const close = () => navigate(-1);
  const [ref, setRef] = React.useState(null as ReactionView | null)
  const params = useParams()
  const activityId = parseInt(params.activityId||"");
  const reflection = useReflection();
  const api = useApi();
  const po = identity?.organizations && identity.organizations.length > 0 ? identity.organizations[0] : {}
  return {
    Reflection: () => (
      <Card
        {...reflection}
        {...ref}
        resolving={reflection === null}
        visible
        unavailable={reflection?.browsing}
        onClose={close}
        onSave={(ref, rating) => {
          if(!identity.nickname || !po.nickname || !activityId){
            return
          }

          api.curriculum.changeReaction(identity.nickname, po.nickname, activityId, {
            reflection: ref,
            rating: rating,
          }).then(() => setRef({
            reflection: ref,
            rating: rating,
          }))
        }}
      />
    ),
  };
};

const useReflection = () => {
  const identity = useIdentity();
  const po = identity?.organizations && identity.organizations.length > 0 ? identity.organizations[0] : {}
  const api = useApi();
  const params = useParams();
  const activityId = parseInt(params.activityId||"");
  const tenantName = params.tenantName;
  const browsing = identity.nickname !== tenantName;
  const [experience, setExperience] = React.useState(null as ActivityView | null);
  React.useEffect(() => {
    (async () => {
      if (
        !identity.nickname ||
        !po.nickname ||
        !activityId ||
        !tenantName ||
        activityId === 0 ||
        tenantName === "undefined"
      ) {
        return;
      }
      
      setExperience(await api.curriculum.viewWorkspaceActivity(identity.nickname, po.nickname||"", activityId));
    })();
    return () => {
      setExperience(null);
    };
  }, [activityId, tenantName, identity.nickname]);
  return experience ? { ...experience, browsing } : null;
};
