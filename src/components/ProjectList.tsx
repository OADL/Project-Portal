import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { FROM_APP_STATE } from '../utils/navigation';
import { formatDate, STATUS_LABELS } from '../utils/projects';

interface ProjectListProps {
  projects: Project[];
  compact: boolean;
}

export function ProjectList({ projects, compact }: ProjectListProps) {
  if (projects.length === 0) {
    return <p>No projects match your filters.</p>;
  }

  return (
    <ul className={compact ? 'projects compact' : 'projects'}>
      {projects.map((project) => (
        <li key={project.id}>
          <Link to={project.id} state={FROM_APP_STATE}>
            {project.name}
          </Link>{' '}
          ({STATUS_LABELS[project.status]})
          {!compact && (
            <>
              <p>{project.description}</p>
              <small>
                Owner: {project.ownerName}, due {formatDate(project.dueDate)}
              </small>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
