/**
 * A connected container for tasks.
 * @constructor
 */
import {ActivityView} from "@local-civics/js-client";
import React                      from "react";
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
  const po = identity?.organizations && identity.organizations.length > 0 ? identity.organizations[0] : {}
  const api = useApi();
  const ready = experience !== null && !!experience && !!identity.nickname;
  const message = useMessage();
  const register = () =>
    ready &&
    api.curriculum.changeReaction(identity.nickname || "", po.nickname || "", experience.activityId, {
        ...experience,
        ...identity,
        toggleNotifications: true,
        origin: window.location.href,
      })
      .then(() => {
        if (experience.rsvp) {
          message.send(`This activity may require additional registration.`, {
            severity: "success",
            icon: "calendar",
            title: "Notice",
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
          ready && api.curriculum.changeReaction(identity.nickname || "", po.nickname || "", experience.activityId, {
              ...experience,
              ...identity,
              toggleNotifications: false,
            })
        }
        onJoin={() => experience?.link && window.open(experience?.link, "_blank")}
        onSkillClick={(skill: string) =>
          ready && navigate(`/marketplace/${po.nickname}/skills/${skill}`)
        }
      />
    ),
  };
};

const useExperience = () => {
  const identity = useIdentity();
  const po = identity?.organizations && identity.organizations.length > 0 ? identity.organizations[0] : {}
  const api = useApi();
  const params = useParams();
  const activityId = parseInt(params.activityId||"");
  const [experience, setExperience] = React.useState(null as ActivityView & {activityId?: number} & {status?: "registered" | "unregistered" | "in-progress"} | null);
  React.useEffect(() => {
    setExperience(null);

    (async () => {
      if (!po.nickname|| !identity.nickname || !activityId) {
        return;
      }

      const now = new Date()
      const experience = await api.curriculum.viewWorkspaceActivity(identity.nickname, po.nickname, activityId)
      let status: "in-progress" | "registered" | "unregistered" | undefined
      if(!experience.milestone){
        const inProgress = (experience.startTime && now > new Date(experience.startTime)) && (experience.minutes && now < (new Date(new Date(experience.startTime).getTime() + experience.minutes*60000)))
        const isOver = experience.minutes && experience.startTime && now > (new Date(new Date(experience.startTime).getTime() + experience.minutes*60000))
        status = inProgress ? "in-progress" : isOver || !experience.startTime || !experience.minutes ? undefined : experience.reaction?.notify ? "registered" : "unregistered"
      }

      setExperience({...experience, status});
    })();
    return () => setExperience(null);
  }, [activityId, identity.nickname]);
  return { ...experience, activityId};
};
