import { ExerciseLibraryItem } from '../types/interfaces';
import { ExerciseCategory, ExerciseDifficulty } from '../types/enums';

/**
 * Exercise Library Service
 * Provides a comprehensive database of 50+ exercises
 */
class ExerciseLibraryService {
  private exercises: ExerciseLibraryItem[] = [
    // ==================== CHEST EXERCISES ====================
    {
      id: 'ex-chest-1',
      name: 'Barbell Bench Press',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
      equipment: ['Barbell', 'Bench'],
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      instructions: [
        'Lie flat on bench with feet planted on floor',
        'Grip barbell slightly wider than shoulder width',
        'Lower bar to mid-chest with control',
        'Press bar up explosively, fully extending arms',
        'Keep shoulder blades retracted throughout'
      ],
    },
    {
      id: 'ex-chest-2',
      name: 'Dumbbell Bench Press',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
      equipment: ['Dumbbells', 'Bench'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Lie on bench holding dumbbells at chest level',
        'Press dumbbells up until arms are extended',
        'Lower with control to starting position',
        'Keep elbows at 45-degree angle to body'
      ],
    },
    {
      id: 'ex-chest-3',
      name: 'Push-ups',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Chest', 'Triceps', 'Core'],
      equipment: ['Bodyweight'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Start in plank position with hands shoulder-width apart',
        'Lower body until chest nearly touches ground',
        'Keep core tight and body in straight line',
        'Push back up to starting position',
        'Maintain controlled tempo throughout'
      ],
    },
    {
      id: 'ex-chest-4',
      name: 'Incline Dumbbell Press',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Upper Chest', 'Shoulders', 'Triceps'],
      equipment: ['Dumbbells', 'Incline Bench'],
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      instructions: [
        'Set bench to 30-45 degree incline',
        'Hold dumbbells at shoulder height',
        'Press dumbbells up and together',
        'Lower slowly to starting position'
      ],
    },
    {
      id: 'ex-chest-5',
      name: 'Cable Chest Fly',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Chest'],
      equipment: ['Cable Machine'],
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      instructions: [
        'Set cables to shoulder height',
        'Stand in center with slight forward lean',
        'Bring handles together in front of chest',
        'Return to starting position with control',
        'Maintain slight bend in elbows'
      ],
    },

    // ==================== BACK EXERCISES ====================
    {
      id: 'ex-back-1',
      name: 'Pull-ups',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Back', 'Biceps', 'Shoulders'],
      equipment: ['Pull-up Bar'],
      difficulty: ExerciseDifficulty.ADVANCED,
      instructions: [
        'Hang from bar with overhand grip, hands shoulder-width',
        'Pull yourself up until chin clears bar',
        'Lower with control to full hang',
        'Avoid swinging or using momentum'
      ],
    },
    {
      id: 'ex-back-2',
      name: 'Barbell Row',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Back', 'Biceps', 'Shoulders'],
      equipment: ['Barbell'],
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      instructions: [
        'Hinge at hips with barbell in hands',
        'Pull bar to lower chest/upper abs',
        'Squeeze shoulder blades together',
        'Lower bar with control',
        'Keep back flat and core engaged'
      ],
    },
    {
      id: 'ex-back-3',
      name: 'Lat Pulldown',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Lats', 'Biceps'],
      equipment: ['Cable Machine'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Sit with thighs secured under pad',
        'Grip bar wider than shoulder width',
        'Pull bar down to upper chest',
        'Return to starting position with control',
        'Keep chest up throughout movement'
      ],
    },
    {
      id: 'ex-back-4',
      name: 'Dumbbell Row',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Back', 'Biceps'],
      equipment: ['Dumbbells', 'Bench'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Place one knee and hand on bench',
        'Hold dumbbell in free hand',
        'Pull dumbbell to hip, leading with elbow',
        'Lower with control',
        'Keep back flat throughout'
      ],
    },
    {
      id: 'ex-back-5',
      name: 'Deadlift',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Back', 'Hamstrings', 'Glutes', 'Core'],
      equipment: ['Barbell'],
      difficulty: ExerciseDifficulty.ADVANCED,
      instructions: [
        'Stand with feet hip-width, bar over midfoot',
        'Grip bar just outside legs',
        'Keep back flat, chest up',
        'Drive through heels to stand',
        'Lower bar with control, maintaining neutral spine'
      ],
    },

    // ==================== SHOULDER EXERCISES ====================
    {
      id: 'ex-shoulder-1',
      name: 'Overhead Press',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Shoulders', 'Triceps', 'Core'],
      equipment: ['Barbell'],
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      instructions: [
        'Stand with barbell at shoulder height',
        'Press bar straight overhead',
        'Lock out arms at top',
        'Lower bar to shoulders with control',
        'Keep core tight and avoid leaning back'
      ],
    },
    {
      id: 'ex-shoulder-2',
      name: 'Dumbbell Shoulder Press',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Shoulders', 'Triceps'],
      equipment: ['Dumbbells'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Sit or stand with dumbbells at shoulder height',
        'Press dumbbells overhead until arms extend',
        'Lower to starting position with control',
        'Keep core engaged'
      ],
    },
    {
      id: 'ex-shoulder-3',
      name: 'Lateral Raise',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Side Delts'],
      equipment: ['Dumbbells'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Stand with dumbbells at sides',
        'Raise arms out to sides until parallel to floor',
        'Lower with control',
        'Keep slight bend in elbows',
        'Avoid using momentum'
      ],
    },
    {
      id: 'ex-shoulder-4',
      name: 'Front Raise',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Front Delts'],
      equipment: ['Dumbbells'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Stand with dumbbells in front of thighs',
        'Raise arms straight in front to shoulder height',
        'Lower with control',
        'Keep core engaged and avoid swinging'
      ],
    },
    {
      id: 'ex-shoulder-5',
      name: 'Face Pull',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Rear Delts', 'Upper Back'],
      equipment: ['Cable Machine'],
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      instructions: [
        'Set cable to upper chest height',
        'Pull rope attachment toward face',
        'Flare elbows out and back',
        'Squeeze shoulder blades together',
        'Return to starting position with control'
      ],
    },

    // ==================== LEG EXERCISES ====================
    {
      id: 'ex-legs-1',
      name: 'Barbell Squat',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Quads', 'Glutes', 'Hamstrings', 'Core'],
      equipment: ['Barbell', 'Squat Rack'],
      difficulty: ExerciseDifficulty.ADVANCED,
      instructions: [
        'Position barbell on upper back',
        'Stand with feet shoulder-width apart',
        'Lower by bending knees and hips',
        'Descend until thighs parallel to ground',
        'Drive through heels to return to standing',
        'Keep chest up and core tight'
      ],
    },
    {
      id: 'ex-legs-2',
      name: 'Leg Press',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Quads', 'Glutes', 'Hamstrings'],
      equipment: ['Leg Press Machine'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Sit in machine with feet shoulder-width on platform',
        'Lower platform by bending knees',
        'Push platform back up to starting position',
        'Keep back flat against pad',
        'Avoid locking knees at top'
      ],
    },
    {
      id: 'ex-legs-3',
      name: 'Romanian Deadlift',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Hamstrings', 'Glutes', 'Lower Back'],
      equipment: ['Barbell'],
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      instructions: [
        'Hold barbell at hip level',
        'Hinge at hips, lowering bar along legs',
        'Keep back flat and knees slightly bent',
        'Feel stretch in hamstrings',
        'Return to standing by engaging glutes and hamstrings'
      ],
    },
    {
      id: 'ex-legs-4',
      name: 'Leg Extension',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Quads'],
      equipment: ['Leg Extension Machine'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Sit in machine with back against pad',
        'Place ankles under roller pad',
        'Extend legs until fully straightened',
        'Lower with control',
        'Keep torso stable'
      ],
    },
    {
      id: 'ex-legs-5',
      name: 'Leg Curl',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Hamstrings'],
      equipment: ['Leg Curl Machine'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Lie face down on machine',
        'Place ankles under roller pad',
        'Curl legs up toward glutes',
        'Lower with control',
        'Keep hips pressed against pad'
      ],
    },
    {
      id: 'ex-legs-6',
      name: 'Walking Lunges',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Quads', 'Glutes', 'Hamstrings'],
      equipment: ['Dumbbells'],
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      instructions: [
        'Hold dumbbells at sides',
        'Step forward into lunge position',
        'Lower back knee toward ground',
        'Push off front foot and step forward',
        'Alternate legs with each step'
      ],
    },
    {
      id: 'ex-legs-7',
      name: 'Bulgarian Split Squat',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Quads', 'Glutes'],
      equipment: ['Dumbbells', 'Bench'],
      difficulty: ExerciseDifficulty.ADVANCED,
      instructions: [
        'Place rear foot on bench behind you',
        'Hold dumbbells at sides',
        'Lower into lunge position',
        'Keep front knee aligned over ankle',
        'Push through front heel to return to start'
      ],
    },
    {
      id: 'ex-legs-8',
      name: 'Calf Raise',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Calves'],
      equipment: ['Bodyweight', 'Dumbbells'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Stand with balls of feet on edge of step',
        'Raise heels as high as possible',
        'Pause at top',
        'Lower heels below step level',
        'Maintain control throughout'
      ],
    },

    // ==================== ARM EXERCISES ====================
    {
      id: 'ex-arms-1',
      name: 'Barbell Curl',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Biceps'],
      equipment: ['Barbell'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Stand with barbell in hands, arms extended',
        'Curl bar up toward shoulders',
        'Keep elbows stationary at sides',
        'Lower bar with control',
        'Avoid swinging or using momentum'
      ],
    },
    {
      id: 'ex-arms-2',
      name: 'Dumbbell Curl',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Biceps'],
      equipment: ['Dumbbells'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Stand with dumbbells at sides',
        'Curl dumbbells up toward shoulders',
        'Keep elbows at sides',
        'Lower with control',
        'Can alternate arms or curl simultaneously'
      ],
    },
    {
      id: 'ex-arms-3',
      name: 'Hammer Curl',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Biceps', 'Forearms'],
      equipment: ['Dumbbells'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Hold dumbbells with neutral grip (palms facing)',
        'Curl dumbbells up toward shoulders',
        'Keep wrists straight',
        'Lower with control',
        'Maintain neutral grip throughout'
      ],
    },
    {
      id: 'ex-arms-4',
      name: 'Tricep Dip',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Triceps', 'Chest', 'Shoulders'],
      equipment: ['Dip Bars'],
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      instructions: [
        'Support yourself on parallel bars',
        'Lower body by bending elbows',
        'Lean slightly forward',
        'Push back up to starting position',
        'Keep core engaged'
      ],
    },
    {
      id: 'ex-arms-5',
      name: 'Overhead Tricep Extension',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Triceps'],
      equipment: ['Dumbbell'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Hold dumbbell overhead with both hands',
        'Lower dumbbell behind head',
        'Keep elbows pointing up and close to head',
        'Extend arms to raise dumbbell back up',
        'Keep upper arms stationary'
      ],
    },
    {
      id: 'ex-arms-6',
      name: 'Cable Tricep Pushdown',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Triceps'],
      equipment: ['Cable Machine'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Stand facing cable machine',
        'Grip attachment with hands',
        'Push down until arms fully extended',
        'Keep elbows at sides',
        'Return to starting position with control'
      ],
    },

    // ==================== CORE/ABS EXERCISES ====================
    {
      id: 'ex-core-1',
      name: 'Plank',
      category: ExerciseCategory.CORE,
      muscleGroups: ['Core', 'Abs'],
      equipment: ['Bodyweight'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Start in push-up position on forearms',
        'Keep body in straight line from head to heels',
        'Engage core and glutes',
        'Hold position for time',
        'Breathe normally'
      ],
    },
    {
      id: 'ex-core-2',
      name: 'Crunches',
      category: ExerciseCategory.CORE,
      muscleGroups: ['Abs'],
      equipment: ['Bodyweight'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Lie on back with knees bent',
        'Place hands behind head',
        'Curl upper body toward knees',
        'Lower with control',
        'Keep lower back on ground'
      ],
    },
    {
      id: 'ex-core-3',
      name: 'Russian Twist',
      category: ExerciseCategory.CORE,
      muscleGroups: ['Obliques', 'Core'],
      equipment: ['Bodyweight', 'Medicine Ball'],
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      instructions: [
        'Sit with knees bent, feet elevated',
        'Lean back slightly',
        'Rotate torso side to side',
        'Touch ground beside hips with each twist',
        'Keep core engaged throughout'
      ],
    },
    {
      id: 'ex-core-4',
      name: 'Bicycle Crunches',
      category: ExerciseCategory.CORE,
      muscleGroups: ['Abs', 'Obliques'],
      equipment: ['Bodyweight'],
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      instructions: [
        'Lie on back with hands behind head',
        'Bring opposite elbow to opposite knee',
        'Extend other leg',
        'Alternate sides in cycling motion',
        'Keep core engaged'
      ],
    },
    {
      id: 'ex-core-5',
      name: 'Mountain Climbers',
      category: ExerciseCategory.CORE,
      muscleGroups: ['Core', 'Shoulders', 'Legs'],
      equipment: ['Bodyweight'],
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      instructions: [
        'Start in push-up position',
        'Drive one knee toward chest',
        'Quickly switch legs',
        'Alternate in running motion',
        'Keep hips level and core tight'
      ],
    },
    {
      id: 'ex-core-6',
      name: 'Hanging Leg Raise',
      category: ExerciseCategory.CORE,
      muscleGroups: ['Lower Abs', 'Hip Flexors'],
      equipment: ['Pull-up Bar'],
      difficulty: ExerciseDifficulty.ADVANCED,
      instructions: [
        'Hang from pull-up bar',
        'Keep legs straight',
        'Raise legs up toward chest',
        'Lower with control',
        'Avoid swinging'
      ],
    },

    // ==================== CARDIO EXERCISES ====================
    {
      id: 'ex-cardio-1',
      name: 'Running',
      category: ExerciseCategory.CARDIO,
      muscleGroups: ['Legs', 'Cardiovascular'],
      equipment: ['None', 'Treadmill'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Maintain steady pace',
        'Keep upright posture',
        'Land midfoot, not heel',
        'Swing arms naturally',
        'Breathe rhythmically'
      ],
    },
    {
      id: 'ex-cardio-2',
      name: 'Jump Rope',
      category: ExerciseCategory.CARDIO,
      muscleGroups: ['Legs', 'Shoulders', 'Cardiovascular'],
      equipment: ['Jump Rope'],
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      instructions: [
        'Hold rope handles at sides',
        'Swing rope overhead and jump',
        'Land on balls of feet',
        'Keep jumps low and quick',
        'Maintain rhythm'
      ],
    },
    {
      id: 'ex-cardio-3',
      name: 'Burpees',
      category: ExerciseCategory.CARDIO,
      muscleGroups: ['Full Body', 'Cardiovascular'],
      equipment: ['Bodyweight'],
      difficulty: ExerciseDifficulty.ADVANCED,
      instructions: [
        'Start standing',
        'Drop into squat position',
        'Kick feet back to push-up position',
        'Perform push-up',
        'Jump feet back to squat',
        'Jump up with arms overhead'
      ],
    },
    {
      id: 'ex-cardio-4',
      name: 'Rowing Machine',
      category: ExerciseCategory.CARDIO,
      muscleGroups: ['Back', 'Legs', 'Cardiovascular'],
      equipment: ['Rowing Machine'],
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      instructions: [
        'Sit on rower with feet secured',
        'Grab handle with overhand grip',
        'Push with legs, then pull handle to chest',
        'Extend arms, then bend knees to return',
        'Maintain fluid motion'
      ],
    },
    {
      id: 'ex-cardio-5',
      name: 'Cycling',
      category: ExerciseCategory.CARDIO,
      muscleGroups: ['Legs', 'Cardiovascular'],
      equipment: ['Stationary Bike', 'Bicycle'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Sit with proper seat height',
        'Pedal with smooth circular motion',
        'Keep core engaged',
        'Maintain steady cadence',
        'Adjust resistance as needed'
      ],
    },

    // ==================== FLEXIBILITY EXERCISES ====================
    {
      id: 'ex-flex-1',
      name: 'Hamstring Stretch',
      category: ExerciseCategory.FLEXIBILITY,
      muscleGroups: ['Hamstrings'],
      equipment: ['Bodyweight'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Sit with one leg extended',
        'Reach toward toes',
        'Keep back straight',
        'Hold stretch for 20-30 seconds',
        'Switch legs'
      ],
    },
    {
      id: 'ex-flex-2',
      name: 'Quad Stretch',
      category: ExerciseCategory.FLEXIBILITY,
      muscleGroups: ['Quads'],
      equipment: ['Bodyweight'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Stand on one leg',
        'Pull other foot toward glutes',
        'Keep knees together',
        'Hold for 20-30 seconds',
        'Switch legs'
      ],
    },
    {
      id: 'ex-flex-3',
      name: 'Hip Flexor Stretch',
      category: ExerciseCategory.FLEXIBILITY,
      muscleGroups: ['Hip Flexors'],
      equipment: ['Bodyweight'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Kneel on one knee',
        'Push hips forward',
        'Keep torso upright',
        'Feel stretch in front of hip',
        'Hold for 20-30 seconds'
      ],
    },
    {
      id: 'ex-flex-4',
      name: 'Child\'s Pose',
      category: ExerciseCategory.FLEXIBILITY,
      muscleGroups: ['Back', 'Hips'],
      equipment: ['Bodyweight'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Kneel with knees wide',
        'Sit back on heels',
        'Extend arms forward on ground',
        'Rest forehead on ground',
        'Breathe deeply and relax'
      ],
    },
    {
      id: 'ex-flex-5',
      name: 'Cat-Cow Stretch',
      category: ExerciseCategory.FLEXIBILITY,
      muscleGroups: ['Back', 'Core'],
      equipment: ['Bodyweight'],
      difficulty: ExerciseDifficulty.BEGINNER,
      instructions: [
        'Start on hands and knees',
        'Arch back (cow pose)',
        'Round back (cat pose)',
        'Alternate between positions',
        'Move with breath'
      ],
    },
  ];

  getAllExercises(): ExerciseLibraryItem[] {
    return this.exercises;
  }

  getExerciseById(id: string): ExerciseLibraryItem | undefined {
    return this.exercises.find(ex => ex.id === id);
  }

  getExercisesByCategory(category: ExerciseCategory): ExerciseLibraryItem[] {
    return this.exercises.filter(ex => ex.category === category);
  }

  getExercisesByMuscleGroup(muscleGroup: string): ExerciseLibraryItem[] {
    return this.exercises.filter(ex => 
      ex.muscleGroups.some(mg => mg.toLowerCase().includes(muscleGroup.toLowerCase()))
    );
  }

  getExercisesByDifficulty(difficulty: ExerciseDifficulty): ExerciseLibraryItem[] {
    return this.exercises.filter(ex => ex.difficulty === difficulty);
  }

  getExercisesByEquipment(equipment: string): ExerciseLibraryItem[] {
    return this.exercises.filter(ex => 
      ex.equipment.some(eq => eq.toLowerCase().includes(equipment.toLowerCase()))
    );
  }

  searchExercises(query: string): ExerciseLibraryItem[] {
    const lowerQuery = query.toLowerCase();
    return this.exercises.filter(ex =>
      ex.name.toLowerCase().includes(lowerQuery) ||
      ex.muscleGroups.some(mg => mg.toLowerCase().includes(lowerQuery)) ||
      ex.equipment.some(eq => eq.toLowerCase().includes(lowerQuery))
    );
  }

  getExerciseNames(): string[] {
    return this.exercises.map(ex => ex.name).sort();
  }

  getAllMuscleGroups(): string[] {
    const allGroups = this.exercises.flatMap(ex => ex.muscleGroups);
    return Array.from(new Set(allGroups)).sort();
  }

  getAllEquipment(): string[] {
    const allEquipment = this.exercises.flatMap(ex => ex.equipment);
    return Array.from(new Set(allEquipment)).sort();
  }
}

export const exerciseLibraryService = new ExerciseLibraryService();
