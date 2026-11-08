import type { User } from '../types';

const STORAGE_KEY = 'project-portal.user';

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'string' &&
    'username' in value &&
    typeof value.username === 'string' &&
    'name' in value &&
    typeof value.name === 'string' &&
    'role' in value &&
    (value.role === 'admin' || value.role === 'member')
  );
}

export function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;

    const parsed: unknown = JSON.parse(raw);
    if (isUser(parsed)) return parsed;

    localStorage.removeItem(STORAGE_KEY);
    return null;
  } catch {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    return null;
  }
}

export function storeUser(user: User | null): void {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
