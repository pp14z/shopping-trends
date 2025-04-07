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
