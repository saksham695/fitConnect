# Refactoring Task 11: useUserLookup Hook

**Priority:** MEDIUM ⭐⭐ EASY  
**Effort:** 15 minutes  
**Difficulty:** ⭐⭐ Easy  
**Impact:** Removes 40+ lines, caches user lookups

---

## 📋 Problem

User lookup functions are **repeated** across multiple pages:

**Current locations:**
- `TrainerBookings.tsx` (lines 29-37) - getClientName, getClientEmail
- `ClientBookings.tsx` (lines 31-38) - getTrainerName, getTrainerEmail  
- `ClientDetail.tsx` - getTrainerName
- `TrainerDetail.tsx` - getClientName

**Current pattern:**
```typescript
const getClientName = (clientId: string): string => {
  const client = storageService.getClientById(clientId);
  return client?.profile.fullName || 'Unknown Client';
};

const getClientEmail = (clientId: string): string => {
  const client = storageService.getClientById(clientId);
  return client?.email || '';
};
```

**Problems:**
- Same logic repeated 4+ times
- No caching - refetches every time
- Not memoized

---

## 🎯 Solution

Create a `useUserLookup` custom hook in `src/hooks/useUserLookup.ts`

### Hook Return Type

```tsx
interface UseUserLookupReturn {
  getTrainerName: (trainerId: string) => string;
  getTrainerEmail: (trainerId: string) => string;
  getClientName: (clientId: string) => string;
  getClientEmail: (clientId: string) => string;
}
```

---

## 📋 IMPLEMENTATION PROMPT

```
I'm working on a React TypeScript fitness application called FitConnect. I need to create a useUserLookup custom hook to eliminate duplicate user lookup logic and add caching for performance.

CURRENT STATE:
Multiple pages have similar user lookup functions:

TrainerBookings.tsx:
```typescript
const getClientName = (clientId: string): string => {
  const client = storageService.getClientById(clientId);
  return client?.profile.fullName || 'Unknown Client';
};

const getClientEmail = (clientId: string): string => {
  const client = storageService.getClientById(clientId);
  return client?.email || '';
};
```

ClientBookings.tsx has similar getTrainerName/getTrainerEmail functions.

TASK:
1. Create a useUserLookup hook in src/hooks/useUserLookup.ts
2. The hook should:
   - Provide getTrainerName, getTrainerEmail, getClientName, getClientEmail
   - Cache user lookups in useMemo to avoid repeated fetches
   - Return default values for missing users
   - Be fully memoized for performance

HOOK IMPLEMENTATION:
```typescript
export const useUserLookup = () => {
  const trainers = useMemo(() => storageService.getTrainers(), []);
  const clients = useMemo(() => storageService.getClients(), []);

  const getTrainerName = useCallback((trainerId: string): string => {
    const trainer = trainers.find(t => t.id === trainerId);
    return trainer?.profile.fullName || 'Unknown Trainer';
  }, [trainers]);

  const getTrainerEmail = useCallback((trainerId: string): string => {
    const trainer = trainers.find(t => t.id === trainerId);
    return trainer?.email || '';
  }, [trainers]);

  const getClientName = useCallback((clientId: string): string => {
    const client = clients.find(c => c.id === clientId);
    return client?.profile.fullName || 'Unknown Client';
  }, [clients]);

  const getClientEmail = useCallback((clientId: string): string => {
    const client = clients.find(c => c.id === clientId);
    return client?.email || '';
  }, [clients]);

  return {
    getTrainerName,
    getTrainerEmail,
    getClientName,
    getClientEmail,
  };
};
```

USAGE EXAMPLE:
```typescript
const { getClientName, getClientEmail } = useUserLookup();

// In JSX
<h3>{getClientName(booking.clientId)}</h3>
<p>{getClientEmail(booking.clientId)}</p>
```

BENEFITS:
- Fetches all users once at hook initialization
- Caches results in memory
- useCallback prevents recreation
- Much faster than repeated storageService calls

REQUIREMENTS:
- Type-safe with TypeScript
- Memoized for performance
- Default values for missing users
- Works with both trainers and clients

Please create:
1. src/hooks/useUserLookup.ts with full implementation
2. Show me how to refactor TrainerBookings.tsx to use the hook
3. Show me how to refactor ClientBookings.tsx to use the hook

Follow React hooks best practices and TypeScript strict typing.
```

---

## ✅ Expected Result

### Files Created:
1. `src/hooks/useUserLookup.ts`

### Files Modified:
1. `TrainerBookings.tsx` - Remove getClientName/Email
2. `ClientBookings.tsx` - Remove getTrainerName/Email
3. `ClientDetail.tsx` - Use hook
4. `TrainerDetail.tsx` - Use hook

### Usage Example:
```typescript
const { getClientName, getClientEmail } = useUserLookup();

// Now cached and memoized!
<h3>{getClientName(booking.clientId)}</h3>
```

---

## 📊 Impact

- **Lines Removed:** ~40 duplicate lines
- **Pages Affected:** 4 files
- **Performance:** Cached lookups, much faster
- **Consistency:** All user lookups work the same way
- **Reusability:** Can use anywhere user info is needed

---

## 🔗 Next Steps

1. Create the hook with caching
2. Refactor TrainerBookings.tsx
3. Refactor ClientBookings.tsx
4. Refactor Detail pages
5. Test performance improvement
6. Commit changes

**Status:** ⬜ Not Started
