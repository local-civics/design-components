import { FunctionComponent } from "react";
import { Route, Routes }     from "react-router-dom";
import { BadgeModal }        from "./badge";
import { Calendar }          from "./calendar";
import { NotFound }          from "./errors";
import { EventModal }        from "./event/modal";
import {ExplorePage}         from "./explore/page";
import { Home }              from "./home";
import { Profile }           from "./profile";
import { Settings }          from "./profile/settings";
import { PathwayHelpModal }  from "./readiness/modal";

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
        <Route path="badges/:badgeName" element={<BadgeModal />} />
        <Route path="help/pathway/:stage" element={<PathwayHelpModal />} />
        <Route
          path="communities/:communityName/events/:eventName"
          element={<EventModal />}
        />
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
      <Route path="/communities/:communityName" element={<ExplorePage />} >
          <Route
              path="events/:eventName"
              element={<EventModal />}
          />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
