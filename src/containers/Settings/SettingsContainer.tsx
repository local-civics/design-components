import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useTenant } from "../../contexts/App";
import { useMessage } from "../../contexts/Message";
import { ChangeSettingsWorkflow } from "../../workflows/ChangeSettingsWorkflow/ChangeSettingsWorkflow";
import path from "path";

/**
 * A connected container for the edit modal.
 * @constructor
 */
export const SettingsContainer = () => {
  const tenant = useTenant();
  const auth = useAuth();
  const navigate = useNavigate();
  const message = useMessage();
  const close = () => navigate(path.dirname(location.pathname));
  const [prev, setPrev] = React.useState({ ...tenant } as any);

  React.useEffect(() => {
    setPrev({ ...tenant, ...prev, isLoading: tenant.isLoading });
  }, [tenant.tenantName, tenant.isLoading]);

  const save = async (changes?: any) => {
    if (!tenant.tenantName || tenant.isLoading) {
      return;
    }

    if (!changes || Object.keys(changes).length === 0) {
      close();
      return;
    }

    setPrev({ ...prev, ...changes, hasChanges: true });
    await tenant.configure(changes).then((err: any) => {
      if (!err) {
        tenant.resolve().then(() => {
          setPrev({ ...tenant });
          message.send(`We've processed your changes.`, {
            severity: "success",
            icon: "profile",
            title: "Success",
          });
        });
      }
    });
  };

  return {
    EditModal: () => (
      <ChangeSettingsWorkflow
        {...tenant}
        {...prev}
        visible
        accessToken={auth.accessToken}
        onClose={close}
        onSave={save}
      />
    ),
  };
};
