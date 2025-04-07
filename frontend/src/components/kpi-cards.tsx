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
