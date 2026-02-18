# Refactoring Task 10: useConfirmDialog Hook

**Priority:** LOW ⭐ VERY EASY  
**Effort:** 10 minutes  
**Difficulty:** ⭐ Very Easy  
**Impact:** Cleaner code, better UX potential

---

## 📋 Problem

`window.confirm()` is used **directly** in multiple places:

**Current usage (3 locations):**
- `TrainerBookings.tsx` (lines 40, 62) - 2 confirm dialogs
- `ClientBookings.tsx` (line 42) - 1 confirm dialog

**Current pattern:**
```typescript
const handleCancelBooking = (bookingId: string) => {
  if (window.confirm('Are you sure you want to cancel this booking?')) {
    // Do something
  }
};
```

**Problems:**
- Not customizable (ugly browser dialog)
- No control over styling
- Repeated if-checks everywhere
- Can't add custom actions/callbacks easily

---

## 🎯 Solution

Create a `useConfirmDialog` custom hook in `src/hooks/useConfirmDialog.ts`

### Hook Return Type

```tsx
interface UseConfirmDialogReturn {
  confirm: (message: string, onConfirm: () => void) => void;
  // Future: Can add custom modal dialog instead of window.confirm
}
```

---

## 📋 IMPLEMENTATION PROMPT

```
I'm working on a React TypeScript fitness application called FitConnect. I need to create a useConfirmDialog custom hook to standardize confirmation dialogs across the application.

CURRENT STATE:
Multiple pages use window.confirm() directly:

TrainerBookings.tsx:
```typescript
const handleCancelBooking = (bookingId: string) => {
  if (window.confirm('Are you sure you want to cancel this booking?')) {
    storageService.cancelBooking(bookingId);
    loadBookings();
  }
};

const handleRejectBooking = (bookingId: string) => {
  if (window.confirm('Are you sure you want to reject this booking?')) {
    storageService.rejectBooking(bookingId);
    loadBookings();
  }
};
```

ClientBookings.tsx has similar pattern.

TASK:
1. Create a useConfirmDialog hook in src/hooks/useConfirmDialog.ts
2. For now, wrap window.confirm() to standardize the pattern
3. Design it so we can easily replace with custom modal later
4. The hook should provide a confirm() function that takes:
   - message (string)
   - onConfirm callback (function to run if confirmed)
   - optional onCancel callback

HOOK SIGNATURE:
```typescript
export const useConfirmDialog = () => {
  const confirm = (
    message: string, 
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    if (window.confirm(message)) {
      onConfirm();
    } else if (onCancel) {
      onCancel();
    }
  };

  return { confirm };
};
```

USAGE EXAMPLE:
```typescript
const { confirm } = useConfirmDialog();

const handleCancelBooking = (bookingId: string) => {
  confirm(
    'Are you sure you want to cancel this booking?',
    () => {
      storageService.cancelBooking(bookingId);
      loadBookings();
    }
  );
};
```

FUTURE ENHANCEMENT:
The hook is designed so you can later replace window.confirm with a custom modal component:
- Add state for showing/hiding modal
- Pass message and callbacks to modal
- Show custom styled modal instead of browser dialog

REQUIREMENTS:
- Simple wrapper for now
- Type-safe with TypeScript
- Easy to replace implementation later
- Clean API

Please create:
1. src/hooks/useConfirmDialog.ts with full implementation
2. Show me how to refactor TrainerBookings.tsx to use the hook
3. Show me the structure for future custom modal enhancement

Follow React hooks best practices and TypeScript strict typing.
```

---

## ✅ Expected Result

### Files Created:
1. `src/hooks/useConfirmDialog.ts`

### Files Modified:
1. `TrainerBookings.tsx` - Use hook
2. `ClientBookings.tsx` - Use hook

### Usage Example:
```typescript
const { confirm } = useConfirmDialog();

const handleDelete = () => {
  confirm(
    'Are you sure you want to delete this item?',
    () => console.log('Deleted!'),
    () => console.log('Cancelled')
  );
};
```

---

## 📊 Impact

- **Lines:** Cleaner code pattern
- **Pages Affected:** 2 files
- **Future:** Easy to add custom modal dialogs
- **Consistency:** All confirmations work the same way
- **Testability:** Easier to mock confirmations in tests

---

## 🔗 Next Steps

1. Create the hook
2. Refactor TrainerBookings.tsx
3. Refactor ClientBookings.tsx
4. Test confirmation flows
5. (Future) Replace with custom modal
6. Commit changes

**Status:** ⬜ Not Started
