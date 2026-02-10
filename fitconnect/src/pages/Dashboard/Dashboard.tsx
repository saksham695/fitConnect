import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import TrainerDashboard from './TrainerDashboard';
import ClientDashboard from './ClientDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return user.role === 'TRAINER' ? <TrainerDashboard /> : <ClientDashboard />;
};

export default Dashboard;
