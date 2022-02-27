import { Experience } from "@local-civics/js-client";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SearchResult, SearchResultProps } from "../../../../components";
import { useApi, useIdentity } from "../../../../contexts/App";
import { Exhibition } from "../../components/Exhibition/Exhibition";
import { Experience as ExperienceComponent } from "../../components/Experience/Experience";
import { Gallery } from "../../components/Gallery/Gallery";
import { Pathway } from "../../components/Pathway/Pathway";
import { PathwayList } from "../../components/PathwayList/PathwayList";

export const ExploreContainer = () => {
  const location = useLocation();
  const qp = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const api = useApi();
  const identity = useIdentity();
  const [pathways, setPathways] = React.useState({} as Record<string, boolean>);
  const togglePathway = (pathway: string) => setPathways({ ...pathways, [pathway]: !pathways[pathway] });
  const experiences = useExperiences(
    Object.entries(pathways)
      .filter(([v, present]) => present)
      .map(([v]) => v)
  );

  const ExperienceList = () => {
    const [open, setOpen] = React.useState(!!qp.get("q"));
    const [searchResults, setSearchResults] = React.useState(null as React.ReactElement<SearchResultProps>[] | null);
    const fetchExperiences = async (displayName: string) => {
      if (!identity.communityName) {
        return;
      }
      const filtered = await api.experiences.list(identity.communityName, {
        displayName: displayName || "",
      });

      if (!filtered || filtered.length === 0) {
        setSearchResults(null);
        return;
      }

      setSearchResults(
        filtered.map((ex) => {
          return (
            <SearchResult
              key={ex.experienceName}
              title={ex.displayName}
              onClick={() => navigate(`${location.pathname}/${ex.experienceName}`)}
            />
          );
        })
      );
    };

    React.useEffect(() => {
      (async () => {
        const q = qp.get("q");
        if (!q) {
          return;
        }
        await fetchExperiences(q);
      })();
    }, [qp.get("q")]);

    return (
      <Gallery
        open={open}
        results={searchResults}
        count={experiences?.filtered?.length}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onSearch={fetchExperiences}
        resolving={experiences === null}
        primary={
          experiences?.primary && (
            <ExperienceComponent
              {...experiences?.primary}
              onClick={() => navigate(`${location.pathname}/${experiences?.primary?.experienceName}`)}
            />
          )
        }
        top={
          experiences?.top &&
          experiences.top?.length > 0 && (
            <Exhibition>
              {experiences.top.map((ex) => {
                return (
                  <ExperienceComponent
                    key={ex.experienceName}
                    {...ex}
                    onClick={() => navigate(`${location.pathname}/${experiences.primary?.experienceName}`)}
                  />
                );
              })}
            </Exhibition>
          )
        }
        soonest={
          experiences?.soonest &&
          experiences.soonest?.length > 0 && (
            <Exhibition>
              {experiences.soonest.map((ex) => {
                return (
                  <ExperienceComponent
                    key={ex.experienceName}
                    {...ex}
                    onClick={() => navigate(`${location.pathname}/${experiences.primary?.experienceName}`)}
                  />
                );
              })}
            </Exhibition>
          )
        }
        milestones={
          experiences?.milestones &&
          experiences.milestones?.length > 0 && (
            <Exhibition>
              {experiences.milestones.map((ex) => {
                return (
                  <ExperienceComponent
                    key={ex.experienceName}
                    {...ex}
                    onClick={() => navigate(`${location.pathname}/${experiences.primary?.experienceName}`)}
                  />
                );
              })}
            </Exhibition>
          )
        }
        filtered={
          experiences?.filtered &&
          experiences.filtered?.length > 0 && (
            <Exhibition>
              {experiences.filtered.map((ex) => {
                return (
                  <ExperienceComponent
                    key={ex.experienceName}
                    {...ex}
                    onClick={() => navigate(`${location.pathname}/${experiences.primary?.experienceName}`)}
                  />
                );
              })}
            </Exhibition>
          )
        }
      />
    );
  };

  return {
    PathwayList: () => (
      <PathwayList>
        <Pathway
          onClick={() => togglePathway("policy & government")}
          active={pathways["policy & government"]}
          name="policy & government"
        />
        <Pathway
          onClick={() => togglePathway("arts & culture")}
          active={pathways["arts & culture"]}
          name="arts & culture"
        />
        <Pathway onClick={() => togglePathway("recreation")} active={pathways["recreation"]} name="recreation" />
        <Pathway onClick={() => togglePathway("volunteer")} active={pathways["volunteer"]} name="volunteer" />
        <Pathway
          onClick={() => togglePathway("college & career")}
          active={pathways["college & career"]}
          name="college & career"
        />
      </PathwayList>
    ),
    Gallery: () => <ExperienceList />,
  };
};

const useExperiences = (pathways: string[]) => {
  const { search } = useLocation();
  const qp = new URLSearchParams(location.search);
  const params = useParams();
  const identity = useIdentity();
  const api = useApi();
  const [experiences, setExperiences] = React.useState(
    null as {
      primary?: Experience | null;
      top?: Experience[] | null;
      soonest?: Experience[] | null;
      milestones?: Experience[] | null;
      filtered?: Experience[] | null;
      results?: React.ReactElement<SearchResultProps>[];
    } | null
  );

  React.useEffect(() => {
    setExperiences(null);
    (async () => {
      if (!identity.residentName || !identity.communityName) {
        return;
      }

      if (search || (params.skill && params.skill !== "undefined") || pathways.length > 0) {
        const skills = params.skill && params.skill !== "undefined" ? [params.skill] : qp.getAll("skills");
        setExperiences({
          filtered: await api.experiences.list(identity.communityName, {
            ...qp,
            skills,
            pathways: pathways as (
              | "policy & government"
              | "arts & culture"
              | "college & career"
              | "volunteer"
              | "recreation"
            )[],
          }),
        });
      } else {
        const top = await api.experiences.list(identity.communityName, {
          orderBy: "top",
          limit: 4,
        });
        setExperiences({
          primary: top.length > 0 ? top[0] : null,
          top: top.length > 1 ? top.slice(1) : null,
          soonest: await api.experiences.list(identity.communityName, {
            orderBy: "soonest",
            limit: 10,
          }),
          milestones: await api.experiences.list(identity.communityName, {
            milestone: true,
            limit: 10,
          }),
          filtered: null,
        });
      }
    })();
    return () => setExperiences(null);
  }, [search, pathways.length, params.skill, identity.residentName]);

  return experiences;
};
