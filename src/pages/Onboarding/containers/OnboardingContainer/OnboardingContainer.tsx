import { Resident } from "@local-civics/js-client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal, SearchResult } from "../../../../components";
import { useApi, useAuth, useIdentity } from "../../../../contexts/App";
import { CommunitySearch, CommunitySearchProps } from "../../components/CommunitySearch/CommunitySearch";
import { ImpactQuiz } from "../../components/ImpactQuiz/ImpactQuiz";
import { LegalAgreement } from "../../components/LegalAgreement/LegalAgreement";
import { Registration } from "../../components/Registration/Registration";
import { RoleSelection } from "../../components/RoleSelection/RoleSelection";
import { Welcome } from "../../components/Welcome/Welcome";

export const OnboardingContainer = () => {
  const { resolving } = useIdentity();
  return {
    Onboarding: () => (
      <Modal resolving={resolving} plain visible>
        <Card />
      </Modal>
    ),
  };
};

const Card = () => {
  const identity = useIdentity();
  const api = useApi();
  const auth = useAuth();
  const navigate = useNavigate();

  const setRole = async (role?: "student" | "educator" | "management") => {
    await api.residents.save(identity.residentName || "", {
      role: role,
    });
    await identity.resolve();
  };

  const JoinCommunity = () => {
    const [community, setCommunity] = React.useState({ open: false } as CommunitySearchProps & {
      communityName?: string;
    });
    const [agreed, setAgreed] = React.useState(!!identity.communityName);
    const fetchCommunities = async (displayName: string) => {
      if (!displayName || displayName === "undefined") {
        setCommunity({ ...community, results: null });
        return;
      }

      const communities = await api.communities.list({
        displayName: displayName,
      });

      if (!communities || communities.length === 0) {
        setCommunity({ ...community, results: null });
        return;
      }

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
      await api.communities.join(community.communityName, identity.residentName || "", accessCode).then((err) => {
        if (!err) {
          return identity.resolve().then(() => setCommunity({ ...community, disabled: false }));
        }
        setCommunity({ ...community, disabled: false });
      });
    };

    if (!agreed) {
      return <LegalAgreement onDecline={auth.logout} onAccept={() => setAgreed(true)} />;
    }

    if (!identity.communityName) {
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

    return null;
  };

  const register = async (registration: Resident) => {
    await api.residents.save(identity.residentName || "", registration);
    await identity.resolve();
  };

  const setInterests = async (interests?: string[]) => {
    await api.residents.save(identity.residentName || "", {
      interests: interests,
    });
    await identity.resolve();
  };

  if (!identity.communityName) {
    return <JoinCommunity />;
  }

  if (!identity.role) {
    return (
      <RoleSelection role={identity.role} onStudent={() => setRole("student")} onEducator={() => setRole("educator")} />
    );
  }

  if (!identity.impactStatement || !identity.givenName) {
    return (
      <Registration
        role={identity.role}
        givenName={identity.givenName}
        familyName={identity.familyName}
        grade={identity.grade}
        impactStatement={identity.impactStatement}
        onRegister={register}
      />
    );
  }

  if (identity.interests === undefined) {
    return <ImpactQuiz role={identity.role} interests={identity.interests} onFinish={setInterests} />;
  }

  return <Welcome givenName={identity.givenName} onContinue={() => navigate(`/residents/${identity.residentName}`)} />;
};
