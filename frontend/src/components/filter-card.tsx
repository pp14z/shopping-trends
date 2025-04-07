'use client';

import { ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { useState } from 'react';

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

interface FilterCardProps {
  filters: {
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
  };
  onFilterChange: (filters: any) => void;
  purchaseFrequencies: string[];
  productCategories: string[];
}

export function FilterCard({
  filters,
  onFilterChange,
  purchaseFrequencies,
  productCategories,
}: FilterCardProps) {
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

  // Format frequency labels for better display
  const formatFrequency = (frequency: string) => {
    return frequency
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Format category names for better display
  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Reset all filters
  const resetFilters = () => {
    onFilterChange({
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
        purchaseFrequencies.map((freq) => [freq, true]),
      ),
      productCategory: Object.fromEntries(
        productCategories.map((category) => [category, true]),
      ),
    });
  };

  return (
    <Card className="sticky top-4 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-8 px-2 text-muted-foreground"
          >
            <RefreshCw className="mr-2 size-3.5" />
            Reset
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
            <h3 className="text-sm font-medium">Age Range</h3>
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
                onValueChange={(value) =>
                  onFilterChange({ ageRange: value as [number, number] })
                }
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
            <h3 className="text-sm font-medium">Gender</h3>
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
                  onCheckedChange={(checked) =>
                    onFilterChange({
                      gender: { ...filters.gender, male: !!checked },
                    })
                  }
                />
                <Label htmlFor="gender-male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gender-female"
                  checked={filters.gender.female}
                  onCheckedChange={(checked) =>
                    onFilterChange({
                      gender: { ...filters.gender, female: !!checked },
                    })
                  }
                />
                <Label htmlFor="gender-female">Female</Label>
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
            <h3 className="text-sm font-medium">Subscription Status</h3>
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
                  onCheckedChange={(checked) =>
                    onFilterChange({
                      subscribed: { ...filters.subscribed, yes: !!checked },
                    })
                  }
                />
                <Label htmlFor="subscribed-yes">Subscribed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="subscribed-no"
                  checked={filters.subscribed.no}
                  onCheckedChange={(checked) =>
                    onFilterChange({
                      subscribed: { ...filters.subscribed, no: !!checked },
                    })
                  }
                />
                <Label htmlFor="subscribed-no">Not Subscribed</Label>
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
            <h3 className="text-sm font-medium">Purchase Frequency</h3>
            {openSections.frequency ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="max-h-40 space-y-2 overflow-y-auto pr-2">
              {purchaseFrequencies.map((frequency) => (
                <div key={frequency} className="flex items-center space-x-2">
                  <Checkbox
                    id={`frequency-${frequency}`}
                    checked={filters.purchaseFrequency[frequency] || false}
                    onCheckedChange={(checked) => {
                      const newFrequencies = { ...filters.purchaseFrequency };
                      newFrequencies[frequency] = !!checked;
                      onFilterChange({ purchaseFrequency: newFrequencies });
                    }}
                  />
                  <Label htmlFor={`frequency-${frequency}`}>
                    {formatFrequency(frequency)}
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
            <h3 className="text-sm font-medium">Product Category</h3>
            {openSections.category ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="space-y-2">
              {productCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.productCategory[category] || false}
                    onCheckedChange={(checked) => {
                      const newCategories = { ...filters.productCategory };
                      newCategories[category] = !!checked;
                      onFilterChange({ productCategory: newCategories });
                    }}
                  />
                  <Label htmlFor={`category-${category}`}>
                    {formatCategory(category)}
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
