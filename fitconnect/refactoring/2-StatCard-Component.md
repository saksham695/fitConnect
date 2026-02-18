# Refactoring Task 2: StatCard Component

**Priority:** HIGH ⭐ EASIEST  
**Effort:** 20 minutes  
**Difficulty:** ⭐ Very Easy  
**Impact:** Removes 80+ lines of duplicate code

---

## 📋 Problem

Stat cards are **duplicated in 4 files** with similar structure:

**Current duplication locations:**
- `TrainerDashboard.tsx` (lines 25-38)
- `ClientDashboard.tsx`
- `TrainerBookings.tsx` (lines 94-111)
- `ClientBookings.tsx` (lines 91-108)

Each displays:
- A numeric value (or string)
- A label describing the stat
- Optional link to view more details
- Some need "highlight" styling (gradient background)

---

## 🎯 Solution

Create a reusable `StatCard` component in `src/components/StatCard/`

### Interface

```tsx
interface StatCardProps {
  value: number | string;
  label: string;
  link?: string;
  linkText?: string;
  highlight?: boolean;
}
```

---

## 📋 IMPLEMENTATION PROMPT

```
I'm working on a React TypeScript fitness application called FitConnect. I need to create a reusable StatCard component to replace duplicate stat card UI across dashboards and booking pages.

CURRENT STATE:
The codebase has stat card JSX duplicated in these files:
- src/pages/Dashboard/TrainerDashboard.tsx (lines 25-38)
- src/pages/Dashboard/ClientDashboard.tsx
- src/pages/Booking/TrainerBookings.tsx (lines 94-111)
- src/pages/Booking/ClientBookings.tsx (lines 91-108)

Each stat card typically displays:
- A numeric value (or string)
- A label describing what the stat is
- Optional link to view more details
- Some cards need "highlight" styling (gradient background)

TASK:
1. Create a new reusable StatCard component in src/components/StatCard/
2. The component should accept these props:
   - value (required: number or string to display)
   - label (required: string description)
   - link (optional: string for Link navigation)
   - linkText (optional: string for link text, defaults to "View All →")
   - highlight (optional: boolean for special styling)
3. Use React Router's Link component when link prop is provided
4. Apply gradient background when highlight={true}

DESIGN REQUIREMENTS:
- White background by default
- Gradient background (purple/blue) when highlighted
- Centered text layout
- Large value number at top
- Label text below
- Optional link at bottom
- Box shadow for card elevation
- Responsive grid-friendly

EXISTING STYLES TO REFERENCE:
The app already has .stat-card styles in utilities.css with:
- Padding, border-radius, box-shadow
- .stat-value and .stat-label classes
- .stat-card.highlight class for gradient

Please create:
1. src/components/StatCard/StatCard.tsx
2. src/components/StatCard/StatCard.css
3. Show me example usage from TrainerDashboard

Follow React best practices and TypeScript strict typing.
```

---

## ✅ Expected Result

### Files Created:
1. `src/components/StatCard/StatCard.tsx`
2. `src/components/StatCard/StatCard.css`

### Usage Example:
```tsx
<StatCard 
  value={clients.length}
  label="Total Clients"
  link="/clients"
  linkText="View All →"
/>

<StatCard 
  value={stats.pending}
  label="Pending Approval"
  highlight={true}
/>
```

---

## 📊 Impact

- **Lines Removed:** ~80+ duplicate lines
- **Pages Affected:** 4 files
- **Maintenance:** 10x easier to update stat cards
- **Consistency:** Uniform stat display

---

## 🔗 Next Steps

1. Implement the component
2. Replace usage in TrainerDashboard.tsx first
3. Replace usage in ClientDashboard.tsx
4. Replace usage in TrainerBookings.tsx
5. Replace usage in ClientBookings.tsx
6. Test all dashboards
7. Commit changes

**Status:** ⬜ Not Started
