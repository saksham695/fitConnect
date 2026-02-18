import { useState, useEffect, useMemo } from 'react';
import { Program, Week, DayWorkout } from '../types/interfaces';
import { programService } from '../services/programService';

/**
 * useProgramCalendar Hook
 * Manages calendar view state and week navigation
 * CRITICAL: Prevents modal from closing when navigating weeks
 */
export const useProgramCalendar = (program: Program | null) => {
  const [currentWeekNumber, setCurrentWeekNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  // Calculate current week based on today's date
  useEffect(() => {
    if (program) {
      const currentWeek = programService.getCurrentWeek(program);
      if (currentWeek) {
        setCurrentWeekNumber(currentWeek.weekNumber);
      }
    }
  }, [program]);

  // Get current week data
  const currentWeek = useMemo((): Week | undefined => {
    if (!program) return undefined;
    return program.weeks.find(w => w.weekNumber === currentWeekNumber);
  }, [program, currentWeekNumber]);

  // Navigation functions
  const goToPreviousWeek = () => {
    setCurrentWeekNumber(prev => Math.max(1, prev - 1));
  };

  const goToNextWeek = () => {
    if (program) {
      setCurrentWeekNumber(prev => Math.min(program.durationWeeks, prev + 1));
    }
  };

  const goToWeek = (weekNumber: number) => {
    if (program && weekNumber >= 1 && weekNumber <= program.durationWeeks) {
      setCurrentWeekNumber(weekNumber);
    }
  };

  const canGoBack = currentWeekNumber > 1;
  const canGoForward = program ? currentWeekNumber < program.durationWeeks : false;

  // Get today's date
  const todayStr = new Date().toISOString().split('T')[0];

  // Get today's workout
  const todaysWorkout = useMemo((): DayWorkout | undefined => {
    if (!currentWeek) return undefined;
    return currentWeek.days.find(day => day.date === todayStr);
  }, [currentWeek, todayStr]);

  // Calculate week progress
  const weekProgress = useMemo(() => {
    if (!currentWeek) return { completed: 0, total: 0, percentage: 0 };

    const total = currentWeek.days.length;
    const completed = currentWeek.days.filter(
      day => day.status === 'REVIEWED'
    ).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed, total, percentage };
  }, [currentWeek]);

  return {
    currentWeek,
    currentWeekNumber,
    todaysWorkout,
    weekProgress,
    navigation: {
      goToPreviousWeek,
      goToNextWeek,
      goToWeek,
      canGoBack,
      canGoForward,
    },
    loading,
  };
};
