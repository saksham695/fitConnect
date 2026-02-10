import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { storageService } from '../../services/storageService';
import Layout from '../../components/Layout/Layout';
import './Dashboard.css';

const ClientDashboard: React.FC = () => {
  const { client } = useAuth();

  if (!client) return null;

  const connectedTrainers = client.trainers
    .map((trainerId) => storageService.getTrainerById(trainerId))
    .filter(Boolean);

  const allTrainers = storageService.getTrainers();
  const suggestedTrainers = allTrainers
    .filter((t) => !client.trainers.includes(t.id))
    .slice(0, 3);

  return (
    <Layout>
      <div className="dashboard">
        <h1>Client Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back, {client.profile.fullName || client.email}</p>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-value">{client.goals.length}</div>
            <div className="stat-label">Active Goals</div>
            <Link to="/goals" className="stat-link">
              Manage →
            </Link>
          </div>
          <div className="stat-card">
            <div className="stat-value">{connectedTrainers.length}</div>
            <div className="stat-label">Connected Trainers</div>
            <Link to="/trainers" className="stat-link">
              Find More →
            </Link>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Suggested Trainers</h2>
            <Link to="/trainers" className="view-all-link">
              View All →
            </Link>
          </div>
          {suggestedTrainers.length > 0 ? (
            <div className="trainers-grid">
              {suggestedTrainers.map((trainer) => (
                <Link
                  key={trainer.id}
                  to={`/trainers/${trainer.id}`}
                  className="trainer-card"
                >
                  <div className="trainer-card-header">
                    <h3>{trainer.profile.fullName}</h3>
                    <span className="trainer-experience">
                      {trainer.profile.yearsOfExperience} years exp.
                    </span>
                  </div>
                  <p className="trainer-bio">{trainer.profile.bio || 'No bio available'}</p>
                  <div className="trainer-expertise">
                    {trainer.profile.areasOfExpertise.slice(0, 2).map((exp) => (
                      <span key={exp} className="expertise-tag">
                        {exp}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No suggested trainers at the moment.</p>
            </div>
          )}
        </div>

        <div className="dashboard-actions">
          <Link to="/trainers" className="action-button primary">
            Find Trainers
          </Link>
          <Link to="/goals" className="action-button secondary">
            Manage Goals
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDashboard;
