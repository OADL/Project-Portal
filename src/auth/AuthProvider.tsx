import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { login as apiLogin } from '../api/mockApi';
import type { User } from '../types';
import { AuthContext, type AuthContextValue } from './AuthContext';
import { readStoredUser, storeUser } from './sessionStorage';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser);

  const login = useCallback(async (username: string) => {
    const signedIn = await apiLogin(username);
    storeUser(signedIn);
    setUser(signedIn);
  }, []);

  const logout = useCallback(() => {
    storeUser(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
