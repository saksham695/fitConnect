import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { storageService } from '../../services/storageService';
import Layout from '../../components/Layout/Layout';
import './ClientList.css';

const ClientList: React.FC = () => {
  const { trainer } = useAuth();

  if (!trainer) return null;

  const clients = trainer.clients
    .map((clientId) => storageService.getClientById(clientId))
    .filter(Boolean);

  return (
    <Layout>
      <div className="client-list-page">
        <h1>My Clients</h1>
        <p className="page-subtitle">Manage your connected clients</p>

        {clients.length > 0 ? (
          <div className="clients-grid">
            {clients.map((client) => (
              <Link
                key={client!.id}
                to={`/clients/${client!.id}`}
                className="client-card"
              >
                <div className="client-card-header">
                  <h3>{client!.profile.fullName || client!.email}</h3>
                </div>
                <div className="client-card-body">
                  {client!.profile.age && (
                    <p className="client-age">Age: {client!.profile.age}</p>
                  )}
                  <p className="client-level">
                    Fitness Level: <strong>{client!.profile.fitnessLevel}</strong>
                  </p>
                  {client!.goals.length > 0 ? (
                    <div className="client-goals">
                      <strong>Goals:</strong>
                      <div className="goals-list">
                        {client!.goals.map((goal) => (
                          <span key={goal} className="goal-tag">
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="no-goals">No goals set</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>You don't have any connected clients yet.</p>
            <p>Clients will appear here once they connect with you.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ClientList;
