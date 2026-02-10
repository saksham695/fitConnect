import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { storageService } from '../../services/storageService';
import { FitnessLevel } from '../../types/enums';
import Layout from '../../components/Layout/Layout';
import './Profile.css';

const Profile: React.FC = () => {
  const { user, trainer, client, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [fullName, setFullName] = useState(
    trainer?.profile.fullName || client?.profile.fullName || ''
  );
  const [bio, setBio] = useState(trainer?.profile.bio || '');
  const [yearsOfExperience, setYearsOfExperience] = useState(
    trainer?.profile.yearsOfExperience || 0
  );
  const [areasOfExpertise, setAreasOfExpertise] = useState<string[]>(
    trainer?.profile.areasOfExpertise || []
  );
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel>(
    client?.profile.fitnessLevel || FitnessLevel.BEGINNER
  );
  const [age, setAge] = useState(client?.profile.age?.toString() || '');
  const [goals, setGoals] = useState<string[]>(client?.goals || []);
  const [currentGoal, setCurrentGoal] = useState('');

  const handleSave = () => {
    if (!user) return;

    if (user.role === 'TRAINER' && trainer) {
      trainer.profile = {
        ...trainer.profile,
        fullName,
        bio,
        yearsOfExperience,
        areasOfExpertise,
      };
      storageService.updateTrainer(trainer);
      updateUser(trainer);
    } else if (user.role === 'CLIENT' && client) {
      client.profile = {
        ...client.profile,
        fullName,
        fitnessLevel,
        age: age ? parseInt(age) : undefined,
      };
      client.goals = goals;
      storageService.updateClient(client);
      updateUser(client);
    }

    setIsEditing(false);
  };

  const addExpertise = () => {
    const expertise = prompt('Enter area of expertise:');
    if (expertise && !areasOfExpertise.includes(expertise)) {
      setAreasOfExpertise([...areasOfExpertise, expertise]);
    }
  };

  const removeExpertise = (expertise: string) => {
    setAreasOfExpertise(areasOfExpertise.filter((e) => e !== expertise));
  };

  const addGoal = () => {
    if (currentGoal && !goals.includes(currentGoal)) {
      setGoals([...goals, currentGoal]);
      setCurrentGoal('');
    }
  };

  const removeGoal = (goal: string) => {
    setGoals(goals.filter((g) => g !== goal));
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="profile-page">
        <div className="profile-header">
          <h1>My Profile</h1>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Edit Profile
            </button>
          ) : (
            <div className="profile-actions">
              <button onClick={() => setIsEditing(false)} className="cancel-button">
                Cancel
              </button>
              <button onClick={handleSave} className="save-button">
                Save Changes
              </button>
            </div>
          )}
        </div>

        {!isEditing ? (
          <div className="profile-view">
            <div className="profile-info">
              <h2>{fullName || 'No name set'}</h2>
              {user.role === 'TRAINER' && trainer && (
                <>
                  <p className="profile-bio">{bio || 'No bio set'}</p>
                  <div className="profile-details">
                    <div className="detail-item">
                      <strong>Years of Experience:</strong> {yearsOfExperience}
                    </div>
                    <div className="detail-item">
                      <strong>Areas of Expertise:</strong>
                      <div className="tags-container">
                        {areasOfExpertise.length > 0 ? (
                          areasOfExpertise.map((exp) => (
                            <span key={exp} className="tag">
                              {exp}
                            </span>
                          ))
                        ) : (
                          <span className="tag-empty">None added</span>
                        )}
                      </div>
                    </div>
                    <div className="detail-item">
                      <strong>Achievements:</strong>
                      <div className="achievements-list">
                        {trainer.profile.achievements.length > 0 ? (
                          trainer.profile.achievements.map((ach) => (
                            <div key={ach.id} className="achievement-item">
                              <strong>{ach.title}</strong>
                              {ach.description && <p>{ach.description}</p>}
                              {ach.date && <span className="achievement-date">{ach.date}</span>}
                            </div>
                          ))
                        ) : (
                          <span className="tag-empty">No achievements added</span>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {user.role === 'CLIENT' && client && (
                <>
                  {age && (
                    <div className="detail-item">
                      <strong>Age:</strong> {age}
                    </div>
                  )}
                  <div className="detail-item">
                    <strong>Fitness Level:</strong> {fitnessLevel}
                  </div>
                  <div className="detail-item">
                    <strong>Goals:</strong>
                    <div className="tags-container">
                      {goals.length > 0 ? (
                        goals.map((goal) => (
                          <span key={goal} className="tag">
                            {goal}
                          </span>
                        ))
                      ) : (
                        <span className="tag-empty">No goals set</span>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="profile-edit">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {user.role === 'TRAINER' ? (
              <>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="form-group">
                  <label>Years of Experience</label>
                  <input
                    type="number"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Areas of Expertise</label>
                  <div className="tags-container">
                    {areasOfExpertise.map((exp) => (
                      <span key={exp} className="tag">
                        {exp}
                        <button
                          type="button"
                          onClick={() => removeExpertise(exp)}
                          className="tag-remove"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <button type="button" onClick={addExpertise} className="tag-add">
                      + Add
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Age (Optional)</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label>Fitness Level</label>
                  <select
                    value={fitnessLevel}
                    onChange={(e) => setFitnessLevel(e.target.value as FitnessLevel)}
                  >
                    <option value={FitnessLevel.BEGINNER}>Beginner</option>
                    <option value={FitnessLevel.INTERMEDIATE}>Intermediate</option>
                    <option value={FitnessLevel.ADVANCED}>Advanced</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Fitness Goals</label>
                  <div className="goals-input">
                    <input
                      type="text"
                      value={currentGoal}
                      onChange={(e) => setCurrentGoal(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGoal())}
                      placeholder="Enter a goal"
                    />
                    <button type="button" onClick={addGoal}>
                      Add
                    </button>
                  </div>
                  <div className="tags-container">
                    {goals.map((goal) => (
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
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
