# Refactoring Task 12: Button Component

**Priority:** MEDIUM ⭐⭐ EASY  
**Effort:** 20 minutes  
**Difficulty:** ⭐⭐ Easy  
**Impact:** Consistent buttons, easier styling

---

## 📋 Problem

Buttons have **inconsistent styling and class names** across the app:

**Current button variations:**
- `create-button`
- `edit-button`
- `save-button`
- `cancel-button`
- `connect-button`
- `book-session-button`
- `confirm-button`
- `reject-button`
- `complete-button`
- `view-trainer-button`
- And more...

**Found in 19+ files with different styles!**

**Common patterns:**
```tsx
<button className="save-button">Save Changes</button>
<button className="cancel-button">Cancel</button>
<Link to="/create" className="create-button">Create New</Link>
```

**Problems:**
- Inconsistent styling
- Repeated CSS for similar buttons
- Hard to maintain
- No standard variants (primary, secondary, danger)

---

## 🎯 Solution

Create a reusable `Button` component in `src/components/Button/`

### Interface

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
```

---

## 📋 IMPLEMENTATION PROMPT

```
I'm working on a React TypeScript fitness application called FitConnect. I need to create a reusable Button component to standardize button styling and reduce CSS duplication across 19+ files.

CURRENT STATE:
The app has many different button classes with inconsistent styling:
- .create-button, .edit-button, .save-button, .cancel-button
- .connect-button, .confirm-button, .reject-button
- .complete-button, .view-trainer-button
- And more...

Each has similar but slightly different styles, making maintenance difficult.

TASK:
1. Create a reusable Button component in src/components/Button/
2. The component should accept these props:
   - children (required: button text/content)
   - variant (optional: 'primary', 'secondary', 'success', 'danger', 'outline')
   - size (optional: 'small', 'medium', 'large')
   - onClick (optional: click handler)
   - type (optional: 'button', 'submit', 'reset')
   - disabled (optional: boolean)
   - loading (optional: boolean - shows spinner)
   - fullWidth (optional: boolean - 100% width)
   - className (optional: additional classes)

DESIGN REQUIREMENTS:
- **Primary (blue):** Main actions (Create, Save, Confirm)
- **Secondary (gray):** Secondary actions (Cancel, Back)
- **Success (green):** Positive actions (Complete, Approve)
- **Danger (red):** Destructive actions (Delete, Reject, Cancel booking)
- **Outline:** Border only, transparent background

VARIANTS MAPPING:
- create-button → variant="primary"
- save-button → variant="primary"
- cancel-button → variant="secondary"
- confirm-button → variant="success"
- reject-button → variant="danger"
- complete-button → variant="success"
- And so on...

EXISTING DESIGN SYSTEM:
The app has:
- src/styles/variables.css (color variables)
- src/styles/utilities.css (utility classes)

Use CSS variables like:
- --color-primary
- --color-success
- --color-error
- --color-neutral

EXAMPLE USAGE:
```tsx
<Button variant="primary" onClick={handleSave}>
  Save Changes
</Button>

<Button variant="danger" onClick={handleDelete} loading={isDeleting}>
  Delete
</Button>

<Button variant="outline" size="small">
  Cancel
</Button>

<Button variant="primary" type="submit" fullWidth>
  Create Course
</Button>
```

Please create:
1. src/components/Button/Button.tsx
2. src/components/Button/Button.css
3. Show me how to refactor 3-4 different buttons to use it

Follow React best practices and TypeScript strict typing.
```

---

## ✅ Expected Result

### Files Created:
1. `src/components/Button/Button.tsx`
2. `src/components/Button/Button.css`

### Usage Examples:
```tsx
// Before:
<button className="create-button" onClick={...}>Create</button>
<button className="cancel-button" onClick={...}>Cancel</button>
<button className="confirm-button" onClick={...}>Confirm</button>

// After:
<Button variant="primary" onClick={...}>Create</Button>
<Button variant="secondary" onClick={...}>Cancel</Button>
<Button variant="success" onClick={...}>Confirm</Button>
```

---

## 📊 Impact

- **Consistency:** All buttons look and work the same
- **CSS Reduction:** Remove 100+ lines of duplicate button CSS
- **Maintainability:** Change button styles in one place
- **Accessibility:** Built-in disabled, loading states
- **Type Safety:** TypeScript ensures correct variants

---

## 🔗 Next Steps

1. Create Button component with all variants
2. Add loading spinner support
3. Replace buttons in 3-4 pages as test
4. Create comprehensive button showcase page
5. Update remaining pages
6. Remove old button CSS classes
7. Commit changes

**Status:** ⬜ Not Started
