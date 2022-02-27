import { Resident } from "@local-civics/js-client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useApi, useAuth, useIdentity } from "../../../../contexts/App";
import { EditModal } from "../../components/EditModal/EditModal";

/**
 * A connected container for the edit modal.
 * @constructor
 */
export const EditContainer = () => {
  const identity = useIdentity();
  const api = useApi();
  const auth = useAuth();
  const navigate = useNavigate();
  const close = () => navigate(-1);
  const save = async (resident?: Resident) => {
    if (!identity.residentName || identity.resolving) {
      return;
    }

    if (!resident) {
      close();
      return;
    }

    await api.residents.save(identity.residentName, resident).then(close);
    await identity.resolve();
  };

  return {
    EditModal: () => <EditModal {...identity} visible accessToken={auth.accessToken} onClose={close} onSave={save} />,
  };
};
