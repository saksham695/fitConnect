# FitConnect Refactoring Guide (Pre-Booking System)

**Snapshot:** Commit `e645293` (Feb 10, 2026)  
**Scope:** Basic FitConnect with Course Enrollment, before Profile & Booking features

---

## 📊 Codebase Overview at This Point

### Current State:
- **TypeScript Files:** 32 files (.tsx + .ts)
- **CSS Files:** 25 files
- **Largest File:** `storageService.ts` (666 lines)
- **Total Components:** 18 page components
- **useState Hooks:** 24 instances
- **Direct storageService Calls:** 18 locations

### Features Implemented:
✅ Authentication (Login/Signup)  
✅ Trainer Discovery & Search  
✅ Client Management  
✅ Course Creation & Management  
✅ Course Enrollment System  
✅ Connection Management (Trainer-Client)  
✅ Goals Management  
✅ Mock Data (10 trainers, 10 clients)

### Not Yet Implemented:
❌ Profile Pages  
❌ Booking System  
❌ Availability Management  
❌ Design System  

---

## 🔴 CRITICAL ISSUES TO REFACTOR

### 1. Monolithic `storageService.ts` (666 lines)

**Current Structure:**
```typescript
class StorageService {
  // User operations (150 lines)
  getUsers(), getUserById(), createUser(), updateUser()
  getTrainers(), getClients(), getTrainerById(), getClientById()
  
  // Course operations (120 lines)
  getCourses(), getCoursesByTrainerId(), createCourse()
  
  // Connection operations (80 lines)
  getConnections(), createConnection()
  
  // Mock data seeding (316 lines!)
  seedMockData() // 10 trainers + 10 clients + courses
}
```

**Problems:**
- ❌ Single file handles 4 different domains
- ❌ 316 lines just for mock data
- ❌ No separation of concerns
- ❌ Hard to test individual parts
- ❌ Will grow exponentially with new features

**Refactoring Priority:** 🔴 **CRITICAL**

**Solution:**
```
services/
├── storage/
│   ├── baseStorage.ts          (50 lines) - localStorage wrapper
│   ├── userService.ts          (120 lines) - User CRUD
│   ├── courseService.ts        (100 lines) - Course CRUD
│   ├── connectionService.ts    (80 lines) - Connection CRUD
│   └── mockData.ts            (316 lines) - All mock data
```

**Benefits:**
- ✅ Clear domain boundaries
- ✅ Easier to test
- ✅ Easier to maintain
- ✅ Can replace with real API later

---

### 2. No Custom Hooks (24 useState Without Abstraction)

**Current Pattern (Repeated 10+ times):**
```tsx
// In TrainerList.tsx
const [searchTerm, setSearchTerm] = useState('');
const allTrainers = storageService.getTrainers();
const filtered = allTrainers.filter(/* logic */);

// In ClientList.tsx  
const [searchTerm, setSearchTerm] = useState('');
const allClients = storageService.getClients();
const filtered = allClients.filter(/* logic */);
```

**Problems:**
- ❌ Filter logic duplicated
- ❌ No abstraction for data fetching
- ❌ useState scattered everywhere
- ❌ Hard to maintain consistent behavior

**Refactoring Priority:** 🔴 **CRITICAL**

**Solution - Create Custom Hooks:**

#### Hook 1: `useSearch`
```tsx
// hooks/useSearch.ts
export const useSearch = <T>(
  items: T[],
  searchFields: (keyof T)[]
) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    return items.filter(item => 
      searchFields.some(field => 
        String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [items, searchTerm, searchFields]);
  
  return { filteredItems, searchTerm, setSearchTerm };
};

// Usage
const { filteredItems, searchTerm, setSearchTerm } = useSearch(
  trainers,
  ['profile.fullName', 'profile.bio']
);
```

#### Hook 2: `useFilter`
```tsx
// hooks/useFilter.ts
export const useFilter = <T>(
  items: T[],
  filterFn: (item: T, filterValue: any) => boolean
) => {
  const [filterValue, setFilterValue] = useState('');
  
  const filteredItems = useMemo(() => {
    return items.filter(item => filterFn(item, filterValue));
  }, [items, filterValue]);
  
  return { filteredItems, filterValue, setFilterValue };
};
```

#### Hook 3: `useTrainers` / `useClients` / `useCourses`
```tsx
// hooks/useTrainers.ts
export const useTrainers = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);
  
  const loadTrainers = useCallback(() => {
    setLoading(true);
    const data = storageService.getTrainers();
    setTrainers(data);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    loadTrainers();
  }, [loadTrainers]);
  
  return { trainers, loading, reload: loadTrainers };
};
```

**Impact:**
- ✅ Reduce 24 useState to ~10 custom hooks
- ✅ Eliminate duplicate logic
- ✅ Easier to test
- ✅ 40% less code in components

---

### 3. Duplicate Filter/Search UI (5 locations)

**Duplicated in:**
1. `TrainerList.tsx` (search + filter by expertise)
2. `ClientList.tsx` (search + filter by fitness level)
3. `CourseList.tsx` (no search yet, but needs it)
4. `MyCourses.tsx` (could benefit)

**Current Code (repeated):**
```tsx
<div className="search-box">
  <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>
<div className="filter-box">
  <select value={filter} onChange={(e) => setFilter(e.target.value)}>
    <option value="">All</option>
    {/* options */}
  </select>
</div>
```

**Problems:**
- ❌ Same UI code in 5 files
- ❌ Inconsistent styling
- ❌ Hard to update globally

**Refactoring Priority:** 🟡 **HIGH**

**Solution - Create Reusable Components:**
```tsx
// components/SearchBar.tsx
export const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search..." 
}) => (
  <div className="search-box">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="search-input"
    />
  </div>
);

// components/FilterSelect.tsx
export const FilterSelect = ({
  value,
  onChange,
  options,
  label = "All"
}) => (
  <div className="filter-box">
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{label}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
```

---

### 4. CSS Duplication (25 CSS files, ~40% duplicate)

**Duplicate Patterns Found:**

#### Empty States (5 files)
```css
/* In: TrainerList.css, ClientList.css, CourseList.css, etc. */
.empty-state {
  padding: 3rem;
  text-align: center;
  background: white;
  border-radius: 0.5rem;
}
```

#### Stat Cards (3 files)
```css
/* In: Dashboard.css, etc. */
.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

#### Form Groups (10+ files)
```css
/* Repeated in almost every form */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.form-group label {
  font-weight: 500;
  color: #374151;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
}
```

**Refactoring Priority:** 🟡 **HIGH**

**Solution:**
```
src/styles/
├── variables.css      # Colors, spacing, fonts
├── base.css          # Reset & base styles
├── components.css    # Shared component styles
└── utilities.css     # Utility classes
```

**Extract Common Styles:**
```css
/* styles/components.css */
.empty-state { /* shared style */ }
.stat-card { /* shared style */ }
.form-group { /* shared style */ }
.card { /* shared style */ }
.btn-primary { /* shared style */ }
```

---

### 5. Component Size Issues

**Oversized Components:**

| Component | Lines | Should Be | Issues |
|-----------|-------|-----------|--------|
| `CreateCourse.tsx` | 156 | 80 | Form + validation + logic mixed |
| `TrainerList.tsx` | 110 | 60 | Filter logic inline |
| `ClientList.tsx` | 108 | 60 | Same as above |
| `Login.tsx` | 97 | 60 | Form + demo logic |
| `Signup.tsx` | 99 | 60 | Form + role selection |

**Problems:**
- ❌ Logic + UI mixed together
- ❌ Hard to test
- ❌ Hard to reuse parts
- ❌ Difficult to maintain

**Refactoring Priority:** 🟢 **MEDIUM**

**Solution - Component Splitting:**

#### Example: CreateCourse.tsx (156 → 60 lines)
```tsx
// Before: Everything in one file
const CreateCourse = () => {
  // 20 lines of state
  // 30 lines of handlers
  // 106 lines of JSX
};

// After: Split into smaller pieces
const CreateCourse = () => {
  const { formData, errors, handleSubmit } = useCourseForm();
  
  return (
    <Layout>
      <CourseFormHeader />
      <CourseFormFields 
        formData={formData} 
        errors={errors} 
      />
      <CourseFormActions onSubmit={handleSubmit} />
    </Layout>
  );
};
```

---

## 🎯 SPECIFIC REFACTORING TASKS

### Priority 1: Foundation (Week 1)

#### Task 1.1: Split storageService
```bash
✅ Create folder structure
✅ Extract baseStorage.ts (localStorage wrapper)
✅ Extract userService.ts (User operations)
✅ Extract courseService.ts (Course operations)
✅ Extract connectionService.ts (Connections)
✅ Extract mockData.ts (Mock data generation)
✅ Update imports in all components
```

**Files to Modify:** 18 components that import storageService

**Expected Result:**
- 666 lines → 5 files (50-150 lines each)
- Clear domain separation
- Easier to add new features

---

#### Task 1.2: Create First 5 Custom Hooks
```bash
✅ Create hooks/ folder
✅ useSearch hook (replace 5 instances)
✅ useFilter hook (replace 4 instances)
✅ useTrainers hook (replace 3 instances)
✅ useClients hook (replace 2 instances)
✅ useCourses hook (replace 3 instances)
```

**Files to Modify:**
- TrainerList.tsx
- ClientList.tsx
- CourseList.tsx
- MyCourses.tsx
- TrainerDashboard.tsx
- ClientDashboard.tsx

**Expected Result:**
- 24 useState → 15 useState (38% reduction)
- Consistent data fetching
- Reusable filter/search logic

---

### Priority 2: UI Components (Week 2)

#### Task 2.1: Create Reusable UI Components
```bash
✅ components/ui/SearchBar.tsx
✅ components/ui/FilterSelect.tsx
✅ components/ui/Card.tsx
✅ components/ui/EmptyState.tsx
✅ components/ui/Button.tsx
✅ components/ui/Input.tsx
✅ components/ui/StatCard.tsx
```

**Files to Refactor:** All page components

**Expected Result:**
- Remove duplicate UI code
- Consistent styling
- 30% less JSX in pages

---

#### Task 2.2: Extract Form Components
```bash
✅ components/forms/FormField.tsx
✅ components/forms/FormSection.tsx
✅ components/forms/FormActions.tsx
```

**Files to Refactor:**
- CreateCourse.tsx (156 → 80 lines)
- Login.tsx (97 → 60 lines)
- Signup.tsx (99 → 60 lines)
- Goals.tsx (86 → 50 lines)

---

### Priority 3: Styling (Week 3)

#### Task 3.1: Create Design System
```bash
✅ styles/variables.css (colors, spacing, fonts)
✅ styles/base.css (reset & defaults)
✅ styles/components.css (shared styles)
✅ styles/utilities.css (utility classes)
```

#### Task 3.2: Consolidate CSS
```bash
✅ Extract common styles (empty-state, stat-card, form-group)
✅ Remove duplicate CSS from 25 files
✅ Use CSS variables for colors/spacing
```

**Expected Result:**
- 25 CSS files → 15-18 CSS files
- ~500 lines of duplicate CSS removed
- Consistent visual design

---

## 📈 EXPECTED IMPROVEMENTS

### Code Metrics:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Total Lines** | ~3,500 | ~2,500 | 28% reduction |
| **storageService** | 666 lines | 50-150/file | 75% per file |
| **useState in pages** | 24 | 10-15 | 40% reduction |
| **Duplicate CSS** | ~500 lines | ~100 lines | 80% reduction |
| **Avg Component Size** | 100 lines | 60-70 lines | 35% reduction |

---

## 🛠️ IMPLEMENTATION ROADMAP

### Week 1: Services & Hooks (Foundation)
**Priority:** 🔴 CRITICAL

```bash
Day 1-2: Split storageService
- Create service folder structure
- Extract baseStorage, userService
- Update 18 component imports
- Test all functionality

Day 3-4: Create Custom Hooks
- useSearch, useFilter hooks
- useTrainers, useClients, useCourses
- Replace direct service calls

Day 5: Testing & Documentation
- Test all refactored code
- Document hook APIs
- Update README
```

---

### Week 2: UI Components (High Priority)
**Priority:** 🟡 HIGH

```bash
Day 1-2: Atomic Components
- SearchBar, FilterSelect
- Card, EmptyState
- Button, Input

Day 3-4: Form Components
- FormField, FormSection
- Refactor CreateCourse, Login, Signup
- Extract form validation

Day 5: Component Library
- Create components documentation
- Add usage examples
```

---

### Week 3: Styling & Cleanup (Medium Priority)
**Priority:** 🟢 MEDIUM

```bash
Day 1-2: Design System
- Create CSS variables
- Define color palette, spacing scale
- Create base styles

Day 3-4: CSS Consolidation
- Extract common styles
- Remove duplicates
- Apply design tokens

Day 5: Polish & Review
- Final testing
- Performance check
- Code review
```

---

## 📝 FILES REQUIRING REFACTORING

### Immediate Action (This Week):

#### Services (1 file → 5 files)
```
✅ src/services/storageService.ts (666 lines)
  → storage/baseStorage.ts (50 lines)
  → storage/userService.ts (120 lines)
  → storage/courseService.ts (100 lines)
  → storage/connectionService.ts (80 lines)
  → storage/mockData.ts (316 lines)
```

#### Components with Hooks Opportunity (6 files)
```
✅ src/pages/Trainers/TrainerList.tsx (110 lines)
   - Extract: useSearch, useFilter, useTrainers
   
✅ src/pages/Clients/ClientList.tsx (108 lines)
   - Extract: useSearch, useFilter, useClients
   
✅ src/pages/Courses/CourseList.tsx (79 lines)
   - Extract: useCourses
   
✅ src/pages/Courses/MyCourses.tsx (96 lines)
   - Extract: useCourses, useFilter
   
✅ src/pages/Dashboard/TrainerDashboard.tsx (87 lines)
   - Extract: useTrainers, useCourses, useClients
   
✅ src/pages/Dashboard/ClientDashboard.tsx (97 lines)
   - Extract: useClients, useTrainers, useCourses
```

---

## 🎯 SUCCESS CRITERIA

After refactoring, you should have:

### ✅ Clean Architecture
- [ ] Services split into domain modules
- [ ] Custom hooks for data fetching
- [ ] Reusable UI components
- [ ] Shared styling system

### ✅ Better Maintainability
- [ ] No file over 200 lines
- [ ] No duplicate code blocks
- [ ] Clear separation of concerns
- [ ] Easy to test

### ✅ Improved Developer Experience
- [ ] Components easy to find
- [ ] Hooks easy to reuse
- [ ] Styles consistent
- [ ] Fast development

---

## 📚 RESOURCES

### Recommended Reading:
- [React Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Component Composition](https://reactjs.org/docs/composition-vs-inheritance.html)
- [CSS Architecture](https://css-tricks.com/css-architecture-for-design-systems/)

### Tools to Use:
- ESLint for code quality
- Prettier for formatting
- TypeScript strict mode
- React DevTools

---

## 💡 QUICK WINS

Start with these for immediate impact:

### 1. Extract `useSearch` Hook (30 minutes)
Replace search logic in TrainerList & ClientList

### 2. Create `SearchBar` Component (20 minutes)  
Replace duplicate search UI in 5 files

### 3. Create `EmptyState` Component (15 minutes)
Replace empty state UI in 5 files

### 4. Extract `mockData.ts` (45 minutes)
Move 316 lines out of storageService

**Total Time:** 2 hours  
**Impact:** 25% less duplicate code

---

**Document Version:** 1.0  
**Created For:** Commit `e645293`  
**Generated:** February 15, 2026  
**Next Review:** After completing Week 1 tasks
