export enum UserRole {
  TRAINER = 'TRAINER',
  CLIENT = 'CLIENT',
}

export enum FitnessLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum CourseDifficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum ConnectionStatus {
  CONNECTED = 'CONNECTED',
  PENDING = 'PENDING',
}

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum TrainingType {
  ONE_ON_ONE = 'ONE_ON_ONE',
  GROUP = 'GROUP',
  ONLINE = 'ONLINE',
  GYM = 'GYM',
}

// Program System Enums
export enum ProgramStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  PAUSED = 'PAUSED',
}

export enum DayType {
  WORKOUT = 'WORKOUT',
  REST = 'REST',
  CARDIO = 'CARDIO',
  ACTIVE_RECOVERY = 'ACTIVE_RECOVERY',
}

export enum WorkoutStatus {
  LOCKED = 'LOCKED',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  REVIEWED = 'REVIEWED',
}

export enum ExerciseCategory {
  STRENGTH = 'STRENGTH',
  CARDIO = 'CARDIO',
  FLEXIBILITY = 'FLEXIBILITY',
  CORE = 'CORE',
  PLYOMETRIC = 'PLYOMETRIC',
  BALANCE = 'BALANCE',
}

export enum ExerciseDifficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}
