import { UserRole, FitnessLevel, CourseDifficulty, ConnectionStatus, DayOfWeek, BookingStatus, TrainingType } from './enums';

export interface User {
  id: string;
  email: string;
  password: string; // In real app, this would be hashed
  role: UserRole;
  createdAt: string;
}

export interface Trainer extends User {
  role: UserRole.TRAINER;
  profile: TrainerProfile;
  courses: string[]; // Array of course IDs
  clients: string[]; // Array of client IDs
}

export interface Client extends User {
  role: UserRole.CLIENT;
  profile: ClientProfile;
  trainers: string[]; // Array of trainer IDs
  goals: string[];
  enrolledCourses: string[]; // Array of course IDs
}

export interface TrainerProfile {
  fullName: string;
  age?: number;
  phoneNumber?: string;
  bio: string;
  profilePhoto?: string;
  areasOfExpertise: string[];
  yearsOfExperience: number;
  achievements: Achievement[];
  certifications: Certification[];
  totalClientsTrained?: number;
  pricing?: Pricing;
  physicalDetails?: PhysicalDetails;
}

export interface Certification {
  id: string;
  title: string;
  issuedBy?: string;
  date?: string;
  certificateUrl?: string;
}

export interface Pricing {
  perSession?: number;
  monthly?: number;
  currency: string;
}

export interface PhysicalDetails {
  height?: number; // in cm
  weight?: number; // in kg
  bmi?: number; // auto-calculated
}

export interface ClientProfile {
  fullName: string;
  age?: number;
  phoneNumber?: string;
  profilePhoto?: string;
  fitnessLevel: FitnessLevel;
  physicalDetails?: PhysicalDetails;
  medicalConditions?: string;
  preferredTrainingType?: TrainingType[];
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  date?: string;
}

export interface Course {
  id: string;
  trainerId: string;
  title: string;
  description: string;
  difficulty: CourseDifficulty;
  targetGoals: string[];
  duration: string; // e.g., "4 weeks"
  createdAt: string;
  enrolledClients: string[]; // Array of client IDs enrolled in this course
}

export interface Connection {
  id: string;
  trainerId: string;
  clientId: string;
  status: ConnectionStatus;
  createdAt: string;
}

export interface TimeSlot {
  startTime: string; // HH:MM format (e.g., "09:00")
  endTime: string; // HH:MM format (e.g., "10:00")
}

export interface Availability {
  id: string;
  trainerId: string;
  dayOfWeek: DayOfWeek;
  timeSlots: TimeSlot[];
  isRecurring: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  trainerId: string;
  clientId: string;
  date: string; // ISO date string
  timeSlot: TimeSlot;
  status: BookingStatus;
  fee?: number; // Session fee (from trainer pricing)
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ==================== PROGRAM SYSTEM INTERFACES ====================

export interface Program {
  id: string;
  trainerId: string;
  clientId: string;
  title: string;
  description: string;
  startDate: string; // ISO date
  durationWeeks: number;
  status: import('./enums').ProgramStatus;
  weeks: Week[];
  createdAt: string;
  updatedAt: string;
}

export interface Week {
  weekNumber: number;
  startDate: string;
  endDate: string;
  days: DayWorkout[];
  notes?: string;
  copiedFromWeek?: number;
}

export interface DayWorkout {
  dayOfWeek: DayOfWeek;
  date: string;
  exercises: Exercise[];
  dayType: import('./enums').DayType;
  notes?: string;
  status: import('./enums').WorkoutStatus;
  clientLog?: ClientWorkoutLog;
  trainerReview?: TrainerReview;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroups?: string[];
  sets: number;
  reps: string; // "8-12" or "10" or "AMRAP"
  restSeconds?: number;
  tempo?: string; // "3-1-1"
  weight?: string; // "60kg" or "bodyweight"
  description?: string;
  videoUrl?: string;
  notes?: string;
  orderIndex: number;
}

export interface ClientWorkoutLog {
  loggedAt: string;
  exerciseLogs: ExerciseLog[];
  overallNotes?: string;
  duration?: number; // Minutes
  rating?: number; // 1-5
}

export interface ExerciseLog {
  exerciseId: string;
  completed: boolean;
  actualSets: SetLog[];
  notes?: string;
}

export interface SetLog {
  setNumber: number;
  actualReps: number;
  actualWeight?: string;
  rpe?: number; // Rate of Perceived Exertion (1-10)
  completed: boolean;
}

export interface TrainerReview {
  reviewedAt: string;
  rating: number; // 1-5
  feedback: string;
  encouragement?: string;
  adjustmentsNeeded?: string;
  nextSteps?: string;
}

export interface ExerciseLibraryItem {
  id: string;
  name: string;
  category: import('./enums').ExerciseCategory;
  muscleGroups: string[];
  equipment: string[];
  difficulty: import('./enums').ExerciseDifficulty;
  instructions: string[];
  videoUrl?: string;
  imageUrl?: string;
}

export interface ProgressSnapshot {
  id: string;
  clientId: string;
  date: string;
  weight?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    biceps?: number;
    thighs?: number;
  };
  photos?: {
    front?: string;
    side?: string;
    back?: string;
  };
  notes?: string;
  programId?: string;
}
