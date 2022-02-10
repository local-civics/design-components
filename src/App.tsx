import React from "react";
import { BrowserRouter, MemoryRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ResidentContextProvider, ResidentContextState } from "./contexts/ResidentContext/ResidentContext";
import { mockApi } from "./mock";
import { NotFound } from "./pages/NotFound/NotFound";
import { Home } from "./pages/Home/Home";
import { Profile } from "./pages/Profile/Profile";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  environment: process.env.APP_ENV,
  release: process.env.APP_VERSION,
  integrations: [new BrowserTracing()],
  tracesSampleRate: parseFloat(process.env.SENTRY_SAMPLE_RATE || "1.0"),
});

// todo: additional registration pop-up
// todo: explore page
// todo: home page
// todo: profile page
// todo: calendar page
// todo: better 404

/**
 * A component for the Hub application.
 */
export const App = () => {
  return (
    <BrowserRouter>
      <ResidentContextProvider>
        <AppRoutes />
      </ResidentContextProvider>
    </BrowserRouter>
  );
};

/**
 * An in-memory component for the Hub application.
 */
export const InMemoryApp = (props: { browser?: boolean; location?: string }) => {
  mockApi();
  const ctx: ResidentContextState = {
    accessToken: "foo",
    resident: {
      residentId: "me",
      residentName: "test.user",
      communityName: "hcz",
      givenName: "Andre",
      familyName: "Carter",
      impactStatement:
        "I would like to encourage my community to become more educated on issues that directly affect us, as well as make sure andre.carter community is a place where everyone is welcome.",
      grade: "7th",
      createdAt: "January 1, 2020",
    },
  };

  if (props.browser) {
    return (
      <BrowserRouter>
        <ResidentContextProvider value={ctx}>
          <AppRoutes />
        </ResidentContextProvider>
      </BrowserRouter>
    );
  }

  const RouteListener = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [start, setStart] = React.useState(true);

    React.useEffect(() => {
      if (start && props.location) {
        navigate(props.location);
        setStart(false);
      }
    }, [props.location]);

    React.useEffect(() => {
      if (!start || !props.location) {
        navigate(location.pathname);
      }
    }, [location.pathname]);

    return null;
  };

  return (
    <MemoryRouter>
      <ResidentContextProvider value={ctx}>
        <AppRoutes />
        <RouteListener />
      </ResidentContextProvider>
    </MemoryRouter>
  );
};

/**
 * The application routes.
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
const AppRoutes = (props: { location?: string }) => {
  return (
    <Routes location={props.location}>
      <Route path="/" element={<Home />} />
      <Route path="/residents/:residentName" element={<Profile />}>
        {/*<Route path="settings" element={<Settings />} />*/}
        {/*<Route path="badges/:badgeName" element={<BadgeModal />} />*/}
        {/*<Route path="events/:eventName" element={<EventModal />} />*/}
      </Route>
      <Route path="/residents/:residentName/:tab" element={<Profile />} />
      <Route path="/residents/:residentName/:tab/:status" element={<Profile />} />
      {/*<Route path="/communities/:communityName/calendar/events" element={<Calendar />}>*/}
      {/*  <Route path=":eventName" element={<EventModal />} />*/}
      {/*</Route>*/}
      {/*<Route path="/communities/:communityName/calendar/:date/events" element={<Calendar />}>*/}
      {/*  <Route path=":eventName" element={<EventModal />} />*/}
      {/*</Route>*/}
      {/*<Route path="/communities/:communityName/explore/events" element={<ExplorePage />}>*/}
      {/*  <Route path=":eventName" element={<EventModal />} />*/}
      {/*</Route>*/}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
