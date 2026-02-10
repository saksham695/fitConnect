# FitConnect

A frontend-only fitness application that enables trainers and clients to discover each other, connect, and engage around fitness goals and courses.

## Features

### For Trainers
- Create and manage trainer profile
- Add areas of expertise and achievements
- Create and manage courses
- View connected clients
- Track client goals

### For Clients
- Create and manage client profile
- Set fitness goals
- Discover trainers by expertise
- View trainer profiles and courses
- Connect with trainers

## Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **LocalStorage** for data persistence (mock database)
- **Context API** for state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Accounts

### Trainer Account
- Email: `trainer1@example.com`
- Password: `password`

### Client Account
- Email: `client1@example.com`
- Password: `password`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components (Header, Layout)
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── pages/              # Page components
│   ├── Landing/
│   ├── Login/
│   ├── Signup/
│   ├── Dashboard/
│   ├── Profile/
│   ├── Trainers/
│   ├── Courses/
│   ├── Clients/
│   └── Goals/
├── services/           # Service layer
│   ├── authService.ts
│   └── storageService.ts
├── types/              # TypeScript types
│   ├── enums.ts
│   └── interfaces.ts
├── App.tsx
└── index.tsx
```

## Data Storage

All data is stored in browser localStorage:
- `fitconnect_users` - User accounts (trainers and clients)
- `fitconnect_courses` - Course data
- `fitconnect_connections` - Trainer-client connections
- `fitconnect_current_user_id` - Current logged-in user

## Key Features Implementation

### User Management
- Unified user object structure for both trainers and clients
- Connections stored bidirectionally (trainer.clients and client.trainers)
- Profile management with role-specific fields

### Course Management
- Trainers can create courses with title, description, difficulty, duration, and target goals
- Clients can view trainer courses
- Courses linked to trainers

### Connection System
- Clients can connect with trainers
- Connections stored in both user objects and connections array
- Connection status tracking

## Future Enhancements

- Real backend API integration
- Payment processing
- Real-time messaging
- Workout tracking
- Progress analytics
- Notifications

## License

MIT
