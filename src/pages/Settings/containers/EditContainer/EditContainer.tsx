import { Resident } from "@local-civics/js-client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useApi, useAuth, useRequester, useResolver } from "../../../../contexts/App";
import { EditModal } from "../../components/EditModal/EditModal";

/**
 * A connected container for the edit modal.
 * @constructor
 */
export const EditContainer = () => {
  const requester = useRequester();
  const resolver = useResolver();
  const api = useApi();
  const auth = useAuth();
  const navigate = useNavigate();
  const close = () => navigate(-1);
  const save = async (resident?: Resident) => {
    if (!requester.residentName || resolver.resolving) {
      return;
    }

    if (!resident) {
      close();
      return;
    }

    await api.residents.save(requester.residentName, resident).then(close);
    await resolver.resolve();
  };

  return {
    EditModal: () => <EditModal {...requester} visible accessToken={auth.accessToken} onClose={close} onSave={save} />,
  };
};
