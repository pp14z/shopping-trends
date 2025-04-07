export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toTitle = (str: string): string => {
  return str.toLowerCase().split(' ').map(capitalize).join(' ');
};

export const toSlug = (str: string): string => {
  return str
    .normalize('NFD') // Normalize and remove accents
    .replace(/[\u0300-\u036f]/g, '') // Strip diacritics (accents)
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Ensure single hyphens only
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};
