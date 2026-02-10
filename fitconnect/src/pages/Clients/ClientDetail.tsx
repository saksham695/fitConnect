import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { storageService } from '../../services/storageService';
import Layout from '../../components/Layout/Layout';
import './ClientDetail.css';

const ClientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    navigate('/clients');
    return null;
  }

  const client = storageService.getClientById(id);

  if (!client) {
    return (
      <Layout>
        <div className="error-state">
          <p>Client not found</p>
          <Link to="/clients">Back to Clients</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="client-detail">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="client-detail-header">
          <h1>{client.profile.fullName || client.email}</h1>
        </div>

        <div className="client-detail-content">
          <div className="detail-section">
            <h2>Profile Information</h2>
            <div className="info-grid">
              {client.profile.age && (
                <div className="info-item">
                  <strong>Age:</strong> {client.profile.age}
                </div>
              )}
              <div className="info-item">
                <strong>Fitness Level:</strong> {client.profile.fitnessLevel}
              </div>
              <div className="info-item">
                <strong>Email:</strong> {client.email}
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h2>Fitness Goals</h2>
            {client.goals.length > 0 ? (
              <div className="goals-list">
                {client.goals.map((goal) => (
                  <span key={goal} className="goal-tag">
                    {goal}
                  </span>
                ))}
              </div>
            ) : (
              <p className="empty-text">No goals set</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDetail;
