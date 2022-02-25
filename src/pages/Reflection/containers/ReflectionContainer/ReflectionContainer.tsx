/**
 * A connected container for tasks.
 * @constructor
 */
import { Experience, Reflection } from "@local-civics/js-client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi, useRequester } from "../../../../contexts/App";
import { Card } from "../../components/Card/Card";

/**
 * Connected container for reflection.
 * @constructor
 */
export const ReflectionContainer = () => {
  const requester = useRequester();
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
        onSave={(reflection) => requester.residentName && api.reflections.create(requester.residentName, reflection)}
      />
    ),
  };
};

const useReflection = () => {
  const requester = useRequester();
  const api = useApi();
  const params = useParams();
  const experienceName = params.experienceName;
  const residentName = params.residentName;
  const browsing = requester.residentName !== residentName;
  const [reflection, setReflection] = React.useState(null as Reflection | null);
  const [experience, setExperience] = React.useState(null as Experience | null);
  React.useEffect(() => {
    setReflection(null);

    (async () => {
      if (!requester.residentName || !requester.communityName || !experienceName || !residentName) {
        return;
      }

      setReflection(await api.reflections.view(residentName, experienceName).catch());
      setExperience(await api.experiences.view(requester.communityName, experienceName));
    })();
    return () => {
      setReflection(null);
      setExperience(null);
    };
  }, [experienceName, residentName, requester.residentName]);
  return reflection || experience ? { ...reflection, ...experience, browsing } : null;
};
