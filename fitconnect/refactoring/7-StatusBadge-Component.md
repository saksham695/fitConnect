# Refactoring Task 7: StatusBadge Component

**Priority:** MEDIUM ⭐ VERY EASY  
**Effort:** 15 minutes  
**Difficulty:** ⭐ Very Easy  
**Impact:** Removes 40+ lines, ensures consistency

---

## 📋 Problem

Status badges are **repeated with inline class logic** in multiple files:

**Current locations:**
- `TrainerBookings.tsx` (line ~151-153)
- `ClientBookings.tsx` (line ~148-150)
- `TrainerList.tsx` (line ~72-74) - "Connected" badge

**Current pattern:**
```tsx
<span className={`status-badge ${booking.status.toLowerCase()}`}>
  {booking.status}
</span>
```

**Status types used:**
- **BookingStatus:** PENDING, CONFIRMED, REJECTED, CANCELLED, COMPLETED
- **ConnectionStatus:** CONNECTED, PENDING

Each status has different colors defined in CSS.

---

## 🎯 Solution

Create a reusable `StatusBadge` component in `src/components/StatusBadge/`

### Interface

```tsx
interface StatusBadgeProps {
  status: BookingStatus | ConnectionStatus;
  label?: string;
}
```

---

## 📋 IMPLEMENTATION PROMPT

```
I'm working on a React TypeScript fitness application called FitConnect. I need to create a reusable StatusBadge component to replace duplicate status badge UI across booking and list pages.

CURRENT STATE:
Status badges appear throughout the app with this pattern:
```tsx
<span className={`status-badge ${booking.status.toLowerCase()}`}>
  {booking.status}
</span>
```

Locations:
- TrainerBookings.tsx (line ~151-153)
- ClientBookings.tsx (line ~148-150)
- TrainerList.tsx (line ~72-74) - shows "Connected" badge

Different status types:
- BookingStatus: PENDING, CONFIRMED, REJECTED, CANCELLED, COMPLETED
- ConnectionStatus: CONNECTED, PENDING

Each status has different colors:
- PENDING: orange/amber background
- CONFIRMED: blue background
- REJECTED: red background
- CANCELLED: gray/red background
- COMPLETED: green background
- CONNECTED: purple/blue background

TASK:
1. Create a reusable StatusBadge component in src/components/StatusBadge/
2. The component should accept these props:
   - status (required: BookingStatus | ConnectionStatus enum)
   - label (optional: string to override default status text)

3. Automatically apply correct styling based on status
4. Support uppercase text transformation
5. Rounded corners, padding, small font size

TYPES (from codebase):
```typescript
import { BookingStatus, ConnectionStatus } from '../../types/enums';
```

DESIGN REQUIREMENTS:
- Small, pill-shaped badge
- Background color based on status
- Uppercase text
- Centered text
- Bold font
- Auto-sizing based on content

EXISTING CSS:
The app already has .status-badge CSS with variants like:
- .status-badge.pending
- .status-badge.confirmed
- .status-badge.rejected
- .status-badge.cancelled
- .status-badge.completed
- .status-badge.connected

Please create:
1. src/components/StatusBadge/StatusBadge.tsx
2. src/components/StatusBadge/StatusBadge.css
3. Show me example usage from TrainerBookings and TrainerList

Follow React best practices and TypeScript strict typing.
```

---

## ✅ Expected Result

### Files Created:
1. `src/components/StatusBadge/StatusBadge.tsx`
2. `src/components/StatusBadge/StatusBadge.css`

### Usage Example:
```tsx
<StatusBadge status={booking.status} />

<StatusBadge status={ConnectionStatus.CONNECTED} label="Connected" />

<StatusBadge status={BookingStatus.PENDING} />
```

---

## 📊 Impact

- **Lines Removed:** ~40 lines
- **Pages Affected:** 3 files
- **Consistency:** All badges look identical
- **Type Safety:** Enum-based, prevents typos
- **Maintenance:** Single place to update badge styles

---

## 🔗 Next Steps

1. Implement the component
2. Replace in TrainerBookings.tsx
3. Replace in ClientBookings.tsx
4. Replace in TrainerList.tsx
5. Test all status displays
6. Commit changes

**Status:** ⬜ Not Started
