import type { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import type { LoginRedirectState } from '../auth/redirect';
import type { Role } from '../types';
import { getDisplayName } from './getDisplayName';

export interface WithAuthOptions {
  role?: Role;
}

export function withAuth<WrappedProps extends object>(
  Component: ComponentType<WrappedProps>,
  options: WithAuthOptions = {},
) {
  function WithAuth(props: WrappedProps) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
      const state: LoginRedirectState = { from: location.pathname + location.search + location.hash };
      return <Navigate to="/login" replace state={state} />;
    }

    if (options.role && user.role !== options.role) {
      return <p role="alert">You do not have access to this page.</p>;
    }

    return <Component {...props} />;
  }

  WithAuth.displayName = `withAuth(${getDisplayName(Component)})`;
  return WithAuth;
}
