/**
 * A connected container for tasks.
 * @constructor
 */
import { Experience } from "@local-civics/js-client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi, useIdentity } from "../../../../contexts/App";
import { useMessage } from "../../../../contexts/Message";
import { Card } from "../../components/Card/Card";

/**
 * Connected container for experience.
 * @constructor
 */
export const ExperienceContainer = () => {
  const identity = useIdentity();
  const navigate = useNavigate();
  const close = () => navigate(-1);
  const experience = useExperience();
  const api = useApi();
  const ready = experience !== null && !!experience.experienceName && !!identity.residentName;
  const message = useMessage();
  const register = () =>
    ready &&
    api.registrations
      .create(identity.residentName || "", {
        ...experience,
        ...identity,
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
        onLaunch={() => experience?.experienceName && navigate(`/residents/${identity.residentName}/reflections/${experience.experienceName}`)}
        onClose={close}
        onRegister={register}
        onUnregister={() =>
          ready && api.registrations.remove(identity.residentName || "", experience.experienceName || "")
        }
        onJoin={() => experience?.externalURL && window.open(experience?.externalURL, "_blank")}
        onSkillClick={(skill) =>
          ready && navigate(`/communities/${identity.communityName}/skills/${skill}`)
        }
      />
    ),
  };
};

const useExperience = () => {
  const identity = useIdentity();
  const api = useApi();
  const params = useParams();
  const experienceName = params.experienceName;
  const [experience, setExperience] = React.useState(null as Experience & {status?: "registered" | "unregistered" | "in-progress"} | null);
  React.useEffect(() => {
    setExperience(null);

    (async () => {
      if (!identity.residentName || !identity.communityName || !experienceName || experienceName === "undefined") {
        return;
      }

      const now = new Date()
      const registration = await api.registrations.view(identity.residentName, experienceName)
      const experience = await api.experiences.view(identity.communityName, experienceName)
      const inProgress = (experience.notBefore && now > new Date(experience.notBefore)) && (experience.notAfter && now < new Date(experience.notAfter))
      const isOver = experience.notAfter && now > new Date(experience.notAfter)
      const status = inProgress ? "in-progress" : isOver ? undefined : registration?.experienceName ? "registered" : "unregistered"
      setExperience({...experience, status});
    })();
    return () => setExperience(null);
  }, [experienceName, identity.residentName]);
  return experience;
};
