import { FunctionComponent } from "react";
import {Route, Routes}       from "react-router-dom";
import { BadgeModal }        from "./badge";
import {CalendarPage}        from "./calendar/page";
import { NotFound }          from "./errors";
import { EventModal }        from "./event/modal";
import {ExplorePage}         from "./explore/page";
import { Home }              from "./home";
import { Profile }           from "./profile";
import { Settings }          from "./profile/settings";

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
      {/*  todo: profile page like explore dev pattern */}
      <Route path="/residents/:residentName" element={<Profile />}>
        <Route path="settings" element={<Settings />} />
        <Route path="badges/:badgeName" element={<BadgeModal />} />
        <Route path="events/:eventName" element={<EventModal />}/>
      </Route>
      <Route path="/residents/:residentName/milestones" element={<Profile tab="milestones" />}/>
      <Route path="/residents/:residentName/activity" element={<Profile tab="activity" />}/>
      <Route path="/communities/:communityName/calendar/events" element={<CalendarPage />} />
      <Route path="/communities/:communityName/calendar/:day/events" element={<CalendarPage />}>
          <Route path=":eventName" element={<EventModal />} />
      </Route>
      <Route path="/communities/:communityName/explore/events" element={<ExplorePage />}>
          <Route path=":eventName" element={<EventModal />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

/**
 * hub.localcivics.io/residents/:residentName
 * hub.localcivics.io/residents/:residentName/settings
 * hub.localcivics.io/residents/:residentName/milestones
 * hub.localcivics.io/residents/:residentName/activity
 * hub.localcivics.io/residents/:residentName/events/:eventName
 * hub.localcivics.io/residents/:residentName/badges/:badgeName
 * hub.localcivics.io/communities/:communityName
 * hub.localcivics.io/communities/:communityName/explore/events
 * hub.localcivics.io/communities/:communityName/explore/events/:eventName
 * hub.localcivics.io/communities/:communityName/calendar/events
 * hub.localcivics.io/communities/:communityName/calendar/events/:eventName
 */
