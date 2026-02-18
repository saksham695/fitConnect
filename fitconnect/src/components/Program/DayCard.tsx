import React from 'react';
import { DayWorkout } from '../../types/interfaces';
import { WorkoutStatus, DayType } from '../../types/enums';
import './DayCard.css';

interface DayCardProps {
  day: DayWorkout;
  onClick: () => void;
}

const DayCard: React.FC<DayCardProps> = ({ day, onClick }) => {
  const today = new Date().toISOString().split('T')[0];
  const isToday = day.date === today;

  const getDayName = (dayOfWeek: string) => {
    return dayOfWeek.charAt(0) + dayOfWeek.slice(1, 3).toLowerCase();
  };

  const getDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.getDate();
  };

  const getStatusIcon = (status: WorkoutStatus, dayType: DayType) => {
    if (dayType === DayType.REST) {
      return '💤';
    }

    switch (status) {
      case WorkoutStatus.REVIEWED:
        return '✅';
      case WorkoutStatus.SUBMITTED:
        return '📝';
      case WorkoutStatus.IN_PROGRESS:
        return '⏳';
      case WorkoutStatus.PENDING:
        return '⏳';
      case WorkoutStatus.LOCKED:
        return '🔒';
      default:
        return '';
    }
  };

  const getStatusClass = (status: WorkoutStatus, dayType: DayType) => {
    if (dayType === DayType.REST) {
      return 'day-card-rest';
    }

    switch (status) {
      case WorkoutStatus.REVIEWED:
        return 'day-card-completed';
      case WorkoutStatus.SUBMITTED:
        return 'day-card-submitted';
      case WorkoutStatus.IN_PROGRESS:
        return 'day-card-in-progress';
      case WorkoutStatus.PENDING:
        return 'day-card-pending';
      case WorkoutStatus.LOCKED:
        return 'day-card-locked';
      default:
        return '';
    }
  };

  const canClick = day.status !== WorkoutStatus.LOCKED || day.dayType !== DayType.REST;

  return (
    <button
      className={`day-card ${getStatusClass(day.status, day.dayType)} ${isToday ? 'day-card-today' : ''}`}
      onClick={onClick}
      disabled={!canClick}
    >
      <div className="day-card-header">
        <span className="day-name">{getDayName(day.dayOfWeek)}</span>
        <span className="day-date">{getDate(day.date)}</span>
      </div>
      
      <div className="day-card-status">
        <span className="status-icon">{getStatusIcon(day.status, day.dayType)}</span>
      </div>

      <div className="day-card-footer">
        {day.dayType === DayType.REST && (
          <span className="day-type-label">Rest</span>
        )}
        {day.dayType === DayType.CARDIO && (
          <span className="day-type-label">Cardio</span>
        )}
        {day.dayType === DayType.ACTIVE_RECOVERY && (
          <span className="day-type-label">Recovery</span>
        )}
        {day.dayType === DayType.WORKOUT && day.exercises.length > 0 && (
          <span className="exercise-count">{day.exercises.length} exercises</span>
        )}
      </div>
    </button>
  );
};

export default DayCard;
