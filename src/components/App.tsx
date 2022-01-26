import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { Badge } from "./badge";
import { NotFound } from "./errors";
import { Profile } from "./profile";
import { Settings } from "./profile/settings";

// todo: detect event video
// todo: additional registration pop-up
// todo: explore page
// todo: home page
// todo: profile page
// todo: calendar page
// todo: error popup
// todo: notification
// todo: better 404

/**
 * ProfilePage component
 */
export const App: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/:owner" element={<Profile />}>
        <Route path="settings" element={<Settings />} />
        <Route path="badges/:badgeName" element={<Badge />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
