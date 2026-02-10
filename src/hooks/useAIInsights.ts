import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback } from 'react';

export interface AIInsight {
  id: string;
  message: string;
  type: 'trend' | 'alert' | 'correlation';
  severity: 'info' | 'warning' | 'success';
  indicatorId: string;
  date: string;
}

interface IndicatorData {
  id: string;
  name: string;
  shortName: string;
  value: number;
  unit: string;
  monthlyChange: number;
  annualChange: number;
  trend: 'up' | 'down' | 'stable';
  historicalData: { date: string; value: number }[];
}

interface UseAIInsightsParams {
  indicators: IndicatorData[];
  visibleIndicators?: string[];
  period: string;
  enabled?: boolean;
}

async function fetchSavedInsights(userId: string): Promise<AIInsight[]> {
  const { data, error } = await supabase
    .from('generated_insights')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error loading saved insights:', error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    message: row.description,
    type: (row.insight_type as AIInsight['type']) || 'trend',
    severity: (row.severity as AIInsight['severity']) || 'info',
    indicatorId: row.indicator,
    date: row.reference_date,
  }));
}

export function useAIInsights({
  indicators,
  visibleIndicators,
  period,
  enabled = true,
}: UseAIInsightsParams) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Load saved insights from DB
  const query = useQuery({
    queryKey: ['ai-insights', user?.id],
    queryFn: () => fetchSavedInsights(user!.id),
    enabled: enabled && !!user,
    staleTime: Infinity, // only refresh manually
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  // Generate new insights via edge function and refresh from DB
  const generateInsights = useCallback(async () => {
    if (!user || indicators.length === 0) return;

    const response = await supabase.functions.invoke('generate-ai-insights', {
      body: { indicators, visibleIndicators, period },
    });

    if (response.error) {
      try {
        const errorBody = typeof response.error === 'object' && 'context' in response.error
          ? await (response.error as any).context?.json?.()
          : null;
        const msg = errorBody?.error || response.error.message || 'Falha ao gerar insights';
        throw new Error(msg);
      } catch (parseErr) {
        if (parseErr instanceof Error && parseErr.message !== 'Falha ao gerar insights') {
          throw parseErr;
        }
        throw new Error(response.error.message || 'Falha ao gerar insights');
      }
    }

    // Invalidate to reload from DB
    queryClient.invalidateQueries({ queryKey: ['ai-insights', user.id] });
  }, [user, indicators, visibleIndicators, period, queryClient]);

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    generateInsights,
  };
}
