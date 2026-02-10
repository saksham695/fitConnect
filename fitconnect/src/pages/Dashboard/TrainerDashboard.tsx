import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { storageService } from '../../services/storageService';
import Layout from '../../components/Layout/Layout';
import './Dashboard.css';

const TrainerDashboard: React.FC = () => {
  const { trainer } = useAuth();

  if (!trainer) return null;

  const courses = storageService.getCoursesByTrainerId(trainer.id);
  const clients = trainer.clients.map((clientId) =>
    storageService.getClientById(clientId)
  ).filter(Boolean);

  return (
    <Layout>
      <div className="dashboard">
        <h1>Trainer Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back, {trainer.profile.fullName || trainer.email}</p>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-value">{clients.length}</div>
            <div className="stat-label">Total Clients</div>
            <Link to="/clients" className="stat-link">
              View All →
            </Link>
          </div>
          <div className="stat-card">
            <div className="stat-value">{courses.length}</div>
            <div className="stat-label">Total Courses</div>
            <Link to="/courses" className="stat-link">
              View All →
            </Link>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Clients</h2>
            <Link to="/clients" className="view-all-link">
              View All →
            </Link>
          </div>
          {clients.length > 0 ? (
            <div className="clients-grid">
              {clients.slice(0, 3).map((client) => (
                <Link
                  key={client!.id}
                  to={`/clients/${client!.id}`}
                  className="client-card"
                >
                  <div className="client-card-header">
                    <h3>{client!.profile.fullName || client!.email}</h3>
                  </div>
                  <div className="client-card-body">
                    <p className="client-goals">
                      {client!.goals.length > 0
                        ? client!.goals.slice(0, 2).join(', ')
                        : 'No goals set'}
                    </p>
                    <span className="client-level">{client!.profile.fitnessLevel}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No clients yet. Clients will appear here once they connect with you.</p>
            </div>
          )}
        </div>

        <div className="dashboard-actions">
          <Link to="/courses/create" className="action-button primary">
            Create New Course
          </Link>
          <Link to="/profile" className="action-button secondary">
            Edit Profile
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default TrainerDashboard;
