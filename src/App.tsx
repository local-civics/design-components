import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./contexts/App";
import { Badge } from "./pages/Badge/Badge";
import { Calendar } from "./pages/Calendar/Calendar";
import { Activity } from "./pages/Activity/Activity";
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tenants/:tenantName" element={<Profile />}>
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="settings" element={<Settings />} />
        <Route path="badges/:badgeId" element={<Badge />} />
        <Route path="badges/:badgeId/tasks/:taskId" element={<Task />} />
        <Route path="tasks/:taskId" element={<Task />} />
        <Route path="reflections/:activityId" element={<Reflection />} />
      </Route>
      <Route path="/tenants/:tenantName/events" element={<Calendar />}>
        <Route path=":activityId" element={<Activity />} />
      </Route>
      <Route path="/tenants/:tenantName/events/:day" element={<Calendar />}>
        <Route path=":activityId" element={<Activity />} />
      </Route>
      <Route path="/tenants/:tenantName/activities" element={<Explore />}>
        <Route path=":activityId" element={<Activity />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
