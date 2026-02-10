import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/enums';
import './Signup.css';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!role) {
      setError('Please select a role');
      return;
    }

    const success = await signup(email, password, role);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Signup failed. Email may already be in use.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join FitConnect and start your fitness journey</p>

        <form onSubmit={handleSubmit} className="signup-form">
          {error && <div className="signup-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="role">I am a</label>
            <div className="role-selector">
              <button
                type="button"
                className={`role-button ${role === UserRole.TRAINER ? 'active' : ''}`}
                onClick={() => setRole(UserRole.TRAINER)}
              >
                Trainer
              </button>
              <button
                type="button"
                className={`role-button ${role === UserRole.CLIENT ? 'active' : ''}`}
                onClick={() => setRole(UserRole.CLIENT)}
              >
                Client
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <button type="submit" className="signup-button" disabled={!role}>
            Create Account
          </button>
        </form>

        <p className="signup-login">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
