import { getSession, signIn } from 'next-auth/react';
import React, { ReactNode, useEffect, useState } from 'react';

function SecurePageWrapper({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();

      if (!session) {
        signIn();
      } else {
        setLoading(false);
      }
    };

    securePage();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}

export default SecurePageWrapper;
