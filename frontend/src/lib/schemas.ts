import { z } from 'zod';

import { GENDERS, FREQUENCIES, CATEGORIES } from '@/types';

export const customerInsightsParamsSchema = z
  .object({
    age_gte: z.coerce.number().min(0).optional(),
    age_lte: z.coerce.number().min(0).optional(),
    gender: z.nativeEnum(GENDERS).optional(),
    subscribed: z.coerce.boolean().optional(),
    frequency: z.array(z.nativeEnum(FREQUENCIES)).optional(),
    category: z.array(z.nativeEnum(CATEGORIES)).optional(),
  })
  .partial();
