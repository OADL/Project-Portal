import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from './components/Loader';
import { withAuth } from './hocs/withAuth';
import { DashboardLayout } from './layouts/DashboardLayout';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OverviewPage } from './pages/OverviewPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { ProjectListPage } from './pages/ProjectListPage';

const LazySettingsPage = lazy(() => import('./pages/SettingsPage'));

function SettingsRoute() {
  return (
    <Suspense fallback={<Loader label="Loading settings..." />}>
      <LazySettingsPage />
    </Suspense>
  );
}

const ProtectedDashboardLayout = withAuth(DashboardLayout);
const AdminSettings = withAuth(SettingsRoute, { role: 'admin' });

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />

        <Route path="dashboard" element={<ProtectedDashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="projects" element={<ProjectListPage />} />
          <Route path="projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
