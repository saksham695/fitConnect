import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { storageService } from '../../services/storageService';
import Layout from '../../components/Layout/Layout';
import './CourseList.css';

const CourseList: React.FC = () => {
  const { trainer } = useAuth();

  if (!trainer) return null;

  const courses = storageService.getCoursesByTrainerId(trainer.id);

  return (
    <Layout>
      <div className="course-list-page">
        <div className="page-header">
          <h1>My Courses</h1>
          <Link to="/courses/create" className="create-button">
            Create New Course
          </Link>
        </div>

        {courses.length > 0 ? (
          <div className="courses-grid">
            {courses.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`} className="course-card">
                <h3>{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                  <span className="course-difficulty">{course.difficulty}</span>
                  <span className="course-duration">{course.duration}</span>
                </div>
                {course.targetGoals.length > 0 && (
                  <div className="course-goals">
                    <strong>Target Goals:</strong>
                    <div className="goals-tags">
                      {course.targetGoals.map((goal) => (
                        <span key={goal} className="goal-tag">
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>You haven't created any courses yet.</p>
            <Link to="/courses/create" className="create-button">
              Create Your First Course
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CourseList;
