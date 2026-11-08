import type { Project } from '../types';
import { formatDate, STATUS_LABELS } from '../utils/projects';

export function ProjectDetails({ project }: { project: Project | null }) {
  if (!project) {
    return <p>Project not found</p>;
  }

  return (
    <>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <dl>
        <dt>Status</dt>
        <dd>{STATUS_LABELS[project.status]}</dd>
        <dt>Owner</dt>
        <dd>{project.ownerName}</dd>
        <dt>Start date</dt>
        <dd>{formatDate(project.startDate)}</dd>
        <dt>Due date</dt>
        <dd>{formatDate(project.dueDate)}</dd>
      </dl>
    </>
  );
}
