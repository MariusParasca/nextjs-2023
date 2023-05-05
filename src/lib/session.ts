import { IncomingMessage } from 'http';
import { getSession } from 'next-auth/react';

export const checkServerSideSession = async (
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  },
  callbackUrl: string,
): Promise<{ sessionExpired: boolean; options: any }> => {
  const session = await getSession({ req });

  if (!session) {
    return {
      sessionExpired: true,
      options: {
        redirect: {
          destination: `/api/auth/signin?callbackUrl=${callbackUrl}`,
          permanent: false,
        },
      },
    };
  }

  return {
    sessionExpired: false,
    options: null,
  };
};
