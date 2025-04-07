import { Card, CardContent } from '@/components/ui/card';

interface KpiCardsProps {
  data: any;
}

export function KpiCards({ data }: KpiCardsProps) {
  const kpis = [
    {
      title: 'Total Customers',
      value: data.total_customers.toLocaleString(),
      icon: '👥',
    },
    {
      title: 'Total Orders',
      value: data.total_orders.toLocaleString(),
      icon: '📦',
    },
    {
      title: 'Total Sales',
      value: `$${data.total_sales.toLocaleString()}`,
      icon: '💰',
    },
    {
      title: 'Average Age',
      value: data.average_age.toFixed(1),
      icon: '👤',
    },
    {
      title: 'Subscription Rate',
      value: `${data.subscription_rate}%`,
      icon: '🔄',
    },
    {
      title: 'Avg Previous Purchases',
      value: data.average_previous_purchases.toFixed(1),
      icon: '🛒',
    },
    {
      title: 'Avg Order Value',
      value: `$${data.average_order_value.toFixed(2)}`,
      icon: '💵',
    },
    {
      title: 'Avg Review Rating',
      value: data.average_review_rating.toFixed(1),
      icon: '⭐',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="border-purple-200">
          <CardContent className="flex flex-col items-center justify-center p-4 text-center">
            <div className="text-3xl font-bold">{kpi.value}</div>
            <div className="text-muted-foreground mt-1 text-sm">
              {kpi.title}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
