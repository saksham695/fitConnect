import { useState, useCallback } from 'react';
import { Program, Week, DayWorkout, Exercise } from '../types/interfaces';
import { ProgramStatus, DayType, DayOfWeek } from '../types/enums';
import { programService } from '../services/programService';
import { v4 as uuidv4 } from 'uuid';

interface ProgramFormData {
  clientId: string;
  title: string;
  description: string;
  startDate: string;
  durationWeeks: number;
}

/**
 * useProgramBuilder Hook
 * Handles all logic for trainers creating/editing programs
 */
export const useProgramBuilder = (trainerId: string) => {
  const [formData, setFormData] = useState<ProgramFormData>({
    clientId: '',
    title: '',
    description: '',
    startDate: '',
    durationWeeks: 4,
  });

  const [weeks, setWeeks] = useState<Week[]>([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Initialize weeks structure
  const initializeWeeks = useCallback((startDate: string, duration: number) => {
    const generatedWeeks = programService.generateWeeksStructure(startDate, duration);
    setWeeks(generatedWeeks);
    setCurrentWeek(1);
  }, []);

  // Update form data
  const updateFormData = useCallback((field: keyof ProgramFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Auto-generate weeks when start date or duration changes
    if (field === 'startDate' || field === 'durationWeeks') {
      const startDate = field === 'startDate' ? value : formData.startDate;
      const duration = field === 'durationWeeks' ? value : formData.durationWeeks;
      
      if (startDate && duration > 0) {
        initializeWeeks(startDate, duration);
      }
    }
  }, [formData, initializeWeeks]);

  // Add exercise to a specific day
  const addExercise = useCallback((weekNumber: number, dayOfWeek: DayOfWeek, exercise: Omit<Exercise, 'id' | 'orderIndex'>) => {
    setWeeks(prev => {
      const updated = [...prev];
      const week = updated.find(w => w.weekNumber === weekNumber);
      
      if (week) {
        const day = week.days.find(d => d.dayOfWeek === dayOfWeek);
        if (day) {
          const newExercise: Exercise = {
            ...exercise,
            id: uuidv4(),
            orderIndex: day.exercises.length,
          };
          day.exercises.push(newExercise);
        }
      }
      
      return updated;
    });
  }, []);

  // Remove exercise from a day
  const removeExercise = useCallback((weekNumber: number, dayOfWeek: DayOfWeek, exerciseId: string) => {
    setWeeks(prev => {
      const updated = [...prev];
      const week = updated.find(w => w.weekNumber === weekNumber);
      
      if (week) {
        const day = week.days.find(d => d.dayOfWeek === dayOfWeek);
        if (day) {
          day.exercises = day.exercises.filter(ex => ex.id !== exerciseId);
          // Reorder
          day.exercises.forEach((ex, index) => {
            ex.orderIndex = index;
          });
        }
      }
      
      return updated;
    });
  }, []);

  // Update exercise
  const updateExercise = useCallback((weekNumber: number, dayOfWeek: DayOfWeek, exerciseId: string, updates: Partial<Exercise>) => {
    setWeeks(prev => {
      const updated = [...prev];
      const week = updated.find(w => w.weekNumber === weekNumber);
      
      if (week) {
        const day = week.days.find(d => d.dayOfWeek === dayOfWeek);
        if (day) {
          const exerciseIndex = day.exercises.findIndex(ex => ex.id === exerciseId);
          if (exerciseIndex !== -1) {
            day.exercises[exerciseIndex] = {
              ...day.exercises[exerciseIndex],
              ...updates,
            };
          }
        }
      }
      
      return updated;
    });
  }, []);

  // Set day type (workout/rest/cardio/active recovery)
  const setDayType = useCallback((weekNumber: number, dayOfWeek: DayOfWeek, dayType: DayType) => {
    setWeeks(prev => {
      const updated = [...prev];
      const week = updated.find(w => w.weekNumber === weekNumber);
      
      if (week) {
        const day = week.days.find(d => d.dayOfWeek === dayOfWeek);
        if (day) {
          day.dayType = dayType;
          // Clear exercises if changing to rest
          if (dayType === DayType.REST) {
            day.exercises = [];
          }
        }
      }
      
      return updated;
    });
  }, []);

  // Copy week structure from another week
  const copyWeek = useCallback((sourceWeekNumber: number, targetWeekNumber: number) => {
    setWeeks(prev => {
      const sourceWeek = prev.find(w => w.weekNumber === sourceWeekNumber);
      if (!sourceWeek) return prev;

      const targetWeek = prev.find(w => w.weekNumber === targetWeekNumber);
      if (!targetWeek) return prev;

      const copiedWeek = programService.copyWeekStructure(sourceWeek, targetWeekNumber, targetWeek.startDate);
      
      const updated = [...prev];
      const targetIndex = updated.findIndex(w => w.weekNumber === targetWeekNumber);
      if (targetIndex !== -1) {
        updated[targetIndex] = copiedWeek;
      }
      
      return updated;
    });
  }, []);

  // Reorder exercises within a day
  const reorderExercise = useCallback((weekNumber: number, dayOfWeek: DayOfWeek, exerciseId: string, direction: 'up' | 'down') => {
    setWeeks(prev => {
      const updated = [...prev];
      const week = updated.find(w => w.weekNumber === weekNumber);
      
      if (week) {
        const day = week.days.find(d => d.dayOfWeek === dayOfWeek);
        if (day) {
          const currentIndex = day.exercises.findIndex(ex => ex.id === exerciseId);
          if (currentIndex === -1) return prev;

          const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
          
          if (newIndex < 0 || newIndex >= day.exercises.length) return prev;

          // Swap
          const temp = day.exercises[currentIndex];
          day.exercises[currentIndex] = day.exercises[newIndex];
          day.exercises[newIndex] = temp;

          // Update order indices
          day.exercises.forEach((ex, index) => {
            ex.orderIndex = index;
          });
        }
      }
      
      return updated;
    });
  }, []);

  // Save program
  const saveProgram = useCallback(async (status: ProgramStatus = ProgramStatus.DRAFT): Promise<Program | null> => {
    setLoading(true);
    setError('');

    try {
      // Validation
      if (!formData.clientId || !formData.title || !formData.startDate || formData.durationWeeks < 1) {
        throw new Error('Please fill in all required fields');
      }

      const program = programService.createProgram({
        trainerId,
        clientId: formData.clientId,
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        durationWeeks: formData.durationWeeks,
        status,
        weeks,
      });

      return program;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save program');
      return null;
    } finally {
      setLoading(false);
    }
  }, [trainerId, formData, weeks]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData({
      clientId: '',
      title: '',
      description: '',
      startDate: '',
      durationWeeks: 4,
    });
    setWeeks([]);
    setCurrentWeek(1);
    setError('');
  }, []);

  return {
    formData,
    weeks,
    currentWeek,
    loading,
    error,
    actions: {
      updateFormData,
      setCurrentWeek,
      addExercise,
      removeExercise,
      updateExercise,
      setDayType,
      copyWeek,
      reorderExercise,
      saveProgram,
      resetForm,
    },
  };
};
