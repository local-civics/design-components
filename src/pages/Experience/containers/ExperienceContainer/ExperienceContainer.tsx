/**
 * A connected container for tasks.
 * @constructor
 */
import { Experience } from "@local-civics/js-client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi, useRequester } from "../../../../contexts/App";
import { useMessage } from "../../../../contexts/Message";
import { Card } from "../../components/Card/Card";

/**
 * Connected container for experience.
 * @constructor
 */
export const ExperienceContainer = () => {
  const requester = useRequester();
  const navigate = useNavigate();
  const close = () => navigate(-1);
  const experience = useExperience();
  const api = useApi();
  const ready = experience !== null && !!experience.experienceName && !!requester.residentName;
  const message = useMessage();
  const register = () =>
    ready &&
    api.registrations
      .create(requester.residentName || "", {
        ...experience,
        ...requester,
        originURL: window.location.href,
      })
      .then(() => {
        if (experience.registrationURL) {
          message.send(`Please do so by visiting ${experience.registrationURL}`, {
            severity: "success",
            icon: "calendar",
            title: "Additional registration required",
          });
        }
      });

  return {
    Experience: () => (
      <Card
        {...experience}
        resolving={!ready}
        visible
        onClose={close}
        onRegister={register}
        onUnregister={() =>
          ready && api.registrations.remove(requester.residentName || "", experience.experienceName || "")
        }
        onJoin={() => experience?.externalURL && window.open(experience?.externalURL, "_blank")}
        onSkillClick={(skill) =>
          ready && navigate(`/communities/${requester.communityName}/skills/${skill}/experiences`)
        }
      />
    ),
  };
};

const useExperience = () => {
  const requester = useRequester();
  const api = useApi();
  const params = useParams();
  const experienceName = params.experienceName;
  const [experience, setExperience] = React.useState(null as Experience | null);
  React.useEffect(() => {
    setExperience(null);

    (async () => {
      if (!requester.residentName || !requester.communityName || !experienceName) {
        return;
      }

      setExperience(await api.experiences.view(requester.communityName, experienceName));
    })();
    return () => setExperience(null);
  }, [experienceName, requester.residentName]);
  return experience;
};
