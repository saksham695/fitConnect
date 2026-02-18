import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useProgressTracking } from '../../hooks/useProgressTracking';
import Layout from '../../components/Layout/Layout';
import './ProgressTracking.css';

const ProgressTracking: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { latestProgress, loading, error, actions } = useProgressTracking(user?.id || '');

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    chest: '',
    waist: '',
    hips: '',
    biceps: '',
    thighs: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const snapshot = await actions.logProgress({
      date: formData.date,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
      measurements: {
        chest: formData.chest ? parseFloat(formData.chest) : undefined,
        waist: formData.waist ? parseFloat(formData.waist) : undefined,
        hips: formData.hips ? parseFloat(formData.hips) : undefined,
        biceps: formData.biceps ? parseFloat(formData.biceps) : undefined,
        thighs: formData.thighs ? parseFloat(formData.thighs) : undefined,
      },
      notes: formData.notes || undefined,
    });

    if (snapshot) {
      navigate('/progress/history');
    }
  };

  return (
    <Layout>
      <div className="progress-tracking-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Log Progress</h1>
            <p className="page-subtitle">Track your fitness journey</p>
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/progress/history')}
          >
            View History
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Latest Progress Summary */}
        {latestProgress && (
          <div className="latest-progress card">
            <h3 className="card-title">Latest Entry</h3>
            <div className="latest-stats">
              {latestProgress.weight && (
                <div className="stat-item">
                  <span className="stat-label">Weight</span>
                  <span className="stat-value">{latestProgress.weight} kg</span>
                </div>
              )}
              <div className="stat-item">
                <span className="stat-label">Date</span>
                <span className="stat-value">
                  {new Date(latestProgress.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="progress-form card">
          <h2 className="section-title">New Entry</h2>

          <div className="form-group">
            <label className="form-label">Date *</label>
            <input
              type="date"
              className="input"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              className="input"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="75.5"
            />
          </div>

          <h3 className="subsection-title">Measurements (cm)</h3>
          
          <div className="measurements-grid">
            <div className="form-group">
              <label className="form-label">Chest</label>
              <input
                type="number"
                step="0.1"
                className="input"
                value={formData.chest}
                onChange={(e) => setFormData({ ...formData, chest: e.target.value })}
                placeholder="98"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Waist</label>
              <input
                type="number"
                step="0.1"
                className="input"
                value={formData.waist}
                onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                placeholder="85"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Hips</label>
              <input
                type="number"
                step="0.1"
                className="input"
                value={formData.hips}
                onChange={(e) => setFormData({ ...formData, hips: e.target.value })}
                placeholder="95"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Biceps</label>
              <input
                type="number"
                step="0.1"
                className="input"
                value={formData.biceps}
                onChange={(e) => setFormData({ ...formData, biceps: e.target.value })}
                placeholder="38"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Thighs</label>
              <input
                type="number"
                step="0.1"
                className="input"
                value={formData.thighs}
                onChange={(e) => setFormData({ ...formData, thighs: e.target.value })}
                placeholder="58"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              className="input"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="How are you feeling? Any observations..."
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Progress'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ProgressTracking;
