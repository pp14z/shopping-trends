export const GENDERS = {
  MALE: 'male',
  FEMALE: 'female',
  UNKNOWN: 'unknown',
} as const;

export type Gender = (typeof GENDERS)[keyof typeof GENDERS];

export const FREQUENCIES = {
  ANNUALLY: 'annually',
  BI_WEEKLY: 'bi-weekly',
  EVERY_3_MONTHS: 'every 3 months',
  FORTNIGHTLY: 'fortnightly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  WEEKLY: 'weekly',
  UNKNOWN: 'unknown',
} as const;

export type Frequency = (typeof FREQUENCIES)[keyof typeof FREQUENCIES];

export const CATEGORIES = {
  ACCESSORIES: 'accessories',
  CLOTHING: 'clothing',
  FOOTWEAR: 'footwear',
  OUTERWEAR: 'outerwear',
  OTHER: 'other',
} as const;

export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];

// Update interfaces to use the new types
export interface GenderDistribution {
  gender: Gender;
  count: number;
}

export interface AgeDistribution {
  age: number;
  male: number;
  female: number;
}

export interface SubscriptionDistribution {
  subscription_status: boolean;
  male: number;
  female: number;
}

export interface FrequencyDistribution {
  frequency_of_purchases: Frequency;
  male: number;
  female: number;
}

export interface CategoryDistribution {
  category: Category;
  male: number;
  female: number;
}

export interface CustomerInsightsData {
  total_customers: number;
  total_orders: number;
  total_sales: number;
  average_age: number;
  subscription_rate: number;
  average_previous_purchases: number;
  average_order_value: number;
  average_review_rating: number;
  customer_distribution_by_gender: GenderDistribution[];
  customer_distribution_by_age: AgeDistribution[];
  customer_distribution_by_subscription: SubscriptionDistribution[];
  customer_distribution_by_frequency: FrequencyDistribution[];
  total_orders_by_category_gender: CategoryDistribution[];
  total_sales_by_category_gender: CategoryDistribution[];
  avg_order_value_by_category_gender: CategoryDistribution[];
}
