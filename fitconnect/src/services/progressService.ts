import { ProgressSnapshot } from '../types/interfaces';
import { v4 as uuidv4 } from 'uuid';

/**
 * Progress Service
 * Handles client progress tracking (weight, measurements, photos)
 */
class ProgressService {
  private storageKey = 'fitconnect_progress';

  // ==================== READ OPERATIONS ====================

  getAllProgress(): ProgressSnapshot[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getProgressById(id: string): ProgressSnapshot | undefined {
    const allProgress = this.getAllProgress();
    return allProgress.find(p => p.id === id);
  }

  getProgressByClient(clientId: string): ProgressSnapshot[] {
    const allProgress = this.getAllProgress();
    return allProgress
      .filter(p => p.clientId === clientId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getProgressByProgram(programId: string): ProgressSnapshot[] {
    const allProgress = this.getAllProgress();
    return allProgress
      .filter(p => p.programId === programId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getLatestProgress(clientId: string): ProgressSnapshot | undefined {
    const clientProgress = this.getProgressByClient(clientId);
    return clientProgress.length > 0 ? clientProgress[0] : undefined;
  }

  // ==================== CREATE OPERATIONS ====================

  createProgressSnapshot(data: Omit<ProgressSnapshot, 'id'>): ProgressSnapshot {
    const snapshot: ProgressSnapshot = {
      ...data,
      id: uuidv4(),
    };

    const allProgress = this.getAllProgress();
    allProgress.push(snapshot);
    localStorage.setItem(this.storageKey, JSON.stringify(allProgress));

    return snapshot;
  }

  // ==================== UPDATE OPERATIONS ====================

  updateProgressSnapshot(updatedSnapshot: ProgressSnapshot): void {
    const allProgress = this.getAllProgress();
    const index = allProgress.findIndex(p => p.id === updatedSnapshot.id);

    if (index !== -1) {
      allProgress[index] = updatedSnapshot;
      localStorage.setItem(this.storageKey, JSON.stringify(allProgress));
    }
  }

  // ==================== DELETE OPERATIONS ====================

  deleteProgressSnapshot(id: string): void {
    const allProgress = this.getAllProgress();
    const filtered = allProgress.filter(p => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
  }

  // ==================== DATA ANALYSIS ====================

  /**
   * Get weight data for charting
   */
  getWeightHistory(clientId: string, limit?: number): Array<{ date: string; weight: number }> {
    const progress = this.getProgressByClient(clientId)
      .filter(p => p.weight !== undefined)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Ascending for charts

    const weightData = progress.map(p => ({
      date: p.date,
      weight: p.weight!,
    }));

    return limit ? weightData.slice(-limit) : weightData;
  }

  /**
   * Get measurement history for a specific measurement
   */
  getMeasurementHistory(
    clientId: string,
    measurement: 'chest' | 'waist' | 'hips' | 'biceps' | 'thighs',
    limit?: number
  ): Array<{ date: string; value: number }> {
    const progress = this.getProgressByClient(clientId)
      .filter(p => p.measurements && p.measurements[measurement] !== undefined)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const measurementData = progress.map(p => ({
      date: p.date,
      value: p.measurements![measurement]!,
    }));

    return limit ? measurementData.slice(-limit) : measurementData;
  }

  /**
   * Calculate weight change
   */
  getWeightChange(clientId: string): {
    initial?: number;
    current?: number;
    change?: number;
    changePercentage?: number;
  } {
    const history = this.getWeightHistory(clientId);

    if (history.length === 0) {
      return {};
    }

    const initial = history[0].weight;
    const current = history[history.length - 1].weight;
    const change = current - initial;
    const changePercentage = (change / initial) * 100;

    return {
      initial,
      current,
      change,
      changePercentage,
    };
  }

  /**
   * Get progress summary for client
   */
  getProgressSummary(clientId: string): {
    totalEntries: number;
    latestWeight?: number;
    weightChange?: number;
    latestMeasurements?: ProgressSnapshot['measurements'];
    firstEntry?: string;
    lastEntry?: string;
  } {
    const progress = this.getProgressByClient(clientId);

    if (progress.length === 0) {
      return { totalEntries: 0 };
    }

    const latest = progress[0];
    const oldest = progress[progress.length - 1];
    const weightChange = this.getWeightChange(clientId);

    return {
      totalEntries: progress.length,
      latestWeight: latest.weight,
      weightChange: weightChange.change,
      latestMeasurements: latest.measurements,
      firstEntry: oldest.date,
      lastEntry: latest.date,
    };
  }

  /**
   * Get progress snapshots for date range
   */
  getProgressInDateRange(
    clientId: string,
    startDate: string,
    endDate: string
  ): ProgressSnapshot[] {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return this.getProgressByClient(clientId).filter(p => {
      const snapshotDate = new Date(p.date);
      return snapshotDate >= start && snapshotDate <= end;
    });
  }

  /**
   * Check if client has logged progress today
   */
  hasLoggedToday(clientId: string): boolean {
    const today = new Date().toISOString().split('T')[0];
    const progress = this.getProgressByClient(clientId);
    return progress.some(p => p.date === today);
  }

  /**
   * Get all unique measurement types logged by client
   */
  getLoggedMeasurements(clientId: string): string[] {
    const progress = this.getProgressByClient(clientId);
    const measurements = new Set<string>();

    progress.forEach(p => {
      if (p.measurements) {
        Object.keys(p.measurements).forEach(key => {
          if (p.measurements![key as keyof typeof p.measurements] !== undefined) {
            measurements.add(key);
          }
        });
      }
    });

    return Array.from(measurements);
  }

  /**
   * Calculate BMI from latest weight and height
   */
  calculateBMI(weight: number, height: number): number {
    // height in cm, weight in kg
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return Math.round(bmi * 10) / 10;
  }

  /**
   * Get BMI category
   */
  getBMICategory(bmi: number): string {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }
}

export const progressService = new ProgressService();
