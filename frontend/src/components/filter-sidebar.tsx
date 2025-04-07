'use client';

import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Slider } from '@/components/ui/slider';

export function FilterSidebar() {
  const [filters, setFilters] = useState({
    productCategories: ['Beauty', 'Clothing', 'Electronics'],
    dateRange: { start: new Date('2023-01-01'), end: new Date('2024-01-01') },
    genders: ['Female', 'Male'],
    quantities: [1, 2, 3, 4],
    ageRange: { min: 18, max: 64 },
  });
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleProductCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        productCategories: [...(filters.productCategories || []), category],
      });
    } else {
      setFilters({
        ...filters,
        productCategories: (filters.productCategories || []).filter(
          (c) => c !== category,
        ),
      });
    }
  };

  const handleGenderChange = (gender: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        genders: [...(filters.genders || []), gender],
      });
    } else {
      setFilters({
        ...filters,
        genders: (filters.genders || []).filter((g) => g !== gender),
      });
    }
  };

  const handleQuantityChange = (quantity: number, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        quantities: [...(filters.quantities || []), quantity],
      });
    } else {
      setFilters({
        ...filters,
        quantities: (filters.quantities || []).filter((q) => q !== quantity),
      });
    }
  };

  const handleAgeRangeChange = (values: number[]) => {
    setFilters({
      ...filters,
      ageRange: { min: values[0], max: values[1] },
    });
  };

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r">
      <SidebarHeader className="border-b">
        <h2 className="px-4 py-2 text-lg font-semibold">Filters</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Product Category</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2">
              {['Beauty', 'Clothing', 'Electronics'].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.productCategories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleProductCategoryChange(category, checked as boolean)
                    }
                  />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Date</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 size-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Gender</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2">
              {['Female', 'Male'].map((gender) => (
                <div key={gender} className="flex items-center space-x-2">
                  <Checkbox
                    id={`gender-${gender}`}
                    checked={filters.genders.includes(gender)}
                    onCheckedChange={(checked) =>
                      handleGenderChange(gender, checked as boolean)
                    }
                  />
                  <Label htmlFor={`gender-${gender}`}>{gender}</Label>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quantity</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((quantity) => (
                <div key={quantity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`quantity-${quantity}`}
                    checked={filters.quantities.includes(quantity)}
                    onCheckedChange={(checked) =>
                      handleQuantityChange(quantity, checked as boolean)
                    }
                  />
                  <Label htmlFor={`quantity-${quantity}`}>{quantity}</Label>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Age</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-4 px-1">
              <Slider
                defaultValue={[filters.ageRange.min, filters.ageRange.max]}
                max={64}
                min={18}
                step={1}
                onValueChange={handleAgeRangeChange}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{filters.ageRange.min}</span>
                <span>{filters.ageRange.max}</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
