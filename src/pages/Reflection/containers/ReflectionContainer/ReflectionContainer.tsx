/**
 * A connected container for tasks.
 * @constructor
 */
import { Experience, Reflection } from "@local-civics/js-client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi, useIdentity } from "../../../../contexts/App";
import { Card } from "../../components/Card/Card";

/**
 * Connected container for reflection.
 * @constructor
 */
export const ReflectionContainer = () => {
  const identity = useIdentity();
  const navigate = useNavigate();
  const close = () => navigate(-1);
  const reflection = useReflection();
  const api = useApi();

  return {
    Reflection: () => (
      <Card
        {...reflection}
        resolving={reflection === null}
        visible
        unavailable={reflection?.browsing}
        onClose={close}
        onSave={(ref) => {
          if(!identity.residentName){
            return
          }

          if(reflection?.feedback && reflection.experienceName){
            api.reflections.update(identity.residentName, reflection.experienceName, ref)
          } else {
            api.reflections.create(identity.residentName, ref)
          }
        }}
      />
    ),
  };
};

const useReflection = () => {
  const identity = useIdentity();
  const api = useApi();
  const params = useParams();
  const experienceName = params.experienceName;
  const residentName = params.residentName;
  const browsing = identity.residentName !== residentName;
  const [reflection, setReflection] = React.useState(null as Reflection | null);
  const [experience, setExperience] = React.useState(null as Experience | null);
  React.useEffect(() => {
    setReflection(null);

    (async () => {
      if (
        !identity.residentName ||
        !identity.communityName ||
        !experienceName ||
        !residentName ||
        experienceName === "undefined" ||
        residentName === "undefined"
      ) {
        return;
      }

      setReflection(await api.reflections.view(residentName, experienceName).catch());
      setExperience(await api.experiences.view(identity.communityName, experienceName));
    })();
    return () => {
      setReflection(null);
      setExperience(null);
    };
  }, [experienceName, residentName, identity.residentName]);
  return reflection || experience ? { ...reflection, ...experience, browsing } : null;
};
