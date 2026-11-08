export const FROM_APP_STATE = { fromApp: true } as const;

export function cameFromApp(state: unknown): boolean {
  return typeof state === 'object' && state !== null && 'fromApp' in state && state.fromApp === true;
}
