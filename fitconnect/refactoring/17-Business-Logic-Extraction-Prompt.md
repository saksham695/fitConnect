# Refactoring Task 17: Extract ALL Business Logic to Custom Hooks

**Priority:** HIGH ⭐⭐⭐  
**Effort:** 4-6 hours  
**Difficulty:** ⭐⭐⭐ Medium  
**Impact:** Drastically smaller component files, better separation of concerns

---

## 🎯 Goal

**Move ALL business logic from UI components to custom hooks.**  
**Make component files as small as possible - ideally under 100 lines.**

Components should ONLY contain:
- JSX/UI rendering
- Event handler callbacks (that call hook functions)
- Basic conditional rendering

All logic should live in hooks:
- Data fetching
- State management
- Calculations
- Filtering/sorting
- CRUD operations
- Form handling
- Validation

---

## 📋 MASTER REFACTORING PROMPT

```
I'm working on a React TypeScript fitness application called FitConnect. I need to refactor the entire codebase to extract ALL business logic from UI components into custom hooks, making component files as small as possible.

## 🎯 OBJECTIVE

**Primary Goals:**
1. Move ALL business logic to custom hooks
2. Reduce component file sizes to under 100 lines each (ideally 50-80 lines)
3. Components should ONLY handle rendering and calling hook functions
4. Achieve maximum separation of concerns

**Success Criteria:**
- No useState, useEffect, or business logic directly in component files
- All data operations in hooks
- Components are pure rendering functions
- Easy to test hooks independently
- Easy to understand components at a glance

---

## 📁 CURRENT CODEBASE STRUCTURE

```
src/
├── pages/
│   ├── Trainers/
│   │   ├── TrainerList.tsx (111 lines) - Has search/filter logic
│   │   └── TrainerDetail.tsx (150+ lines) - Has connection logic
│   ├── Clients/
│   │   ├── ClientList.tsx (109 lines) - Has search/filter logic
│   │   └── ClientDetail.tsx (120+ lines) - Has viewing logic
│   ├── Booking/
│   │   ├── TrainerBookings.tsx (260+ lines) - Has booking actions, filtering, stats
│   │   ├── ClientBookings.tsx (245+ lines) - Has booking actions, filtering, stats
│   │   └── BookSession.tsx (222+ lines) - Has slot selection, validation, booking creation
│   ├── Availability/
│   │   └── AvailabilityManagement.tsx (250+ lines) - Has slot management, validation
│   ├── Profile/
│   │   ├── TrainerProfile.tsx (422 lines) - HUGE! Has profile editing, certifications, BMI calculation
│   │   └── ClientProfile.tsx (363 lines) - Large! Has profile editing, goals, training types
│   ├── Courses/
│   │   ├── CreateCourse.tsx (157 lines) - Has form handling, validation
│   │   ├── CourseList.tsx (63 lines) - Mostly clean
│   │   └── CourseDetail.tsx (100+ lines) - Has enrollment logic
│   ├── Dashboard/
│   │   ├── TrainerDashboard.tsx (88 lines) - Relatively clean
│   │   └── ClientDashboard.tsx (90+ lines) - Relatively clean
│   └── Goals/
│       └── Goals.tsx (120+ lines) - Has goal management logic
├── services/
│   ├── storageService.ts (800+ lines) - Monolithic data layer
│   └── authService.ts (70 lines)
├── utils/
│   └── calculations.ts (50 lines)
└── contexts/
    └── AuthContext.tsx (100+ lines)
```

---

## 🔥 PROBLEM PAGES (Biggest Offenders)

### 1. **TrainerProfile.tsx (422 lines)** 🚨 CRITICAL
**Current issues:**
- 20+ useState calls
- Form handling logic
- Certification management
- Pricing logic
- Physical details + BMI calculation
- Achievement management
- Profile saving logic

**Target:** Reduce to 80-100 lines

---

### 2. **ClientProfile.tsx (363 lines)** 🚨 CRITICAL
**Current issues:**
- 15+ useState calls
- Form handling
- Goals management
- Training type toggles
- Physical details + BMI
- Profile saving logic

**Target:** Reduce to 80-100 lines

---

### 3. **TrainerBookings.tsx (260+ lines)** 🚨 HIGH PRIORITY
**Current issues:**
- Booking fetching
- Multiple action handlers (confirm, reject, cancel, complete)
- Filtering logic
- Stats calculation
- Sorting logic
- User lookups

**Target:** Reduce to 80-100 lines

---

### 4. **ClientBookings.tsx (245+ lines)** 🚨 HIGH PRIORITY
**Current issues:**
- Similar to TrainerBookings
- Booking fetching
- Action handlers
- Filtering
- Stats

**Target:** Reduce to 80-100 lines

---

### 5. **AvailabilityManagement.tsx (250+ lines)** 🚨 HIGH PRIORITY
**Current issues:**
- Availability CRUD operations
- Time slot management
- Validation logic
- Day-by-day state management

**Target:** Reduce to 80-100 lines

---

### 6. **BookSession.tsx (222 lines)** 🚨 HIGH PRIORITY
**Current issues:**
- Slot selection logic
- Date validation
- Booking creation
- Availability checking
- Form handling

**Target:** Reduce to 80-100 lines

---

## 🎯 REQUIRED CUSTOM HOOKS

### For Profile Pages:

#### useTrainerProfileForm
```typescript
export const useTrainerProfileForm = (trainer: Trainer) => {
  // All form state
  // All form handlers
  // Save logic
  // Certification management
  // Achievement management
  // Expertise management
  
  return {
    formData, // All form values
    handlers, // All onChange handlers
    actions: {
      save,
      addCertification,
      removeCertification,
      addExpertise,
      removeExpertise,
    },
    computed: {
      bmi,
      bmiCategory,
    },
  };
};
```

#### useClientProfileForm
```typescript
export const useClientProfileForm = (client: Client) => {
  // All form state
  // Goals management
  // Training type toggles
  // Physical details + BMI
  // Save logic
  
  return {
    formData,
    handlers,
    actions: {
      save,
      addGoal,
      removeGoal,
      toggleTrainingType,
    },
    computed: {
      bmi,
      bmiCategory,
    },
  };
};
```

---

### For Booking Pages:

#### useTrainerBookings
```typescript
export const useTrainerBookings = (trainerId: string) => {
  // Fetch bookings
  // Filter bookings
  // Calculate stats
  // Sort bookings
  // Action handlers
  // User lookups
  
  return {
    bookings,
    filteredBookings,
    sortedBookings,
    stats,
    filter,
    setFilter,
    loading,
    actions: {
      confirm,
      reject,
      cancel,
      complete,
    },
    helpers: {
      getClientName,
      getClientEmail,
    },
  };
};
```

#### useClientBookings
```typescript
export const useClientBookings = (clientId: string) => {
  // Similar structure to useTrainerBookings
  // But from client perspective
  
  return {
    bookings,
    filteredBookings,
    sortedBookings,
    stats,
    filter,
    setFilter,
    loading,
    actions: {
      cancel,
    },
    helpers: {
      getTrainerName,
      getTrainerEmail,
    },
  };
};
```

#### useBookingForm
```typescript
export const useBookingForm = (trainerId: string, clientId: string) => {
  // All booking form state
  // Available slots fetching
  // Slot selection logic
  // Date validation
  // Booking creation
  
  return {
    formData: {
      selectedDate,
      selectedSlot,
      notes,
    },
    availableSlots,
    availableDates,
    handlers: {
      setSelectedDate,
      setSelectedSlot,
      setNotes,
    },
    actions: {
      bookSession,
    },
    state: {
      loading,
      error,
      success,
    },
  };
};
```

---

### For Availability:

#### useAvailabilityManagement
```typescript
export const useAvailabilityManagement = (trainerId: string) => {
  // Fetch all availability
  // Group by day
  // Add/remove slot logic
  // Validation
  // Overlap checking
  
  return {
    availabilityByDay,
    loading,
    actions: {
      addSlot,
      removeSlot,
    },
    helpers: {
      hasOverlap,
      isValidTimeSlot,
    },
  };
};
```

---

### For Lists:

#### useTrainerList
```typescript
export const useTrainerList = (clientId?: string) => {
  // Fetch trainers
  // Search logic
  // Filter logic
  // Connection checking
  // Connect action
  
  return {
    trainers,
    filteredTrainers,
    searchTerm,
    setSearchTerm,
    selectedExpertise,
    setSelectedExpertise,
    expertiseOptions,
    actions: {
      connect,
    },
    helpers: {
      isConnected,
    },
  };
};
```

#### useClientList
```typescript
export const useClientList = (trainerId: string) => {
  // Fetch trainer's clients
  // Search logic
  // Filter logic
  
  return {
    clients,
    filteredClients,
    searchTerm,
    setSearchTerm,
    selectedFitnessLevel,
    setSelectedFitnessLevel,
  };
};
```

---

### For Courses:

#### useCourseForm
```typescript
export const useCourseForm = (trainerId: string) => {
  // All form state
  // Goal management
  // Form validation
  // Course creation
  
  return {
    formData,
    handlers,
    actions: {
      addGoal,
      removeGoal,
      createCourse,
    },
    state: {
      loading,
      error,
    },
  };
};
```

#### useCourseDetail
```typescript
export const useCourseDetail = (courseId: string) => {
  // Fetch course
  // Fetch trainer info
  // Enrollment logic
  
  return {
    course,
    trainer,
    loading,
    actions: {
      enroll,
    },
  };
};
```

---

## 📝 IMPLEMENTATION RULES

### ✅ Components Should ONLY:
1. Import and call custom hooks
2. Destructure what they need from hook returns
3. Render JSX
4. Pass hook functions to event handlers

### ❌ Components Should NEVER:
1. Call `useState` directly (except for simple UI state like modals)
2. Call `useEffect` for data fetching
3. Contain business calculations
4. Directly call `storageService`
5. Have filtering/sorting logic
6. Have validation logic
7. Have form handling logic

### ✅ Hooks Should:
1. Encapsulate ALL business logic
2. Use `useMemo` and `useCallback` for optimization
3. Return clean, organized API
4. Handle loading/error states
5. Be independently testable
6. Be reusable across components

---

## 📐 EXAMPLE: Before & After

### BEFORE (TrainerProfile.tsx - 422 lines)

```typescript
const TrainerProfile: React.FC = () => {
  const { trainer, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(trainer?.profile.fullName || '');
  const [age, setAge] = useState(trainer?.profile.age?.toString() || '');
  const [phoneNumber, setPhoneNumber] = useState(trainer?.profile.phoneNumber || '');
  const [bio, setBio] = useState(trainer?.profile.bio || '');
  // ... 15 more useState
  
  useEffect(() => {
    // BMI calculation
  }, [height, weight]);
  
  const handleSave = () => {
    // 40 lines of saving logic
  };
  
  const addExpertise = () => {
    // 10 lines of logic
  };
  
  // ... 300 more lines of logic and JSX
};
```

### AFTER (TrainerProfile.tsx - ~80 lines)

```typescript
const TrainerProfile: React.FC = () => {
  const { trainer } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const {
    formData,
    handlers,
    actions,
    computed,
  } = useTrainerProfileForm(trainer);
  
  if (!trainer) return null;
  
  return (
    <Layout>
      <div className="trainer-profile-page">
        <PageHeader 
          title="My Profile"
          actions={
            isEditing ? (
              <>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => { actions.save(); setIsEditing(false); }}>Save</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )
          }
        />
        
        {isEditing ? (
          <TrainerProfileForm 
            formData={formData}
            handlers={handlers}
            actions={actions}
            computed={computed}
          />
        ) : (
          <TrainerProfileView 
            trainer={trainer}
            computed={computed}
          />
        )}
      </div>
    </Layout>
  );
};
```

**Result:** 422 lines → 80 lines (80% reduction!)

---

## 🎯 FULL IMPLEMENTATION PROMPT

```
I'm working on a React TypeScript fitness application called FitConnect with LocalStorage as the database. I need to refactor the ENTIRE codebase to extract ALL business logic from UI components into custom hooks and make component files as small as possible.

## CURRENT PROBLEMATIC FILES

These files are TOO LARGE and contain too much business logic:

1. **TrainerProfile.tsx** (422 lines)
   - 20+ useState calls for form fields
   - Form submission logic
   - Certification/expertise/achievement management
   - BMI calculations
   - Profile saving logic

2. **ClientProfile.tsx** (363 lines)
   - 15+ useState calls
   - Goals management
   - Training type toggles
   - Physical details + BMI
   - Profile saving

3. **TrainerBookings.tsx** (260 lines)
   - Booking fetching
   - Multiple action handlers (confirm, reject, cancel, complete)
   - Filtering logic (6 filter types)
   - Stats calculation
   - Sorting logic
   - User lookups (getClientName, getClientEmail)

4. **ClientBookings.tsx** (245 lines)
   - Similar booking logic
   - Action handlers
   - Filtering, stats, sorting
   - User lookups

5. **AvailabilityManagement.tsx** (250 lines)
   - Availability CRUD
   - Time slot management per day
   - Validation and overlap checking
   - Day-by-day state management

6. **BookSession.tsx** (222 lines)
   - Available slots fetching
   - Slot selection
   - Date validation
   - Booking creation
   - Form state management

7. **TrainerList.tsx** (111 lines)
   - Search logic
   - Filter logic
   - Connection checking

8. **ClientList.tsx** (109 lines)
   - Search logic
   - Filter logic

9. **CreateCourse.tsx** (157 lines)
   - Form state
   - Goal management
   - Course creation

10. **Goals.tsx** (120+ lines)
    - Goal CRUD operations

---

## 🎯 TARGET ARCHITECTURE

### Component Responsibility (Components should be < 100 lines)
```typescript
// Components ONLY do:
const MyComponent = () => {
  const { data, actions, state } = useMyFeature();
  
  return <div>Render UI using data</div>;
};
```

### Hook Responsibility (Hooks contain ALL logic)
```typescript
// Hooks do EVERYTHING else:
export const useMyFeature = () => {
  // All useState
  // All useEffect
  // All business logic
  // All data operations
  // All calculations
  
  return {
    data: { ... },      // Data to display
    actions: { ... },   // Functions to call
    state: { ... },     // Loading, error states
    helpers: { ... },   // Utility functions
  };
};
```

---

## 📋 STEP-BY-STEP REFACTORING PLAN

### Phase 1: Profile Pages (Start here - biggest impact)

#### Task 1.1: Create useTrainerProfileForm hook
**Location:** `src/hooks/useTrainerProfileForm.ts`

**Responsibilities:**
- Manage ALL form state (20+ fields)
- Provide onChange handlers for each field
- Handle BMI auto-calculation
- Manage certifications array (add/remove)
- Manage expertise array (add/remove)
- Manage achievements array (add/remove)
- Handle pricing state
- Implement save logic
- Validate form data

**Return interface:**
```typescript
{
  formData: {
    // All current values
    fullName: string;
    age: string;
    phoneNumber: string;
    bio: string;
    // ... all other fields
  },
  handlers: {
    // onChange handlers
    handleFullNameChange: (value: string) => void;
    handleAgeChange: (value: string) => void;
    // ... handlers for all fields
  },
  actions: {
    save: () => void;
    addCertification: () => void;
    removeCertification: (id: string) => void;
    addExpertise: () => void;
    removeExpertise: (expertise: string) => void;
    addAchievement: () => void;
    removeAchievement: (id: string) => void;
  },
  computed: {
    bmi: number;
    bmiCategory: string;
  },
  state: {
    isSaving: boolean;
    error?: string;
  }
}
```

**After this:** TrainerProfile.tsx should be ~80 lines

---

#### Task 1.2: Create useClientProfileForm hook
**Location:** `src/hooks/useClientProfileForm.ts`

**Responsibilities:**
- Manage ALL form state
- Goals management (add/remove)
- Training type toggles
- BMI calculation
- Save logic
- Validation

**Return interface:**
```typescript
{
  formData: { ... },
  handlers: { ... },
  actions: {
    save: () => void;
    addGoal: (goal: string) => void;
    removeGoal: (goal: string) => void;
    toggleTrainingType: (type: TrainingType) => void;
  },
  computed: {
    bmi: number;
    bmiCategory: string;
  },
  state: { ... }
}
```

**After this:** ClientProfile.tsx should be ~80 lines

---

### Phase 2: Booking Pages

#### Task 2.1: Create useTrainerBookings hook
**Location:** `src/hooks/useTrainerBookings.ts`

**Responsibilities:**
- Fetch all trainer bookings
- Filter by status (pending/confirmed/past/cancelled/rejected)
- Calculate stats (total, pending, confirmed, completed, cancelled, rejected)
- Sort bookings chronologically
- Provide action handlers (confirm, reject, cancel, complete)
- Lookup client info (name, email)

**Return interface:**
```typescript
{
  bookings: Booking[];
  filteredBookings: Booking[];
  sortedBookings: Booking[];
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
    rejected: number;
  };
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  loading: boolean;
  actions: {
    confirmBooking: (id: string) => void;
    rejectBooking: (id: string) => void;
    cancelBooking: (id: string) => void;
    completeBooking: (id: string) => void;
  };
  helpers: {
    getClientName: (clientId: string) => string;
    getClientEmail: (clientId: string) => string;
  };
}
```

**After this:** TrainerBookings.tsx should be ~80 lines

---

#### Task 2.2: Create useClientBookings hook
**Location:** `src/hooks/useClientBookings.ts`

Similar to useTrainerBookings but from client perspective.

**After this:** ClientBookings.tsx should be ~80 lines

---

#### Task 2.3: Create useBookingForm hook
**Location:** `src/hooks/useBookingForm.ts`

**Responsibilities:**
- Manage booking form state
- Fetch trainer availability
- Calculate available dates
- Filter available slots
- Validate selections
- Handle booking creation
- Success/error states

**Return interface:**
```typescript
{
  formData: {
    selectedDate: string;
    selectedSlot: TimeSlot | null;
    notes: string;
  };
  availableSlots: TimeSlot[];
  availableDates: string[];
  handlers: {
    setSelectedDate: (date: string) => void;
    setSelectedSlot: (slot: TimeSlot) => void;
    setNotes: (notes: string) => void;
  };
  actions: {
    bookSession: () => void;
  };
  state: {
    loading: boolean;
    error: string;
    success: boolean;
  };
  computed: {
    minDate: string;
    maxDate: string;
    selectedDayOfWeek: DayOfWeek | null;
  };
}
```

**After this:** BookSession.tsx should be ~80 lines

---

### Phase 3: Availability Management

#### Task 3.1: Create useAvailabilityManagement hook
**Location:** `src/hooks/useAvailabilityManagement.ts`

**Responsibilities:**
- Fetch all availability for trainer
- Group slots by day of week
- Add slot with validation
- Remove slot
- Check for overlaps
- Manage loading/error states

**Return interface:**
```typescript
{
  availabilityByDay: Record<DayOfWeek, TimeSlot[]>;
  loading: boolean;
  actions: {
    addSlot: (day: DayOfWeek, slot: TimeSlot) => Promise<boolean>;
    removeSlot: (day: DayOfWeek, slotIndex: number) => void;
  };
  validation: {
    hasOverlap: (day: DayOfWeek, newSlot: TimeSlot) => boolean;
    isValidSlot: (slot: TimeSlot) => boolean;
  };
}
```

**After this:** AvailabilityManagement.tsx should be ~80 lines

---

### Phase 4: List Pages

#### Task 4.1: Create useTrainerList hook
**Location:** `src/hooks/useTrainerList.ts`

**Responsibilities:**
- Fetch all trainers
- Search logic
- Filter by expertise
- Connection checking
- Connect action

**After this:** TrainerList.tsx should be ~60 lines

---

#### Task 4.2: Create useClientList hook
**Location:** `src/hooks/useClientList.ts`

Similar to useTrainerList but for trainer's clients.

**After this:** ClientList.tsx should be ~60 lines

---

### Phase 5: Course Pages

#### Task 5.1: Create useCourseForm hook
**Location:** `src/hooks/useCourseForm.ts`

**Responsibilities:**
- Manage form state
- Goal management
- Course creation
- Validation

**After this:** CreateCourse.tsx should be ~70 lines

---

#### Task 5.2: Create useCourseDetail hook
**Location:** `src/hooks/useCourseDetail.ts`

**Responsibilities:**
- Fetch course
- Enrollment logic

**After this:** CourseDetail.tsx should be ~60 lines

---

### Phase 6: Goals Page

#### Task 6.1: Create useGoalsManagement hook
**Location:** `src/hooks/useGoalsManagement.ts`

**Responsibilities:**
- Fetch client goals
- Add goal
- Remove goal
- Update goal
- Save goals

**After this:** Goals.tsx should be ~60 lines

---

## 🎯 HOOK ORGANIZATION

Create folder structure:
```
src/
├── hooks/
│   ├── profiles/
│   │   ├── useTrainerProfileForm.ts
│   │   └── useClientProfileForm.ts
│   ├── bookings/
│   │   ├── useTrainerBookings.ts
│   │   ├── useClientBookings.ts
│   │   ├── useBookingForm.ts
│   │   └── useAvailabilityManagement.ts
│   ├── lists/
│   │   ├── useTrainerList.ts
│   │   └── useClientList.ts
│   ├── courses/
│   │   ├── useCourseForm.ts
│   │   └── useCourseDetail.ts
│   ├── goals/
│   │   └── useGoalsManagement.ts
│   └── shared/
│       ├── useSearch.ts (generic)
│       ├── useFilter.ts (generic)
│       ├── useArrayState.ts (generic)
│       └── useUserLookup.ts (generic)
```

---

## ✅ SUCCESS METRICS

### Before:
- **TrainerProfile:** 422 lines
- **ClientProfile:** 363 lines
- **TrainerBookings:** 260 lines
- **ClientBookings:** 245 lines
- **AvailabilityManagement:** 250 lines
- **BookSession:** 222 lines
- **Total:** 1,762 lines in 6 files

### After:
- **All components:** ~80 lines each = 480 lines
- **New hooks:** ~10 hooks × 150 lines avg = 1,500 lines
- **Total component code:** 480 lines (73% reduction!)
- **Total lines:** 1,980 lines (+218 lines) but MUCH better organized

### Benefits:
- ✅ **73% smaller component files**
- ✅ **Much easier to read/maintain**
- ✅ **Hooks are independently testable**
- ✅ **Hooks are reusable**
- ✅ **Clear separation of concerns**
- ✅ **Business logic in one place**

---

## 🚀 IMPLEMENTATION ORDER

**Week 1: Profile Pages (Biggest files)**
1. Day 1: useTrainerProfileForm + refactor TrainerProfile.tsx
2. Day 2: useClientProfileForm + refactor ClientProfile.tsx
3. Day 3: Test thoroughly

**Week 2: Booking Pages**
4. Day 1: useTrainerBookings + refactor TrainerBookings.tsx
5. Day 2: useClientBookings + refactor ClientBookings.tsx
6. Day 3: useBookingForm + refactor BookSession.tsx
7. Day 4: useAvailabilityManagement + refactor AvailabilityManagement.tsx

**Week 3: Lists & Courses**
8. Day 1: useTrainerList + useClientList
9. Day 2: useCourseForm + useCourseDetail
10. Day 3: useGoalsManagement
11. Day 4: Test everything

**Week 4: Polish & Testing**
12. Comprehensive testing
13. Performance optimization
14. Documentation

---

## 📖 DETAILED TASK FOR EACH HOOK

For EACH hook you create:

1. **Analyze the current component**
   - List all useState calls
   - List all useEffect calls
   - List all functions/handlers
   - List all calculations

2. **Design the hook interface**
   - What data does component need?
   - What actions does component need?
   - What computed values are there?
   - What state management is needed?

3. **Implement the hook**
   - Move ALL logic from component
   - Use useMemo for derived data
   - Use useCallback for functions
   - Return clean, organized API

4. **Refactor the component**
   - Remove all business logic
   - Import and call the hook
   - Destructure what's needed
   - Keep ONLY JSX rendering

5. **Test**
   - Ensure functionality unchanged
   - Check performance
   - Verify no regressions

---

## ⚠️ CRITICAL RULES

### DO:
- ✅ Move ALL useState from components to hooks (except simple UI state like modals)
- ✅ Move ALL useEffect from components to hooks
- ✅ Move ALL business calculations to hooks
- ✅ Move ALL data fetching to hooks
- ✅ Move ALL validation to hooks
- ✅ Use useMemo and useCallback in hooks
- ✅ Return organized, predictable API from hooks
- ✅ Test each hook independently
- ✅ Keep components under 100 lines

### DON'T:
- ❌ Leave useState in components (except for UI-only state like "isModalOpen")
- ❌ Leave useEffect in components
- ❌ Leave business logic in components
- ❌ Make hooks too generic (they should be feature-specific)
- ❌ Break existing functionality
- ❌ Forget to test after each refactor

---

## 🎯 START HERE

**IMMEDIATE ACTION: Refactor TrainerProfile.tsx**

This is the largest file (422 lines) with the most logic.

Step 1: Create `src/hooks/profiles/useTrainerProfileForm.ts`
Step 2: Move ALL state and logic from TrainerProfile.tsx
Step 3: Make TrainerProfile.tsx just call the hook and render UI
Step 4: Test thoroughly
Step 5: Commit

Then move to ClientProfile.tsx, then booking pages, etc.

---

## 💡 EXAMPLE HOOK IMPLEMENTATION

Here's a starter template for useTrainerProfileForm:

```typescript
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Trainer } from '../../types/interfaces';
import { storageService } from '../../services/storageService';
import { calculateBMI, getBMICategory } from '../../utils/calculations';

export const useTrainerProfileForm = (trainer: Trainer | null) => {
  // Basic Info State
  const [fullName, setFullName] = useState(trainer?.profile.fullName || '');
  const [age, setAge] = useState(trainer?.profile.age?.toString() || '');
  // ... all other state
  
  // Auto-calculate BMI
  const bmi = useMemo(() => {
    if (height && weight) {
      return calculateBMI(parseFloat(weight), parseFloat(height));
    }
    return 0;
  }, [height, weight]);
  
  const bmiCategory = useMemo(() => {
    return getBMICategory(bmi);
  }, [bmi]);
  
  // Save handler
  const save = useCallback(() => {
    if (!trainer) return;
    
    trainer.profile = {
      ...trainer.profile,
      fullName,
      age: age ? parseInt(age) : undefined,
      // ... all other fields
    };
    
    storageService.updateTrainer(trainer);
  }, [trainer, fullName, age, /* ... all dependencies */]);
  
  // Expertise management
  const addExpertise = useCallback(() => {
    const expertise = prompt('Enter area of expertise:');
    if (expertise && !areasOfExpertise.includes(expertise)) {
      setAreasOfExpertise(prev => [...prev, expertise]);
    }
  }, [areasOfExpertise]);
  
  const removeExpertise = useCallback((expertise: string) => {
    setAreasOfExpertise(prev => prev.filter(e => e !== expertise));
  }, []);
  
  // Return clean API
  return {
    formData: {
      fullName,
      age,
      phoneNumber,
      bio,
      // ... all form values
    },
    handlers: {
      setFullName,
      setAge,
      setPhoneNumber,
      setBio,
      // ... all setters
    },
    actions: {
      save,
      addExpertise,
      removeExpertise,
      // ... all actions
    },
    computed: {
      bmi,
      bmiCategory,
    },
    state: {
      isSaving: false, // Add later
      error: undefined,
    },
  };
};
```

---

## 🎯 YOUR TASK

Start with **TrainerProfile.tsx** (the biggest file):

1. Create `src/hooks/profiles/useTrainerProfileForm.ts`
2. Move ALL logic from TrainerProfile.tsx into the hook
3. Make TrainerProfile.tsx just render UI using the hook
4. Ensure it still works exactly the same
5. Show me the before/after line counts
6. Then move to the next file

**Repeat this process for ALL 10 files listed above.**

---

## 📊 EXPECTED FINAL RESULTS

| File | Before | After | Reduction |
|------|--------|-------|-----------|
| TrainerProfile.tsx | 422 | ~80 | 81% |
| ClientProfile.tsx | 363 | ~80 | 78% |
| TrainerBookings.tsx | 260 | ~80 | 69% |
| ClientBookings.tsx | 245 | ~80 | 67% |
| AvailabilityManagement.tsx | 250 | ~80 | 68% |
| BookSession.tsx | 222 | ~80 | 64% |
| TrainerList.tsx | 111 | ~60 | 46% |
| ClientList.tsx | 109 | ~60 | 45% |
| CreateCourse.tsx | 157 | ~70 | 55% |
| Goals.tsx | 120 | ~60 | 50% |

**Total component lines:** 2,259 → ~730 (68% reduction!)

---

## ⚡ KEY PRINCIPLES

1. **Hooks should be feature-specific**, not too generic
2. **Components should be dumb**, just render what hooks provide
3. **All business logic in hooks**, none in components
4. **Clean hook API**, organized return objects
5. **Type-safe**, full TypeScript coverage
6. **Memoized**, use useMemo and useCallback
7. **Testable**, hooks can be unit tested independently

---

## 🎯 START NOW

Begin with TrainerProfile.tsx - it's the biggest win!

Follow React best practices, TypeScript strict typing, and maintain all existing functionality while drastically reducing component file sizes.
```

---

## ✅ Expected Outcome

After completion:
- ✅ **10 new custom hooks** created
- ✅ **Component files 68% smaller**
- ✅ **All business logic extracted**
- ✅ **Components are pure rendering functions**
- ✅ **Much easier to maintain and test**
- ✅ **Clear separation of concerns**

---

## 🔗 Next Steps

1. Copy the full implementation prompt above
2. Start with TrainerProfile.tsx (biggest file)
3. Create hook, extract logic, refactor component
4. Move through all 10 files systematically
5. Test after each refactoring
6. Commit frequently

**Status:** ⬜ Not Started

---

**Note:** This is a major refactoring. Take it one file at a time. Don't rush. The result will be a much cleaner, more maintainable codebase!
