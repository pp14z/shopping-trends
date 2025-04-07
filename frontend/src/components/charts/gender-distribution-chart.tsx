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

interface GenderDistributionChartProps {
  data: Array<{ gender: string; count: number }>;
}

export function GenderDistributionChart({
  data,
}: GenderDistributionChartProps) {
  // Calculate percentages
  const total = data.reduce((acc, item) => acc + item.count, 0);
  const chartData = data.map((item) => ({
    name: item.gender.charAt(0).toUpperCase() + item.gender.slice(1),
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
            label={({ name, percentage }) => `${name} (${percentage}%)`}
          >
            {chartData.map((entry, index) => (
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
                            Count: {payload[0].value}
                          </div>
                          <div className="text-sm">
                            Percentage: {payload[0].payload.percentage}%
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
