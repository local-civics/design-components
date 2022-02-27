import { Community, Resident } from "@local-civics/js-client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi, useIdentity } from "../../../../contexts/App";
import { AboutWidget } from "../../components/AboutWidget/AboutWidget";
import { ResidentWidget } from "../../components/ResidentWidget/ResidentWidget";

/**
 * A connected container for the resident and about widget.
 * @constructor
 */
export const ResidentContainer = () => {
  const identity = useIdentity();
  const peer = usePeer();
  const community = useCommunity();
  const navigate = useNavigate();
  const now = new Date();

  return {
    ResidentWidget: () => (
      <ResidentWidget
        resolving={peer === null}
        avatarURL={peer?.avatarURL}
        residentName={peer?.residentName}
        givenName={peer?.givenName}
        familyName={peer?.familyName}
        createdAt={peer?.createdAt}
        online={!!peer?.lastLoginAt && now.getTime() - new Date(peer?.lastLoginAt).getTime() < 5000}
      />
    ),

    AboutWidget: () => (
      <AboutWidget
        resolving={peer === null}
        edit={identity.residentName === peer?.residentName}
        impactStatement={peer?.impactStatement}
        placeName={community?.placeName}
        communityName={community?.displayName}
        onEdit={() => navigate(`/residents/${identity.residentName}/settings`)}
      />
    ),
  };
};

/**
 * A hook to subscribe to a community.
 */
const useCommunity = () => {
  const api = useApi();
  const identity = useIdentity();
  const [community, setCommunity] = React.useState(null as Community | null);
  React.useEffect(() => {
    if (identity?.communityName) {
      (async () => {
        setCommunity(await api.communities.view(identity.communityName || ""));
      })();
    } else {
      setCommunity(null);
    }
  }, [identity?.communityName]);

  return community;
};

/**
 * A hook to fetch a resident and subscribe to updates to.
 *
 * This hook must be called from the resident context.
 */
export const usePeer = () => {
  const params = useParams();
  const api = useApi();
  const identity = useIdentity();
  const residentName = params.residentName;
  const [peer, setPeer] = React.useState(null as Resident | null);

  React.useEffect(() => {
    (async () => {
      if (!identity.residentName || !residentName || residentName === "undefined") {
        setPeer(null);
        return;
      }

      if (identity.residentName === residentName) {
        setPeer(identity);
        return;
      }

      setPeer(await api.residents.view(residentName));
    })();
    return () => setPeer(null);
  }, [identity.residentName, residentName, identity.resolving]);

  return peer;
};
