import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useCallback } from 'react';

export interface AIInsight {
  id: string;
  message: string;
  type: 'trend' | 'alert' | 'correlation';
  severity: 'info' | 'warning' | 'success';
  indicatorId: string;
  date: string;
}

interface UseAIInsightsParams {
  enabled?: boolean;
}

async function fetchEconomicInsights(): Promise<AIInsight[]> {
  const { data, error } = await supabase
    .from('economic_insights')
    .select('*')
    .order('reference_date', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error loading economic insights:', error);
    return [];
  }

  return (data || []).map((row) => ({
    id: String(row.id),
    message: row.description || row.title || '',
    type: (row.insight_type as AIInsight['type']) || 'trend',
    severity: (row.severity as AIInsight['severity']) || 'info',
    indicatorId: row.indicator || 'general',
    date: row.reference_date || new Date().toISOString(),
  }));
}

export function useAIInsights({ enabled = true }: UseAIInsightsParams = {}) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['ai-insights'],
    queryFn: fetchEconomicInsights,
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const generateInsights = useCallback(async () => {
    queryClient.invalidateQueries({ queryKey: ['ai-insights'] });
  }, [queryClient]);

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    generateInsights,
  };
}
