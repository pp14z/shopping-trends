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
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { CATEGORIES, FREQUENCIES } from '@/types';
import { translate } from '@/utils/translation';

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state for filters
  const [filters, setFilters] = useState({
    ageRange: [18, 70] as [number, number],
    gender: {
      male: true,
      female: true,
    },
    subscribed: {
      yes: true,
      no: true,
    },
    purchaseFrequency: {} as Record<string, boolean>,
    productCategory: {} as Record<string, boolean>,
  });

  // Initialize frequency and category filters using constants from types
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      purchaseFrequency: Object.fromEntries(
        Object.values(FREQUENCIES).map((freq) => [freq, true]),
      ),
      productCategory: Object.fromEntries(
        Object.values(CATEGORIES).map((cat) => [cat, true]),
      ),
    }));
  }, []);

  // Sync URL params to local state
  useEffect(() => {
    const ageMin = searchParams.get('age_gte')
      ? parseInt(searchParams.get('age_gte')!)
      : 18;
    const ageMax = searchParams.get('age_lte')
      ? parseInt(searchParams.get('age_lte')!)
      : 70;
    const gender = searchParams.get('gender') || '';
    const subscribed = searchParams.get('subscribed') || '';
    const frequencies = searchParams.getAll('frequency');
    const categories = searchParams.getAll('category');

    setFilters((prev) => ({
      ...prev,
      ageRange: [ageMin, ageMax],
      gender: {
        male: gender === 'male' || gender === '',
        female: gender === 'female' || gender === '',
      },
      subscribed: {
        yes: subscribed === 'true' || subscribed === '',
        no: subscribed === 'false' || subscribed === '',
      },
      purchaseFrequency: Object.fromEntries(
        Object.values(FREQUENCIES).map((freq) => [
          freq,
          frequencies.includes(freq) || frequencies.length === 0,
        ]),
      ),
      productCategory: Object.fromEntries(
        Object.values(CATEGORIES).map((cat) => [
          cat,
          categories.includes(cat) || categories.length === 0,
        ]),
      ),
    }));
  }, [searchParams]);

  // State for collapsible sections
  const [openSections, setOpenSections] = useState({
    age: true,
    gender: true,
    subscription: true,
    frequency: true,
    category: true,
  });

  // Toggle section visibility
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Update URL with new filters
  const updateFilters = (newFilters: Partial<typeof filters>) => {
    // Update local state first
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    // Then update URL
    const url = new URL(window.location.href);

    // Clear existing params
    Array.from(url.searchParams.keys()).forEach((key) => {
      url.searchParams.delete(key);
    });

    // Add age range
    url.searchParams.set('age_gte', updatedFilters.ageRange[0].toString());
    url.searchParams.set('age_lte', updatedFilters.ageRange[1].toString());

    // Add gender
    if (updatedFilters.gender.male && !updatedFilters.gender.female) {
      url.searchParams.set('gender', 'male');
    } else if (!updatedFilters.gender.male && updatedFilters.gender.female) {
      url.searchParams.set('gender', 'female');
    }

    // Add subscription
    if (updatedFilters.subscribed.yes && !updatedFilters.subscribed.no) {
      url.searchParams.set('subscribed', 'true');
    } else if (!updatedFilters.subscribed.yes && updatedFilters.subscribed.no) {
      url.searchParams.set('subscribed', 'false');
    }

    // Add frequencies
    Object.entries(updatedFilters.purchaseFrequency).forEach(
      ([freq, isSelected]) => {
        if (
          isSelected &&
          !Object.values(updatedFilters.purchaseFrequency).every((v) => v)
        ) {
          url.searchParams.append('frequency', freq);
        }
      },
    );

    // Add categories
    Object.entries(updatedFilters.productCategory).forEach(
      ([cat, isSelected]) => {
        if (
          isSelected &&
          !Object.values(updatedFilters.productCategory).every((v) => v)
        ) {
          url.searchParams.append('category', cat);
        }
      },
    );

    router.push(url.pathname + url.search);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      ageRange: [18, 70],
      gender: {
        male: true,
        female: true,
      },
      subscribed: {
        yes: true,
        no: true,
      },
      purchaseFrequency: Object.fromEntries(
        Object.values(FREQUENCIES).map((freq) => [freq, true]),
      ),
      productCategory: Object.fromEntries(
        Object.values(CATEGORIES).map((cat) => [cat, true]),
      ),
    });
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
        {/* Age Range Filter */}
        <Collapsible
          open={openSections.age}
          onOpenChange={() => toggleSection('age')}
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between py-1">
            <h3 className="text-sm font-medium">Rango de Edad</h3>
            {openSections.age ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="space-y-4">
              <Slider
                value={filters.ageRange}
                min={18}
                max={70}
                step={1}
                onValueChange={(value) => {
                  updateFilters({
                    ageRange: value as [number, number],
                  });
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{filters.ageRange[0]}</span>
                <span>{filters.ageRange[1]}</span>
              </div>
            </div>
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
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gender-male"
                  checked={filters.gender.male}
                  onCheckedChange={(checked) => {
                    updateFilters({
                      gender: {
                        ...filters.gender,
                        male: !!checked,
                      },
                    });
                  }}
                />
                <Label htmlFor="gender-male">Masculino</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gender-female"
                  checked={filters.gender.female}
                  onCheckedChange={(checked) => {
                    updateFilters({
                      gender: {
                        ...filters.gender,
                        female: !!checked,
                      },
                    });
                  }}
                />
                <Label htmlFor="gender-female">Femenino</Label>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Subscription Filter */}
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
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="subscribed-yes"
                  checked={filters.subscribed.yes}
                  onCheckedChange={(checked) => {
                    updateFilters({
                      subscribed: {
                        ...filters.subscribed,
                        yes: !!checked,
                      },
                    });
                  }}
                />
                <Label htmlFor="subscribed-yes">Suscrito</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="subscribed-no"
                  checked={filters.subscribed.no}
                  onCheckedChange={(checked) => {
                    updateFilters({
                      subscribed: {
                        ...filters.subscribed,
                        no: !!checked,
                      },
                    });
                  }}
                />
                <Label htmlFor="subscribed-no">No Suscrito</Label>
              </div>
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
                    checked={filters.purchaseFrequency[frequency]}
                    onCheckedChange={(checked) => {
                      updateFilters({
                        purchaseFrequency: {
                          ...filters.purchaseFrequency,
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
                    checked={filters.productCategory[category]}
                    onCheckedChange={(checked) => {
                      updateFilters({
                        productCategory: {
                          ...filters.productCategory,
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
      </CardContent>
    </Card>
  );
}
