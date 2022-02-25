import { Resident } from "@local-civics/js-client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal, SearchResult } from "../../../../components";
import { useApi, useAuth, useRequester, useResolver } from "../../../../contexts/App";
import { CommunitySearch, CommunitySearchProps } from "../../components/CommunitySearch/CommunitySearch";
import { ImpactQuiz } from "../../components/ImpactQuiz/ImpactQuiz";
import { LegalAgreement } from "../../components/LegalAgreement/LegalAgreement";
import { Registration } from "../../components/Registration/Registration";
import { RoleSelection } from "../../components/RoleSelection/RoleSelection";
import { Welcome } from "../../components/Welcome/Welcome";

export const OnboardingContainer = () => {
  const { resolving } = useResolver();

  return {
    Onboarding: () => (
      <Modal resolving={resolving} plain visible>
        <Card />
      </Modal>
    ),
  };
};

const Card = () => {
  const { resolve } = useResolver();
  const requester = useRequester();
  const api = useApi();
  const auth = useAuth();
  const navigate = useNavigate();
  const [agreed, setAgreed] = React.useState(!!requester.communityName);
  const [community, setCommunity] = React.useState({ open: false } as CommunitySearchProps & {
    communityName?: string;
  });

  const setRole = async (role?: "student" | "educator" | "management") => {
    await api.residents.save(requester.residentName || "", {
      role: role,
    });
    await resolve();
  };

  const fetchCommunities = async (displayName: string) => {
    const communities = await api.communities.list({
      displayName: displayName,
    });

    setCommunity({
      ...community,
      results: communities.map((community) => {
        return (
          <SearchResult
            key={community.communityName}
            title={community.displayName}
            onClick={() =>
              setCommunity({
                ...community,
                communityName: community.communityName,
                displayName: community.displayName,
                placeName: community.placeName,
                open: false,
              })
            }
          />
        );
      }),
    });
  };

  const joinCommunity = async (accessCode?: string) => {
    if (!community?.communityName || !accessCode) {
      return;
    }

    setCommunity({ ...community, disabled: true });
    await api.communities.join(community.communityName, requester.residentName || "", accessCode);
    await resolve();
    setCommunity({ ...community, disabled: false });
  };

  const register = async (registration: Resident) => {
    await api.residents.save(requester.residentName || "", registration);
    await resolve();
  };

  const setInterests = async (interests?: string[]) => {
    await api.residents.save(requester.residentName || "", {
      interests: interests,
    });
    await resolve();
  };

  if (!agreed) {
    return <LegalAgreement onDecline={auth.logout} onAccept={() => setAgreed(true)} />;
  }

  if (!requester.communityName) {
    return (
      <CommunitySearch
        {...community}
        onSearch={fetchCommunities}
        onJoin={joinCommunity}
        onOpen={() => setCommunity({ ...community, open: true })}
        onClose={() => setCommunity({ ...community, open: false })}
      />
    );
  }

  if (!requester.role) {
    return (
      <RoleSelection
        role={requester.role}
        onStudent={() => setRole("student")}
        onEducator={() => setRole("educator")}
      />
    );
  }

  if (!requester.impactStatement || !requester.givenName) {
    return (
      <Registration
        role={requester.role}
        givenName={requester.givenName}
        familyName={requester.familyName}
        grade={requester.grade}
        impactStatement={requester.impactStatement}
        onRegister={register}
      />
    );
  }

  if (requester.interests === undefined) {
    return <ImpactQuiz role={requester.role} interests={requester.interests} onFinish={setInterests} />;
  }

  return (
    <Welcome givenName={requester.givenName} onContinue={() => navigate(`/residents/${requester.residentName}`)} />
  );
};
