import type { ComponentType } from 'react';
import { Loader } from '../components/Loader';
import { getDisplayName } from './getDisplayName';

export interface WithLoadingProps {
  isLoading: boolean;
}

export function withLoading<WrappedProps extends object>(Component: ComponentType<WrappedProps>) {
  function WithLoading({ isLoading, ...rest }: WrappedProps & WithLoadingProps) {
    if (isLoading) return <Loader />;

    return <Component {...(rest as WrappedProps)} />;
  }

  WithLoading.displayName = `withLoading(${getDisplayName(Component)})`;
  return WithLoading;
}
