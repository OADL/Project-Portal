import { useCallback, useEffect, useState } from 'react';

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: T };

interface Settled<T> {
  load: () => Promise<T>;
  attempt: number;
  state: AsyncState<T>;
}

export function useAsync<T>(load: () => Promise<T>) {
  const [attempt, setAttempt] = useState(0);
  const [settled, setSettled] = useState<Settled<T> | null>(null);

  useEffect(() => {
    let ignore = false;

    load().then(
      (data) => {
        if (!ignore) setSettled({ load, attempt, state: { status: 'ready', data } });
      },
      (error: unknown) => {
        const message = error instanceof Error ? error.message : 'Something went wrong.';
        if (!ignore) setSettled({ load, attempt, state: { status: 'error', message } });
      },
    );

    return () => {
      ignore = true;
    };
  }, [load, attempt]);

  const isCurrent = settled !== null && settled.load === load && settled.attempt === attempt;
  const state: AsyncState<T> = isCurrent ? settled.state : { status: 'loading' };

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { state, retry };
}
