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
    await api.identity.configureTenant(identity.nickname || "", {
      newRole: role,
    });
    await identity.digest();
  };

  const JoinCommunity = () => {
    const [community, setCommunity] = React.useState({ open: false } as CommunitySearchProps & {
      nickname?: string;
    });
    const [agreed, setAgreed] = React.useState(!!identity.organizations && identity.organizations.length > 0);
    const fetchCommunities = async (headline: string) => {
      if (!headline || headline === "undefined") {
        setCommunity({ ...community, results: null });
        return;
      }

      const communities = await api.identity.searchOrganizations({
        name: headline,
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
              key={community.nickname}
              title={community.name}
              onClick={() =>
                setCommunity({
                  ...community,
                  nickname: community.nickname,
                  name: community.name,
                  location: community.location,
                  open: false,
                })
              }
            />
          );
        }),
      });
    };
    const joinCommunity = async (accessCode?: string) => {
      if (!community?.nickname || !accessCode) {
        return;
      }

      setCommunity({ ...community, disabled: true });
      await api.identity.joinOrganization(identity.nickname||"", community.nickname||"", accessCode).then((err) => {
        if (!err) {
          return identity.digest().then(() => setCommunity({ ...community, disabled: false }));
        }
        setCommunity({ ...community, disabled: false });
      });
    };

    if (!agreed) {
      return <LegalAgreement onDecline={auth.logout} onAccept={() => setAgreed(true)} />;
    }

    if (!identity.organizations || identity.organizations.length == 0) {
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

  const register = async (changes: {newGivenName?: string, newFamilyName?: string, newGrade?: number, newImpactStatement?: string, newRole?: string}) => {
    await api.identity.configureTenant(identity.nickname || "", changes);
    await identity.digest()
  };

  const setInterests = async (interests?: string[]) => {
    await api.identity.configureTenant(identity.nickname || "", {
      newInterests: interests,
    });
    await identity.digest();
  };

  if (!identity.organizations || identity.organizations.length === 0) {
    return <JoinCommunity />;
  }

  if (!identity.role) {
    return (
      <RoleSelection role={identity.role} onStudent={() => setRole("student")} onEducator={() => setRole("educator")} />
    );
  }

  if (!identity.statement || !identity.givenName) {
    return (
      <Registration
        role={identity.role}
        givenName={identity.givenName}
        familyName={identity.familyName}
        grade={identity.grade}
        impactStatement={identity.statement}
        onRegister={register}
      />
    );
  }

  if (identity.interests === undefined) {
    return <ImpactQuiz role={identity.role} interests={identity.interests} onFinish={setInterests} />;
  }

  return <Welcome givenName={identity.givenName} onContinue={() => navigate(`/tenants/${identity.nickname}`)} />;
};
