import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Program, DayWorkout, Trainer, Client } from '../../types/interfaces';
import { programService } from '../../services/programService';
import { storageService } from '../../services/storageService';
import { useProgramCalendar } from '../../hooks/useProgramCalendar';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/Layout/Layout';
import WeekCarousel from '../../components/Program/WeekCarousel';
import DayWorkoutModal from '../../components/Program/DayWorkoutModal';
import './ProgramCalendar.css';

const ProgramCalendar: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [program, setProgram] = useState<Program | null>(null);
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayWorkout | null>(null);
  const [loading, setLoading] = useState(true);

  // Load program and user details
  useEffect(() => {
    if (!programId) return;

    setLoading(true);
    try {
      const loadedProgram = programService.getProgramById(programId);
      if (loadedProgram) {
        setProgram(loadedProgram);
        
        // Load trainer and client details
        const users = storageService.getUsers();
        const trainerData = users.find(u => u.id === loadedProgram.trainerId && u.role === 'TRAINER') as Trainer;
        const clientData = users.find(u => u.id === loadedProgram.clientId && u.role === 'CLIENT') as Client;
        
        setTrainer(trainerData || null);
        setClient(clientData || null);
      } else {
        navigate('/programs');
      }
    } catch (error) {
      console.error('Failed to load program:', error);
      navigate('/programs');
    } finally {
      setLoading(false);
    }
  }, [programId, navigate]);

  // Use calendar hook
  const {
    currentWeek,
    currentWeekNumber,
    weekProgress,
    navigation,
  } = useProgramCalendar(program);

  const handleDayClick = (day: DayWorkout) => {
    setSelectedDay(day);
  };

  const handleCloseModal = () => {
    setSelectedDay(null);
  };

  const handleWorkoutUpdate = () => {
    // Reload program
    if (programId) {
      const updated = programService.getProgramById(programId);
      if (updated) {
        setProgram(updated);
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="program-calendar-page">
          <div className="loading">Loading program...</div>
        </div>
      </Layout>
    );
  }

  if (!program || !currentWeek) {
    return (
      <Layout>
        <div className="program-calendar-page">
          <div className="error">Program not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="program-calendar-page">
        {/* Program Header */}
        <div className="program-header">
          <button
            className="back-button"
            onClick={() => navigate('/programs')}
          >
            ← Back to Programs
          </button>
          <h1 className="program-title">{program.title}</h1>
          <p className="program-description">{program.description}</p>
          
          {/* Coach and Client Details */}
          <div className="program-participants">
            {trainer && (
              <div className="participant-card coach-card">
                <div className="participant-avatar">👨‍🏫</div>
                <div className="participant-info">
                  <span className="participant-role">Coach</span>
                  <h3 className="participant-name">{trainer.profile.fullName}</h3>
                  <div className="participant-details">
                    {trainer.profile.yearsOfExperience && (
                      <span className="detail-item">
                        💪 {trainer.profile.yearsOfExperience} years experience
                      </span>
                    )}
                    {trainer.profile.areasOfExpertise && trainer.profile.areasOfExpertise.length > 0 && (
                      <span className="detail-item">
                        🎯 {trainer.profile.areasOfExpertise.slice(0, 2).join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {client && (
              <div className="participant-card client-card">
                <div className="participant-avatar">👤</div>
                <div className="participant-info">
                  <span className="participant-role">Client</span>
                  <h3 className="participant-name">{client.profile.fullName}</h3>
                  <div className="participant-details">
                    {client.profile.fitnessLevel && (
                      <span className="detail-item">
                        📊 {client.profile.fitnessLevel}
                      </span>
                    )}
                    {client.goals && client.goals.length > 0 && (
                      <span className="detail-item">
                        🎯 {client.goals.length} active goals
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Program Info */}
          <div className="program-info-bar">
            <div className="info-item">
              <span className="info-icon">📅</span>
              <div className="info-content">
                <span className="info-label">Start Date</span>
                <span className="info-value">
                  {new Date(program.startDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">⏱️</span>
              <div className="info-content">
                <span className="info-label">Duration</span>
                <span className="info-value">{program.durationWeeks} weeks</span>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📈</span>
              <div className="info-content">
                <span className="info-label">Status</span>
                <span className={`info-value status-${program.status.toLowerCase()}`}>
                  {program.status}
                </span>
              </div>
            </div>
          </div>
          
          {/* Progress Summary */}
          <div className="progress-summary">
            <div className="progress-stat">
              <span className="stat-value">{weekProgress.completed}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="progress-stat">
              <span className="stat-value">{weekProgress.percentage}%</span>
              <span className="stat-label">Week Progress</span>
            </div>
            <div className="progress-stat">
              <span className="stat-value">{currentWeekNumber}/{program.durationWeeks}</span>
              <span className="stat-label">Weeks</span>
            </div>
          </div>
        </div>

        {/* Week Calendar */}
        <div className="calendar-container">
          <WeekCarousel
            week={currentWeek}
            canGoBack={navigation.canGoBack}
            canGoForward={navigation.canGoForward}
            onPrevious={navigation.goToPreviousWeek}
            onNext={navigation.goToNextWeek}
            onDayClick={handleDayClick}
            currentWeekNumber={currentWeekNumber}
            totalWeeks={program.durationWeeks}
          />
        </div>

        {/* Day Workout Modal - CRITICAL: Modal state managed here, week navigation in carousel */}
        {selectedDay && (
          <DayWorkoutModal
            day={selectedDay}
            program={program}
            weekNumber={currentWeekNumber}
            onClose={handleCloseModal}
            onUpdate={handleWorkoutUpdate}
          />
        )}
      </div>
    </Layout>
  );
};

export default ProgramCalendar;
