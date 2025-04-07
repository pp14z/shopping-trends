import type { Metadata } from 'next';

import '@/styles/globals.css';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Shopping Trends',
  description:
    'Dashboard interactivo para el análisis de tendencias de compra.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
