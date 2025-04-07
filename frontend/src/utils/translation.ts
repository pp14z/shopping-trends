import { GENDERS, FREQUENCIES, CATEGORIES } from '@/types';

export const translate = {
  category: (category: string): string =>
    ({
      [CATEGORIES.ACCESSORIES]: 'Accesorios',
      [CATEGORIES.CLOTHING]: 'Ropa',
      [CATEGORIES.FOOTWEAR]: 'Calzado',
      [CATEGORIES.OUTERWEAR]: 'Abrigo',
      [CATEGORIES.OTHER]: 'Otra',
    })[category] || category,

  gender: (gender: string): string =>
    ({
      [GENDERS.MALE]: 'Masculino',
      [GENDERS.FEMALE]: 'Femenino',
      [GENDERS.UNKNOWN]: 'Desconocido',
    })[gender] || gender,

  frequency: (frequency: string): string =>
    ({
      [FREQUENCIES.ANNUALLY]: 'Anualmente',
      [FREQUENCIES.BI_WEEKLY]: 'Cada 2 semanas',
      [FREQUENCIES.EVERY_3_MONTHS]: 'Cada 3 meses',
      [FREQUENCIES.FORTNIGHTLY]: 'Cada 15 días',
      [FREQUENCIES.MONTHLY]: 'Mensual',
      [FREQUENCIES.QUARTERLY]: 'Trimestral',
      [FREQUENCIES.WEEKLY]: 'Semanal',
      [FREQUENCIES.UNKNOWN]: 'Desconocida',
    })[frequency] || frequency,
};
