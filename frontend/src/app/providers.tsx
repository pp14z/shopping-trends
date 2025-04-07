'use client';

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MainErrorFallback } from '@/components/errors/main';
import { queryConfig } from '@/lib/react-query';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
        queryCache: new QueryCache({
          onError: (error, query) => {
            // log all other errors with context from query metadata
            const message =
              (query.meta?.errorMessage as string) || 'Query failed';
            console.error(`${message}: ${error.message}`);
          },
        }),
      }),
  );

  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
