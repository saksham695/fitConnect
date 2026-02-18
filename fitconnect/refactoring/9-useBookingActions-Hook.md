# Refactoring Task 9: useBookingActions Hook

**Priority:** MEDIUM ⭐⭐ EASY  
**Effort:** 30 minutes  
**Difficulty:** ⭐⭐ Easy  
**Impact:** Removes 80+ lines, standardizes booking operations

---

## 📋 Problem

Booking action handlers are **duplicated in TrainerBookings and ClientBookings**:

**Repeated patterns:**
- `loadBookings()` - Fetches bookings from storage
- `handleCancelBooking()` - Cancels a booking with confirmation
- `handleConfirmBooking()` - Confirms pending booking
- `handleRejectBooking()` - Rejects booking with confirmation
- `handleCompleteBooking()` - Marks booking as complete

**Current locations:**
- `TrainerBookings.tsx` (lines 21-66) - 5 action handlers
- `ClientBookings.tsx` (lines 23-46) - 2 action handlers

**Similar logic:**
```typescript
const handleCancelBooking = (bookingId: string) => {
  if (window.confirm('Are you sure you want to cancel this booking?')) {
    storageService.cancelBooking(bookingId);
    loadBookings();
  }
};
```

---

## 🎯 Solution

Create a `useBookingActions` custom hook in `src/hooks/useBookingActions.ts`

### Hook Return Type

```tsx
interface UseBookingActionsReturn {
  bookings: Booking[];
  loading: boolean;
  loadBookings: () => void;
  confirmBooking: (bookingId: string) => Promise<void>;
  rejectBooking: (bookingId: string) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  completeBooking: (bookingId: string) => Promise<void>;
}
```

---

## 📋 IMPLEMENTATION PROMPT

```
I'm working on a React TypeScript fitness application called FitConnect. I need to create a useBookingActions custom hook to eliminate duplicate booking action logic across trainer and client booking pages.

CURRENT STATE:
Both TrainerBookings.tsx and ClientBookings.tsx have similar booking action handlers:

TrainerBookings.tsx (lines 21-66):
```typescript
const loadBookings = () => {
  if (!trainer) return;
  const allBookings = storageService.getBookingsByTrainerId(trainer.id);
  setBookings(allBookings);
};

const handleCancelBooking = (bookingId: string) => {
  if (window.confirm('Are you sure you want to cancel this booking?')) {
    storageService.cancelBooking(bookingId);
    loadBookings();
  }
};

const handleConfirmBooking = (bookingId: string) => {
  storageService.confirmBooking(bookingId);
  loadBookings();
};

const handleRejectBooking = (bookingId: string) => {
  if (window.confirm('Are you sure you want to reject this booking?')) {
    storageService.rejectBooking(bookingId);
    loadBookings();
  }
};

const handleCompleteBooking = (bookingId: string) => {
  const booking = bookings.find((b) => b.id === bookingId);
  if (booking) {
    booking.status = BookingStatus.COMPLETED;
    booking.updatedAt = new Date().toISOString();
    storageService.updateBooking(booking);
    loadBookings();
  }
};
```

ClientBookings.tsx has similar cancelBooking logic.

TASK:
1. Create a useBookingActions hook in src/hooks/useBookingActions.ts
2. The hook should:
   - Accept: userId (string), userRole ('trainer' | 'client')
   - Fetch bookings based on role
   - Provide action handlers: confirm, reject, cancel, complete
   - Include built-in confirmation dialogs for destructive actions
   - Auto-reload bookings after each action
   - Provide loading state
   - Handle errors gracefully

HOOK SIGNATURE:
```typescript
export const useBookingActions = (userId: string, userRole: 'trainer' | 'client') => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const loadBookings = useCallback(() => { ... }, [userId, userRole]);

  const confirmBooking = useCallback(async (bookingId: string) => { ... }, [loadBookings]);
  const rejectBooking = useCallback(async (bookingId: string) => { ... }, [loadBookings]);
  const cancelBooking = useCallback(async (bookingId: string) => { ... }, [loadBookings]);
  const completeBooking = useCallback(async (bookingId: string) => { ... }, [loadBookings]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  return {
    bookings,
    loading,
    loadBookings,
    confirmBooking,
    rejectBooking,
    cancelBooking,
    completeBooking,
  };
};
```

REQUIREMENTS:
- Type-safe with TypeScript
- Use useCallback for memoization
- Built-in confirmation dialogs (window.confirm)
- Auto-refresh after actions
- Role-based booking fetching
- Loading state management

Please create:
1. src/hooks/useBookingActions.ts with full implementation
2. Show me how to refactor TrainerBookings.tsx to use the hook
3. Show me how to refactor ClientBookings.tsx to use the hook

Follow React hooks best practices and TypeScript strict typing.
```

---

## ✅ Expected Result

### Files Created:
1. `src/hooks/useBookingActions.ts`

### Files Modified:
1. `TrainerBookings.tsx` - Remove duplicate handlers
2. `ClientBookings.tsx` - Remove duplicate handlers

### Usage Example:
```typescript
// In TrainerBookings.tsx
const { 
  bookings, 
  loading,
  confirmBooking, 
  rejectBooking, 
  cancelBooking, 
  completeBooking 
} = useBookingActions(trainer.id, 'trainer');

// In ClientBookings.tsx
const { 
  bookings, 
  loading,
  cancelBooking 
} = useBookingActions(client.id, 'client');
```

---

## 📊 Impact

- **Lines Removed:** ~80 duplicate lines
- **Pages Affected:** 2 files
- **Consistency:** All booking actions work the same way
- **Testability:** Easier to test booking logic
- **Loading States:** Built-in loading management

---

## 🔗 Next Steps

1. Create the hook
2. Add loading and error states
3. Refactor TrainerBookings.tsx
4. Refactor ClientBookings.tsx
5. Test all booking actions
6. Commit changes

**Status:** ⬜ Not Started
