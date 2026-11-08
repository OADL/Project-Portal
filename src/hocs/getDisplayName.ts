export function getDisplayName(Component: { displayName?: string; name?: string }): string {
  return Component.displayName ?? (Component.name || 'Component');
}
