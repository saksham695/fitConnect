import { User, Trainer, Client, Course, Connection } from '../types/interfaces';
import { UserRole, ConnectionStatus } from '../types/enums';

/**
 * Storage Service - Manages localStorage operations
 * Acts as a mock database for the frontend-only application
 */
class StorageService {
  private storageKeys = {
    users: 'fitconnect_users',
    courses: 'fitconnect_courses',
    connections: 'fitconnect_connections',
  };

  // Initialize with mock data if storage is empty
  initializeMockData() {
    if (!this.getUsers().length) {
      this.seedMockData();
    }
  }

  private seedMockData() {
    const mockTrainers: Trainer[] = [
      {
        id: 'trainer-1',
        email: 'trainer1@example.com',
        password: 'password',
        role: UserRole.TRAINER,
        createdAt: new Date().toISOString(),
        profile: {
          fullName: 'John Smith',
          bio: 'Certified personal trainer with 10 years of experience. Specialized in strength training and weight loss.',
          areasOfExpertise: ['Strength Training', 'Weight Loss', 'Bodybuilding'],
          yearsOfExperience: 10,
          achievements: [
            { id: 'ach-1', title: 'NASM Certified Personal Trainer', date: '2014' },
            { id: 'ach-2', title: 'Bodybuilding Competition Winner 2019', date: '2019' },
          ],
        },
        courses: [],
        clients: [],
      },
      {
        id: 'trainer-2',
        email: 'trainer2@example.com',
        password: 'password',
        role: UserRole.TRAINER,
        createdAt: new Date().toISOString(),
        profile: {
          fullName: 'Sarah Johnson',
          bio: 'Yoga instructor and mindfulness coach. Helping clients achieve balance through movement and meditation.',
          areasOfExpertise: ['Yoga', 'Meditation', 'Flexibility'],
          yearsOfExperience: 8,
          achievements: [
            { id: 'ach-3', title: 'RYT 500 Certified Yoga Instructor', date: '2016' },
            { id: 'ach-4', title: 'Mindfulness-Based Stress Reduction Certification', date: '2018' },
          ],
        },
        courses: [],
        clients: [],
      },
      {
        id: 'trainer-3',
        email: 'trainer3@example.com',
        password: 'password',
        role: UserRole.TRAINER,
        createdAt: new Date().toISOString(),
        profile: {
          fullName: 'Mike Davis',
          bio: 'Nutrition coach and fitness expert. Focus on sustainable lifestyle changes.',
          areasOfExpertise: ['Nutrition', 'Weight Management', 'Endurance Training'],
          yearsOfExperience: 12,
          achievements: [
            { id: 'ach-5', title: 'Certified Nutrition Specialist', date: '2012' },
            { id: 'ach-6', title: 'Marathon Coach Certification', date: '2015' },
          ],
        },
        courses: [],
        clients: [],
      },
    ];

    const mockClients: Client[] = [
      {
        id: 'client-1',
        email: 'client1@example.com',
        password: 'password',
        role: UserRole.CLIENT,
        createdAt: new Date().toISOString(),
        profile: {
          fullName: 'Alice Brown',
          age: 28,
          fitnessLevel: 'BEGINNER' as any,
        },
        trainers: [],
        goals: ['Lose weight', 'Build strength'],
      },
    ];

    const allUsers = [...mockTrainers, ...mockClients];
    localStorage.setItem(this.storageKeys.users, JSON.stringify(allUsers));
    localStorage.setItem(this.storageKeys.courses, JSON.stringify([]));
    localStorage.setItem(this.storageKeys.connections, JSON.stringify([]));
  }

  // User operations
  getUsers(): User[] {
    const data = localStorage.getItem(this.storageKeys.users);
    return data ? JSON.parse(data) : [];
  }

  getUserById(id: string): User | undefined {
    return this.getUsers().find((u) => u.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.getUsers().find((u) => u.email === email);
  }

  createUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.storageKeys.users, JSON.stringify(users));
  }

  updateUser(user: User): void {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      localStorage.setItem(this.storageKeys.users, JSON.stringify(users));
    }
  }

  // Trainer operations
  getTrainers(): Trainer[] {
    return this.getUsers().filter((u) => u.role === UserRole.TRAINER) as Trainer[];
  }

  getTrainerById(id: string): Trainer | undefined {
    const user = this.getUserById(id);
    return user && user.role === UserRole.TRAINER ? (user as Trainer) : undefined;
  }

  updateTrainer(trainer: Trainer): void {
    this.updateUser(trainer);
  }

  // Client operations
  getClients(): Client[] {
    return this.getUsers().filter((u) => u.role === UserRole.CLIENT) as Client[];
  }

  getClientById(id: string): Client | undefined {
    const user = this.getUserById(id);
    return user && user.role === UserRole.CLIENT ? (user as Client) : undefined;
  }

  updateClient(client: Client): void {
    this.updateUser(client);
  }

  // Course operations
  getCourses(): Course[] {
    const data = localStorage.getItem(this.storageKeys.courses);
    return data ? JSON.parse(data) : [];
  }

  getCoursesByTrainerId(trainerId: string): Course[] {
    return this.getCourses().filter((c) => c.trainerId === trainerId);
  }

  createCourse(course: Course): void {
    const courses = this.getCourses();
    courses.push(course);
    localStorage.setItem(this.storageKeys.courses, JSON.stringify(courses));

    // Update trainer's courses array
    const trainer = this.getTrainerById(course.trainerId);
    if (trainer) {
      trainer.courses.push(course.id);
      this.updateTrainer(trainer);
    }
  }

  getCourseById(id: string): Course | undefined {
    return this.getCourses().find((c) => c.id === id);
  }

  // Connection operations
  getConnections(): Connection[] {
    const data = localStorage.getItem(this.storageKeys.connections);
    return data ? JSON.parse(data) : [];
  }

  getConnectionsByTrainerId(trainerId: string): Connection[] {
    return this.getConnections().filter((c) => c.trainerId === trainerId);
  }

  getConnectionsByClientId(clientId: string): Connection[] {
    return this.getConnections().filter((c) => c.clientId === clientId);
  }

  createConnection(trainerId: string, clientId: string): Connection {
    const connections = this.getConnections();
    const connection: Connection = {
      id: `conn-${Date.now()}`,
      trainerId,
      clientId,
      status: ConnectionStatus.CONNECTED,
      createdAt: new Date().toISOString(),
    };
    connections.push(connection);
    localStorage.setItem(this.storageKeys.connections, JSON.stringify(connections));

    // Update trainer's clients array
    const trainer = this.getTrainerById(trainerId);
    if (trainer && !trainer.clients.includes(clientId)) {
      trainer.clients.push(clientId);
      this.updateTrainer(trainer);
    }

    // Update client's trainers array
    const client = this.getClientById(clientId);
    if (client && !client.trainers.includes(trainerId)) {
      client.trainers.push(trainerId);
      this.updateClient(client);
    }

    return connection;
  }

  getConnection(trainerId: string, clientId: string): Connection | undefined {
    return this.getConnections().find(
      (c) => c.trainerId === trainerId && c.clientId === clientId
    );
  }
}

export const storageService = new StorageService();
storageService.initializeMockData();
