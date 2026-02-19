'use client';

import { useMemo } from 'react';
import { useSupabaseQuery } from './useSupabaseQuery';
import type { Property } from '@/types/database';
import { usePropertyStore } from '@/stores/propertyStore';
import { searchProperties } from '@/lib/search';

export function useProperties() {
  const { data: properties, loading, error, fetchData, insert, update, remove } = useSupabaseQuery<Property>('properties', {
    immediate: true,
  });

  const { filters } = usePropertyStore();

  const filteredProperties = useMemo(() => {
    let result = properties;

    if (filters.status) {
      result = result.filter((prop) => prop.status === filters.status);
    }

    if (filters.type) {
      result = result.filter((prop) => prop.property_type === filters.type);
    }

    if (filters.city) {
      result = result.filter((prop) => prop.city?.toLowerCase().includes(filters.city!.toLowerCase()));
    }

    if (filters.minPrice) {
      result = result.filter((prop) => prop.price && prop.price >= filters.minPrice!);
    }

    if (filters.maxPrice) {
      result = result.filter((prop) => prop.price && prop.price <= filters.maxPrice!);
    }

    if (filters.search) {
      result = searchProperties(result, filters.search);
    }

    return result;
  }, [properties, filters]);

  return {
    properties: filteredProperties,
    allProperties: properties,
    loading,
    error,
    fetchData,
    insert,
    update,
    remove,
  };
}
