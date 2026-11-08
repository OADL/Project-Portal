import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function HomePage() {
  const { user } = useAuth();

  return (
    <>
      <h1>Welcome to Project Portal</h1>
      {user ? <Link to="/dashboard">Go to dashboard</Link> : <Link to="/login">Sign in</Link>}
    </>
  );
}
