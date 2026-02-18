import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useProgramBuilder } from '../../hooks/useProgramBuilder';
import { storageService } from '../../services/storageService';
import { ProgramStatus, DayOfWeek, DayType } from '../../types/enums';
import Layout from '../../components/Layout/Layout';
import ExerciseBuilder from '../../components/Program/ExerciseBuilder';
import './CreateProgram.css';

const CreateProgram: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { formData, weeks, currentWeek, loading, error, actions } = useProgramBuilder(user?.id || '');

  const [clients, setClients] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState<{ week: number; day: DayOfWeek } | null>(null);

  useEffect(() => {
    if (user?.role === 'TRAINER') {
      const trainer = user as any;
      const allUsers = storageService.getUsers();
      const trainerClients = allUsers.filter(u => u.role === 'CLIENT' && trainer.clients.includes(u.id));
      setClients(trainerClients);
    }
  }, [user]);

  const dayOrder: DayOfWeek[] = [
    DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY
  ];

  const handleSave = async (status: ProgramStatus) => {
    const result = await actions.saveProgram(status);
    if (result) {
      navigate(`/programs/${result.id}`);
    }
  };

  const currentWeekData = weeks.find(w => w.weekNumber === currentWeek);

  return (
    <Layout>
      <div className="create-program-page">
        <div className="page-header">
          <button className="back-button" onClick={() => navigate('/programs')}>
            ← Back to Programs
          </button>
          <h1 className="page-title">Create Training Program</h1>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Basic Info */}
        <div className="form-section card">
          <h2 className="section-title">Program Details</h2>
          
          <div className="form-group">
            <label className="form-label">Client *</label>
            <select
              className="input"
              value={formData.clientId}
              onChange={(e) => actions.updateFormData('clientId', e.target.value)}
              required
            >
              <option value="">Select a client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.profile.fullName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Program Title *</label>
            <input
              type="text"
              className="input"
              value={formData.title}
              onChange={(e) => actions.updateFormData('title', e.target.value)}
              placeholder="e.g., 12-Week Strength Building Program"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              className="input"
              value={formData.description}
              onChange={(e) => actions.updateFormData('description', e.target.value)}
              placeholder="Program overview and goals..."
              rows={3}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Date *</label>
              <input
                type="date"
                className="input"
                value={formData.startDate}
                onChange={(e) => actions.updateFormData('startDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Duration (weeks) *</label>
              <select
                className="input"
                value={formData.durationWeeks}
                onChange={(e) => actions.updateFormData('durationWeeks', parseInt(e.target.value))}
              >
                {[4, 8, 12, 16].map(weeks => (
                  <option key={weeks} value={weeks}>{weeks} weeks</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Week Builder */}
        {weeks.length > 0 && (
          <div className="form-section card">
            <div className="section-header">
              <h2 className="section-title">Week {currentWeek} Program</h2>
              <div className="week-navigation">
                <button
                  className="btn btn-secondary"
                  onClick={() => actions.setCurrentWeek(Math.max(1, currentWeek - 1))}
                  disabled={currentWeek === 1}
                >
                  ← Previous Week
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => actions.setCurrentWeek(Math.min(formData.durationWeeks, currentWeek + 1))}
                  disabled={currentWeek === formData.durationWeeks}
                >
                  Next Week →
                </button>
              </div>
            </div>

            {currentWeek > 1 && (
              <div className="week-copy-section">
                <label className="form-label">Copy from previous week?</label>
                <button
                  className="btn btn-secondary"
                  onClick={() => actions.copyWeek(currentWeek - 1, currentWeek)}
                >
                  📋 Copy Week {currentWeek - 1}
                </button>
              </div>
            )}

            <div className="days-grid">
              {currentWeekData && dayOrder.map(day => {
                const dayData = currentWeekData.days.find(d => d.dayOfWeek === day);
                if (!dayData) return null;

                return (
                  <div key={day} className="day-builder card">
                    <div className="day-header">
                      <h3 className="day-name">{day.slice(0, 3)}</h3>
                      <select
                        className="day-type-select"
                        value={dayData.dayType}
                        onChange={(e) => actions.setDayType(currentWeek, day, e.target.value as DayType)}
                      >
                        <option value={DayType.WORKOUT}>Workout</option>
                        <option value={DayType.REST}>Rest</option>
                        <option value={DayType.CARDIO}>Cardio</option>
                        <option value={DayType.ACTIVE_RECOVERY}>Recovery</option>
                      </select>
                    </div>

                    {dayData.dayType === DayType.WORKOUT && (
                      <>
                        <div className="exercise-count">{dayData.exercises.length} exercises</div>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => setSelectedDay({ week: currentWeek, day })}
                        >
                          + Add Exercise
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="form-actions">
          <button
            className="btn btn-secondary"
            onClick={() => handleSave(ProgramStatus.DRAFT)}
            disabled={loading}
          >
            Save as Draft
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSave(ProgramStatus.ACTIVE)}
            disabled={loading || !formData.clientId || !formData.title || !formData.startDate}
          >
            Publish Program
          </button>
        </div>

        {/* Exercise Modal */}
        {selectedDay && (
          <div className="modal-overlay" onClick={() => setSelectedDay(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <ExerciseBuilder
                onSave={(exercise) => {
                  actions.addExercise(selectedDay.week, selectedDay.day, exercise);
                  setSelectedDay(null);
                }}
                onCancel={() => setSelectedDay(null)}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CreateProgram;
