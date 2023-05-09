'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export const SigningButtons = () => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <>
      {session ? (
        <button
          onClick={() => {
            signOut();
          }}
          disabled={isLoading}
        >
          Sign out
        </button>
      ) : (
        <button disabled={isLoading}>
          <Link href='/api/auth/signin'>Sign in</Link>
        </button>
      )}
    </>
  );
};
