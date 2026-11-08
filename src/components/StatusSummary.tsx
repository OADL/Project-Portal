import type { Project } from '../types';
import { PROJECT_STATUSES, STATUS_LABELS } from '../utils/projects';

export function StatusSummary({ projects }: { projects: Project[] }) {
  return (
    <ul>
      {PROJECT_STATUSES.map((status) => (
        <li key={status}>
          {STATUS_LABELS[status]}: {projects.filter((p) => p.status === status).length}
        </li>
      ))}
    </ul>
  );
}
