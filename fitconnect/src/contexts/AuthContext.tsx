import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Trainer, Client } from '../types/interfaces';
import { UserRole } from '../types/enums';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  trainer: Trainer | null;
  client: Client | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    email: string,
    password: string,
    role: UserRole,
    profileData?: any
  ) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const loggedInUser = authService.login(email, password);
    if (loggedInUser) {
      authService.setCurrentUser(loggedInUser);
      setUser(loggedInUser);
      return true;
    }
    return false;
  };

  const signup = async (
    email: string,
    password: string,
    role: UserRole,
    profileData?: any
  ): Promise<boolean> => {
    try {
      const newUser = authService.signup(email, password, role, profileData);
      authService.setCurrentUser(newUser);
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    authService.setCurrentUser(updatedUser);
    setUser(updatedUser);
  };

  const trainer = user && user.role === 'TRAINER' ? (user as Trainer) : null;
  const client = user && user.role === 'CLIENT' ? (user as Client) : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        trainer,
        client,
        login,
        signup,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
