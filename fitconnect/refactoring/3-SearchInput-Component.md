# Refactoring Task 3: SearchInput Component

**Priority:** HIGH ⭐ EASIEST  
**Effort:** 15 minutes  
**Difficulty:** ⭐ Very Easy  
**Impact:** Removes 24+ lines of duplicate code

---

## 📋 Problem

Search input boxes are **duplicated in 2 files** with identical structure:

**Current duplication locations:**
- `TrainerList.tsx` (lines 41-48)
- `ClientList.tsx` (lines 38-45)

Both have the same structure:
```tsx
<div className="search-box">
  <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-input"
  />
</div>
```

---

## 🎯 Solution

Create a reusable `SearchInput` component in `src/components/SearchInput/`

### Interface

```tsx
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
```

---

## 📋 IMPLEMENTATION PROMPT

```
I'm working on a React TypeScript fitness application called FitConnect. I need to create a reusable SearchInput component to replace duplicate search box UI in trainer and client list pages.

CURRENT STATE:
The codebase has search input JSX duplicated in:
- src/pages/Trainers/TrainerList.tsx (lines 41-48)
- src/pages/Clients/ClientList.tsx (lines 38-45)

Both have the same structure:
<div className="search-box">
  <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-input"
  />
</div>

TASK:
1. Create a reusable SearchInput component in src/components/SearchInput/
2. The component should accept these props:
   - value (required: string for controlled input)
   - onChange (required: callback that receives the new string value)
   - placeholder (optional: string, defaults to "Search...")
3. Wrap the input in a div with className="search-box"
4. Apply className="search-input" to the input element

DESIGN REQUIREMENTS:
- Full-width input with padding
- Search icon (optional, can use 🔍 emoji or CSS)
- Rounded corners
- Border on focus
- Clean, modern look

EXISTING STYLES:
The app may already have .search-box and .search-input styles in some CSS files. Use those patterns for consistency.

Please create:
1. src/components/SearchInput/SearchInput.tsx
2. src/components/SearchInput/SearchInput.css
3. Show me example usage replacing TrainerList search box

Follow React best practices and TypeScript strict typing. Use controlled component pattern.
```

---

## ✅ Expected Result

### Files Created:
1. `src/components/SearchInput/SearchInput.tsx`
2. `src/components/SearchInput/SearchInput.css`

### Usage Example:
```tsx
<SearchInput
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="Search trainers by name or expertise..."
/>
```

---

## 📊 Impact

- **Lines Removed:** ~24 duplicate lines
- **Pages Affected:** 2 files
- **Maintenance:** Easier to add search icons, clear buttons, etc.
- **Consistency:** Uniform search experience

---

## 🔗 Next Steps

1. Implement the component
2. Replace usage in TrainerList.tsx
3. Replace usage in ClientList.tsx
4. Test search functionality
5. Commit changes

**Status:** ⬜ Not Started
