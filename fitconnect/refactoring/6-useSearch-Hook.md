# Refactoring Task 6: useSearch Hook

**Priority:** MEDIUM ⭐⭐ EASY  
**Effort:** 20 minutes  
**Difficulty:** ⭐⭐ Easy  
**Impact:** Removes 30+ lines, creates reusable pattern

---

## 📋 Problem

Search/filter logic is **duplicated in 2 files** with similar patterns:

**Current duplication locations:**
- `TrainerList.tsx` (lines 20-30)
- `ClientList.tsx` (lines 20-29)

Both filter items by searching across multiple fields with case-insensitive matching.

**TrainerList example:**
```typescript
const filteredTrainers = allTrainers.filter((trainer) => {
  const searchLower = searchTerm.toLowerCase();
  const matchesSearch =
    !searchTerm ||
    trainer.profile.fullName.toLowerCase().includes(searchLower) ||
    trainer.profile.bio.toLowerCase().includes(searchLower) ||
    trainer.profile.areasOfExpertise.some(exp => exp.toLowerCase().includes(searchLower));
  return matchesSearch;
});
```

---

## 🎯 Solution

Create a generic `useSearch` custom hook in `src/hooks/useSearch.ts`

### Hook Signature

```tsx
export const useSearch = <T>(
  items: T[],
  searchTerm: string,
  searchFields: (item: T) => string[]
): T[] => { ... }
```

---

## 📋 IMPLEMENTATION PROMPT

```
I'm working on a React TypeScript fitness application called FitConnect. I need to create a reusable useSearch custom hook to eliminate duplicate search/filter logic across multiple pages.

CURRENT STATE:
The codebase has similar search logic duplicated in:

1. src/pages/Trainers/TrainerList.tsx (lines 20-30):
```typescript
const filteredTrainers = allTrainers.filter((trainer) => {
  const searchLower = searchTerm.toLowerCase();
  const matchesSearch =
    !searchTerm ||
    trainer.profile.fullName.toLowerCase().includes(searchLower) ||
    trainer.profile.bio.toLowerCase().includes(searchLower) ||
    trainer.profile.areasOfExpertise.some(exp => exp.toLowerCase().includes(searchLower));
  const matchesExpertise =
    !selectedExpertise || trainer.profile.areasOfExpertise.includes(selectedExpertise);
  return matchesSearch && matchesExpertise;
});
```

2. src/pages/Clients/ClientList.tsx (lines 20-29):
Similar pattern but for clients (searching by fullName, email, goals)

TASK:
1. Create a generic useSearch hook in src/hooks/useSearch.ts
2. The hook should:
   - Be fully typed with TypeScript generics
   - Accept: items array, searchTerm string, searchFields function
   - Return: filtered items array
   - Use useMemo for performance optimization
   - Handle case-insensitive search
   - Search across multiple fields specified by searchFields callback

3. Create the hooks folder if it doesn't exist: mkdir -p src/hooks

HOOK SIGNATURE:
```typescript
export const useSearch = <T>(
  items: T[],
  searchTerm: string,
  searchFields: (item: T) => string[]
): T[] => { ... }
```

USAGE EXAMPLE (for TrainerList):
```typescript
const searchableTrainers = useSearch(
  allTrainers,
  searchTerm,
  (trainer) => [
    trainer.profile.fullName,
    trainer.profile.bio,
    ...trainer.profile.areasOfExpertise
  ]
);
```

REQUIREMENTS:
- Type-safe with generics
- Memoized for performance
- Returns original array if searchTerm is empty
- Case-insensitive matching
- Searches across all provided fields

Please create:
1. src/hooks/useSearch.ts with full implementation
2. Show me how to refactor TrainerList.tsx to use the hook
3. Show me how to refactor ClientList.tsx to use the hook

Follow React hooks best practices and TypeScript strict typing.
```

---

## ✅ Expected Result

### Files Created:
1. `src/hooks/useSearch.ts`

### Files Modified:
1. `TrainerList.tsx` - Use hook instead of inline filter
2. `ClientList.tsx` - Use hook instead of inline filter

### Usage Example:
```typescript
const filteredTrainers = useSearch(
  allTrainers,
  searchTerm,
  (trainer) => [
    trainer.profile.fullName,
    trainer.profile.bio,
    ...trainer.profile.areasOfExpertise
  ]
);

const filteredClients = useSearch(
  allClients,
  searchTerm,
  (client) => [
    client.profile.fullName || '',
    client.email,
    ...client.goals
  ]
);
```

---

## 📊 Impact

- **Lines Removed:** ~30 duplicate lines
- **Pages Affected:** 2 files
- **Reusability:** Can use for future search needs
- **Performance:** Memoized for optimization
- **Type Safety:** Generic hook works with any type

---

## 🔗 Next Steps

1. Create hooks folder if needed
2. Implement useSearch hook
3. Refactor TrainerList.tsx
4. Refactor ClientList.tsx
5. Test search functionality
6. Commit changes

**Status:** ⬜ Not Started
