# Refactoring Task 13: useArrayState Hook

**Priority:** LOW ⭐⭐ EASY  
**Effort:** 15 minutes  
**Difficulty:** ⭐⭐ Easy  
**Impact:** Cleaner array management code

---

## 📋 Problem

Array manipulation logic is **repeated** for managing lists:

**Common patterns found:**
- Adding items to arrays (goals, expertise, certifications, target goals)
- Removing items from arrays
- Toggle items (preferences, training types)
- Preventing duplicates

**Current locations:**
- `TrainerProfile.tsx` - areasOfExpertise add/remove
- `ClientProfile.tsx` - preferredTrainingType toggle, goals management
- `CreateCourse.tsx` - targetGoals add/remove
- `Goals.tsx` - goals add/remove

**Current pattern:**
```typescript
const addExpertise = () => {
  const expertise = prompt('Enter area of expertise:');
  if (expertise && !areasOfExpertise.includes(expertise)) {
    setAreasOfExpertise([...areasOfExpertise, expertise]);
  }
};

const removeExpertise = (expertise: string) => {
  setAreasOfExpertise(areasOfExpertise.filter((e) => e !== expertise));
};
```

---

## 🎯 Solution

Create a `useArrayState` custom hook in `src/hooks/useArrayState.ts`

### Hook Return Type

```tsx
interface UseArrayStateReturn<T> {
  items: T[];
  add: (item: T) => void;
  remove: (item: T) => void;
  toggle: (item: T) => void;
  clear: () => void;
  has: (item: T) => boolean;
  set: (items: T[]) => void;
}
```

---

## 📋 IMPLEMENTATION PROMPT

```
I'm working on a React TypeScript fitness application called FitConnect. I need to create a useArrayState custom hook to standardize array manipulation logic across forms and profile pages.

CURRENT STATE:
Multiple pages have similar array manipulation code:

TrainerProfile.tsx:
```typescript
const addExpertise = () => {
  const expertise = prompt('Enter area of expertise:');
  if (expertise && !areasOfExpertise.includes(expertise)) {
    setAreasOfExpertise([...areasOfExpertise, expertise]);
  }
};

const removeExpertise = (expertise: string) => {
  setAreasOfExpertise(areasOfExpertise.filter((e) => e !== expertise));
};
```

CreateCourse.tsx has similar pattern for targetGoals.
ClientProfile.tsx toggles training types.

TASK:
1. Create a useArrayState hook in src/hooks/useArrayState.ts
2. The hook should:
   - Be generic (work with any type T)
   - Provide: add, remove, toggle, clear, has, set operations
   - Prevent duplicates automatically on add
   - Be fully typed with TypeScript generics

HOOK SIGNATURE:
```typescript
export const useArrayState = <T>(initialValue: T[] = []): UseArrayStateReturn<T> => {
  const [items, setItems] = useState<T[]>(initialValue);

  const add = useCallback((item: T) => {
    setItems(prev => prev.includes(item) ? prev : [...prev, item]);
  }, []);

  const remove = useCallback((item: T) => {
    setItems(prev => prev.filter(i => i !== item));
  }, []);

  const toggle = useCallback((item: T) => {
    setItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const has = useCallback((item: T) => items.includes(item), [items]);

  const set = useCallback((newItems: T[]) => setItems(newItems), []);

  return { items, add, remove, toggle, clear, has, set };
};
```

USAGE EXAMPLES:
```typescript
// For expertise (strings)
const expertise = useArrayState<string>(trainer?.profile.areasOfExpertise || []);

const addExpertise = () => {
  const value = prompt('Enter area of expertise:');
  if (value) expertise.add(value);
};

// For training types (enums)
const trainingTypes = useArrayState<TrainingType>(
  client?.profile.preferredTrainingType || []
);

const handleTrainingTypeToggle = (type: TrainingType) => {
  trainingTypes.toggle(type);
};

// For goals
const goals = useArrayState<string>(client?.goals || []);

const addGoal = () => {
  if (currentGoal) {
    goals.add(currentGoal);
    setCurrentGoal('');
  }
};
```

REQUIREMENTS:
- Type-safe with generics
- Prevents duplicates automatically
- Memoized operations
- Works with primitives and objects
- Clean API

Please create:
1. src/hooks/useArrayState.ts with full implementation
2. Show me how to refactor TrainerProfile.tsx expertise management
3. Show me how to refactor CreateCourse.tsx goals management
4. Show me how to refactor ClientProfile.tsx training types

Follow React hooks best practices and TypeScript strict typing.
```

---

## ✅ Expected Result

### Files Created:
1. `src/hooks/useArrayState.ts`

### Files Modified:
1. `TrainerProfile.tsx` - Use for expertise
2. `ClientProfile.tsx` - Use for training types and goals
3. `CreateCourse.tsx` - Use for target goals
4. `Goals.tsx` - Use for goals

### Usage Example:
```typescript
const expertise = useArrayState<string>([]);

// Clean API
expertise.add('Yoga');
expertise.remove('Yoga');
expertise.toggle('Cardio');
expertise.has('Strength'); // boolean
expertise.clear();
```

---

## 📊 Impact

- **Lines Removed:** ~50+ lines of array logic
- **Pages Affected:** 4+ files
- **Consistency:** All arrays managed the same way
- **Reusability:** Works with any type
- **Type Safety:** Generic types prevent errors

---

## 🔗 Next Steps

1. Create the hook with all operations
2. Refactor TrainerProfile.tsx
3. Refactor ClientProfile.tsx
4. Refactor CreateCourse.tsx
5. Refactor Goals.tsx
6. Test array operations
7. Commit changes

**Status:** ⬜ Not Started
