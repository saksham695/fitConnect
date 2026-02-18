# High-Level Folder Structure: Custom Hooks Only

**Branch:** `refactor/hooks-from-e645293`  
**Base commit:** `e645293` (FitConnect with course enrollment, before profile & booking)

This document describes the **minimal folder structure** needed to add these five hooks:

- `useSearch` (shared)
- `useFilter` (shared)
- `useTrainers` (feature)
- `useClients` (feature)
- `useCourses` (feature)

---

## High-Level Structure

```
src/
├── shared/
│   └── hooks/
│       ├── useSearch.ts      # Generic search over any list
│       ├── useFilter.ts      # Generic filter over any list
│       └── index.ts          # Re-export
│
├── features/
│   ├── trainers/
│   │   └── hooks/
│   │       ├── useTrainers.ts
│   │       └── index.ts
│   │
│   ├── clients/
│   │   └── hooks/
│   │       ├── useClients.ts
│   │       └── index.ts
│   │
│   └── courses/
│       └── hooks/
│           ├── useCourses.ts
│           └── index.ts
│
└── (existing: pages/, components/, services/, types/, contexts/, utils/)
```

No other folders are required for this refactor. Existing `pages/`, `components/`, `services/`, etc. stay as they are.

---

## Path Summary

| Hook          | Full path |
|---------------|-----------|
| useSearch     | `src/shared/hooks/useSearch.ts` |
| useFilter     | `src/shared/hooks/useFilter.ts` |
| useTrainers   | `src/features/trainers/hooks/useTrainers.ts` |
| useClients    | `src/features/clients/hooks/useClients.ts` |
| useCourses    | `src/features/courses/hooks/useCourses.ts` |

---

## Shared vs Feature

- **Shared** (`src/shared/hooks/`): `useSearch`, `useFilter` — generic, no Trainer/Client/Course types.
- **Feature** (`src/features/<feature>/hooks/`): `useTrainers`, `useClients`, `useCourses` — each tied to one entity and existing `storageService`.

---

## Create Folders (one-time)

```bash
mkdir -p src/shared/hooks
mkdir -p src/features/trainers/hooks
mkdir -p src/features/clients/hooks
mkdir -p src/features/courses/hooks
```

Then add the hook files and `index.ts` re-exports as you implement them.

---

## All Feature Folder Names (FitConnect)

Use these exact names under `src/features/`:

| # | Feature folder | Purpose |
|---|----------------|--------|
| 1 | **auth** | Login, Signup, Landing, role selection |
| 2 | **dashboard** | Trainer dashboard, Client dashboard, home after login |
| 3 | **trainers** | Trainer discovery, Trainer list, Trainer detail (client side) |
| 4 | **clients** | Client list, Client detail (trainer side) |
| 5 | **courses** | Course list, Create course, Course detail, My courses |
| 6 | **goals** | Client fitness goals |
| 7 | **profile** | Trainer profile, Client profile (view/edit) |
| 8 | **booking** | Availability management, Book session, Trainer bookings, Client bookings |

**Full list (copy-paste):**
```
auth
dashboard
trainers
clients
courses
goals
profile
booking
```

**One-time create all feature folders:**
```bash
mkdir -p src/features/{auth,dashboard,trainers,clients,courses,goals,profile,booking}/{components,hooks,pages,services}
```

**At commit e645293** only these features had pages: `auth`, `dashboard`, `trainers`, `clients`, `courses`, `goals`.  
`profile` and `booking` were added later on `main`.
