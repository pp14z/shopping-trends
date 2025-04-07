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
