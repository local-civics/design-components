import { request } from "@local-civics/js-client";
import React from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { ResidentContextState, useErrorContext, useResidentContext } from "../../../../contexts";
import { getIconName } from "../../../../utils/icon/icon";
import { ActivityProgress } from "../../components/ActivityProgress/ActivityProgress";
import { AchievementWidget } from "../../widgets/AchievementWidget/AchievementWidget";
import { ImpactWidget } from "../../widgets/ImpactWidget/ImpactWidget";
import { PathwayWidget } from "../../widgets/PathwayWidget/PathwayWidget";

/**
 * A connected container for the impact, pathway, and achievement widgets.
 * @constructor
 */
export const ImpactContainer = () => {
  const impact = useImpact();
  return {
    PathwayWidget: () => (
      <PathwayWidget resolving={impact.resolving}>
        {impact.pathways &&
          impact.pathways.map((report) => (
            <ActivityProgress
              open={!!report.open}
              title={report.pathway}
              icon={getIconName(report.pathway)}
              proficiency={report.proficiency}
              nextProficiency={report.nextProficiency}
              onOpen={report.open}
            />
          ))}
      </PathwayWidget>
    ),

    ImpactWidget: () => (
      <ImpactWidget
        resolving={impact.resolving}
        proficiency={impact.overall?.proficiency}
        nextProficiency={impact.overall?.nextProficiency}
        magnitude={impact.overall?.magnitude}
      />
    ),

    AchievementWidget: () => (
      <AchievementWidget
        resolving={impact.resolving}
        badges={impact.overall?.badges}
        milestones={impact.overall?.milestones}
        reflections={impact.overall?.reflections}
      />
    ),
  };
};

type ImpactState = {
  resolving?: boolean;
  overall?: ReportState;
  pathways?: ReportState[];
};

type ReportState = {
  proficiency?: number;
  nextProficiency?: number;
  magnitude?: number;
  pathway?: string;
  badges?: number;
  milestones?: number;
  reflections?: number;
  open?: () => void;
};

/**
 * A hook to fetch a resident's impact.
 *
 * This hook must be called from the resident context.
 */
const useImpact = () => {
  const ctx = useResidentContext();
  const navigate = useNavigate();
  const params = useParams();
  const errors = useErrorContext();
  const residentName = params.residentName;
  const communityName = params.communityName || ctx?.resident?.communityName;
  const defaultState: ImpactState = { resolving: true };
  const [state, setState] = React.useState(defaultState);

  React.useEffect(() => {
    if (!ctx?.accessToken || !residentName || !communityName) {
      setState(defaultState);
      return;
    }

    setState({ ...state, resolving: true });

    (async () => {
      try {
        const overall = await fetchOverallReport(ctx, communityName, residentName);
        const pathways = await fetchPathwayReports(ctx, navigate, communityName, residentName);
        setState({ ...state, resolving: false, overall: overall, pathways: pathways });
      } catch (e) {
        errors.emit(e);
      }
    })();

    return () => setState(defaultState);
  }, [ctx?.accessToken, communityName, residentName]);

  return state;
};

const fetchPathwayReports = async (
  ctx: ResidentContextState,
  navigate: NavigateFunction,
  communityName?: string,
  residentName?: string
) => {
  const openReport = (pathway?: string) => {
    if (pathway) {
      navigate(`/communities/${communityName}/explore/events?pathways=${encodeURIComponent(pathway)}`);
    }
  };
  const endpoint = `/caliber/v0/communities/${communityName}/reports`;
  const query = {
    residentName: residentName,
    groups: ["pathway"],
    formula: "sum",
    fields: ["proficiency", "nextProficiency", "pathway"],
  };
  const reports: ReportState[] = await request(ctx.accessToken, "GET", endpoint, { params: query });
  reports.map((report) => {
    if (residentName === ctx.resident?.residentName) {
      report.open = () => openReport(report.pathway);
    }
  });
  return reports;
};

const fetchOverallReport = async (ctx: ResidentContextState, communityName?: string, residentName?: string) => {
  const endpoint = `/caliber/v0/communities/${communityName}/reports`;
  const query = {
    residentName: residentName,
    formula: "sum",
    fields: ["proficiency", "nextProficiency", "magnitude", "badges", "milestones", "reflections"],
  };
  const reports: ReportState[] = await request(ctx.accessToken, "GET", endpoint, { params: query });
  if (reports.length > 0) {
    return reports[0];
  }
};
