import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function RootLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <>
      <header>
        <nav aria-label="Main">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>

        {user ? (
          <div>
            <span>{user.name}</span>
            <button type="button" onClick={handleLogout}>
              Log out
            </button>
          </div>
        ) : (
          <NavLink to="/login">Sign in</NavLink>
        )}
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
