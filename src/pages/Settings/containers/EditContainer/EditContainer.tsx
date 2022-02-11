import * as path from "path";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useResidentContext } from "../../../../contexts/ResidentContext/ResidentContext";
import { EditModal, ResidentState } from "../../modals/EditModal/EditModal";

/**
 * A connected container for the edit modal.
 * @constructor
 */
export const EditContainer = () => {
  const ctx = useResidentContext();
  const navigate = useNavigate();
  const location = useLocation();
  const visible = !!location.pathname.match(/^\/residents\/[^/]+\/settings$/);
  const close = () => navigate(path.dirname(location.pathname));
  const save = (resident?: ResidentState) => {
    if (ctx && ctx.saving) {
      return;
    }

    if (!ctx || !ctx.resident || !ctx.save || !resident) {
      close();
      return;
    }

    ctx.save(resident).then(close);
  };

  return {
    EditModal: () => (
      <EditModal
        saving={ctx?.saving}
        avatarURL={ctx?.resident?.avatarURL}
        residentName={ctx?.resident?.residentName}
        givenName={ctx?.resident?.givenName}
        familyName={ctx?.resident?.familyName}
        grade={ctx?.resident?.grade}
        impactStatement={ctx?.resident?.impactStatement}
        accessToken={ctx?.accessToken}
        visible={visible}
        onClose={close}
        onSave={save}
      />
    ),
  };
};
