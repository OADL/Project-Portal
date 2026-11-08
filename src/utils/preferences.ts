const COMPACT_LIST_KEY = 'project-portal.compactList';

export function readCompactList(): boolean {
  try {
    return localStorage.getItem(COMPACT_LIST_KEY) === 'true';
  } catch {
    return false;
  }
}

export function saveCompactList(compact: boolean): void {
  try {
    localStorage.setItem(COMPACT_LIST_KEY, String(compact));
  } catch {}
}
