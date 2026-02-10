import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { storageService } from '../../services/storageService';
import Layout from '../../components/Layout/Layout';
import './Goals.css';

const Goals: React.FC = () => {
  const { client, updateUser } = useAuth();
  const [currentGoal, setCurrentGoal] = useState('');

  if (!client) return null;

  const addGoal = () => {
    if (currentGoal && !client.goals.includes(currentGoal)) {
      const updatedClient = {
        ...client,
        goals: [...client.goals, currentGoal],
      };
      storageService.updateClient(updatedClient);
      updateUser(updatedClient);
      setCurrentGoal('');
    }
  };

  const removeGoal = (goal: string) => {
    const updatedClient = {
      ...client,
      goals: client.goals.filter((g) => g !== goal),
    };
    storageService.updateClient(updatedClient);
    updateUser(updatedClient);
  };

  return (
    <Layout>
      <div className="goals-page">
        <h1>My Fitness Goals</h1>
        <p className="page-subtitle">Track and manage your fitness objectives</p>

        <div className="goals-section">
          <div className="add-goal-section">
            <h2>Add New Goal</h2>
            <div className="goals-input">
              <input
                type="text"
                value={currentGoal}
                onChange={(e) => setCurrentGoal(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGoal())}
                placeholder="Enter a fitness goal..."
              />
              <button onClick={addGoal} className="add-button">
                Add Goal
              </button>
            </div>
          </div>

          <div className="goals-list-section">
            <h2>Current Goals ({client.goals.length})</h2>
            {client.goals.length > 0 ? (
              <div className="goals-grid">
                {client.goals.map((goal) => (
                  <div key={goal} className="goal-card">
                    <span className="goal-text">{goal}</span>
                    <button
                      onClick={() => removeGoal(goal)}
                      className="remove-button"
                      title="Remove goal"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No goals set yet. Add your first goal above!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Goals;
