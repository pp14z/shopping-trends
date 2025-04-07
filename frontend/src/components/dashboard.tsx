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
