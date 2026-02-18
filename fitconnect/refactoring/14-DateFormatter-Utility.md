# Refactoring Task 14: DateFormatter Utility

**Priority:** LOW ⭐ VERY EASY  
**Effort:** 10 minutes  
**Difficulty:** ⭐ Very Easy  
**Impact:** Consistent date formatting

---

## 📋 Problem

Date formatting is **inconsistent** across the app:

**Current variations:**
```typescript
// Pattern 1
new Date(booking.date).toLocaleDateString()

// Pattern 2  
new Date(course.createdAt).toLocaleDateString()

// Pattern 3
new Date().toISOString()

// Pattern 4
booking.date (ISO string)
```

**Found in:**
- `TrainerBookings.tsx` - 1 usage
- `ClientBookings.tsx` - 1 usage
- Various detail pages
- Profile pages

**Problems:**
- No consistent format
- Repeated toLocaleDateString() calls
- Hard to change format globally
- No relative dates ("2 days ago")

---

## 🎯 Solution

Create date formatting utilities in `src/utils/dateFormatter.ts`

### Functions

```tsx
export const formatDate = (date: string | Date): string;
export const formatDateTime = (date: string | Date): string;
export const formatRelative = (date: string | Date): string;
export const formatTime = (time: string): string;
export const isToday = (date: string | Date): boolean;
export const isPast = (date: string | Date): boolean;
```

---

## 📋 IMPLEMENTATION PROMPT

```
I'm working on a React TypeScript fitness application called FitConnect. I need to create date formatting utility functions to standardize date display across the application.

CURRENT STATE:
Date formatting is inconsistent:
- new Date(booking.date).toLocaleDateString()
- new Date().toISOString()
- Various date formats in different places

TASK:
1. Create date formatting utilities in src/utils/dateFormatter.ts
2. Provide helper functions for common date operations:
   - formatDate: "Jan 15, 2024"
   - formatDateTime: "Jan 15, 2024, 3:30 PM"
   - formatRelative: "2 days ago", "in 3 days"
   - formatTime: "09:00" → "9:00 AM"
   - isToday: Check if date is today
   - isPast: Check if date is in the past

IMPLEMENTATION:
```typescript
export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const formatRelative = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0) return `in ${diffDays} days`;
  return `${Math.abs(diffDays)} days ago`;
};

export const formatTime = (time: string): string => {
  // Convert "09:00" to "9:00 AM"
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const isToday = (date: string | Date): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return d.toDateString() === today.toDateString();
};

export const isPast = (date: string | Date): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d < new Date();
};
```

USAGE EXAMPLES:
```typescript
// In TrainerBookings.tsx
import { formatDate, formatTime } from '../../utils/dateFormatter';

<span>{formatDate(booking.date)}</span>
<span>{formatTime(booking.timeSlot.startTime)} - {formatTime(booking.timeSlot.endTime)}</span>

// In CourseDetail.tsx
import { formatRelative } from '../../utils/dateFormatter';

<span>Created {formatRelative(course.createdAt)}</span>
```

REQUIREMENTS:
- Type-safe with TypeScript
- Handle both string and Date inputs
- Return consistent formats
- Easy to use
- Testable

Please create:
1. src/utils/dateFormatter.ts with all functions
2. Show me how to refactor TrainerBookings.tsx to use formatters
3. Show me how to refactor ClientBookings.tsx to use formatters

Follow TypeScript best practices.
```

---

## ✅ Expected Result

### Files Created:
1. `src/utils/dateFormatter.ts`

### Files Modified:
1. `TrainerBookings.tsx` - Use formatDate, formatTime
2. `ClientBookings.tsx` - Use formatDate, formatTime
3. Other pages with dates

### Usage Example:
```typescript
import { formatDate, formatTime, formatRelative } from '../../utils/dateFormatter';

// Clean and consistent
<span>{formatDate(booking.date)}</span> // "Jan 15, 2024"
<span>{formatTime("09:00")}</span> // "9:00 AM"
<span>{formatRelative(course.createdAt)}</span> // "2 days ago"
```

---

## 📊 Impact

- **Consistency:** All dates formatted the same way
- **Maintainability:** Change format in one place
- **Features:** Easy to add relative dates, etc.
- **Type Safety:** Handles both strings and Date objects
- **Testability:** Easy to unit test

---

## 🔗 Next Steps

1. Create the utility functions
2. Refactor booking pages
3. Refactor course pages
4. Refactor profile pages
5. Test all date displays
6. Commit changes

**Status:** ⬜ Not Started
