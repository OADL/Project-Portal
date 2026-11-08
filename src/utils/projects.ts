import type { ProjectStatus } from '../types';

export const PROJECT_STATUSES: readonly ProjectStatus[] = ['active', 'on_hold', 'completed'];

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  active: 'Active',
  on_hold: 'On hold',
  completed: 'Completed',
};

export function isProjectStatus(value: string | null): value is ProjectStatus {
  return value === 'active' || value === 'on_hold' || value === 'completed';
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'UTC' });

export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}
