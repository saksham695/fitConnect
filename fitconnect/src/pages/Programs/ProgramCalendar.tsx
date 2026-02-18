import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Program, DayWorkout } from '../../types/interfaces';
import { programService } from '../../services/programService';
import { useProgramCalendar } from '../../hooks/useProgramCalendar';
import Layout from '../../components/Layout/Layout';
import WeekCarousel from '../../components/Program/WeekCarousel';
import DayWorkoutModal from '../../components/Program/DayWorkoutModal';
import './ProgramCalendar.css';

const ProgramCalendar: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const [program, setProgram] = useState<Program | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayWorkout | null>(null);
  const [loading, setLoading] = useState(true);

  // Load program
  useEffect(() => {
    if (!programId) return;

    setLoading(true);
    try {
      const loadedProgram = programService.getProgramById(programId);
      if (loadedProgram) {
        setProgram(loadedProgram);
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
