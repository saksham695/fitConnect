import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing: React.FC = () => {
  return (
    <div className="landing">
      <div className="landing-hero">
        <h1 className="landing-title">FitConnect</h1>
        <p className="landing-subtitle">
          Connect with fitness professionals and achieve your health goals
        </p>
        <div className="landing-cta">
          <Link to="/signup" className="landing-button landing-button-primary">
            Get Started
          </Link>
          <Link to="/login" className="landing-button landing-button-secondary">
            Sign In
          </Link>
        </div>
      </div>
      <div className="landing-features">
        <div className="landing-feature">
          <h3>For Trainers</h3>
          <p>Showcase your expertise, create courses, and connect with clients</p>
        </div>
        <div className="landing-feature">
          <h3>For Clients</h3>
          <p>Discover trainers, set goals, and track your fitness journey</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
