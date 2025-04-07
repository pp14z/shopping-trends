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
            className="text-muted-foreground h-8 px-2"
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
              <ChevronUp className="text-muted-foreground size-4" />
            ) : (
              <ChevronDown className="text-muted-foreground size-4" />
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
              <ChevronUp className="text-muted-foreground size-4" />
            ) : (
              <ChevronDown className="text-muted-foreground size-4" />
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
              <ChevronUp className="text-muted-foreground size-4" />
            ) : (
              <ChevronDown className="text-muted-foreground size-4" />
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
              <ChevronUp className="text-muted-foreground size-4" />
            ) : (
              <ChevronDown className="text-muted-foreground size-4" />
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
