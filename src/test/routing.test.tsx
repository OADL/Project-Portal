import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from '../AppRoutes';
import { AuthProvider } from '../auth/AuthProvider';
import { getRedirectTarget } from '../auth/redirect';
import { withAuth } from '../hocs/withAuth';
import { withLoading } from '../hocs/withLoading';

function LoginProbe() {
  const location = useLocation();
  return (
    <>
      <h1>Login page</h1>
      <p data-testid="redirect-target">{getRedirectTarget(location.state)}</p>
    </>
  );
}

function SecretPage() {
  return <h1>Secret page</h1>;
}

const ProtectedSecret = withAuth(SecretPage);
const AdminSecret = withAuth(SecretPage, { role: 'admin' });

function renderWithRouter(ui: ReactNode, url: string) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[url]}>{ui}</MemoryRouter>
    </AuthProvider>,
  );
}

describe('routing', () => {
  it('renders the Not found page for an unknown URL', () => {
    renderWithRouter(<AppRoutes />, '/this/does/not/exist');

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
  });

  it('withAuth sends a signed-out user to /login and remembers the page', () => {
    renderWithRouter(
      <Routes>
        <Route path="/login" element={<LoginProbe />} />
        <Route path="/secret" element={<ProtectedSecret />} />
      </Routes>,
      '/secret?tab=1',
    );

    expect(screen.getByRole('heading', { name: 'Login page' })).toBeInTheDocument();
    expect(screen.queryByText('Secret page')).not.toBeInTheDocument();
    expect(screen.getByTestId('redirect-target')).toHaveTextContent('/secret?tab=1');
  });

  it('protects the real dashboard route too', () => {
    renderWithRouter(<AppRoutes />, '/dashboard/projects');

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('withAuth with a role blocks users with another role', () => {
    localStorage.setItem(
      'project-portal.user',
      JSON.stringify({ id: 'u2', username: 'youssef', name: 'Youssef Adel', role: 'member' }),
    );

    renderWithRouter(
      <Routes>
        <Route path="/admin" element={<AdminSecret />} />
      </Routes>,
      '/admin',
    );

    expect(screen.getByRole('alert')).toHaveTextContent('You do not have access to this page.');
  });

  it('survives a corrupted stored session', () => {
    localStorage.setItem('project-portal.user', '{not json');

    renderWithRouter(<AppRoutes />, '/');

    expect(screen.getByRole('heading', { name: 'Welcome to Project Portal' })).toBeInTheDocument();
  });

  it('sets readable displayNames on HOC results', () => {
    expect(ProtectedSecret.displayName).toBe('withAuth(SecretPage)');
    expect(withLoading(SecretPage).displayName).toBe('withLoading(SecretPage)');
  });
});

describe('getRedirectTarget', () => {
  it('keeps an in-app path', () => {
    expect(getRedirectTarget({ from: '/dashboard/projects?status=active' })).toBe(
      '/dashboard/projects?status=active',
    );
  });

  it('falls back to the dashboard for missing, off-app or looping targets', () => {
    expect(getRedirectTarget(null)).toBe('/dashboard');
    expect(getRedirectTarget({ from: '/login' })).toBe('/dashboard');
    expect(getRedirectTarget({ from: 'https://example.com' })).toBe('/dashboard');
    expect(getRedirectTarget({ from: '//example.com' })).toBe('/dashboard');
    expect(getRedirectTarget({ from: '/\\example.com' })).toBe('/dashboard');
  });
});

describe('withLoading', () => {
  function Probe(props: { label: string }) {
    return <p data-testid="props">{Object.keys(props).sort().join(',')}</p>;
  }
  const ProbeWithLoading = withLoading(Probe);

  it('shows the loader while loading', () => {
    render(<ProbeWithLoading isLoading label="hi" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByTestId('props')).not.toBeInTheDocument();
  });

  it('does not pass isLoading to the wrapped component', () => {
    render(<ProbeWithLoading isLoading={false} label="hi" />);
    expect(screen.getByTestId('props')).toHaveTextContent(/^label$/);
  });
});
