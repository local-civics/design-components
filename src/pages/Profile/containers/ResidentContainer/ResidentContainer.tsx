import { Community, Resident } from "@local-civics/js-client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi, useRequester, useResolver } from "../../../../contexts/App";
import { AboutWidget } from "../../components/AboutWidget/AboutWidget";
import { ResidentWidget } from "../../components/ResidentWidget/ResidentWidget";

/**
 * A connected container for the resident and about widget.
 * @constructor
 */
export const ResidentContainer = () => {
  const requester = useRequester();
  const peer = usePeer();
  const community = useCommunity();
  const navigate = useNavigate();

  return {
    ResidentWidget: () => (
      <ResidentWidget
        resolving={peer === null}
        avatarURL={peer?.avatarURL}
        residentName={peer?.residentName}
        givenName={peer?.givenName}
        familyName={peer?.familyName}
        createdAt={peer?.createdAt}
        online={peer?.online}
      />
    ),

    AboutWidget: () => (
      <AboutWidget
        resolving={peer === null}
        edit={requester.residentName === peer?.residentName}
        impactStatement={peer?.impactStatement}
        placeName={community?.placeName}
        communityName={community?.displayName}
        onEdit={() => navigate(`/residents/${requester.residentName}/settings`)}
      />
    ),
  };
};

/**
 * A hook to subscribe to a community.
 */
const useCommunity = () => {
  const api = useApi();
  const requester = useRequester();
  const [community, setCommunity] = React.useState(null as Community | null);
  React.useEffect(() => {
    if (requester?.communityName) {
      (async () => {
        setCommunity(await api.communities.view(requester.communityName || ""));
      })();
    } else {
      setCommunity(null);
    }
  }, [requester?.communityName]);

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
  const resolver = useResolver();
  const residentName = params.residentName;
  const [peer, setPeer] = React.useState(null as Resident | null);

  React.useEffect(() => {
    if (residentName) {
      (async () => {
        setPeer(
          await api.residents.view(residentName || "", {
            fields: ["residentName", "avatarURL", "givenName", "familyName", "createdAt", "online", "impactStatement"],
          })
        );
      })();
    } else {
      setPeer(null);
    }

    return () => setPeer(null);
  }, [residentName, resolver.resolving]);

  return peer;
};
