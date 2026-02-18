# Refactoring Task 4: FilterSelect Component

**Priority:** HIGH ⭐ EASIEST  
**Effort:** 15 minutes  
**Difficulty:** ⭐ Very Easy  
**Impact:** Removes 20+ lines of duplicate code

---

## 📋 Problem

Filter dropdown selects are **duplicated in 2 files**:

**Current duplication locations:**
- `TrainerList.tsx` (lines 50-63)
- `ClientList.tsx` (lines 47-58)

Both have similar structure:
```tsx
<div className="filter-box">
  <select
    value={selectedValue}
    onChange={(e) => setSelectedValue(e.target.value)}
    className="filter-select"
  >
    <option value="">All Options</option>
    {options.map((opt) => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
</div>
```

---

## 🎯 Solution

Create a reusable `FilterSelect` component in `src/components/FilterSelect/`

### Interface

```tsx
interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}
```

---

## 📋 IMPLEMENTATION PROMPT

```
I'm working on a React TypeScript fitness application called FitConnect. I need to create a reusable FilterSelect component to replace duplicate filter dropdown UI in list pages.

CURRENT STATE:
The codebase has filter select JSX duplicated in:
- src/pages/Trainers/TrainerList.tsx (lines 50-63)
- src/pages/Clients/ClientList.tsx (lines 47-58)

Both have the same structure:
<div className="filter-box">
  <select
    value={selectedValue}
    onChange={(e) => setSelectedValue(e.target.value)}
    className="filter-select"
  >
    <option value="">All Options</option>
    {options.map((opt) => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
</div>

TASK:
1. Create a reusable FilterSelect component in src/components/FilterSelect/
2. The component should accept these props:
   - value (required: string for controlled select)
   - onChange (required: callback that receives the new string value)
   - options (required: array of {value: string, label: string} objects)
   - placeholder (optional: string for "All" option text, defaults to "All")
3. Wrap the select in a div with className="filter-box"
4. Apply className="filter-select" to the select element
5. First option should always be empty value with placeholder text

DESIGN REQUIREMENTS:
- Styled select dropdown
- Rounded corners
- Border and shadow on focus
- Clean, modern look
- Should match SearchInput styling

EXISTING STYLES:
The app may already have .filter-box and .filter-select styles. Use those patterns for consistency.

Please create:
1. src/components/FilterSelect/FilterSelect.tsx
2. src/components/FilterSelect/FilterSelect.css
3. Show me example usage replacing TrainerList filter

Follow React best practices and TypeScript strict typing. Use controlled component pattern.
```

---

## ✅ Expected Result

### Files Created:
1. `src/components/FilterSelect/FilterSelect.tsx`
2. `src/components/FilterSelect/FilterSelect.css`

### Usage Example:
```tsx
<FilterSelect
  value={selectedExpertise}
  onChange={setSelectedExpertise}
  options={[
    { value: 'Strength Training', label: 'Strength Training' },
    { value: 'Yoga', label: 'Yoga' },
    { value: 'Cardio', label: 'Cardio' }
  ]}
  placeholder="All Expertise"
/>
```

---

## 📊 Impact

- **Lines Removed:** ~20 duplicate lines
- **Pages Affected:** 2 files
- **Maintenance:** Easier to style all filters consistently
- **Reusability:** Can use for other filter needs

---

## 🔗 Next Steps

1. Implement the component
2. Replace usage in TrainerList.tsx
3. Replace usage in ClientList.tsx
4. Test filtering functionality
5. Commit changes

**Status:** ⬜ Not Started
