'use client';

import { QueryClientInstanceProvider, useQueryClientInstance } from '@/contexts/QueryClientContext.client';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
        <AppQueryClientInstanceWrapper>{children}</AppQueryClientInstanceWrapper>
      </QueryClientInstanceProvider>
    </SessionProvider>
  );
};
