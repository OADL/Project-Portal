export interface LoginRedirectState {
  from: string;
}

export const DEFAULT_AFTER_LOGIN = '/dashboard';

function isInAppPath(path: string): boolean {
  return path.startsWith('/') && !path.startsWith('//') && !path.startsWith('/\\');
}

export function getRedirectTarget(state: unknown): string {
  if (
    typeof state === 'object' &&
    state !== null &&
    'from' in state &&
    typeof state.from === 'string' &&
    isInAppPath(state.from) &&
    state.from !== '/login'
  ) {
    return state.from;
  }
  return DEFAULT_AFTER_LOGIN;
}
