import { fetchProjects } from '../api/mockApi';
import { ErrorMessage } from '../components/ErrorMessage';
import { StatusSummary } from '../components/StatusSummary';
import { withLoading } from '../hocs/withLoading';
import { useAsync } from '../hooks/useAsync';

const StatusSummaryWithLoading = withLoading(StatusSummary);

export function OverviewPage() {
  const { state, retry } = useAsync(fetchProjects);

  return (
    <>
      <h1>Overview</h1>
      {state.status === 'error' ? (
        <ErrorMessage message={state.message} onRetry={retry} />
      ) : (
        <StatusSummaryWithLoading
          isLoading={state.status === 'loading'}
          projects={state.status === 'ready' ? state.data : []}
        />
      )}
    </>
  );
}
