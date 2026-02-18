# Refactoring Task 8: PageHeader Component

**Priority:** MEDIUM ⭐⭐ EASY  
**Effort:** 25 minutes  
**Difficulty:** ⭐⭐ Easy  
**Impact:** Removes 100+ lines, standardizes page headers

---

## 📋 Problem

Almost every list/dashboard page has the **same header structure**:

**Common patterns:**

1. Simple header:
```tsx
<h1>Page Title</h1>
<p className="page-subtitle">Some description text</p>
```

2. Header with action:
```tsx
<div className="page-header">
  <h1>My Courses</h1>
  <Link to="/courses/create" className="create-button">
    Create New Course
  </Link>
</div>
```

**Appears in:**
- TrainerList.tsx
- ClientList.tsx
- CourseList.tsx
- MyCourses.tsx
- ClientBookings.tsx
- Goals.tsx
- And more (8+ pages)

---

## 🎯 Solution

Create a reusable `PageHeader` component in `src/components/PageHeader/`

### Interface

```tsx
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}
```

---

## 📋 IMPLEMENTATION PROMPT

```
I'm working on a React TypeScript fitness application called FitConnect. I need to create a reusable PageHeader component to replace duplicate page header patterns across multiple list pages.

CURRENT STATE:
Almost every list/dashboard page has the same header structure:
```tsx
<h1>Page Title</h1>
<p className="page-subtitle">Some description text</p>
```

Some pages also have action buttons in the header:
```tsx
<div className="page-header">
  <h1>My Courses</h1>
  <Link to="/courses/create" className="create-button">
    Create New Course
  </Link>
</div>
```

This pattern appears in:
- TrainerList.tsx
- ClientList.tsx
- CourseList.tsx
- MyCourses.tsx
- ClientBookings.tsx
- Goals.tsx
- And more...

TASK:
1. Create a reusable PageHeader component in src/components/PageHeader/
2. The component should accept these props:
   - title (required: string for main heading)
   - subtitle (optional: string for description)
   - actions (optional: React.ReactNode for buttons/links in header)

3. Layout options:
   - If only title: Simple centered or left-aligned h1
   - If title + subtitle: Stack them vertically
   - If actions provided: Flex row with title on left, actions on right

DESIGN REQUIREMENTS:
- Responsive: stack on mobile
- Proper spacing between elements
- Support for custom action buttons/links
- Clean typography hierarchy
- Should work with existing page layouts

EXAMPLE USAGE:
```tsx
<PageHeader 
  title="Find Trainers"
  subtitle="Discover fitness professionals to help you reach your goals"
/>

<PageHeader 
  title="My Courses"
  actions={<Link to="/courses/create" className="create-button">Create New Course</Link>}
/>
```

Please create:
1. src/components/PageHeader/PageHeader.tsx
2. src/components/PageHeader/PageHeader.css
3. Show me how to refactor 2-3 existing pages to use it

Follow React best practices and TypeScript strict typing.
```

---

## ✅ Expected Result

### Files Created:
1. `src/components/PageHeader/PageHeader.tsx`
2. `src/components/PageHeader/PageHeader.css`

### Usage Example:
```tsx
<PageHeader 
  title="Find Trainers"
  subtitle="Discover fitness professionals to help you reach your goals"
/>

<PageHeader 
  title="My Courses"
  actions={
    <Link to="/courses/create" className="create-button">
      Create New Course
    </Link>
  }
/>

<PageHeader 
  title="My Bookings"
  actions={
    <button onClick={() => navigate('/trainers')} className="book-new-button">
      Book New Session
    </button>
  }
/>
```

---

## 📊 Impact

- **Lines Removed:** ~100+ duplicate lines
- **Pages Affected:** 8+ pages
- **Consistency:** All pages have uniform headers
- **Flexibility:** Easy to add actions/buttons
- **Maintenance:** Update header style once

---

## 🔗 Next Steps

1. Implement the component
2. Refactor TrainerList.tsx
3. Refactor ClientList.tsx
4. Refactor CourseList.tsx
5. Refactor remaining pages
6. Test responsive behavior
7. Commit changes

**Status:** ⬜ Not Started
