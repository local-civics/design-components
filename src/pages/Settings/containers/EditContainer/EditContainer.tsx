import React from "react";
import { useNavigate } from "react-router-dom";
import { useApi, useAuth, useTenant } from "../../../../contexts/App";
import { useMessage } from "../../../../contexts/Message";
import { EditModal } from "../../components/EditModal/EditModal";

/**
 * A connected container for the edit modal.
 * @constructor
 */
export const EditContainer = () => {
  const tenant = useTenant();
  const api = useApi();
  const auth = useAuth();
  const navigate = useNavigate();
  const message = useMessage();
  const close = () => navigate(-1);
  const save = async (changes?: {
    newNickname?: string;
    newGivenName?: string;
    newFamilyName?: string;
    newGrade?: number;
    newSubject?: string;
    newRole?: string;
    newImpactStatement?: string;
    newInterests?: string[];
    newAvatar?: Blob;
  }) => {
    if (!tenant.nickname || tenant.isLoading) {
      return;
    }

    if (!changes || Object.keys(changes).length === 0) {
      close();
      return;
    }

    await api.tenant.configureTenant(tenant.nickname || "", changes).then(close);
    await tenant.digest();

    message.send(`We've processed your changes.`, {
      severity: "success",
      icon: "profile",
      title: "Success",
    });
  };

  return {
    EditModal: () => <EditModal {...tenant} visible accessToken={auth.accessToken} onClose={close} onSave={save} />,
  };
};
