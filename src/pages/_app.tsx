import { QueryClientInstanceProvider, useQueryClientInstance } from '@/contexts/QueryClientContext';
import '@/styles/globals.css';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider, useSession } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

function AppSessionWrapper({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const { route } = useRouter();

  // do not show loading for index page
  // if (status === 'loading' && !['/'].includes(route))
  //   return (
  //     <div
  //       style={{
  //         height: '100vh',
  //         width: '100vw',
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         fontSize: '1.5rem',
  //       }}
  //     >
  //       Loading...
  //     </div>
  //   );

  return <>{children}</>;
}

function AppQueryClientInstanceWrapper({ children }: { children: ReactNode }) {
  const { queryClient } = useQueryClientInstance();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <div style={{ padding: 30 }}>
      <SessionProvider session={session}>
        <QueryClientInstanceProvider>
          <AppSessionWrapper>
            <QueryClientInstanceProvider>
              <AppQueryClientInstanceWrapper>
                <Hydrate state={pageProps.dehydratedState}>
                  <Component {...pageProps} />
                </Hydrate>
              </AppQueryClientInstanceWrapper>
            </QueryClientInstanceProvider>
          </AppSessionWrapper>
        </QueryClientInstanceProvider>
      </SessionProvider>
    </div>
  );
}
