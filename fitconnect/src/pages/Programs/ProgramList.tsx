import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Program } from '../../types/interfaces';
import { programService } from '../../services/programService';
import { storageService } from '../../services/storageService';
import Layout from '../../components/Layout/Layout';
import ProgramCard from '../../components/Program/ProgramCard';
import './ProgramList.css';

const ProgramList: React.FC = () => {
  const { user } = useAuth();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    try {
      const userPrograms = user.role === 'TRAINER'
        ? programService.getProgramsByTrainer(user.id)
        : programService.getProgramsByClient(user.id);

      setPrograms(userPrograms);
    } catch (error) {
      console.error('Failed to load programs:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const getTrainerName = (trainerId: string): string => {
    const users = storageService.getUsers();
    const trainer = users.find(u => u.id === trainerId);
    return trainer?.role === 'TRAINER' ? (trainer as any).profile.fullName : 'Unknown';
  };

  const getClientName = (clientId: string): string => {
    const users = storageService.getUsers();
    const client = users.find(u => u.id === clientId);
    return client?.role === 'CLIENT' ? (client as any).profile.fullName : 'Unknown';
  };

  if (loading) {
    return (
      <Layout>
        <div className="programs-page">
          <div className="loading">Loading programs...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="programs-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">
              {user?.role === 'TRAINER' ? 'My Programs' : 'My Training Programs'}
            </h1>
            <p className="page-subtitle">
              {user?.role === 'TRAINER' 
                ? 'Manage workout programs for your clients' 
                : 'Track your fitness journey with structured programs'}
            </p>
          </div>
          {user?.role === 'TRAINER' && (
            <Link to="/programs/create" className="btn btn-primary">
              + Create New Program
            </Link>
          )}
        </div>

        {programs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3 className="empty-title">No Programs Yet</h3>
            <p className="empty-description">
              {user?.role === 'TRAINER' 
                ? 'Create your first workout program for your clients' 
                : 'Ask your trainer to create a program for you'}
            </p>
            {user?.role === 'TRAINER' && (
              <Link to="/programs/create" className="btn btn-primary">
                Create Program
              </Link>
            )}
          </div>
        ) : (
          <div className="programs-grid">
            {programs.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                showTrainerInfo={user?.role === 'CLIENT'}
                trainerName={user?.role === 'CLIENT' ? getTrainerName(program.trainerId) : getClientName(program.clientId)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProgramList;
