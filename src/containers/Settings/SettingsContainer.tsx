import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useTenant } from "../../contexts/App";
import { useMessage } from "../../contexts/Message";
import { OpenSettings } from "../../components/Profile/OpenSettings/OpenSettings";

/**
 * A connected container for the edit modal.
 * @constructor
 */
export const SettingsContainer = () => {
  const tenant = useTenant();
  const auth = useAuth();
  const navigate = useNavigate();
  const message = useMessage();
  const close = () => navigate(-1);
  const save = async (changes?: any) => {
    if (!tenant.tenantName || tenant.isLoading) {
      return;
    }

    if (!changes || Object.keys(changes).length === 0) {
      close();
      return;
    }

    await tenant.configure(changes).then(close);
    message.send(`We've processed your changes.`, {
      severity: "success",
      icon: "profile",
      title: "Success",
    });
  };

  return {
    EditModal: () => <OpenSettings {...tenant} visible accessToken={auth.accessToken} onClose={close} onSave={save} />,
  };
};
