import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProjects } from '../api/mockApi';
import { ErrorMessage } from '../components/ErrorMessage';
import { ProjectList } from '../components/ProjectList';
import { withLoading } from '../hocs/withLoading';
import { useAsync } from '../hooks/useAsync';
import { readCompactList } from '../utils/preferences';
import { isProjectStatus, PROJECT_STATUSES, STATUS_LABELS } from '../utils/projects';

const ProjectListWithLoading = withLoading(ProjectList);

export function ProjectListPage() {
  const { state, retry } = useAsync(fetchProjects);
  const [compact] = useState(readCompactList);

  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get('status');
  const status = isProjectStatus(statusParam) ? statusParam : 'all';
  const query = searchParams.get('q') ?? '';

  function updateParam(key: 'status' | 'q', value: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true },
    );
  }

  const visibleProjects = useMemo(() => {
    if (state.status !== 'ready') return [];
    const needle = query.trim().toLowerCase();
    return state.data.filter(
      (p) => (status === 'all' || p.status === status) && p.name.toLowerCase().includes(needle),
    );
  }, [state, status, query]);

  return (
    <>
      <h1>Projects</h1>

      <div className="filters">
        <label>
          Status{' '}
          <select value={status} onChange={(e) => updateParam('status', e.target.value === 'all' ? '' : e.target.value)}>
            <option value="all">All</option>
            {PROJECT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
        <label>
          Search{' '}
          <input type="search" value={query} onChange={(e) => updateParam('q', e.target.value)} />
        </label>
      </div>

      {state.status === 'error' ? (
        <ErrorMessage message={state.message} onRetry={retry} />
      ) : (
        <ProjectListWithLoading isLoading={state.status === 'loading'} projects={visibleProjects} compact={compact} />
      )}
    </>
  );
}
