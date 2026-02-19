import Fuse from 'fuse.js';
import type { Lead, Property } from '@/types/database';

export function fuseSearch<T extends { id: string }>(
  data: T[],
  keys: (keyof T)[]
): Fuse<T> {
  return new Fuse(data, {
    keys: keys as string[],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 1,
  });
}

export function searchLeads(leads: Lead[], query: string): Lead[] {
  if (!query.trim()) return leads;

  const fuse = fuseSearch(leads, ['first_name', 'last_name', 'email', 'phone', 'notes']);
  return fuse.search(query).map((result) => result.item);
}

export function searchProperties(properties: Property[], query: string): Property[] {
  if (!query.trim()) return properties;

  const fuse = fuseSearch(properties, ['address', 'city', 'state', 'description']);
  return fuse.search(query).map((result) => result.item);
}
