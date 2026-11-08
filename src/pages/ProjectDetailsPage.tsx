import { useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchProject } from '../api/mockApi';
import { ErrorMessage } from '../components/ErrorMessage';
import { ProjectDetails } from '../components/ProjectDetails';
import { withLoading } from '../hocs/withLoading';
import { useAsync } from '../hooks/useAsync';
import { cameFromApp } from '../utils/navigation';

const ProjectDetailsWithLoading = withLoading(ProjectDetails);

export function ProjectDetailsPage() {
  const { projectId = '' } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const load = useCallback(() => fetchProject(projectId), [projectId]);
  const { state, retry } = useAsync(load);

  function handleBack() {
    if (cameFromApp(location.state)) navigate(-1);
    else navigate('/dashboard/projects');
  }

  return (
    <>
      <button type="button" onClick={handleBack}>
        Back
      </button>

      {state.status === 'error' ? (
        <ErrorMessage message={state.message} onRetry={retry} />
      ) : (
        <ProjectDetailsWithLoading
          isLoading={state.status === 'loading'}
          project={state.status === 'ready' ? state.data : null}
        />
      )}
    </>
  );
}
