import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to your FitConnect account</p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}

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
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <p className="login-signup">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

        <div className="login-demo">
          <p>Demo Accounts:</p>
          <div className="login-demo-accounts">
            <button
              type="button"
              onClick={() => {
                setEmail('trainer1@example.com');
                setPassword('password');
              }}
              className="demo-button"
            >
              Trainer 1
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('client1@example.com');
                setPassword('password');
              }}
              className="demo-button"
            >
              Client 1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
