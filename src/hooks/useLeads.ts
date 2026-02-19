'use client';

import { useMemo } from 'react';
import { useSupabaseQuery } from './useSupabaseQuery';
import type { Lead } from '@/types/database';
import { useLeadStore } from '@/stores/leadStore';
import { searchLeads } from '@/lib/search';

export function useLeads() {
  const { data: leads, loading, error, fetchData, insert, update, remove } = useSupabaseQuery<Lead>('leads', {
    immediate: true,
  });

  const { filters } = useLeadStore();

  const filteredLeads = useMemo(() => {
    let result = leads;

    if (filters.status) {
      result = result.filter((lead) => lead.status === filters.status);
    }

    if (filters.userId) {
      result = result.filter((lead) => lead.user_id === filters.userId);
    }

    if (filters.search) {
      result = searchLeads(result, filters.search);
    }

    return result;
  }, [leads, filters]);

  return {
    leads: filteredLeads,
    allLeads: leads,
    loading,
    error,
    fetchData,
    insert,
    update,
    remove,
  };
}
