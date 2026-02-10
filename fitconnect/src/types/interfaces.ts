import { UserRole, FitnessLevel, CourseDifficulty, ConnectionStatus } from './enums';

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
}

export interface TrainerProfile {
  fullName: string;
  bio: string;
  profilePhoto?: string;
  areasOfExpertise: string[];
  yearsOfExperience: number;
  achievements: Achievement[];
}

export interface ClientProfile {
  fullName: string;
  age?: number;
  profilePhoto?: string;
  fitnessLevel: FitnessLevel;
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
}

export interface Connection {
  id: string;
  trainerId: string;
  clientId: string;
  status: ConnectionStatus;
  createdAt: string;
}
