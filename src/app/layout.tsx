import { Providers } from '@/components/Providers/Providers.client';
import { SigningButtons } from '@/components/SigningButtons/SigningButtons.client';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <header>
            <nav style={{ display: 'flex', gap: 20, margin: '30px 60px 0 60px' }}>
              <Link href='/'>Home</Link>
              <Link href='/parallel'>Parallel</Link>
              <Link href='/posts'>Posts</Link>
              <Link href='/customers'>Customers</Link>
              <SigningButtons />
            </nav>
          </header>
          <main className={`${styles.main} ${inter.className}`}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
