import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { storageService } from '../../services/storageService';
import Layout from '../../components/Layout/Layout';
import './MyCourses.css';

const MyCourses: React.FC = () => {
  const { client } = useAuth();

  if (!client) return null;

  const enrolledCourses = client.enrolledCourses
    .map((courseId) => storageService.getCourseById(courseId))
    .filter(Boolean);

  return (
    <Layout>
      <div className="my-courses-page">
        <h1>My Enrolled Courses</h1>
        <p className="page-subtitle">Courses you're currently enrolled in</p>

        {enrolledCourses.length > 0 ? (
          <div className="courses-grid">
            {enrolledCourses.map((course) => {
              if (!course) return null;
              const trainer = storageService.getTrainerById(course.trainerId);
              
              return (
                <Link key={course.id} to={`/courses/${course.id}`} className="course-card">
                  <div className="course-card-header">
                    <h3>{course.title}</h3>
                    <span className="course-difficulty">{course.difficulty}</span>
                  </div>
                  <p className="course-trainer">
                    By {trainer?.profile.fullName || 'Unknown Trainer'}
                  </p>
                  <p className="course-description">{course.description}</p>
                  <div className="course-meta">
                    <span className="course-duration">{course.duration}</span>
                  </div>
                  {course.targetGoals.length > 0 && (
                    <div className="course-goals">
                      <div className="goals-tags">
                        {course.targetGoals.slice(0, 3).map((goal) => (
                          <span key={goal} className="goal-tag">
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <p>You're not enrolled in any courses yet.</p>
            <p>Connect with trainers to see their courses and get enrolled!</p>
            <Link to="/trainers" className="find-trainers-button">
              Find Trainers
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyCourses;
