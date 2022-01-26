import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { Badge } from "./badge";
import { Calendar } from "./calendar";
import { NotFound } from "./errors";
import { Explore } from "./explore";
import { Home } from "./home";
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
// todo: read only for viewers

/**
 * ProfilePage component
 */
export const App: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/residents/:residentName" element={<Profile />}>
        <Route path="settings" element={<Settings />} />
        <Route path="badges/:badgeName" element={<Badge />} />
      </Route>
      <Route
        path="/residents/:residentName/milestones"
        element={<Profile tab="milestones" />}
      />
      <Route
        path="/residents/:residentName/activity"
        element={<Profile tab="activity" />}
      />
      <Route path="/residents/:residentName/calendar" element={<Calendar />} />
      <Route path="/communities/:communityName" element={<Explore />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
