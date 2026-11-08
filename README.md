# Project Portal

A small React app: sign in, browse projects, open project details, and (admins only) change settings.

Built with Vite, React, TypeScript (strict) and React Router 7 in declarative mode.

## Install and run

Needs Node 20+.

```bash
npm install
npm run dev
```

Open http://localhost:5173.

Users (the mock API is slow and fails around 20% of the time on purpose, use Retry):

| Username  | Role   |
| --------- | ------ |
| `sara`    | admin  |
| `youssef` | member |

## Other scripts

```bash
npm run build   # type-check + production build
npm test        # run tests once (Vitest + React Testing Library)
```

## Where things live

```
src/
  types.ts, api/mockApi.ts   starter files (unchanged)
  AppRoutes.tsx              the route tree + all HOCs applied once
  auth/                      AuthProvider, useAuth, localStorage session
  hocs/                      withAuth, withLoading
  hooks/useAsync.ts          loading / error / ready + retry + ignore late responses
  layouts/                   RootLayout (header), DashboardLayout (sidebar)
  pages/                     one file per route
  components/                small display components
  utils/                     status labels, date formatting, stored preferences
  test/                      tests
```
