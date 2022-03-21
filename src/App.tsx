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
  dsn: process.env.REACT_APP_SENTRY_DSN,
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/tenants/:tenantName" element={<Profile />}>
        <Route path="settings" element={<Settings />} />
        <Route path="badges/:marketName/:badgeId" element={<Badge />} />
        <Route path="badges/:marketName/:badgeId/:level" element={<Badge />} />
        <Route path="badges/:marketName/:badgeId/tasks/:taskId" element={<Task />} />
        <Route path="badges/:marketName/:badgeId/:level/tasks/:taskId" element={<Task />} />
        <Route path="reflections/:marketName/:activityId" element={<Reflection />} />
      </Route>
      <Route path="/tenants/:tenantName/:tab" element={<Profile />} />
      <Route path="/tenants/:tenantName/tasks/:status" element={<Profile />} />
      <Route path="/marketplace/:marketName/calendar/day/today" element={<Calendar />}>
        <Route path=":activityId" element={<Experience />} />
      </Route>
      <Route path="/marketplace/:marketName/calendar/day/:date" element={<Calendar />}>
        <Route path=":activityId" element={<Experience />} />
      </Route>
      <Route path="/marketplace/:marketName/activities" element={<Explore />}>
        <Route path=":activityId" element={<Experience />} />
      </Route>
      <Route path="/marketplace/:marketName/skills/:skill" element={<Explore />}>
        <Route path=":activityId" element={<Experience />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
