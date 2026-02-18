import React from 'react';
import { Program } from '../../types/interfaces';
import { programService } from '../../services/programService';
import { Link } from 'react-router-dom';
import './ProgramCard.css';

interface ProgramCardProps {
  program: Program;
  showTrainerInfo?: boolean;
  trainerName?: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, showTrainerInfo = false, trainerName }) => {
  const completion = programService.calculateCompletionPercentage(program);
  const currentWeek = programService.getCurrentWeek(program);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'badge-success';
      case 'COMPLETED':
        return 'badge-primary';
      case 'PAUSED':
        return 'badge-warning';
      case 'DRAFT':
        return 'badge-secondary';
      default:
        return 'badge-secondary';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="program-card">
      <div className="program-card-header">
        <div className="program-card-title-section">
          <h3 className="program-card-title">{program.title}</h3>
          {showTrainerInfo && trainerName && (
            <p className="program-card-trainer">with Coach {trainerName}</p>
          )}
        </div>
        <span className={`badge ${getStatusBadgeClass(program.status)}`}>
          {program.status}
        </span>
      </div>

      <p className="program-card-description">{program.description}</p>

      <div className="program-card-progress">
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${completion}%` }}
          />
        </div>
        <span className="progress-text">{completion}% Complete</span>
      </div>

      <div className="program-card-meta">
        <div className="meta-item">
          <span className="meta-label">Week</span>
          <span className="meta-value">{currentWeek?.weekNumber || 1} of {program.durationWeeks}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Started</span>
          <span className="meta-value">{formatDate(program.startDate)}</span>
        </div>
      </div>

      <Link to={`/programs/${program.id}`} className="program-card-button">
        Open Program →
      </Link>
    </div>
  );
};

export default ProgramCard;
