'use client';

import { QueryClientInstanceProvider, useQueryClientInstance } from '@/contexts/QueryClientContext.client';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SWRConfig } from 'swr';

function AppQueryClientInstanceWrapper({ children }: { children: ReactNode }) {
  const { queryClient } = useQueryClientInstance();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientInstanceProvider>
        <AppQueryClientInstanceWrapper>
          <SWRConfig
            value={{
              revalidateOnFocus: false,
              // refreshInterval: 3000,
              // fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
            }}
          >
            {children}
          </SWRConfig>
        </AppQueryClientInstanceWrapper>
      </QueryClientInstanceProvider>
    </SessionProvider>
  );
};
