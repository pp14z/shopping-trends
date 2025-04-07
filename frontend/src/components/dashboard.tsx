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
import { FilterCard } from '@/components/filter-card';
import { KpiCards } from '@/components/kpi-cards';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { customerData } from '@/lib/data';

// Define filter state interface
interface FilterState {
  ageRange: [number, number];
  gender: {
    male: boolean;
    female: boolean;
  };
  subscribed: {
    yes: boolean;
    no: boolean;
  };
  purchaseFrequency: Record<string, boolean>;
  productCategory: Record<string, boolean>;
}

export default function Dashboard() {
  // State for filter visibility on mobile
  const [showFilters, setShowFilters] = useState(false);

  // Get product categories from data
  const productCategories = Array.from(
    new Set(
      customerData.total_orders_by_category_gender.map((item) => item.category),
    ),
  );

  // Initialize filters with all options selected
  const [filters, setFilters] = useState<FilterState>({
    ageRange: [18, 70],
    gender: {
      male: true,
      female: true,
    },
    subscribed: {
      yes: true,
      no: true,
    },
    purchaseFrequency: {
      weekly: true,
      'bi-weekly': true,
      fortnightly: true,
      monthly: true,
      'every 3 months': true,
      quarterly: true,
      annually: true,
    },
    productCategory: Object.fromEntries(
      productCategories.map((category) => [category, true]),
    ),
  });

  // Get unique purchase frequencies from data
  const purchaseFrequencies = Array.from(
    new Set(
      customerData.customer_distribution_by_frequency.map(
        (item) => item.frequency_of_purchases,
      ),
    ),
  );

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  // Toggle filters visibility on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <Tabs defaultValue="dashboard" className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Customer Insights Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={toggleFilters}
              >
                <SlidersHorizontal className="mr-2 size-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>
          </div>
          <TabsContent value="dashboard">
            <div className="flex flex-col gap-4 lg:flex-row">
              {/* Filters on the left - collapsible on mobile */}
              <div
                className={`order-first w-full lg:w-1/4 ${!showFilters ? 'hidden lg:block' : ''}`}
              >
                <FilterCard
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  purchaseFrequencies={purchaseFrequencies}
                  productCategories={productCategories}
                />
              </div>

              {/* Main content on the right */}
              <div className="w-full space-y-4 lg:w-3/4">
                <KpiCards data={customerData} />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-lg font-medium">
                        Customer Distribution by Gender
                      </h3>
                      <GenderDistributionChart
                        data={
                          customerData.customer_distribution_by_gender || []
                        }
                      />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-lg font-medium">
                        Customer Distribution by Age
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
                        Customer Distribution by Subscription
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
                        Customer Distribution by Purchase Frequency
                      </h3>
                      <FrequencyDistributionChart
                        data={
                          customerData.customer_distribution_by_frequency || []
                        }
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* New charts */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-lg font-medium">
                        Total Orders by Category
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
                        Total Sales by Category
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
                      Average Order Value by Category
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
          <TabsContent value="reports">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium">Reports</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  View and export detailed reports here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium">Settings</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Configure dashboard settings here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
