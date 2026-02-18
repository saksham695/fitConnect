import { useState, useCallback } from 'react';
import { Program, DayWorkout, ExerciseLog, SetLog, ClientWorkoutLog } from '../types/interfaces';
import { WorkoutStatus, DayOfWeek } from '../types/enums';
import { programService } from '../services/programService';

/**
 * useWorkoutLogger Hook
 * Handles client logging workout progress (sets, reps, RPE)
 */
export const useWorkoutLogger = (program: Program, weekNumber: number, dayOfWeek: DayOfWeek) => {
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);
  const [overallNotes, setOverallNotes] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [startTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get current day workout
  const week = program.weeks.find(w => w.weekNumber === weekNumber);
  const dayWorkout = week?.days.find(d => d.dayOfWeek === dayOfWeek);

  // Initialize exercise logs
  const initializeLogs = useCallback(() => {
    if (!dayWorkout) return;

    const initialLogs: ExerciseLog[] = dayWorkout.exercises.map(exercise => ({
      exerciseId: exercise.id,
      completed: false,
      actualSets: Array.from({ length: exercise.sets }, (_, index) => ({
        setNumber: index + 1,
        actualReps: 0,
        actualWeight: exercise.weight || '',
        rpe: 0,
        completed: false,
      })),
      notes: '',
    }));

    setExerciseLogs(initialLogs);
  }, [dayWorkout]);

  // Update a specific set
  const updateSet = useCallback((exerciseId: string, setNumber: number, updates: Partial<SetLog>) => {
    setExerciseLogs(prev => {
      const updated = [...prev];
      const exerciseLog = updated.find(log => log.exerciseId === exerciseId);
      
      if (exerciseLog) {
        const setIndex = exerciseLog.actualSets.findIndex(set => set.setNumber === setNumber);
        if (setIndex !== -1) {
          exerciseLog.actualSets[setIndex] = {
            ...exerciseLog.actualSets[setIndex],
            ...updates,
          };
          
          // Auto-mark exercise as completed if all sets are completed
          exerciseLog.completed = exerciseLog.actualSets.every(set => set.completed);
        }
      }
      
      return updated;
    });
  }, []);

  // Mark set as completed
  const toggleSetCompleted = useCallback((exerciseId: string, setNumber: number) => {
    setExerciseLogs(prev => {
      const updated = [...prev];
      const exerciseLog = updated.find(log => log.exerciseId === exerciseId);
      
      if (exerciseLog) {
        const setIndex = exerciseLog.actualSets.findIndex(set => set.setNumber === setNumber);
        if (setIndex !== -1) {
          exerciseLog.actualSets[setIndex].completed = !exerciseLog.actualSets[setIndex].completed;
          
          // Update exercise completion
          exerciseLog.completed = exerciseLog.actualSets.every(set => set.completed);
        }
      }
      
      return updated;
    });
  }, []);

  // Update exercise notes
  const updateExerciseNotes = useCallback((exerciseId: string, notes: string) => {
    setExerciseLogs(prev => {
      const updated = [...prev];
      const exerciseLog = updated.find(log => log.exerciseId === exerciseId);
      
      if (exerciseLog) {
        exerciseLog.notes = notes;
      }
      
      return updated;
    });
  }, []);

  // Calculate workout duration
  const getDuration = useCallback(() => {
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();
    return Math.round(durationMs / 1000 / 60); // Convert to minutes
  }, [startTime]);

  // Calculate completion percentage
  const getCompletionPercentage = useCallback(() => {
    if (exerciseLogs.length === 0) return 0;

    const totalSets = exerciseLogs.reduce((sum, log) => sum + log.actualSets.length, 0);
    const completedSets = exerciseLogs.reduce(
      (sum, log) => sum + log.actualSets.filter(set => set.completed).length,
      0
    );

    return totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;
  }, [exerciseLogs]);

  // Submit workout log
  const submitWorkout = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      if (!dayWorkout) {
        throw new Error('Day workout not found');
      }

      const workoutLog: ClientWorkoutLog = {
        loggedAt: new Date().toISOString(),
        exerciseLogs,
        overallNotes,
        duration: getDuration(),
        rating: rating || undefined,
      };

      // Update day with log
      const updatedDay: DayWorkout = {
        ...dayWorkout,
        clientLog: workoutLog,
        status: WorkoutStatus.SUBMITTED,
      };

      // Save to program
      programService.updateDayWorkout(program.id, weekNumber, dayOfWeek, updatedDay);

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit workout');
      return false;
    } finally {
      setLoading(false);
    }
  }, [program, weekNumber, dayOfWeek, dayWorkout, exerciseLogs, overallNotes, rating, getDuration]);

  // Save progress (without submitting)
  const saveProgress = useCallback(() => {
    if (!dayWorkout) return;

    const workoutLog: ClientWorkoutLog = {
      loggedAt: new Date().toISOString(),
      exerciseLogs,
      overallNotes,
      duration: getDuration(),
      rating: rating || undefined,
    };

    const updatedDay: DayWorkout = {
      ...dayWorkout,
      clientLog: workoutLog,
      status: WorkoutStatus.IN_PROGRESS,
    };

    programService.updateDayWorkout(program.id, weekNumber, dayOfWeek, updatedDay);
  }, [program, weekNumber, dayOfWeek, dayWorkout, exerciseLogs, overallNotes, rating, getDuration]);

  return {
    dayWorkout,
    exerciseLogs,
    overallNotes,
    rating,
    loading,
    error,
    stats: {
      completionPercentage: getCompletionPercentage(),
      duration: getDuration(),
    },
    actions: {
      initializeLogs,
      updateSet,
      toggleSetCompleted,
      updateExerciseNotes,
      setOverallNotes,
      setRating,
      saveProgress,
      submitWorkout,
    },
  };
};
