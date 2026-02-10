import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { storageService } from '../../services/storageService';
import { CourseDifficulty } from '../../types/enums';
import { v4 as uuidv4 } from 'uuid';
import Layout from '../../components/Layout/Layout';
import './CreateCourse.css';

const CreateCourse: React.FC = () => {
  const { trainer } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<CourseDifficulty>(CourseDifficulty.BEGINNER);
  const [duration, setDuration] = useState('');
  const [targetGoals, setTargetGoals] = useState<string[]>([]);
  const [currentGoal, setCurrentGoal] = useState('');

  if (!trainer) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const course = {
      id: uuidv4(),
      trainerId: trainer.id,
      title,
      description,
      difficulty,
      targetGoals,
      duration,
      createdAt: new Date().toISOString(),
    };

    storageService.createCourse(course);
    navigate('/courses');
  };

  const addGoal = () => {
    if (currentGoal && !targetGoals.includes(currentGoal)) {
      setTargetGoals([...targetGoals, currentGoal]);
      setCurrentGoal('');
    }
  };

  const removeGoal = (goal: string) => {
    setTargetGoals(targetGoals.filter((g) => g !== goal));
  };

  return (
    <Layout>
      <div className="create-course-page">
        <h1>Create New Course</h1>
        <p className="page-subtitle">Share your expertise with clients</p>

        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-group">
            <label htmlFor="title">Course Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g., 4-Week Strength Training Program"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={6}
              placeholder="Describe what clients will learn and achieve..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="difficulty">Difficulty Level</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as CourseDifficulty)}
                required
              >
                <option value={CourseDifficulty.BEGINNER}>Beginner</option>
                <option value={CourseDifficulty.INTERMEDIATE}>Intermediate</option>
                <option value={CourseDifficulty.ADVANCED}>Advanced</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <input
                id="duration"
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                placeholder="e.g., 4 weeks"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Target Goals</label>
            <div className="goals-input">
              <input
                type="text"
                value={currentGoal}
                onChange={(e) => setCurrentGoal(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGoal())}
                placeholder="Enter a goal and press Enter"
              />
              <button type="button" onClick={addGoal}>
                Add
              </button>
            </div>
            <div className="tags-container">
              {targetGoals.map((goal) => (
                <span key={goal} className="tag">
                  {goal}
                  <button
                    type="button"
                    onClick={() => removeGoal(goal)}
                    className="tag-remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/courses')} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Create Course
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCourse;
