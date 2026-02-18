import { useState, useEffect, useCallback } from 'react';
import { ProgressSnapshot } from '../types/interfaces';
import { progressService } from '../services/progressService';

/**
 * useProgressTracking Hook
 * Manages client progress tracking (weight, measurements, photos)
 */
export const useProgressTracking = (clientId: string) => {
  const [progressHistory, setProgressHistory] = useState<ProgressSnapshot[]>([]);
  const [latestProgress, setLatestProgress] = useState<ProgressSnapshot | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load progress data
  const loadProgress = useCallback(() => {
    setLoading(true);
    try {
      const history = progressService.getProgressByClient(clientId);
      const latest = progressService.getLatestProgress(clientId);
      
      setProgressHistory(history);
      setLatestProgress(latest);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load progress');
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  // Load data on mount
  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // Create new progress snapshot
  const logProgress = useCallback(async (data: Omit<ProgressSnapshot, 'id' | 'clientId'>) => {
    setLoading(true);
    setError('');

    try {
      const snapshot = progressService.createProgressSnapshot({
        ...data,
        clientId,
      });

      // Reload progress
      loadProgress();

      return snapshot;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to log progress');
      return null;
    } finally {
      setLoading(false);
    }
  }, [clientId, loadProgress]);

  // Update existing progress snapshot
  const updateProgress = useCallback(async (snapshot: ProgressSnapshot) => {
    setLoading(true);
    setError('');

    try {
      progressService.updateProgressSnapshot(snapshot);
      loadProgress();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update progress');
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadProgress]);

  // Delete progress snapshot
  const deleteProgress = useCallback(async (id: string) => {
    setLoading(true);
    setError('');

    try {
      progressService.deleteProgressSnapshot(id);
      loadProgress();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete progress');
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadProgress]);

  // Get weight history for charts
  const getWeightChartData = useCallback((limit?: number) => {
    return progressService.getWeightHistory(clientId, limit);
  }, [clientId]);

  // Get measurement history for charts
  const getMeasurementChartData = useCallback((
    measurement: 'chest' | 'waist' | 'hips' | 'biceps' | 'thighs',
    limit?: number
  ) => {
    return progressService.getMeasurementHistory(clientId, measurement, limit);
  }, [clientId]);

  // Get progress summary
  const getProgressSummary = useCallback(() => {
    return progressService.getProgressSummary(clientId);
  }, [clientId]);

  // Get weight change stats
  const getWeightChange = useCallback(() => {
    return progressService.getWeightChange(clientId);
  }, [clientId]);

  // Check if logged today
  const hasLoggedToday = useCallback(() => {
    return progressService.hasLoggedToday(clientId);
  }, [clientId]);

  return {
    progressHistory,
    latestProgress,
    loading,
    error,
    actions: {
      logProgress,
      updateProgress,
      deleteProgress,
      loadProgress,
    },
    charts: {
      getWeightChartData,
      getMeasurementChartData,
    },
    stats: {
      getProgressSummary,
      getWeightChange,
      hasLoggedToday,
    },
  };
};
