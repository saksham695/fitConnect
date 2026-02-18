import { Program, Week, DayWorkout, Exercise } from '../types/interfaces';
import { ProgramStatus, WorkoutStatus, DayType, DayOfWeek } from '../types/enums';
import { v4 as uuidv4 } from 'uuid';

/**
 * Program Service
 * Handles all program-related CRUD operations
 */
class ProgramService {
  private storageKey = 'fitconnect_programs';

  // ==================== READ OPERATIONS ====================

  getAllPrograms(): Program[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getProgramById(id: string): Program | undefined {
    const programs = this.getAllPrograms();
    return programs.find(p => p.id === id);
  }

  getProgramsByTrainer(trainerId: string): Program[] {
    const programs = this.getAllPrograms();
    return programs.filter(p => p.trainerId === trainerId);
  }

  getProgramsByClient(clientId: string): Program[] {
    const programs = this.getAllPrograms();
    return programs.filter(p => p.clientId === clientId);
  }

  getActivePrograms(): Program[] {
    const programs = this.getAllPrograms();
    return programs.filter(p => p.status === ProgramStatus.ACTIVE);
  }

  getActiveProgramForClient(clientId: string): Program | undefined {
    const programs = this.getProgramsByClient(clientId);
    return programs.find(p => p.status === ProgramStatus.ACTIVE);
  }

  // ==================== CREATE OPERATIONS ====================

  createProgram(programData: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>): Program {
    const program: Program = {
      ...programData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const programs = this.getAllPrograms();
    programs.push(program);
    localStorage.setItem(this.storageKey, JSON.stringify(programs));

    return program;
  }

  // ==================== UPDATE OPERATIONS ====================

  updateProgram(updatedProgram: Program): void {
    const programs = this.getAllPrograms();
    const index = programs.findIndex(p => p.id === updatedProgram.id);

    if (index !== -1) {
      updatedProgram.updatedAt = new Date().toISOString();
      programs[index] = updatedProgram;
      localStorage.setItem(this.storageKey, JSON.stringify(programs));
    }
  }

  updateProgramStatus(programId: string, status: ProgramStatus): void {
    const program = this.getProgramById(programId);
    if (program) {
      program.status = status;
      this.updateProgram(program);
    }
  }

  // Update a specific day's workout
  updateDayWorkout(programId: string, weekNumber: number, dayOfWeek: DayOfWeek, updatedDay: DayWorkout): void {
    const program = this.getProgramById(programId);
    if (!program) return;

    const week = program.weeks.find(w => w.weekNumber === weekNumber);
    if (!week) return;

    const dayIndex = week.days.findIndex(d => d.dayOfWeek === dayOfWeek);
    if (dayIndex !== -1) {
      week.days[dayIndex] = updatedDay;
      this.updateProgram(program);
    }
  }

  // Update workout status (for client logging)
  updateWorkoutStatus(programId: string, weekNumber: number, dayOfWeek: DayOfWeek, status: WorkoutStatus): void {
    const program = this.getProgramById(programId);
    if (!program) return;

    const week = program.weeks.find(w => w.weekNumber === weekNumber);
    if (!week) return;

    const day = week.days.find(d => d.dayOfWeek === dayOfWeek);
    if (day) {
      day.status = status;
      this.updateProgram(program);
    }
  }

  // ==================== DELETE OPERATIONS ====================

  deleteProgram(programId: string): void {
    const programs = this.getAllPrograms();
    const filtered = programs.filter(p => p.id !== programId);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
  }

  // ==================== HELPER FUNCTIONS ====================

  /**
   * Generate weeks structure for a program
   */
  generateWeeksStructure(startDate: string, durationWeeks: number): Week[] {
    const weeks: Week[] = [];
    const start = new Date(startDate);

    for (let weekNum = 1; weekNum <= durationWeeks; weekNum++) {
      const weekStartDate = new Date(start);
      weekStartDate.setDate(start.getDate() + (weekNum - 1) * 7);

      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6);

      const days: DayWorkout[] = [];
      const dayOrder = [
        DayOfWeek.MONDAY,
        DayOfWeek.TUESDAY,
        DayOfWeek.WEDNESDAY,
        DayOfWeek.THURSDAY,
        DayOfWeek.FRIDAY,
        DayOfWeek.SATURDAY,
        DayOfWeek.SUNDAY,
      ];

      dayOrder.forEach((dayOfWeek, index) => {
        const dayDate = new Date(weekStartDate);
        dayDate.setDate(weekStartDate.getDate() + index);

        days.push({
          dayOfWeek,
          date: dayDate.toISOString().split('T')[0],
          exercises: [],
          dayType: DayType.WORKOUT,
          status: this.calculateInitialDayStatus(dayDate),
        });
      });

      weeks.push({
        weekNumber: weekNum,
        startDate: weekStartDate.toISOString().split('T')[0],
        endDate: weekEndDate.toISOString().split('T')[0],
        days,
      });
    }

    return weeks;
  }

  /**
   * Calculate initial status for a day based on date
   */
  private calculateInitialDayStatus(date: Date): WorkoutStatus {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayDate = new Date(date);
    dayDate.setHours(0, 0, 0, 0);

    if (dayDate < today) {
      return WorkoutStatus.PENDING; // Past days start as pending
    } else if (dayDate.getTime() === today.getTime()) {
      return WorkoutStatus.PENDING; // Today is pending
    } else {
      return WorkoutStatus.LOCKED; // Future days are locked
    }
  }

  /**
   * Get current week for a program based on today's date
   */
  getCurrentWeek(program: Program): Week | undefined {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const week of program.weeks) {
      const weekStart = new Date(week.startDate);
      const weekEnd = new Date(week.endDate);
      weekStart.setHours(0, 0, 0, 0);
      weekEnd.setHours(23, 59, 59, 999);

      if (today >= weekStart && today <= weekEnd) {
        return week;
      }
    }

    // If not found, return first week if before program start
    const programStart = new Date(program.startDate);
    if (today < programStart && program.weeks.length > 0) {
      return program.weeks[0];
    }

    // If past program end, return last week
    if (program.weeks.length > 0) {
      return program.weeks[program.weeks.length - 1];
    }

    return undefined;
  }

  /**
   * Get today's workout for a client
   */
  getTodaysWorkout(program: Program): DayWorkout | undefined {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    for (const week of program.weeks) {
      for (const day of week.days) {
        if (day.date === todayStr) {
          return day;
        }
      }
    }

    return undefined;
  }

  /**
   * Copy a week's structure to another week
   */
  copyWeekStructure(sourceWeek: Week, targetWeekNumber: number, targetStartDate: string): Week {
    const targetWeekStartDate = new Date(targetStartDate);
    const targetWeekEndDate = new Date(targetWeekStartDate);
    targetWeekEndDate.setDate(targetWeekStartDate.getDate() + 6);

    const newDays: DayWorkout[] = sourceWeek.days.map((sourceDay, index) => {
      const dayDate = new Date(targetWeekStartDate);
      dayDate.setDate(targetWeekStartDate.getDate() + index);

      // Deep copy exercises
      const copiedExercises: Exercise[] = sourceDay.exercises.map(ex => ({
        ...ex,
        id: uuidv4(), // New ID for the copied exercise
      }));

      return {
        dayOfWeek: sourceDay.dayOfWeek,
        date: dayDate.toISOString().split('T')[0],
        exercises: copiedExercises,
        dayType: sourceDay.dayType,
        notes: sourceDay.notes,
        status: this.calculateInitialDayStatus(dayDate),
      };
    });

    return {
      weekNumber: targetWeekNumber,
      startDate: targetWeekStartDate.toISOString().split('T')[0],
      endDate: targetWeekEndDate.toISOString().split('T')[0],
      days: newDays,
      copiedFromWeek: sourceWeek.weekNumber,
    };
  }

  /**
   * Calculate program completion percentage
   */
  calculateCompletionPercentage(program: Program): number {
    let totalWorkouts = 0;
    let completedWorkouts = 0;

    program.weeks.forEach(week => {
      week.days.forEach(day => {
        if (day.dayType !== DayType.REST) {
          totalWorkouts++;
          if (day.status === WorkoutStatus.REVIEWED) {
            completedWorkouts++;
          }
        }
      });
    });

    return totalWorkouts > 0 ? Math.round((completedWorkouts / totalWorkouts) * 100) : 0;
  }

  /**
   * Get submissions pending review for a trainer
   */
  getPendingReviews(trainerId: string): Array<{
    program: Program;
    week: Week;
    day: DayWorkout;
  }> {
    const programs = this.getProgramsByTrainer(trainerId);
    const pendingReviews: Array<{
      program: Program;
      week: Week;
      day: DayWorkout;
    }> = [];

    programs.forEach(program => {
      program.weeks.forEach(week => {
        week.days.forEach(day => {
          if (day.status === WorkoutStatus.SUBMITTED) {
            pendingReviews.push({ program, week, day });
          }
        });
      });
    });

    return pendingReviews;
  }

  /**
   * Update day status based on date (unlock today's workout)
   */
  unlockTodaysWorkouts(): void {
    const programs = this.getActivePrograms();
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    programs.forEach(program => {
      program.weeks.forEach(week => {
        week.days.forEach(day => {
          if (day.date === todayStr && day.status === WorkoutStatus.LOCKED) {
            day.status = WorkoutStatus.PENDING;
          }
        });
      });
      this.updateProgram(program);
    });
  }
}

export const programService = new ProgramService();
