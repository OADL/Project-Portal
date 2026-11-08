import { NavLink, Outlet } from 'react-router-dom';

export function DashboardLayout() {
  return (
    <div className="dashboard">
      <nav aria-label="Dashboard" className="sidebar">
        <NavLink to="/dashboard" end>
          Overview
        </NavLink>
        <NavLink to="/dashboard/projects">Projects</NavLink>
        <NavLink to="/dashboard/settings">Settings</NavLink>
      </nav>

      <section>
        <Outlet />
      </section>
    </div>
  );
}
