# Tree View:
```
.
├─.env.test
├─.eslintrc.cjs
├─.prettierignore
├─.prettierrc
├─Dockerfile
├─components.json
├─next-env.d.ts
├─next.config.mjs
├─package.json
├─postcss.config.cjs
├─src
│ ├─app
│ │ ├─layout.tsx
│ │ ├─not-found.tsx
│ │ ├─page.tsx
│ │ └─providers.tsx
│ ├─components
│ │ ├─charts
│ │ │ ├─age-distribution-chart.tsx
│ │ │ ├─avg-order-value-chart.tsx
│ │ │ ├─frequency-distribution-chart.tsx
│ │ │ ├─gender-distribution-chart.tsx
│ │ │ ├─orders-by-category-chart.tsx
│ │ │ ├─sales-by-category-chart.tsx
│ │ │ └─subscription-distribution-chart.tsx
│ │ ├─dashboard.tsx
│ │ ├─errors
│ │ │ └─main.tsx
│ │ ├─filters.tsx
│ │ ├─kpi-cards.tsx
│ │ └─ui
│ │   ├─button.tsx
│ │   ├─calendar.tsx
│ │   ├─card.tsx
│ │   ├─chart.tsx
│ │   ├─checkbox.tsx
│ │   ├─collapsible.tsx
│ │   ├─input.tsx
│ │   ├─label.tsx
│ │   ├─loader.tsx
│ │   ├─popover.tsx
│ │   ├─radio-group.tsx
│ │   ├─separator.tsx
│ │   ├─sheet.tsx
│ │   ├─sidebar.tsx
│ │   ├─skeleton.tsx
│ │   ├─slider.tsx
│ │   ├─tabs.tsx
│ │   └─tooltip.tsx
│ ├─config
│ │ ├─env.ts
│ │ └─paths.ts
│ ├─features
│ │ └─customers
│ ├─hooks
│ │ └─use-mobile.tsx
│ ├─lib
│ │ ├─api-client.ts
│ │ ├─data.ts
│ │ ├─react-query
│ │ │ └─index.ts
│ │ └─schemas.ts
│ ├─styles
│ │ └─globals.css
│ ├─testing
│ │ ├─mocks
│ │ │ └─data.json
│ │ └─setup-tests.ts
│ ├─types
│ │ └─index.ts
│ └─utils
│   ├─cn.ts
│   ├─text.ts
│   └─translation.ts
├─tailwind.config.ts
├─tsconfig.json
└─vitest.config.ts
```

# Content:

## .env.test
```test
NEXT_PUBLIC_API_URL=http://localhost:8000

```

## .eslintrc.cjs
```cjs
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  ignorePatterns: [
    'node_modules/*',
    'public/mockServiceWorker.js',
    'generators/*',
  ],
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
  ],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: { version: 'detect' },
        tailwindcss: {
          config: 'tailwind.config.ts'
        },
        'import/parsers': {
          "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        'import/resolver': {
          typescript: {
            project: ["tsconfig.json", "frontend/tsconfig.json"],
          },
          node: {
            project: ["tsconfig.json", "frontend/tsconfig.json"],
          }
        },
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        // 'plugin:react-hooks/recommended', // included in next/core-web-vitals
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
        'plugin:tailwindcss/recommended',
        'plugin:vitest/legacy-recommended',
      ],
      rules: {
        '@next/next/no-img-element': 'off',
        'import/no-restricted-paths': [
          'error',
          {
            zones: [
              // enforce unidirectional codebase:
              {
                target: './src/features',
                from: './src/app',
              },

              // e.g. src/features and src/app can import from these shared modules but not the other way around
              {
                target: [
                  './src/components',
                  './src/hooks',
                  './src/lib',
                  './src/types',
                  './src/utils',
                ],
                from: ['./src/features', './src/app'],
              },
            ],
          },
        ],
        'import/no-cycle': 'error',
        'linebreak-style': ['error', 'unix'],
        'react/prop-types': 'off',
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
            ],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        '@typescript-eslint/no-unused-vars': ['error', {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_",
        }],
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/no-empty-function': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      },
    },
    {
      plugins: ['check-file'],
      files: ['src/**/*'],
      rules: {
        'check-file/filename-naming-convention': [
          'error',
          {
            '**/*.{ts,tsx}': 'KEBAB_CASE',
          },
          {
            ignoreMiddleExtensions: true,
          },
        ],
        'check-file/folder-naming-convention': [
          'error',
          {
            '!(src/app)/**/*': 'KEBAB_CASE',
            '!(**/__tests__)/**/*': 'KEBAB_CASE',
          },
        ],
      },
    },
  ],
};
```

## .prettierignore
```prettierignore
*.hbs

```

## .prettierrc
```prettierrc
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}

```

## Dockerfile
```
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install pnpm in this stage too
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects anonymous telemetry data about general usage
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry during the build
ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line to disable telemetry during runtime
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

## components.json
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/utils/cn",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

## next-env.d.ts
```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

```

## next.config.mjs
```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
};

export default nextConfig;

```

## package.json
```json
{
  "name": "shopping-trends",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "check-types": "tsc --project tsconfig.json --pretty --noEmit"
  },
  "dependencies": {
    "@next/env": "^14.2.5",
    "@ngneat/falso": "^7.2.0",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.3",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.1.2",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-tooltip": "^1.1.8",
    "@tanstack/react-query": "^5.66.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.487.0",
    "next": "14.2.24",
    "react": "^18",
    "react-day-picker": "8.10.1",
    "react-dom": "^18",
    "react-error-boundary": "^4.1.2",
    "recharts": "^2.15.2",
    "server-only": "^0.0.1",
    "tailwind-merge": "^3.2.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.23.4"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.0.2",
    "@tanstack/react-query-devtools": "^5.66.0",
    "@testing-library/jest-dom": "^6.4.2",
    "@testing-library/react": "^15.0.5",
    "@testing-library/user-event": "^14.5.2",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@typescript-eslint/eslint-plugin": "^7.8.0",
    "@typescript-eslint/parser": "^7.8.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.19",
    "dotenv": "^16.4.5",
    "eslint": "8",
    "eslint-config-next": "^14.2.5",
    "eslint-config-prettier": "^9.1.0",
    "eslint-import-resolver-typescript": "^3.6.1",
    "eslint-plugin-check-file": "^2.8.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-jest-dom": "^5.4.0",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "eslint-plugin-playwright": "^1.6.0",
    "eslint-plugin-prettier": "^5.1.3",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-tailwindcss": "^3.15.1",
    "eslint-plugin-testing-library": "^6.2.2",
    "eslint-plugin-vitest": "^0.5.4",
    "jest-environment-jsdom": "^29.7.0",
    "jsdom": "^24.0.0",
    "postcss": "^8.4.38",
    "prettier": "^3.2.5",
    "tailwindcss": "^3.4.17",
    "tsx": "^4.17.0",
    "typescript": "<5.6.0",
    "vite-tsconfig-paths": "^4.3.2",
    "vitest": "^2.1.4",
    "vitest-fail-on-console": "^0.7.1"
  }
}

```

## postcss.config.cjs
```cjs
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

## src/app/layout.tsx
```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';

import '@/styles/globals.css';
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;

```

## src/app/not-found.tsx
```tsx
import Link from 'next/link';

import { paths } from '@/config/paths';

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href={paths.home.getHref()} replace>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

```

## src/app/page.tsx
```tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import Dashboard from '@/components/dashboard';
import { Loader } from '@/components/ui/loader';
import { api } from '@/lib/api-client';
import { customerInsightsParamsSchema } from '@/lib/schemas';
import { type CustomerInsightsData } from '@/types';

const HomePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<CustomerInsightsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const rawParams = {
        ...Object.fromEntries(searchParams.entries()),
        category: searchParams.getAll('category'),
        frequency: searchParams.getAll('frequency'),
      };

      const result = customerInsightsParamsSchema.safeParse(rawParams);

      if (!result.success) {
        // Clear URL parameters if validation fails
        router.replace(window.location.pathname, { scroll: false });
        return;
      }

      const customerData = await api.get<CustomerInsightsData>(
        '/api/customers/insights/',
        { params: result.data },
      );
      setData(customerData);
    };

    fetchData();
  }, [searchParams, router]);

  if (!data)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="size-8" />
      </div>
    );

  return (
    <div className="min-h-screen bg-background p-4">
      <Dashboard customerData={data} />
    </div>
  );
};

export default HomePage;

```

## src/app/providers.tsx
```tsx
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

```

## src/components/charts/age-distribution-chart.tsx
```tsx
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface AgeDistributionChartProps {
  data: Array<{ age: number; male: number; female: number }>;
}

export function AgeDistributionChart({ data }: AgeDistributionChartProps) {
  return (
    <ChartContainer className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="age"
            label={{ value: 'Edad', position: 'insideBottom', offset: -5 }}
          />
          <YAxis />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const total = payload.reduce(
                  (sum, entry) => sum + (entry.value as number),
                  0,
                );
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      // @ts-expect-error ReactNode works
                      content={
                        <div>
                          <div className="text-sm font-medium">
                            Edad: {label}
                          </div>
                          <div className="text-sm">
                            Masculino: {payload[0].value}
                          </div>
                          <div className="text-sm">
                            Femenino: {payload[1].value}
                          </div>
                          <div className="mt-1 text-sm font-medium">
                            Total: {total}
                          </div>
                        </div>
                      }
                    />
                  </ChartTooltip>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar dataKey="male" stackId="a" fill="#5352ed" name="Masculino" />
          <Bar dataKey="female" stackId="a" fill="#ff6b81" name="Femenino" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

```

## src/components/charts/avg-order-value-chart.tsx
```tsx
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { translate } from '@/utils/translation';

interface AvgOrderValueChartProps {
  data: Array<{ category: string; male: number; female: number }>;
}

export function AvgOrderValueChart({ data }: AvgOrderValueChartProps) {
  // Format currency
  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  // Transform data for better display
  const chartData = data.map((item) => ({
    name: translate.category(item.category),
    male: item.male,
    female: item.female,
  }));

  return (
    <ChartContainer className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[50, 65]} tickFormatter={(value) => `$${value}`} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      // @ts-expect-error ReactNode works
                      content={
                        <div>
                          <div className="text-sm font-medium">{label}</div>
                          <div className="text-sm">
                            Masculino:{' '}
                            {formatCurrency(payload[0].value as number)}
                          </div>
                          <div className="text-sm">
                            Femenino:{' '}
                            {formatCurrency(payload[1].value as number)}
                          </div>
                        </div>
                      }
                    />
                  </ChartTooltip>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar dataKey="male" fill="#5352ed" name="Masculino" />
          <Bar dataKey="female" fill="#ff6b81" name="Femenino" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

```

## src/components/charts/frequency-distribution-chart.tsx
```tsx
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { translate } from '@/utils/translation';

interface FrequencyDistributionChartProps {
  data: Array<{ frequency_of_purchases: string; male: number; female: number }>;
}

export function FrequencyDistributionChart({
  data,
}: FrequencyDistributionChartProps) {
  const chartData = data.map((item) => ({
    name: translate.frequency(item.frequency_of_purchases),
    male: item.male,
    female: item.female,
  }));

  return (
    <ChartContainer className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const total = payload.reduce(
                  (sum, entry) => sum + (entry.value as number),
                  0,
                );
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      // @ts-expect-error ReactNode works
                      content={
                        <div>
                          <div className="text-sm font-medium">{label}</div>
                          <div className="text-sm">
                            Masculino: {payload[0].value}
                          </div>
                          <div className="text-sm">
                            Femenino: {payload[1].value}
                          </div>
                          <div className="mt-1 text-sm font-medium">
                            Total: {total}
                          </div>
                        </div>
                      }
                    />
                  </ChartTooltip>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar dataKey="male" stackId="a" fill="#5352ed" name="Masculino" />
          <Bar dataKey="female" stackId="a" fill="#ff6b81" name="Femenino" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

```

## src/components/charts/gender-distribution-chart.tsx
```tsx
'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { translate } from '@/utils/translation';

interface GenderDistributionChartProps {
  data: Array<{ gender: string; count: number }>;
}

export function GenderDistributionChart({
  data,
}: GenderDistributionChartProps) {
  // Calculate percentages
  const total = data.reduce((acc, item) => acc + item.count, 0);
  const chartData = data.map((item) => ({
    name: translate.gender(item.gender),
    value: item.count,
    percentage: Math.round((item.count / total) * 100),
  }));

  const COLORS = ['#ff6b81', '#5352ed'];

  return (
    <ChartContainer className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            label={({ name, percentage }) =>
              `${name.charAt(0)} (${percentage}%)`
            }
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      // @ts-expect-error ReactNode works
                      content={
                        <div>
                          <div className="text-sm font-medium">
                            {payload[0].name}
                          </div>
                          <div className="text-sm">
                            Cantidad: {payload[0].value}
                          </div>
                          <div className="text-sm">
                            Porcentage: {payload[0].payload.percentage}%
                          </div>
                        </div>
                      }
                    />
                  </ChartTooltip>
                );
              }
              return null;
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

```

## src/components/charts/orders-by-category-chart.tsx
```tsx
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { translate } from '@/utils/translation';

interface OrdersByCategoryChartProps {
  data: Array<{ category: string; male: number; female: number }>;
}

export function OrdersByCategoryChart({ data }: OrdersByCategoryChartProps) {
  // Transform data for better display
  const chartData = data.map((item) => ({
    name: translate.category(item.category),
    male: item.male,
    female: item.female,
  }));

  return (
    <ChartContainer className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const total = payload.reduce(
                  (sum, entry) => sum + (entry.value as number),
                  0,
                );
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      // @ts-expect-error ReactNode works
                      content={
                        <div>
                          <div className="text-sm font-medium">{label}</div>
                          <div className="text-sm">
                            Masculino: {payload[0].value}
                          </div>
                          <div className="text-sm">
                            Femenino: {payload[1].value}
                          </div>
                          <div className="mt-1 text-sm font-medium">
                            Total: {total}
                          </div>
                        </div>
                      }
                    />
                  </ChartTooltip>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar dataKey="male" stackId="a" fill="#5352ed" name="Masculino" />
          <Bar dataKey="female" stackId="a" fill="#ff6b81" name="Femenino" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

```

## src/components/charts/sales-by-category-chart.tsx
```tsx
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { translate } from '@/utils/translation';

interface SalesByCategoryChartProps {
  data: Array<{ category: string; male: number; female: number }>;
}

export function SalesByCategoryChart({ data }: SalesByCategoryChartProps) {
  // Format currency
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  // Transform data for better display
  const chartData = data.map((item) => ({
    name: translate.category(item.category),
    male: item.male,
    female: item.female,
  }));

  return (
    <ChartContainer className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const total = payload.reduce(
                  (sum, entry) => sum + (entry.value as number),
                  0,
                );
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      // @ts-expect-error ReactNode works
                      content={
                        <div>
                          <div className="text-sm font-medium">{label}</div>
                          <div className="text-sm">
                            Masculino:{' '}
                            {formatCurrency(payload[0].value as number)}
                          </div>
                          <div className="text-sm">
                            Femenino:{' '}
                            {formatCurrency(payload[1].value as number)}
                          </div>
                          <div className="mt-1 text-sm font-medium">
                            Total: {formatCurrency(total)}
                          </div>
                        </div>
                      }
                    />
                  </ChartTooltip>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar dataKey="male" stackId="a" fill="#5352ed" name="Masculino" />
          <Bar dataKey="female" stackId="a" fill="#ff6b81" name="Femenino" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

```

## src/components/charts/subscription-distribution-chart.tsx
```tsx
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface SubscriptionDistributionChartProps {
  data: Array<{ subscription_status: boolean; male: number; female: number }>;
}

export function SubscriptionDistributionChart({
  data,
}: SubscriptionDistributionChartProps) {
  // Transform data for better display
  const chartData = data.map((item) => ({
    name: item.subscription_status ? 'Suscrito' : 'No suscrito',
    male: item.male,
    female: item.female,
  }));

  return (
    <ChartContainer className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const total = payload.reduce(
                  (sum, entry) => sum + (entry.value as number),
                  0,
                );
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      // @ts-expect-error ReactNode works
                      content={
                        <div>
                          <div className="text-sm font-medium">{label}</div>
                          <div className="text-sm">
                            Masculino: {payload[0].value}
                          </div>
                          <div className="text-sm">
                            Femenino: {payload[1].value}
                          </div>
                          <div className="mt-1 text-sm font-medium">
                            Total: {total}
                          </div>
                        </div>
                      }
                    />
                  </ChartTooltip>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar dataKey="male" stackId="a" fill="#5352ed" name="Masculino" />
          <Bar dataKey="female" stackId="a" fill="#ff6b81" name="Femenino" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

```

## src/components/dashboard.tsx
```tsx
'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

import { AgeDistributionChart } from '@/components/charts/age-distribution-chart';
import { AvgOrderValueChart } from '@/components/charts/avg-order-value-chart';
import { FrequencyDistributionChart } from '@/components/charts/frequency-distribution-chart';
import { GenderDistributionChart } from '@/components/charts/gender-distribution-chart';
import { OrdersByCategoryChart } from '@/components/charts/orders-by-category-chart';
import { SalesByCategoryChart } from '@/components/charts/sales-by-category-chart';
import { SubscriptionDistributionChart } from '@/components/charts/subscription-distribution-chart';
import { Filters } from '@/components/filters';
import { KpiCards } from '@/components/kpi-cards';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type CustomerInsightsData } from '@/types';

export default function Dashboard({
  customerData,
}: {
  customerData: CustomerInsightsData;
}) {
  const [showFilters, setShowFilters] = useState(false);

  // Toggle filters visibility on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <Tabs defaultValue="customers" className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Análisis de clientes</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={toggleFilters}
              >
                <SlidersHorizontal className="mr-2 size-4" />
                {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
              </Button>
              <TabsList>
                <TabsTrigger value="customers">Clientes</TabsTrigger>
                <TabsTrigger value="products" disabled={true}>
                  Productos
                </TabsTrigger>
                <TabsTrigger value="orders" disabled={true}>
                  Ordenes
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          <TabsContent value="customers">
            <div className="flex flex-col gap-4 lg:flex-row">
              {/* Filters on the left - collapsible on mobile */}
              <div
                className={`order-first w-full lg:w-1/4 ${!showFilters ? 'hidden lg:block' : ''}`}
              >
                <Filters />
              </div>

              {/* Main content on the right */}
              <div className="w-full space-y-4 lg:w-3/4">
                <KpiCards data={customerData} />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-8">
                  <Card className="md:col-span-3">
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-lg font-medium">
                        Distribución de clientes por género
                      </h3>
                      <GenderDistributionChart
                        data={
                          customerData.customer_distribution_by_gender || []
                        }
                      />
                    </CardContent>
                  </Card>
                  <Card className="md:col-span-5">
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-lg font-medium">
                        Distribución de clientes por edad
                      </h3>
                      <AgeDistributionChart
                        data={customerData.customer_distribution_by_age || []}
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-lg font-medium">
                        Distribución de clientes por suscripción
                      </h3>
                      <SubscriptionDistributionChart
                        data={
                          customerData.customer_distribution_by_subscription ||
                          []
                        }
                      />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-lg font-medium">
                        Distribución de clientes por frecuencia de compra
                      </h3>
                      <FrequencyDistributionChart
                        data={
                          customerData.customer_distribution_by_frequency || []
                        }
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-lg font-medium">
                        Total de ordenes por categoría
                      </h3>
                      <OrdersByCategoryChart
                        data={
                          customerData.total_orders_by_category_gender || []
                        }
                      />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-lg font-medium">
                        Ventas totales por categoría
                      </h3>
                      <SalesByCategoryChart
                        data={customerData.total_sales_by_category_gender || []}
                      />
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="mb-2 text-lg font-medium">
                      Valor promedio de la orden por categoría
                    </h3>
                    <AvgOrderValueChart
                      data={
                        customerData.avg_order_value_by_category_gender || []
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="products"></TabsContent>
          <TabsContent value="orders"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

```

## src/components/errors/main.tsx
```tsx
export const MainErrorFallback = () => {
  return (
    <div>
      <h2>Something went wrong, please try again.</h2>
      <button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </button>
    </div>
  );
};

```

## src/components/filters.tsx
```tsx
'use client';

import { ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CATEGORIES, FREQUENCIES, GENDERS } from '@/types';
import { translate } from '@/utils/translation';

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state for filters
  const [productCategories, setProductCategories] = useState<
    Record<string, boolean>
  >({});
  const [purchaseFrequencies, setPurchaseFrequencies] = useState<
    Record<string, boolean>
  >({});
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(
    null,
  );
  const [gender, setGender] = useState<string | null>(null);

  // Initialize filters with all unselected
  useEffect(() => {
    setProductCategories(
      Object.fromEntries(Object.values(CATEGORIES).map((cat) => [cat, false])),
    );
    setPurchaseFrequencies(
      Object.fromEntries(
        Object.values(FREQUENCIES).map((freq) => [freq, false]),
      ),
    );
  }, []);

  // Sync URL params to local state
  useEffect(() => {
    const categories = searchParams.getAll('category');
    const frequencies = searchParams.getAll('frequency');
    const subscribed = searchParams.get('subscribed');
    const genderParam = searchParams.get('gender');

    // If no categories/frequencies in URL, all remain unselected
    // If they exist in URL, only those are selected
    setProductCategories(
      Object.fromEntries(
        Object.values(CATEGORIES).map((cat) => [cat, categories.includes(cat)]),
      ),
    );

    setPurchaseFrequencies(
      Object.fromEntries(
        Object.values(FREQUENCIES).map((freq) => [
          freq,
          frequencies.includes(freq),
        ]),
      ),
    );

    // Set subscription status based on URL param
    setSubscriptionStatus(subscribed);

    // Set gender based on URL param
    setGender(genderParam);
  }, [searchParams]);

  // State for collapsible sections
  const [openSections, setOpenSections] = useState({
    category: true,
    frequency: true,
    subscription: true,
    gender: true,
  });

  // Toggle section visibility
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Update URL with new filters
  const updateFilters = (newFilters: {
    categories?: Record<string, boolean>;
    frequencies?: Record<string, boolean>;
    subscription?: string | null;
    gender?: string | null;
  }) => {
    // Update local state first
    if (newFilters.categories) {
      setProductCategories(newFilters.categories);
    }
    if (newFilters.frequencies) {
      setPurchaseFrequencies(newFilters.frequencies);
    }
    if (newFilters.subscription !== undefined) {
      setSubscriptionStatus(newFilters.subscription);
    }
    if (newFilters.gender !== undefined) {
      setGender(newFilters.gender);
    }

    // Then update URL
    const url = new URL(window.location.href);

    // Clear existing params
    Array.from(url.searchParams.keys()).forEach((key) => {
      url.searchParams.delete(key);
    });

    // Add categories - only add selected ones
    const selectedCategories = Object.entries(
      newFilters.categories || productCategories,
    )
      .filter(([_, isSelected]) => isSelected)
      .map(([cat]) => cat);

    selectedCategories.forEach((cat) => {
      url.searchParams.append('category', cat);
    });

    // Add frequencies - only add selected ones
    const selectedFrequencies = Object.entries(
      newFilters.frequencies || purchaseFrequencies,
    )
      .filter(([_, isSelected]) => isSelected)
      .map(([freq]) => freq);

    selectedFrequencies.forEach((freq) => {
      url.searchParams.append('frequency', freq);
    });

    // Add gender - only if not "all"
    const newGender =
      newFilters.gender !== undefined ? newFilters.gender : gender;

    if (newGender && newGender !== 'all') {
      url.searchParams.set('gender', newGender);
    }

    // Add subscription status - only if not "both"
    const newSubscription =
      newFilters.subscription !== undefined
        ? newFilters.subscription
        : subscriptionStatus;

    // Remove debugging console.log
    if (newSubscription && newSubscription !== 'both') {
      // Ensure we're passing the actual boolean value to the API
      url.searchParams.set(
        'subscribed',
        newSubscription === 'true' ? 'true' : 'false',
      );
    }

    router.push(url.pathname + url.search);
  };

  // Reset all filters
  const resetFilters = () => {
    const allUnselected = {
      categories: Object.fromEntries(
        Object.values(CATEGORIES).map((cat) => [cat, false]),
      ),
      frequencies: Object.fromEntries(
        Object.values(FREQUENCIES).map((freq) => [freq, false]),
      ),
    };

    setProductCategories(allUnselected.categories);
    setPurchaseFrequencies(allUnselected.frequencies);
    setSubscriptionStatus(null);
    setGender(null);
    router.push(window.location.pathname);
  };

  return (
    <Card className="sticky top-4 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Filtros</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-8 px-2 text-muted-foreground"
          >
            <RefreshCw className="mr-2 size-3.5" />
            Reiniciar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Subscription Status Filter */}
        <Collapsible
          open={openSections.subscription}
          onOpenChange={() => toggleSection('subscription')}
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between py-1">
            <h3 className="text-sm font-medium">Estado de Suscripción</h3>
            {openSections.subscription ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <RadioGroup
              value={subscriptionStatus || 'both'}
              onValueChange={(value) => {
                updateFilters({
                  subscription: value,
                });
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="subscription-both" />
                <Label htmlFor="subscription-both">Todos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="subscription-yes" />
                <Label htmlFor="subscription-yes">Suscrito</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="subscription-no" />
                <Label htmlFor="subscription-no">No Suscrito</Label>
              </div>
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Gender Filter */}
        <Collapsible
          open={openSections.gender}
          onOpenChange={() => toggleSection('gender')}
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between py-1">
            <h3 className="text-sm font-medium">Género</h3>
            {openSections.gender ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <RadioGroup
              value={gender || 'all'}
              onValueChange={(value) => {
                updateFilters({
                  gender: value === 'all' ? null : value,
                });
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="gender-all" />
                <Label htmlFor="gender-all">Todos</Label>
              </div>
              {Object.values(GENDERS).map((genderOption) => (
                <div key={genderOption} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={genderOption}
                    id={`gender-${genderOption}`}
                  />
                  <Label htmlFor={`gender-${genderOption}`}>
                    {translate.gender(genderOption)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Product Category Filter */}
        <Collapsible
          open={openSections.category}
          onOpenChange={() => toggleSection('category')}
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between py-1">
            <h3 className="text-sm font-medium">Categoría de Producto</h3>
            {openSections.category ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="space-y-2">
              {Object.values(CATEGORIES).map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={productCategories[category]}
                    onCheckedChange={(checked) => {
                      updateFilters({
                        categories: {
                          ...productCategories,
                          [category]: !!checked,
                        },
                      });
                    }}
                  />
                  <Label htmlFor={`category-${category}`}>
                    {translate.category(category)}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Purchase Frequency Filter */}
        <Collapsible
          open={openSections.frequency}
          onOpenChange={() => toggleSection('frequency')}
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between py-1">
            <h3 className="text-sm font-medium">Frecuencia de Compra</h3>
            {openSections.frequency ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="max-h-40 space-y-2 overflow-y-auto pr-2">
              {Object.values(FREQUENCIES).map((frequency) => (
                <div key={frequency} className="flex items-center space-x-2">
                  <Checkbox
                    id={`frequency-${frequency}`}
                    checked={purchaseFrequencies[frequency]}
                    onCheckedChange={(checked) => {
                      updateFilters({
                        frequencies: {
                          ...purchaseFrequencies,
                          [frequency]: !!checked,
                        },
                      });
                    }}
                  />
                  <Label htmlFor={`frequency-${frequency}`}>
                    {translate.frequency(frequency)}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

```

## src/components/kpi-cards.tsx
```tsx
import { Card, CardContent } from '@/components/ui/card';

interface KpiCardsProps {
  data: any;
}

export function KpiCards({ data }: KpiCardsProps) {
  const kpis = [
    {
      title: 'Clientes totales',
      value: data.total_customers.toLocaleString(),
    },
    {
      title: 'Edad Promedio',
      value: data.average_age.toFixed(1),
    },
    {
      title: 'Promedio de ordenes previas',
      value: data.average_previous_purchases.toFixed(1),
    },
    {
      title: 'Porcentaje de suscritos',
      value: `${data.subscription_rate}%`,
    },
    {
      title: 'Ordenes totales',
      value: data.total_orders.toLocaleString(),
    },
    {
      title: 'Ventas totales',
      value: `$${data.total_sales.toLocaleString()}`,
    },
    {
      title: 'Promedio de valor de ordén',
      value: `$${data.average_order_value.toFixed(2)}`,
    },
    {
      title: 'Valoración promedio',
      value: data.average_review_rating.toFixed(1),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="border-purple-200">
          <CardContent className="flex flex-col items-center justify-center p-4 text-center">
            <div className="text-3xl font-bold">{kpi.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">
              {kpi.title}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

```

## src/components/ui/button.tsx
```tsx
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };

```

## src/components/ui/calendar.tsx
```tsx
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/cn';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100',
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn('h-4 w-4', className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn('h-4 w-4', className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };

```

## src/components/ui/card.tsx
```tsx
import * as React from 'react';

import { cn } from '@/utils/cn';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border bg-card text-card-foreground shadow',
      className,
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};

```

## src/components/ui/chart.tsx
```tsx
'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';

import { cn } from '@/utils/cn';

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('w-full h-[350px] flex flex-col', className)}
    {...props}
  />
));
ChartContainer.displayName = 'ChartContainer';

const ChartStyle = ({ id, config }: { id: string; config?: ChartConfig }) => {
  // Add null check for config
  if (!config) return null;

  const colorConfig = Object.entries(config).filter(
    ([_key, itemConfig]) => itemConfig.theme || itemConfig.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join('\n')}
}
`,
          )
          .join('\n'),
      }}
    />
  );
};

const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('border bg-background p-0 shadow-md rounded-md', className)}
    {...props}
  />
));
ChartTooltip.displayName = 'ChartTooltip';

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    content: React.ReactNode;
  }
>(({ className, content, ...props }, ref) => (
  <div ref={ref} className={cn('px-3 py-2', className)} {...props}>
    {content}
  </div>
));
ChartTooltipContent.displayName = 'ChartTooltipContent';

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> &
    Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey },
    ref,
  ) => {
    const { config } = useChart();

    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center gap-4',
          verticalAlign === 'top' ? 'pb-3' : 'pt-3',
          className,
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || 'value'}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={item.value}
              className={cn(
                'flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground',
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="size-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
      </div>
    );
  },
);
ChartLegendContent.displayName = 'ChartLegend';

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  // Add null check for config
  if (!config || typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  const payloadPayload =
    'payload' in payload &&
    typeof payload.payload === 'object' &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === 'string'
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};

```

## src/components/ui/checkbox.tsx
```tsx
'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/utils/cn';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="size-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

```

## src/components/ui/collapsible.tsx
```tsx
'use client';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

```

## src/components/ui/input.tsx
```tsx
import * as React from 'react';

import { cn } from '@/utils/cn';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };

```

## src/components/ui/label.tsx
```tsx
'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils/cn';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

```

## src/components/ui/loader.tsx
```tsx
import { Loader2 } from 'lucide-react';

import { cn } from '@/utils/cn';

export function Loader({ className }: { className?: string }) {
  return <Loader2 className={cn('h-4 w-4 animate-spin', className)} />;
}

```

## src/components/ui/popover.tsx
```tsx
'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

import { cn } from '@/utils/cn';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };

```

## src/components/ui/radio-group.tsx
```tsx
'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/utils/cn';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="size-3.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };

```

## src/components/ui/separator.tsx
```tsx
'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

import { cn } from '@/utils/cn';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };

```

## src/components/ui/sheet.tsx
```tsx
'use client';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/utils/cn';

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};

```

## src/components/ui/sidebar.tsx
```tsx
'use client';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { PanelLeft } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/utils/cn';

const SIDEBAR_COOKIE_NAME = 'sidebar:state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContext = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}

// Remove the duplicate useIsMobile hook definition
// function useIsMobile() { ... } - REMOVE THIS

// Replace the useIsMobile hook with a more robust implementation
// function useIsMobile() {
//   const [isMobile, setIsMobile] = React.useState(false)

//   React.useEffect(() => {
//     // Safe check for window object
//     if (typeof window === 'undefined') return;

//     const checkIsMobile = () => {
//       setIsMobile(window.innerWidth < 768)
//     }

//     // Initial check
//     checkIsMobile()

//     // Add event listener
//     window.addEventListener('resize', checkIsMobile)

//     // Clean up
//     return () => window.removeEventListener('resize', checkIsMobile)
//   }, [])

//   return isMobile
// }

// Update the setOpen callback in SidebarProvider to handle undefined values safely
const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;

    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === 'function' ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        // This sets the cookie to keep the sidebar state.
        if (typeof document !== 'undefined') {
          document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
        }
      },
      [setOpenProp, open],
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? 'expanded' : 'collapsed';

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      ],
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                '--sidebar-width': SIDEBAR_WIDTH,
                '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              'group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar',
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = 'SidebarProvider';

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    side?: 'left' | 'right';
    variant?: 'sidebar' | 'floating' | 'inset';
    collapsible?: 'offcanvas' | 'icon' | 'none';
  }
>(
  (
    {
      side = 'left',
      variant = 'sidebar',
      collapsible = 'offcanvas',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === 'none') {
      return (
        <div
          className={cn(
            'flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground',
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="flex size-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className="group peer hidden text-sidebar-foreground md:block"
        data-state={state}
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            'duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear',
            'group-data-[collapsible=offcanvas]:w-0',
            'group-data-[side=right]:rotate-180',
            variant === 'floating' || variant === 'inset'
              ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
              : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]',
          )}
        />
        <div
          className={cn(
            'duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex',
            side === 'left'
              ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
              : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
            // Adjust the padding for floating and inset variants.
            variant === 'floating' || variant === 'inset'
              ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
              : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l',
            className,
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
Sidebar.displayName = 'Sidebar';

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn('h-7 w-7', className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex',
        '[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className,
      )}
      {...props}
    />
  );
});
SidebarRail.displayName = 'SidebarRail';

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'main'>
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        'relative flex min-h-svh flex-1 flex-col bg-background',
        'peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow',
        className,
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = 'SidebarInset';

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        'h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
        className,
      )}
      {...props}
    />
  );
});
SidebarInput.displayName = 'SidebarInput';

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = 'SidebarHeader';

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = 'SidebarFooter';

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn('mx-2 w-auto bg-sidebar-border', className)}
      {...props}
    />
  );
});
SidebarSeparator.displayName = 'SidebarSeparator';

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className,
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = 'SidebarContent';

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  );
});
SidebarGroup.displayName = 'SidebarGroup';

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        'duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn('w-full text-sm', className)}
    {...props}
  />
));
SidebarGroupContent.displayName = 'SidebarGroupContent';

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn('flex w-full min-w-0 flex-col gap-1', className)}
    {...props}
  />
));
SidebarMenu.displayName = 'SidebarMenu';

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn('group/menu-item relative', className)}
    {...props}
  />
));
SidebarMenuItem.displayName = 'SidebarMenuItem';

const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:!p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = 'default',
      size = 'default',
      tooltip,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const { isMobile, state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === 'string') {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== 'collapsed' || isMobile}
          {...tooltip}
        />
      </Tooltip>
    );
  },
);
SidebarMenuButton.displayName = 'SidebarMenuButton';

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        'absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 after:md:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        showOnHover &&
          'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0',
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = 'SidebarMenuAction';

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      'absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none',
      'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
      'peer-data-[size=sm]/menu-button:top-1',
      'peer-data-[size=default]/menu-button:top-1.5',
      'peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]:hidden',
      className,
    )}
    {...props}
  />
));
SidebarMenuBadge.displayName = 'SidebarMenuBadge';

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn('rounded-md h-8 flex gap-2 px-2 items-center', className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-[--skeleton-width] flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            '--skeleton-width': width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = 'SidebarMenuSkeleton';

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5',
      'group-data-[collapsible=icon]:hidden',
      className,
    )}
    {...props}
  />
));
SidebarMenuSub.displayName = 'SidebarMenuSub';

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem';

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<'a'> & {
    asChild?: boolean;
    size?: 'sm' | 'md';
    isActive?: boolean;
  }
>(({ asChild = false, size = 'md', isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton';

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};

```

## src/components/ui/skeleton.tsx
```tsx
import { cn } from '@/utils/cn';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary/10', className)}
      {...props}
    />
  );
}

export { Skeleton };

```

## src/components/ui/slider.tsx
```tsx
'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/utils/cn';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block size-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

```

## src/components/ui/tabs.tsx
```tsx
'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import { cn } from '@/utils/cn';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

```

## src/components/ui/tooltip.tsx
```tsx
'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/utils/cn';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]',
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

```

## src/config/env.ts
```ts
import * as z from 'zod';
import 'dotenv/config';

const createEnv = () => {
  const EnvSchema = z.object({
    APP_URL: z.string().optional().default('http://localhost:3000'),
    API_URL: z.string(),
  });

  const envVars = {
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  };

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(parsedEnv.error.flatten().fieldErrors)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('\n')}
  `,
    );
  }

  return parsedEnv.data ?? {};
};

export const env = createEnv();

```

## src/config/paths.ts
```ts
export const paths = {
  home: {
    getHref: () => '/',
  },
  customers: {
    getHref: () => '/customers',

    insights: {
      getHref: () => '/customers/insights',
    },
  },
} as const;

```

## src/hooks/use-mobile.tsx
```tsx
'use client';

import { useEffect, useState } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Safe check for window object
    if (typeof window === 'undefined') return;

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIsMobile();

    // Add event listener
    window.addEventListener('resize', checkIsMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}

```

## src/lib/api-client.ts
```ts
import { env } from '@/config/env';

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  cookie?: string;
  params?: Record<
    string,
    string | string[] | number | boolean | undefined | null
  >;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

function buildUrlWithParams(
  url: string,
  params?: RequestOptions['params'],
): string {
  if (!params) return url;

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v));
    } else {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${url}?${queryString}` : url;
}

// function for getting server-side cookies that can be imported where needed
export function getServerCookies() {
  if (typeof window !== 'undefined') return '';

  // Dynamic import next/headers only on server-side
  return import('next/headers').then(({ cookies }) => {
    try {
      const cookieStore = cookies();
      return cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');
    } catch (error) {
      console.error('Failed to access cookies:', error);
      return '';
    }
  });
}

async function fetchApi<T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    cookie,
    params,
    cache = 'no-store',
    next,
  } = options;

  // Get cookies from the request when running on server
  let cookieHeader = cookie;
  if (typeof window === 'undefined' && !cookie) {
    cookieHeader = await getServerCookies();
  }

  const fullUrl = buildUrlWithParams(`${env.API_URL}${url}`, params);

  // TODO: remove in production
  console.log(fullUrl);

  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    // credentials: 'include',
    cache,
    next,
  });

  if (!response.ok) {
    const message = (await response.json()).message || response.statusText;
    throw new Error(message);
  }

  return response.json();
}

export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'GET' });
  },
  post<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'POST', body });
  },
  put<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'PUT', body });
  },
  patch<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'PATCH', body });
  },
  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'DELETE' });
  },
};

```

## src/lib/data.ts
```ts
export const customerData = {
  total_customers: 3900,
  total_orders: 3900,
  total_sales: 233081,
  average_age: 44.1,
  subscription_rate: 27,
  average_previous_purchases: 25.4,
  average_order_value: 59.76,
  average_review_rating: 3.75,
  customer_distribution_by_gender: [
    {
      gender: 'female',
      count: 1248,
    },
    {
      gender: 'male',
      count: 2652,
    },
  ],
  customer_distribution_by_age: [
    {
      age: 18,
      male: 49,
      female: 20,
    },
    {
      age: 19,
      male: 54,
      female: 27,
    },
    {
      age: 20,
      male: 50,
      female: 12,
    },
    {
      age: 21,
      male: 50,
      female: 19,
    },
    {
      age: 22,
      male: 38,
      female: 28,
    },
    {
      age: 23,
      male: 46,
      female: 25,
    },
    {
      age: 24,
      male: 47,
      female: 21,
    },
    {
      age: 25,
      male: 64,
      female: 21,
    },
    {
      age: 26,
      male: 44,
      female: 25,
    },
    {
      age: 27,
      male: 55,
      female: 28,
    },
    {
      age: 28,
      male: 53,
      female: 26,
    },
    {
      age: 29,
      male: 53,
      female: 23,
    },
    {
      age: 30,
      male: 51,
      female: 20,
    },
    {
      age: 31,
      male: 49,
      female: 30,
    },
    {
      age: 32,
      male: 59,
      female: 23,
    },
    {
      age: 33,
      male: 40,
      female: 23,
    },
    {
      age: 34,
      male: 46,
      female: 22,
    },
    {
      age: 35,
      male: 50,
      female: 22,
    },
    {
      age: 36,
      male: 50,
      female: 24,
    },
    {
      age: 37,
      male: 58,
      female: 19,
    },
    {
      age: 38,
      male: 45,
      female: 25,
    },
    {
      age: 39,
      male: 42,
      female: 26,
    },
    {
      age: 40,
      male: 49,
      female: 23,
    },
    {
      age: 41,
      male: 67,
      female: 19,
    },
    {
      age: 42,
      male: 55,
      female: 25,
    },
    {
      age: 43,
      male: 53,
      female: 26,
    },
    {
      age: 44,
      male: 28,
      female: 23,
    },
    {
      age: 45,
      male: 39,
      female: 33,
    },
    {
      age: 46,
      male: 46,
      female: 30,
    },
    {
      age: 47,
      male: 44,
      female: 27,
    },
    {
      age: 48,
      male: 43,
      female: 25,
    },
    {
      age: 49,
      male: 64,
      female: 20,
    },
    {
      age: 50,
      male: 53,
      female: 30,
    },
    {
      age: 51,
      male: 51,
      female: 21,
    },
    {
      age: 52,
      male: 41,
      female: 32,
    },
    {
      age: 53,
      male: 50,
      female: 20,
    },
    {
      age: 54,
      male: 67,
      female: 16,
    },
    {
      age: 55,
      male: 48,
      female: 25,
    },
    {
      age: 56,
      male: 52,
      female: 22,
    },
    {
      age: 57,
      male: 55,
      female: 32,
    },
    {
      age: 58,
      male: 54,
      female: 27,
    },
    {
      age: 59,
      male: 58,
      female: 17,
    },
    {
      age: 60,
      male: 47,
      female: 18,
    },
    {
      age: 61,
      male: 42,
      female: 23,
    },
    {
      age: 62,
      male: 51,
      female: 32,
    },
    {
      age: 63,
      male: 47,
      female: 28,
    },
    {
      age: 64,
      male: 54,
      female: 19,
    },
    {
      age: 65,
      male: 50,
      female: 22,
    },
    {
      age: 66,
      male: 50,
      female: 21,
    },
    {
      age: 67,
      male: 40,
      female: 14,
    },
    {
      age: 68,
      male: 53,
      female: 22,
    },
    {
      age: 69,
      male: 63,
      female: 25,
    },
    {
      age: 70,
      male: 45,
      female: 22,
    },
  ],
  customer_distribution_by_subscription: [
    {
      subscription_status: false,
      male: 1599,
      female: 1248,
    },
    {
      subscription_status: true,
      male: 1053,
      female: 0,
    },
  ],
  customer_distribution_by_frequency: [
    {
      frequency_of_purchases: 'annually',
      male: 387,
      female: 185,
    },
    {
      frequency_of_purchases: 'bi-weekly',
      male: 359,
      female: 188,
    },
    {
      frequency_of_purchases: 'every 3 months',
      male: 398,
      female: 186,
    },
    {
      frequency_of_purchases: 'fortnightly',
      male: 379,
      female: 163,
    },
    {
      frequency_of_purchases: 'monthly',
      male: 368,
      female: 185,
    },
    {
      frequency_of_purchases: 'quarterly',
      male: 394,
      female: 169,
    },
    {
      frequency_of_purchases: 'weekly',
      male: 367,
      female: 172,
    },
  ],
  total_orders_by_category_gender: [
    {
      category: 'accessories',
      male: 848,
      female: 392,
    },
    {
      category: 'clothing',
      male: 1181,
      female: 556,
    },
    {
      category: 'footwear',
      male: 400,
      female: 199,
    },
    {
      category: 'outerwear',
      male: 223,
      female: 101,
    },
  ],
  total_sales_by_category_gender: [
    {
      category: 'accessories',
      male: 50381,
      female: 23819,
    },
    {
      category: 'clothing',
      male: 70628,
      female: 33636,
    },
    {
      category: 'footwear',
      male: 24258,
      female: 11835,
    },
    {
      category: 'outerwear',
      male: 12623,
      female: 5901,
    },
  ],
  avg_order_value_by_category_gender: [
    {
      category: 'accessories',
      male: 59.41,
      female: 60.76,
    },
    {
      category: 'clothing',
      male: 59.8,
      female: 60.5,
    },
    {
      category: 'footwear',
      male: 60.64,
      female: 59.47,
    },
    {
      category: 'outerwear',
      male: 56.61,
      female: 58.43,
    },
  ],
};

```

## src/lib/react-query/index.ts
```ts
import { UseMutationOptions, DefaultOptions } from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    throwOnError: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 1, // Cachear queries por un minuto
  },
} satisfies DefaultOptions;

export type ApiFnReturnType<T extends (...args: any) => Promise<any>> = Awaited<
  ReturnType<T>
>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;

```

## src/lib/schemas.ts
```ts
import { z } from 'zod';

import { GENDERS, FREQUENCIES, CATEGORIES } from '@/types';

export const customerInsightsParamsSchema = z
  .object({
    age_gte: z.coerce.number().min(0).optional(),
    age_lte: z.coerce.number().min(0).optional(),
    gender: z.nativeEnum(GENDERS).optional(),
    // Change this to handle string values properly
    subscribed: z
      .union([
        z.literal('true').transform(() => true),
        z.literal('false').transform(() => false),
        z.boolean(),
      ])
      .optional(),
    frequency: z.array(z.nativeEnum(FREQUENCIES)).optional(),
    category: z.array(z.nativeEnum(CATEGORIES)).optional(),
  })
  .partial();

```

## src/styles/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem
  ;
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%}
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%
  ;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%}
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

## src/testing/mocks/data.json
```json
{
  "total_customers": 3900,
  "total_orders": 3900,
  "total_sales": 233081,
  "average_age": 44.1,
  "subscription_rate": 27,
  "average_previous_purchases": 25.4,
  "average_order_value": 59.76,
  "average_review_rating": 3.75,
  "customer_distribution_by_gender": [
    {
      "gender": "female",
      "count": 1248
    },
    {
      "gender": "male",
      "count": 2652
    }
  ],
  "customer_distribution_by_age": [
    {
      "age": 18,
      "male": 49,
      "female": 20
    },
    {
      "age": 19,
      "male": 54,
      "female": 27
    },
    {
      "age": 20,
      "male": 50,
      "female": 12
    },
    {
      "age": 21,
      "male": 50,
      "female": 19
    },
    {
      "age": 22,
      "male": 38,
      "female": 28
    },
    {
      "age": 23,
      "male": 46,
      "female": 25
    },
    {
      "age": 24,
      "male": 47,
      "female": 21
    },
    {
      "age": 25,
      "male": 64,
      "female": 21
    },
    {
      "age": 26,
      "male": 44,
      "female": 25
    },
    {
      "age": 27,
      "male": 55,
      "female": 28
    },
    {
      "age": 28,
      "male": 53,
      "female": 26
    },
    {
      "age": 29,
      "male": 53,
      "female": 23
    },
    {
      "age": 30,
      "male": 51,
      "female": 20
    },
    {
      "age": 31,
      "male": 49,
      "female": 30
    },
    {
      "age": 32,
      "male": 59,
      "female": 23
    },
    {
      "age": 33,
      "male": 40,
      "female": 23
    },
    {
      "age": 34,
      "male": 46,
      "female": 22
    },
    {
      "age": 35,
      "male": 50,
      "female": 22
    },
    {
      "age": 36,
      "male": 50,
      "female": 24
    },
    {
      "age": 37,
      "male": 58,
      "female": 19
    },
    {
      "age": 38,
      "male": 45,
      "female": 25
    },
    {
      "age": 39,
      "male": 42,
      "female": 26
    },
    {
      "age": 40,
      "male": 49,
      "female": 23
    },
    {
      "age": 41,
      "male": 67,
      "female": 19
    },
    {
      "age": 42,
      "male": 55,
      "female": 25
    },
    {
      "age": 43,
      "male": 53,
      "female": 26
    },
    {
      "age": 44,
      "male": 28,
      "female": 23
    },
    {
      "age": 45,
      "male": 39,
      "female": 33
    },
    {
      "age": 46,
      "male": 46,
      "female": 30
    },
    {
      "age": 47,
      "male": 44,
      "female": 27
    },
    {
      "age": 48,
      "male": 43,
      "female": 25
    },
    {
      "age": 49,
      "male": 64,
      "female": 20
    },
    {
      "age": 50,
      "male": 53,
      "female": 30
    },
    {
      "age": 51,
      "male": 51,
      "female": 21
    },
    {
      "age": 52,
      "male": 41,
      "female": 32
    },
    {
      "age": 53,
      "male": 50,
      "female": 20
    },
    {
      "age": 54,
      "male": 67,
      "female": 16
    },
    {
      "age": 55,
      "male": 48,
      "female": 25
    },
    {
      "age": 56,
      "male": 52,
      "female": 22
    },
    {
      "age": 57,
      "male": 55,
      "female": 32
    },
    {
      "age": 58,
      "male": 54,
      "female": 27
    },
    {
      "age": 59,
      "male": 58,
      "female": 17
    },
    {
      "age": 60,
      "male": 47,
      "female": 18
    },
    {
      "age": 61,
      "male": 42,
      "female": 23
    },
    {
      "age": 62,
      "male": 51,
      "female": 32
    },
    {
      "age": 63,
      "male": 47,
      "female": 28
    },
    {
      "age": 64,
      "male": 54,
      "female": 19
    },
    {
      "age": 65,
      "male": 50,
      "female": 22
    },
    {
      "age": 66,
      "male": 50,
      "female": 21
    },
    {
      "age": 67,
      "male": 40,
      "female": 14
    },
    {
      "age": 68,
      "male": 53,
      "female": 22
    },
    {
      "age": 69,
      "male": 63,
      "female": 25
    },
    {
      "age": 70,
      "male": 45,
      "female": 22
    }
  ],
  "customer_distribution_by_subscription": [
    {
      "subscription_status": false,
      "male": 1599,
      "female": 1248
    },
    {
      "subscription_status": true,
      "male": 1053,
      "female": 0
    }
  ],
  "customer_distribution_by_frequency": [
    {
      "frequency_of_purchases": "annually",
      "male": 387,
      "female": 185
    },
    {
      "frequency_of_purchases": "bi-weekly",
      "male": 359,
      "female": 188
    },
    {
      "frequency_of_purchases": "every 3 months",
      "male": 398,
      "female": 186
    },
    {
      "frequency_of_purchases": "fortnightly",
      "male": 379,
      "female": 163
    },
    {
      "frequency_of_purchases": "monthly",
      "male": 368,
      "female": 185
    },
    {
      "frequency_of_purchases": "quarterly",
      "male": 394,
      "female": 169
    },
    {
      "frequency_of_purchases": "weekly",
      "male": 367,
      "female": 172
    }
  ],
  "total_orders_by_category_gender": [
    {
      "category": "accessories",
      "male": 848,
      "female": 392
    },
    {
      "category": "clothing",
      "male": 1181,
      "female": 556
    },
    {
      "category": "footwear",
      "male": 400,
      "female": 199
    },
    {
      "category": "outerwear",
      "male": 223,
      "female": 101
    }
  ],
  "total_sales_by_category_gender": [
    {
      "category": "accessories",
      "male": 50381,
      "female": 23819
    },
    {
      "category": "clothing",
      "male": 70628,
      "female": 33636
    },
    {
      "category": "footwear",
      "male": 24258,
      "female": 11835
    },
    {
      "category": "outerwear",
      "male": 12623,
      "female": 5901
    }
  ],
  "avg_order_value_by_category_gender": [
    {
      "category": "accessories",
      "male": 59.41,
      "female": 60.76
    },
    {
      "category": "clothing",
      "male": 59.8,
      "female": 60.5
    },
    {
      "category": "footwear",
      "male": 60.64,
      "female": 59.47
    },
    {
      "category": "outerwear",
      "male": 56.61,
      "female": 58.43
    }
  ]
}
```

## src/testing/setup-tests.ts
```ts
import '@testing-library/jest-dom/vitest';
import { beforeAll, vi, beforeEach } from 'vitest';
import failOnConsole from 'vitest-fail-on-console';

failOnConsole({
  shouldFailOnDebug: true,
  shouldFailOnError: true,
  shouldFailOnInfo: true,
  shouldFailOnLog: true,
  shouldFailOnWarn: true,
});

beforeAll(() => {
  vi.mock('next/navigation', async () => {
    const actual = await vi.importActual('next/navigation');
    return {
      ...actual,
      useRouter: () => {
        return {
          back: vi.fn(),
          push: vi.fn(),
          replace: vi.fn(),
        };
      },
      usePathname: () => '/app',
      useSearchParams: () => ({
        get: vi.fn(),
      }),
    };
  });
});

beforeEach(() => {
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  vi.stubGlobal('ResizeObserver', ResizeObserverMock);

  window.btoa = (str: string) => Buffer.from(str, 'binary').toString('base64');
  window.atob = (str: string) => Buffer.from(str, 'base64').toString('binary');
});

```

## src/types/index.ts
```ts
export const GENDERS = {
  MALE: 'male',
  FEMALE: 'female',
  UNKNOWN: 'unknown',
} as const;

export type Gender = (typeof GENDERS)[keyof typeof GENDERS];

export const FREQUENCIES = {
  ANNUALLY: 'annually',
  BI_WEEKLY: 'bi-weekly',
  EVERY_3_MONTHS: 'every 3 months',
  FORTNIGHTLY: 'fortnightly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  WEEKLY: 'weekly',
  UNKNOWN: 'unknown',
} as const;

export type Frequency = (typeof FREQUENCIES)[keyof typeof FREQUENCIES];

export const CATEGORIES = {
  ACCESSORIES: 'accessories',
  CLOTHING: 'clothing',
  FOOTWEAR: 'footwear',
  OUTERWEAR: 'outerwear',
  OTHER: 'other',
} as const;

export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];

// Update interfaces to use the new types
export interface GenderDistribution {
  gender: Gender;
  count: number;
}

export interface AgeDistribution {
  age: number;
  male: number;
  female: number;
}

export interface SubscriptionDistribution {
  subscription_status: boolean;
  male: number;
  female: number;
}

export interface FrequencyDistribution {
  frequency_of_purchases: Frequency;
  male: number;
  female: number;
}

export interface CategoryDistribution {
  category: Category;
  male: number;
  female: number;
}

export interface CustomerInsightsData {
  total_customers: number;
  total_orders: number;
  total_sales: number;
  average_age: number;
  subscription_rate: number;
  average_previous_purchases: number;
  average_order_value: number;
  average_review_rating: number;
  customer_distribution_by_gender: GenderDistribution[];
  customer_distribution_by_age: AgeDistribution[];
  customer_distribution_by_subscription: SubscriptionDistribution[];
  customer_distribution_by_frequency: FrequencyDistribution[];
  total_orders_by_category_gender: CategoryDistribution[];
  total_sales_by_category_gender: CategoryDistribution[];
  avg_order_value_by_category_gender: CategoryDistribution[];
}

```

## src/utils/cn.ts
```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

```

## src/utils/text.ts
```ts
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toTitle = (str: string): string => {
  return str.toLowerCase().split(' ').map(capitalize).join(' ');
};

export const toSlug = (str: string): string => {
  return str
    .normalize('NFD') // Normalize and remove accents
    .replace(/[\u0300-\u036f]/g, '') // Strip diacritics (accents)
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Ensure single hyphens only
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

```

## src/utils/translation.ts
```ts
import { GENDERS, FREQUENCIES, CATEGORIES } from '@/types';

export const translate = {
  category: (category: string): string =>
    ({
      [CATEGORIES.ACCESSORIES]: 'Accesorios',
      [CATEGORIES.CLOTHING]: 'Ropa',
      [CATEGORIES.FOOTWEAR]: 'Calzado',
      [CATEGORIES.OUTERWEAR]: 'Abrigo',
      [CATEGORIES.OTHER]: 'Otra',
    })[category] || category,

  gender: (gender: string): string =>
    ({
      [GENDERS.MALE]: 'Masculino',
      [GENDERS.FEMALE]: 'Femenino',
      [GENDERS.UNKNOWN]: 'Desconocido',
    })[gender] || gender,

  frequency: (frequency: string): string =>
    ({
      [FREQUENCIES.ANNUALLY]: 'Anualmente',
      [FREQUENCIES.BI_WEEKLY]: 'Cada 2 semanas',
      [FREQUENCIES.EVERY_3_MONTHS]: 'Cada 3 meses',
      [FREQUENCIES.FORTNIGHTLY]: 'Cada 15 días',
      [FREQUENCIES.MONTHLY]: 'Mensual',
      [FREQUENCIES.QUARTERLY]: 'Trimestral',
      [FREQUENCIES.WEEKLY]: 'Semanal',
      [FREQUENCIES.UNKNOWN]: 'Desconocida',
    })[frequency] || frequency,
};

```

## tailwind.config.ts
```ts
import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Add custom colors for the dashboard
        purple: {
          200: '#d8b4fe',
          500: '#8884d8',
        },
        teal: {
          500: '#4ecdc4',
        },
        pink: {
          500: '#ff6b81',
        },
        // Sidebar variables
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background, var(--background)))',
          foreground: 'hsl(var(--sidebar-foreground, var(--foreground)))',
          primary: 'hsl(var(--sidebar-primary, var(--primary)))',
          'primary-foreground':
            'hsl(var(--sidebar-primary-foreground, var(--primary-foreground)))',
          accent: 'hsl(var(--sidebar-accent, var(--muted)))',
          'accent-foreground':
            'hsl(var(--sidebar-accent-foreground, var(--muted-foreground)))',
          border: 'hsl(var(--sidebar-border, var(--border)))',
          ring: 'hsl(var(--sidebar-ring, var(--ring)))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;

```

## tsconfig.json
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "target": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

## vitest.config.ts
```ts
/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

dotenv.config({ path: '.env.test' });

export default defineConfig({
  base: './',
  plugins: [react(), viteTsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testing/setup-tests.ts',
    exclude: ['**/node_modules/**', '**/e2e/**'],
    coverage: {
      include: ['tests/**'],
    },
  },
});

```

