# Refactoring Task 15: LoadingSpinner Component

**Priority:** LOW ⭐ VERY EASY  
**Effort:** 15 minutes  
**Difficulty:** ⭐ Very Easy  
**Impact:** Consistent loading states

---

## 📋 Problem

The app currently has **no loading states** when fetching data!

**Missing loading indicators in:**
- Booking pages (while loading bookings)
- Profile pages (while loading user data)
- Course pages (while loading courses)
- Dashboard (while loading stats)

**Problems:**
- No visual feedback during data loading
- Users don't know if app is processing
- Poor UX

---

## 🎯 Solution

Create a reusable `LoadingSpinner` component in `src/components/LoadingSpinner/`

### Interface

```tsx
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  fullScreen?: boolean;
}
```

---

## 📋 IMPLEMENTATION PROMPT

```
I'm working on a React TypeScript fitness application called FitConnect. I need to create a reusable LoadingSpinner component to show loading states across the application.

CURRENT STATE:
The app has no loading indicators when fetching data. Users see blank/old content while data loads.

TASK:
1. Create a LoadingSpinner component in src/components/LoadingSpinner/
2. The component should accept these props:
   - size (optional: 'small', 'medium', 'large')
   - text (optional: loading message like "Loading bookings...")
   - fullScreen (optional: boolean - covers entire screen)

DESIGN REQUIREMENTS:
- Animated CSS spinner (no image/SVG dependencies)
- Three sizes: small (20px), medium (40px), large (60px)
- Optional text below spinner
- Optional fullScreen overlay mode
- Use design system colors

IMPLEMENTATION:
```tsx
// LoadingSpinner.tsx
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  text,
  fullScreen = false
}) => {
  const spinnerClass = `loading-spinner loading-spinner--${size}`;

  const spinner = (
    <div className="loading-container">
      <div className={spinnerClass}></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="loading-fullscreen">{spinner}</div>;
  }

  return spinner;
};
```

CSS ANIMATION:
```css
.loading-spinner {
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--color-primary, #2563eb);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-spinner--small {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.loading-spinner--medium {
  width: 40px;
  height: 40px;
  border-width: 3px;
}

.loading-spinner--large {
  width: 60px;
  height: 60px;
  border-width: 4px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-text {
  color: var(--color-text-secondary, #6b7280);
  font-size: 0.875rem;
}
```

USAGE EXAMPLES:
```tsx
// Small inline spinner
<LoadingSpinner size="small" />

// Medium with text
<LoadingSpinner text="Loading bookings..." />

// Large fullscreen
<LoadingSpinner size="large" text="Processing..." fullScreen />

// In components with loading state
{loading ? (
  <LoadingSpinner text="Loading..." />
) : (
  <div>Content here</div>
)}
```

REQUIREMENTS:
- Pure CSS animation (no dependencies)
- Responsive
- Accessible
- Uses design system colors

Please create:
1. src/components/LoadingSpinner/LoadingSpinner.tsx
2. src/components/LoadingSpinner/LoadingSpinner.css
3. Show me how to add loading states to TrainerBookings.tsx
4. Show me how to add loading states to ClientBookings.tsx

Follow React best practices and TypeScript strict typing.
```

---

## ✅ Expected Result

### Files Created:
1. `src/components/LoadingSpinner/LoadingSpinner.tsx`
2. `src/components/LoadingSpinner/LoadingSpinner.css`

### Files Modified:
1. `TrainerBookings.tsx` - Add loading state
2. `ClientBookings.tsx` - Add loading state
3. Other pages can add as needed

### Usage Example:
```typescript
const [loading, setLoading] = useState(true);

{loading ? (
  <LoadingSpinner text="Loading bookings..." />
) : (
  <BookingsList />
)}
```

---

## 📊 Impact

- **UX Improvement:** Users see loading feedback
- **Consistency:** All loading states look the same
- **Accessibility:** Can add aria-labels
- **Professional:** App feels more polished
- **Reusable:** Use anywhere data loads

---

## 🔗 Next Steps

1. Create LoadingSpinner component
2. Add loading states to useBookingActions hook
3. Add to TrainerBookings.tsx
4. Add to ClientBookings.tsx
5. Test loading states
6. Commit changes

**Status:** ⬜ Not Started
