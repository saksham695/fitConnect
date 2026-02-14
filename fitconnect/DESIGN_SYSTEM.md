# FitConnect Design System

A comprehensive design system defining colors, spacing, typography, and component patterns for consistent UI development.

---

## 🎨 Color System

### Primary Colors
```css
--color-primary-50:  #eff6ff;  /* Lightest blue */
--color-primary-100: #dbeafe;
--color-primary-200: #bfdbfe;
--color-primary-300: #93c5fd;
--color-primary-400: #60a5fa;
--color-primary-500: #3b82f6;  /* Main primary */
--color-primary-600: #2563eb;  /* Current primary */
--color-primary-700: #1d4ed8;
--color-primary-800: #1e40af;
--color-primary-900: #1e3a8a;
```

**Usage:**
- Primary buttons, links, active states
- Brand identity elements
- Call-to-action components

### Success Colors (Green)
```css
--color-success-50:  #f0fdf4;
--color-success-100: #dcfce7;
--color-success-200: #bbf7d0;
--color-success-300: #86efac;
--color-success-400: #4ade80;
--color-success-500: #22c55e;
--color-success-600: #16a34a;
--color-success-700: #15803d;  /* Main success */
--color-success-800: #166534;
--color-success-900: #14532d;
```

**Usage:**
- Success messages, confirmations
- Completed bookings
- Positive stats
- "Connected" badges

### Warning Colors (Yellow/Orange)
```css
--color-warning-50:  #fffbeb;
--color-warning-100: #fef3c7;
--color-warning-200: #fde68a;
--color-warning-300: #fcd34d;
--color-warning-400: #fbbf24;
--color-warning-500: #f59e0b;  /* Main warning */
--color-warning-600: #d97706;
--color-warning-700: #b45309;
--color-warning-800: #92400e;
--color-warning-900: #78350f;
```

**Usage:**
- Pending bookings
- Warning messages
- Intermediate states

### Error/Danger Colors (Red)
```css
--color-error-50:  #fef2f2;
--color-error-100: #fee2e2;
--color-error-200: #fecaca;
--color-error-300: #fca5a5;
--color-error-400: #f87171;
--color-error-500: #ef4444;
--color-error-600: #dc2626;  /* Main error */
--color-error-700: #b91c1c;
--color-error-800: #991b1b;
--color-error-900: #7f1d1d;
```

**Usage:**
- Error messages
- Cancelled bookings
- Delete/destructive actions
- Form validation errors

### Neutral/Gray Colors
```css
--color-gray-50:  #f9fafb;  /* Backgrounds */
--color-gray-100: #f3f4f6;  /* Subtle backgrounds */
--color-gray-200: #e5e7eb;  /* Borders */
--color-gray-300: #d1d5db;  /* Disabled states */
--color-gray-400: #9ca3af;  /* Placeholders */
--color-gray-500: #6b7280;  /* Secondary text */
--color-gray-600: #4b5563;
--color-gray-700: #374151;  /* Body text */
--color-gray-800: #1f2937;
--color-gray-900: #111827;  /* Headings */
```

**Usage:**
- Text colors (700-900)
- Backgrounds (50-100)
- Borders (200-300)
- Disabled states (300-400)

### Semantic Colors (Quick Reference)
```css
/* Backgrounds */
--bg-primary: var(--color-gray-50);
--bg-secondary: var(--color-white);
--bg-tertiary: var(--color-gray-100);

/* Text */
--text-primary: var(--color-gray-900);
--text-secondary: var(--color-gray-600);
--text-tertiary: var(--color-gray-500);
--text-disabled: var(--color-gray-400);

/* Borders */
--border-primary: var(--color-gray-200);
--border-secondary: var(--color-gray-300);
--border-focus: var(--color-primary-600);

/* Status */
--status-success: var(--color-success-600);
--status-warning: var(--color-warning-500);
--status-error: var(--color-error-600);
--status-info: var(--color-primary-600);
```

---

## 📏 Spacing System

### Base Unit: 4px (0.25rem)

```css
--spacing-0:  0;
--spacing-1:  0.25rem;  /* 4px */
--spacing-2:  0.5rem;   /* 8px */
--spacing-3:  0.75rem;  /* 12px */
--spacing-4:  1rem;     /* 16px - Base */
--spacing-5:  1.25rem;  /* 20px */
--spacing-6:  1.5rem;   /* 24px */
--spacing-8:  2rem;     /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
```

### Usage Guidelines

**Padding/Margin:**
```css
/* Component padding */
--padding-xs: var(--spacing-2);   /* 8px - tight spacing */
--padding-sm: var(--spacing-3);   /* 12px - compact components */
--padding-md: var(--spacing-4);   /* 16px - default */
--padding-lg: var(--spacing-6);   /* 24px - cards, sections */
--padding-xl: var(--spacing-8);   /* 32px - page padding */
--padding-2xl: var(--spacing-12); /* 48px - hero sections */

/* Gaps (Flexbox/Grid) */
--gap-xs: var(--spacing-2);
--gap-sm: var(--spacing-3);
--gap-md: var(--spacing-4);
--gap-lg: var(--spacing-6);
--gap-xl: var(--spacing-8);
```

**Component Spacing Examples:**
```css
/* Button */
padding: var(--spacing-3) var(--spacing-6); /* 12px 24px */

/* Card */
padding: var(--spacing-6); /* 24px */

/* Section */
padding: var(--spacing-8) var(--spacing-4); /* 32px 16px */

/* Form Field */
margin-bottom: var(--spacing-4); /* 16px */

/* Grid Gap */
gap: var(--spacing-4); /* 16px */
```

---

## 📝 Typography System

### Font Families
```css
--font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
                    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
                    'Helvetica Neue', sans-serif;
--font-family-mono: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
```

### Font Sizes
```css
--font-size-xs:   0.75rem;   /* 12px */
--font-size-sm:   0.875rem;  /* 14px */
--font-size-base: 1rem;      /* 16px - Body text */
--font-size-lg:   1.125rem;  /* 18px */
--font-size-xl:   1.25rem;   /* 20px */
--font-size-2xl:  1.5rem;    /* 24px - H3 */
--font-size-3xl:  1.875rem;  /* 30px - H2 */
--font-size-4xl:  2.25rem;   /* 36px - H1 */
--font-size-5xl:  3rem;      /* 48px - Hero */
```

### Font Weights
```css
--font-weight-light:   300;
--font-weight-normal:  400;  /* Body text */
--font-weight-medium:  500;  /* Labels, buttons */
--font-weight-semibold: 600; /* Subheadings */
--font-weight-bold:    700;  /* Headings */
--font-weight-extrabold: 800;
```

### Line Heights
```css
--line-height-tight:  1.25;  /* Headings */
--line-height-normal: 1.5;   /* Body text */
--line-height-relaxed: 1.75; /* Long-form content */
```

### Typography Scale
```css
/* Headings */
h1 { 
  font-size: var(--font-size-4xl); 
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--text-primary);
}

h2 { 
  font-size: var(--font-size-3xl); 
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

h3 { 
  font-size: var(--font-size-2xl); 
  font-weight: var(--font-weight-semibold);
}

/* Body */
body { 
  font-size: var(--font-size-base); 
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
  color: var(--text-primary);
}

/* Small text */
.text-sm {
  font-size: var(--font-size-sm);
}

.text-xs {
  font-size: var(--font-size-xs);
}
```

---

## 🎯 Border Radius System

```css
--radius-none: 0;
--radius-sm:   0.125rem;  /* 2px */
--radius-base: 0.25rem;   /* 4px */
--radius-md:   0.375rem;  /* 6px */
--radius-lg:   0.5rem;    /* 8px - Default for cards/buttons */
--radius-xl:   0.75rem;   /* 12px */
--radius-2xl:  1rem;      /* 16px */
--radius-full: 9999px;    /* Circular */
```

**Usage:**
```css
/* Buttons, Inputs */
border-radius: var(--radius-lg); /* 8px */

/* Cards, Modals */
border-radius: var(--radius-lg); /* 8px */

/* Tags, Badges */
border-radius: var(--radius-full); /* Pill shape */

/* Images, Avatars */
border-radius: var(--radius-full); /* Circular */
```

---

## 🌑 Shadow System

```css
--shadow-xs:  0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm:  0 1px 3px 0 rgba(0, 0, 0, 0.1), 
              0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md:  0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1), 
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Focus shadow */
--shadow-focus: 0 0 0 3px rgba(37, 99, 235, 0.3);
```

**Usage:**
```css
/* Cards */
box-shadow: var(--shadow-sm);

/* Modals */
box-shadow: var(--shadow-xl);

/* Dropdowns */
box-shadow: var(--shadow-md);

/* Focus states */
box-shadow: var(--shadow-focus);
```

---

## 📱 Breakpoints

```css
--breakpoint-xs: 0;      /* Mobile first */
--breakpoint-sm: 640px;  /* Small tablets */
--breakpoint-md: 768px;  /* Tablets */
--breakpoint-lg: 1024px; /* Desktop */
--breakpoint-xl: 1280px; /* Large desktop */
--breakpoint-2xl: 1536px; /* Extra large */
```

**Media Query Usage:**
```css
/* Mobile first approach */

/* Small tablets and up */
@media (min-width: 640px) { }

/* Tablets and up */
@media (min-width: 768px) { }

/* Desktop and up */
@media (min-width: 1024px) { }
```

---

## 🎨 Component-Specific Tokens

### Buttons
```css
/* Primary Button */
--btn-primary-bg: var(--color-primary-600);
--btn-primary-bg-hover: var(--color-primary-700);
--btn-primary-text: var(--color-white);
--btn-primary-padding: var(--spacing-3) var(--spacing-6);
--btn-primary-radius: var(--radius-lg);
--btn-primary-shadow: var(--shadow-sm);

/* Secondary Button */
--btn-secondary-bg: var(--color-gray-100);
--btn-secondary-bg-hover: var(--color-gray-200);
--btn-secondary-text: var(--color-gray-700);

/* Danger Button */
--btn-danger-bg: var(--color-error-600);
--btn-danger-bg-hover: var(--color-error-700);
--btn-danger-text: var(--color-white);

/* Success Button */
--btn-success-bg: var(--color-success-600);
--btn-success-bg-hover: var(--color-success-700);
--btn-success-text: var(--color-white);
```

### Forms
```css
/* Input Fields */
--input-bg: var(--color-white);
--input-border: var(--color-gray-300);
--input-border-focus: var(--color-primary-600);
--input-text: var(--color-gray-900);
--input-placeholder: var(--color-gray-400);
--input-padding: var(--spacing-3);
--input-radius: var(--radius-lg);
--input-shadow-focus: var(--shadow-focus);

/* Input Sizes */
--input-height-sm: 2rem;    /* 32px */
--input-height-md: 2.5rem;  /* 40px */
--input-height-lg: 3rem;    /* 48px */
```

### Cards
```css
--card-bg: var(--color-white);
--card-border: var(--color-gray-200);
--card-padding: var(--spacing-6);
--card-radius: var(--radius-lg);
--card-shadow: var(--shadow-sm);
--card-shadow-hover: var(--shadow-md);
```

### Badges/Tags
```css
--badge-padding: var(--spacing-2) var(--spacing-3);
--badge-radius: var(--radius-full);
--badge-font-size: var(--font-size-xs);
--badge-font-weight: var(--font-weight-medium);

/* Badge variants */
--badge-primary-bg: var(--color-primary-100);
--badge-primary-text: var(--color-primary-700);

--badge-success-bg: var(--color-success-100);
--badge-success-text: var(--color-success-700);

--badge-warning-bg: var(--color-warning-100);
--badge-warning-text: var(--color-warning-700);

--badge-error-bg: var(--color-error-100);
--badge-error-text: var(--color-error-700);
```

---

## 🎭 Status Colors

### Booking Status
```css
/* Confirmed */
--status-confirmed-bg: var(--color-primary-100);
--status-confirmed-text: var(--color-primary-700);
--status-confirmed-border: var(--color-primary-600);

/* Completed */
--status-completed-bg: var(--color-success-100);
--status-completed-text: var(--color-success-700);
--status-completed-border: var(--color-success-600);

/* Cancelled */
--status-cancelled-bg: var(--color-error-100);
--status-cancelled-text: var(--color-error-700);
--status-cancelled-border: var(--color-error-600);

/* Pending */
--status-pending-bg: var(--color-warning-100);
--status-pending-text: var(--color-warning-700);
--status-pending-border: var(--color-warning-600);
```

### Fitness Levels
```css
/* Beginner */
--level-beginner-bg: var(--color-success-100);
--level-beginner-text: var(--color-success-700);

/* Intermediate */
--level-intermediate-bg: var(--color-warning-100);
--level-intermediate-text: var(--color-warning-700);

/* Advanced */
--level-advanced-bg: var(--color-error-100);
--level-advanced-text: var(--color-error-700);
```

---

## 🔄 Transitions & Animations

```css
/* Duration */
--transition-fast: 150ms;
--transition-base: 200ms;
--transition-slow: 300ms;

/* Easing */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Common transitions */
--transition-colors: color var(--transition-base) var(--ease-in-out),
                     background-color var(--transition-base) var(--ease-in-out),
                     border-color var(--transition-base) var(--ease-in-out);

--transition-all: all var(--transition-base) var(--ease-in-out);
```

**Usage:**
```css
button {
  transition: var(--transition-colors);
}

.card {
  transition: box-shadow var(--transition-base) var(--ease-out);
}
```

---

## 📐 Z-Index Scale

```css
--z-index-dropdown: 1000;
--z-index-sticky: 1020;
--z-index-fixed: 1030;
--z-index-modal-backdrop: 1040;
--z-index-modal: 1050;
--z-index-popover: 1060;
--z-index-tooltip: 1070;
--z-index-notification: 1080;
```

---

## 🎨 Usage Examples

### Example 1: Primary Button
```css
.btn-primary {
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  padding: var(--btn-primary-padding);
  border-radius: var(--btn-primary-radius);
  box-shadow: var(--btn-primary-shadow);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-colors);
}

.btn-primary:hover {
  background-color: var(--btn-primary-bg-hover);
  box-shadow: var(--shadow-md);
}
```

### Example 2: Card Component
```css
.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  padding: var(--card-padding);
  box-shadow: var(--card-shadow);
  transition: box-shadow var(--transition-base);
}

.card:hover {
  box-shadow: var(--card-shadow-hover);
}
```

### Example 3: Form Input
```css
.input {
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: var(--input-radius);
  padding: var(--input-padding);
  color: var(--input-text);
  font-size: var(--font-size-base);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.input:focus {
  outline: none;
  border-color: var(--input-border-focus);
  box-shadow: var(--input-shadow-focus);
}

.input::placeholder {
  color: var(--input-placeholder);
}
```

### Example 4: Status Badge
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--badge-padding);
  border-radius: var(--badge-radius);
  font-size: var(--badge-font-size);
  font-weight: var(--badge-font-weight);
}

.badge-confirmed {
  background: var(--status-confirmed-bg);
  color: var(--status-confirmed-text);
}

.badge-completed {
  background: var(--status-completed-bg);
  color: var(--status-completed-text);
}
```

---

## 🎯 Best Practices

### DO ✅
- Always use design tokens instead of hardcoded values
- Use semantic tokens (e.g., `--text-primary`) over base tokens (e.g., `--color-gray-900`)
- Follow the spacing scale strictly
- Use consistent border-radius values
- Apply shadows appropriately for depth hierarchy

### DON'T ❌
- Don't use arbitrary color values
- Don't use random spacing values (stick to the scale)
- Don't mix px, rem, and em inconsistently
- Don't create custom shadows without adding to the system
- Don't use inline styles for design token values

---

## 🔄 Migration Guide

### Step 1: Replace Hardcoded Colors
```css
/* Before */
background: #2563eb;
color: #111827;

/* After */
background: var(--color-primary-600);
color: var(--text-primary);
```

### Step 2: Replace Spacing Values
```css
/* Before */
padding: 24px;
margin: 16px;
gap: 12px;

/* After */
padding: var(--spacing-6);
margin: var(--spacing-4);
gap: var(--spacing-3);
```

### Step 3: Use Typography Scale
```css
/* Before */
font-size: 36px;
font-weight: 700;
line-height: 1.2;

/* After */
font-size: var(--font-size-4xl);
font-weight: var(--font-weight-bold);
line-height: var(--line-height-tight);
```

---

## 📦 Design System Package

For easier implementation, consider creating:
```
src/styles/
├── variables.css       # All design tokens
├── reset.css          # CSS reset/normalize
├── typography.css     # Typography styles
├── utilities.css      # Utility classes
└── components.css     # Shared component styles
```

---

**Last Updated:** 2026-02-14
**Version:** 1.0.0
