import React from 'react';
import { Week, DayWorkout } from '../../types/interfaces';
import DayCard from './DayCard';
import './WeekCarousel.css';

interface WeekCarouselProps {
  week: Week;
  canGoBack: boolean;
  canGoForward: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onDayClick: (day: DayWorkout) => void;
  currentWeekNumber: number;
  totalWeeks: number;
}

const WeekCarousel: React.FC<WeekCarouselProps> = ({
  week,
  canGoBack,
  canGoForward,
  onPrevious,
  onNext,
  onDayClick,
  currentWeekNumber,
  totalWeeks,
}) => {
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
    const startDay = start.getDate();
    const endDay = end.getDate();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
    }
  };

  return (
    <div className="week-carousel">
      {/* Header with Navigation */}
      <div className="week-carousel-header">
        <button
          className="week-nav-button"
          onClick={onPrevious}
          disabled={!canGoBack}
          aria-label="Previous week"
        >
          <span className="nav-arrow">←</span>
          <span className="nav-text">Previous</span>
        </button>

        <div className="week-info">
          <h2 className="week-title">
            Week {currentWeekNumber} of {totalWeeks}
          </h2>
          <p className="week-dates">
            {formatDateRange(week.startDate, week.endDate)}
          </p>
        </div>

        <button
          className="week-nav-button"
          onClick={onNext}
          disabled={!canGoForward}
          aria-label="Next week"
        >
          <span className="nav-text">Next</span>
          <span className="nav-arrow">→</span>
        </button>
      </div>

      {/* Days Grid */}
      <div className="week-days-grid">
        {week.days.map((day) => (
          <DayCard
            key={`${day.dayOfWeek}-${day.date}`}
            day={day}
            onClick={() => onDayClick(day)}
          />
        ))}
      </div>

      {/* Week Notes */}
      {week.notes && (
        <div className="week-notes">
          <p className="week-notes-label">Week Notes:</p>
          <p className="week-notes-text">{week.notes}</p>
        </div>
      )}
    </div>
  );
};

export default WeekCarousel;
