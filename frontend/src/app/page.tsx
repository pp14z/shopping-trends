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
