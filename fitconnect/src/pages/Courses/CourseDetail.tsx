import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { storageService } from '../../services/storageService';
import Layout from '../../components/Layout/Layout';
import './CourseDetail.css';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    navigate('/courses');
    return null;
  }

  const course = storageService.getCourseById(id);
  const trainer = course ? storageService.getTrainerById(course.trainerId) : null;

  if (!course) {
    return (
      <Layout>
        <div className="error-state">
          <p>Course not found</p>
          <Link to="/courses">Back to Courses</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="course-detail">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="course-detail-header">
          <h1>{course.title}</h1>
          {trainer && (
            <Link to={`/trainers/${trainer.id}`} className="trainer-link">
              By {trainer.profile.fullName}
            </Link>
          )}
        </div>

        <div className="course-meta-info">
          <span className="course-difficulty">{course.difficulty}</span>
          <span className="course-duration">{course.duration}</span>
        </div>

        <div className="course-content">
          <div className="detail-section">
            <h2>Description</h2>
            <p className="course-description">{course.description}</p>
          </div>

          {course.targetGoals.length > 0 && (
            <div className="detail-section">
              <h2>Target Goals</h2>
              <div className="goals-list">
                {course.targetGoals.map((goal) => (
                  <span key={goal} className="goal-tag">
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;
