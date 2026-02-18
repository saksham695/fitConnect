import React, { useState, useEffect } from 'react';
import { Exercise } from '../../types/interfaces';
import { exerciseLibraryService } from '../../services/exerciseLibraryService';
import './ExerciseBuilder.css';

interface ExerciseBuilderProps {
  exercise?: Exercise;
  onSave: (exercise: Omit<Exercise, 'id' | 'orderIndex'>) => void;
  onCancel: () => void;
  onRemove?: () => void;
}

const ExerciseBuilder: React.FC<ExerciseBuilderProps> = ({
  exercise,
  onSave,
  onCancel,
  onRemove,
}) => {
  const [name, setName] = useState(exercise?.name || '');
  const [sets, setSets] = useState(exercise?.sets?.toString() || '3');
  const [reps, setReps] = useState(exercise?.reps || '10');
  const [weight, setWeight] = useState(exercise?.weight || '');
  const [restSeconds, setRestSeconds] = useState(exercise?.restSeconds?.toString() || '60');
  const [tempo, setTempo] = useState(exercise?.tempo || '');
  const [description, setDescription] = useState(exercise?.description || '');
  const [notes, setNotes] = useState(exercise?.notes || '');
  const [showExerciseList, setShowExerciseList] = useState(false);

  const exerciseNames = exerciseLibraryService.getExerciseNames();
  const filteredExercises = exerciseNames.filter(ex =>
    ex.toLowerCase().includes(name.toLowerCase())
  );

  const handleSelectExercise = (exerciseName: string) => {
    setName(exerciseName);
    setShowExerciseList(false);

    // Load exercise details from library
    const libraryExercises = exerciseLibraryService.searchExercises(exerciseName);
    if (libraryExercises.length > 0) {
      const ex = libraryExercises[0];
      if (ex.instructions.length > 0) {
        setDescription(ex.instructions.join('. '));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !sets || !reps) {
      alert('Please fill in exercise name, sets, and reps');
      return;
    }

    onSave({
      name,
      sets: parseInt(sets),
      reps,
      weight: weight || undefined,
      restSeconds: restSeconds ? parseInt(restSeconds) : undefined,
      tempo: tempo || undefined,
      description: description || undefined,
      notes: notes || undefined,
      muscleGroups: exercise?.muscleGroups,
      videoUrl: exercise?.videoUrl,
    });
  };

  return (
    <div className="exercise-builder">
      <div className="exercise-builder-header">
        <h3 className="exercise-builder-title">
          {exercise ? 'Edit Exercise' : 'Add Exercise'}
        </h3>
        {onRemove && (
          <button
            type="button"
            className="btn-remove-exercise"
            onClick={onRemove}
          >
            Remove
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="exercise-builder-form">
        {/* Exercise Name */}
        <div className="form-group">
          <label className="form-label">Exercise Name *</label>
          <div className="exercise-name-input-wrapper">
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setShowExerciseList(true);
              }}
              onFocus={() => setShowExerciseList(true)}
              placeholder="Search for exercise..."
              required
            />
            {showExerciseList && filteredExercises.length > 0 && name && (
              <div className="exercise-suggestions">
                {filteredExercises.slice(0, 10).map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    className="exercise-suggestion-item"
                    onClick={() => handleSelectExercise(ex)}
                  >
                    {ex}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sets and Reps */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Sets *</label>
            <input
              type="number"
              className="input"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              min="1"
              max="10"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Reps *</label>
            <input
              type="text"
              className="input"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              placeholder="e.g., 8-12, 10, AMRAP"
              required
            />
          </div>
        </div>

        {/* Weight and Rest */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Weight</label>
            <input
              type="text"
              className="input"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 60kg, bodyweight"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Rest (seconds)</label>
            <select
              className="input"
              value={restSeconds}
              onChange={(e) => setRestSeconds(e.target.value)}
            >
              <option value="30">30s</option>
              <option value="45">45s</option>
              <option value="60">60s</option>
              <option value="90">90s</option>
              <option value="120">2 min</option>
              <option value="180">3 min</option>
              <option value="240">4 min</option>
              <option value="300">5 min</option>
            </select>
          </div>
        </div>

        {/* Tempo (optional) */}
        <div className="form-group">
          <label className="form-label">Tempo (optional)</label>
          <input
            type="text"
            className="input"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
            placeholder="e.g., 3-1-1 (eccentric-pause-concentric)"
          />
          <p className="form-hint">Example: 3-1-1 means 3s down, 1s pause, 1s up</p>
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">Description (How to perform)</label>
          <textarea
            className="input textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Instructions on how to perform this exercise..."
            rows={3}
          />
        </div>

        {/* Notes */}
        <div className="form-group">
          <label className="form-label">Notes (optional)</label>
          <textarea
            className="input textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any specific notes or focus points..."
            rows={2}
          />
        </div>

        {/* Action Buttons */}
        <div className="exercise-builder-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {exercise ? 'Update Exercise' : 'Add Exercise'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExerciseBuilder;
