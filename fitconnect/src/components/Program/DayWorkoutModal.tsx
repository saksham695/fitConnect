import React from 'react';
import { DayWorkout, Program } from '../../types/interfaces';
import { WorkoutStatus, DayType } from '../../types/enums';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './DayWorkoutModal.css';

interface DayWorkoutModalProps {
  day: DayWorkout;
  program: Program;
  weekNumber: number;
  onClose: () => void;
  onUpdate: () => void;
}

const DayWorkoutModal: React.FC<DayWorkoutModalProps> = ({
  day,
  program,
  weekNumber,
  onClose,
  onUpdate,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getDayLabel = (dayOfWeek: string) => {
    return dayOfWeek.charAt(0) + dayOfWeek.slice(1).toLowerCase();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleStartWorkout = () => {
    onClose();
    navigate(`/programs/${program.id}/workout/${weekNumber}/${day.dayOfWeek}`);
  };

  const handleViewLog = () => {
    // Navigate to log view
    onClose();
  };

  const getStatusBadge = () => {
    switch (day.status) {
      case WorkoutStatus.REVIEWED:
        return <span className="status-badge reviewed">✅ Reviewed</span>;
      case WorkoutStatus.SUBMITTED:
        return <span className="status-badge submitted">📝 Submitted</span>;
      case WorkoutStatus.IN_PROGRESS:
        return <span className="status-badge in-progress">⏳ In Progress</span>;
      case WorkoutStatus.PENDING:
        return <span className="status-badge pending">⏳ Not Started</span>;
      case WorkoutStatus.LOCKED:
        return <span className="status-badge locked">🔒 Locked</span>;
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content day-workout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{getDayLabel(day.dayOfWeek)}'s Workout</h2>
            <p className="modal-subtitle">{formatDate(day.date)}</p>
          </div>
          {getStatusBadge()}
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {day.dayType === DayType.REST ? (
            <div className="rest-day-message">
              <div className="rest-icon">💤</div>
              <h3>Rest Day</h3>
              <p>Take today to recover and prepare for your next workout</p>
            </div>
          ) : (
            <>
              {day.notes && (
                <div className="workout-notes">
                  <p className="notes-label">Trainer Notes:</p>
                  <p className="notes-text">{day.notes}</p>
                </div>
              )}

              {day.exercises.length === 0 ? (
                <div className="no-exercises">
                  <p>No exercises assigned for this day</p>
                </div>
              ) : (
                <div className="exercises-list">
                  <h3 className="exercises-title">Exercises ({day.exercises.length})</h3>
                  {day.exercises.map((exercise, index) => (
                    <div key={exercise.id} className="exercise-item">
                      <div className="exercise-number">{index + 1}</div>
                      <div className="exercise-details">
                        <h4 className="exercise-name">{exercise.name}</h4>
                        <div className="exercise-specs">
                          <span className="spec">{exercise.sets} sets</span>
                          <span className="spec-divider">×</span>
                          <span className="spec">{exercise.reps} reps</span>
                          {exercise.weight && (
                            <>
                              <span className="spec-divider">@</span>
                              <span className="spec">{exercise.weight}</span>
                            </>
                          )}
                          {exercise.restSeconds && (
                            <>
                              <span className="spec-divider">•</span>
                              <span className="spec-rest">{exercise.restSeconds}s rest</span>
                            </>
                          )}
                        </div>
                        {exercise.description && (
                          <p className="exercise-description">{exercise.description}</p>
                        )}
                        {exercise.notes && (
                          <p className="exercise-notes">Note: {exercise.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Client Workout Log */}
              {day.clientLog && (
                <div className="client-log">
                  <h3 className="log-title">Your Log</h3>
                  <div className="log-summary">
                    {day.clientLog.rating && (
                      <div className="log-item">
                        <span className="log-label">Rating:</span>
                        <span className="log-value">{'⭐'.repeat(day.clientLog.rating)}</span>
                      </div>
                    )}
                    {day.clientLog.duration && (
                      <div className="log-item">
                        <span className="log-label">Duration:</span>
                        <span className="log-value">{day.clientLog.duration} minutes</span>
                      </div>
                    )}
                  </div>
                  {day.clientLog.overallNotes && (
                    <p className="log-notes">{day.clientLog.overallNotes}</p>
                  )}
                </div>
              )}

              {/* Trainer Review */}
              {day.trainerReview && (
                <div className="trainer-review">
                  <h3 className="review-title">Trainer Feedback</h3>
                  <div className="review-rating">
                    {'⭐'.repeat(day.trainerReview.rating)}
                  </div>
                  <p className="review-feedback">{day.trainerReview.feedback}</p>
                  {day.trainerReview.encouragement && (
                    <p className="review-encouragement">💪 {day.trainerReview.encouragement}</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <div className="modal-footer">
          {user?.role === 'CLIENT' && day.dayType !== DayType.REST && day.status === WorkoutStatus.PENDING && (
            <button className="btn btn-primary" onClick={handleStartWorkout}>
              Start Workout
            </button>
          )}
          {user?.role === 'CLIENT' && (day.status === WorkoutStatus.SUBMITTED || day.status === WorkoutStatus.REVIEWED) && (
            <button className="btn btn-secondary" onClick={handleViewLog}>
              View Log Details
            </button>
          )}
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayWorkoutModal;
