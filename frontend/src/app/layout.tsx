import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';
import { Suspense } from 'react';

import '@/styles/globals.css';
import { Loader } from '@/components/ui/loader';

import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shopping Trends',
  description:
    'Dashboard interactivo para el análisis de tendencias de compra.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
