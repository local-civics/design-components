import React from "react";
import { BrowserRouter, MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { AppProvider } from "./contexts/App";
import { mockApi } from "./mock";
import { Badge } from "./pages/Badge/Badge";
import { Calendar } from "./pages/Calendar/Calendar";
import { Experience } from "./pages/Experience/Experience";
import { Explore } from "./pages/Explore/Explore";
import { NotFound } from "./pages/NotFound/NotFound";
import { Home } from "./pages/Home/Home";
import { Onboarding } from "./pages/Onboarding/Onboarding";
import { Profile } from "./pages/Profile/Profile";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { Reflection } from "./pages/Reflection/Reflection";
import { Settings } from "./pages/Settings/Settings";
import { Task } from "./pages/Task/Task";

Sentry.init({
  environment: process.env.REACT_APP_ENV,
  release: process.env.REACT_APP_VERSION,
  integrations: [new BrowserTracing()],
  tracesSampleRate: parseFloat(process.env.REACT_APP_SENTRY_SAMPLE_RATE || "1.0"),
});

/**
 * A component for the Hub application.
 */
export const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
};

/**
 * An in-memory component for the Hub application.
 */
export const InMemoryApp = (props: { accessToken?: string; browser?: boolean; location?: string }) => {
  mockApi();
  if (props.browser) {
    return (
      <BrowserRouter>
        <AppProvider accessToken={props.accessToken}>
          <AppRoutes />
        </AppProvider>
      </BrowserRouter>
    );
  }

  const RouteListener = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
      if (props.location) {
        if (props.location) {
          navigate(props.location);
        }
      }
    }, []);
    return null;
  };

  return (
    <MemoryRouter>
      <AppProvider accessToken={props.accessToken}>
        <AppRoutes />
        <RouteListener />
      </AppProvider>
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
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/residents/:residentName" element={<Profile />}>
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="settings" element={<Settings />} />
        <Route path="badges/:badgeName" element={<Badge />} />
        <Route path="tasks/:taskName" element={<Task />} />
        <Route path="reflections/:experienceName" element={<Reflection />} />
      </Route>
      <Route path="/residents/:residentName/:tab" element={<Profile />} />
      <Route path="/residents/:residentName/tasks/:status" element={<Profile />} />
      <Route path="/communities/:communityName/calendar/experiences" element={<Calendar />}>
        <Route path=":experienceName" element={<Experience />} />
      </Route>
      <Route path="/communities/:communityName/calendar/:date/experiences" element={<Calendar />}>
        <Route path=":experienceName" element={<Experience />} />
      </Route>
      <Route path="/communities/:communityName/explore/experiences" element={<Explore />}>
        <Route path=":experienceName" element={<Experience />} />
      </Route>
      <Route path="/communities/:communityName/skills/:skill/experiences" element={<Explore />}>
        <Route path=":experienceName" element={<Experience />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
