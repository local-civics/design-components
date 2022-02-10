import { request } from "@local-civics/js-client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ResidentContextState, useResidentContext } from "../../../../contexts/ResidentContext/ResidentContext";
import { useErrorContext } from "../../../../contexts/ErrorContext/ErrorContext";
import { AboutWidget } from "../../widgets/AboutWidget/AboutWidget";
import { ResidentWidget } from "../../widgets/ResidentWidget/ResidentWidget";

/**
 * A connected container for the resident and about widget.
 * @constructor
 */
export const ResidentContainer = () => {
  const resident = useResident();
  return {
    ResidentWidget: () => (
      <ResidentWidget
        resolving={resident.resolving}
        avatarURL={resident.avatarURL}
        residentName={resident.residentName}
        givenName={resident.givenName}
        familyName={resident.familyName}
        createdAt={resident.createdAt}
        online={resident.online}
      />
    ),

    AboutWidget: () => (
      <AboutWidget
        resolving={resident.resolving}
        edit={!resident.browsing}
        impactStatement={resident.impactStatement}
        placeName={resident.communityPlaceName}
        communityName={resident.communityTrueName}
        onEdit={resident.settings}
      />
    ),
  };
};

/**
 * The state of the resident.
 */
type ResidentState = {
  resolving?: boolean;
  residentName?: string;
  givenName?: string;
  familyName?: string;
  communityTrueName?: string;
  communityPlaceName?: string;
  impactStatement?: string;
  avatarURL?: string;
  createdAt?: string;
  online?: boolean;
  settings?: () => void;
};

/**
 * The query for filtering residents.
 */
export type ResidentQuery = {
  fields?: string[];
};

/**
 * A hook to fetch a resident and subscribe to updates to.
 *
 * This hook must be called from the resident context.
 */
const useResident = () => {
  const ctx = useResidentContext();
  const navigate = useNavigate();
  const params = useParams();
  const errors = useErrorContext();
  const residentName = params.residentName;
  const communityName = params.communityName || ctx?.resident?.communityName;
  const defaultState: ResidentState = { resolving: true };
  const [state, setState] = React.useState(defaultState);

  React.useEffect(() => {
    if (!ctx?.accessToken || !residentName || !communityName) {
      setState(defaultState);
      return;
    }

    setState({ ...state, resolving: true });

    (async () => {
      try {
        const resident = await fetchResident(ctx, communityName, residentName);
        setState({ ...state, resolving: false, ...resident });
      } catch (e) {
        errors.emit(e);
      }
    })();

    return () => setState(defaultState);
  }, [ctx?.accessToken, communityName, residentName]);

  return {
    ...state,
    browsing: residentName !== ctx?.resident?.residentName,
    settings: () => navigate(`/residents/${residentName}/settings`),
  };
};

const fetchResident = async (ctx: ResidentContextState, communityName?: string, residentName?: string) => {
  const endpoint = `/identity/v0/communities/${communityName}/residents/${residentName}`;
  const query = {
    fields: [
      "residentName",
      "avatarURL",
      "givenName",
      "familyName",
      "createdAt",
      "online",
      "impactStatement",
      "communityTrueName",
      "communityPlaceName",
    ],
  };

  const resident: ResidentState = await request(ctx.accessToken, "GET", endpoint, { params: query });
  return resident;
};
