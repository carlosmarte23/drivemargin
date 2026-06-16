# DriveMargin

DriveMargin is a profitability dashboard for multi-app delivery workers.

The app helps users track work sessions, split earnings by platform, estimate fuel costs, log non-fuel expenses, and understand real profit per hour and per mile.

## Status

Public demo release.

Current release: `0.5.0`

DriveMargin `0.5.0` is a polished public demo release with sample data,
dashboard reporting, editable demo records, guided walkthrough, responsive
review, and temporary sessionStorage persistence. The fullstack backend is
planned for `1.0`.

Included in this release:

- Public landing page
- Public demo workspace
- Demo dashboard metrics and charts
- Report period navigation
- Work sessions CRUD
- Fuel purchases CRUD
- Non-fuel expenses CRUD
- Demo settings form
- Temporary demo data reset
- Guided demo tour
- Public landing polish
- Responsive and accessibility polish
- Calculation engine and tests

## Tech stack

Current `0.5.0` stack:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- next-themes
- Sonner
- Recharts
- Zod
- Vitest
- Vercel

Planned `1.0` backend stack:

- Supabase Auth
- Supabase Postgres
- Drizzle ORM
- React Hook Form

## Core idea

DriveMargin is built around work sessions.

A work session represents a full delivery shift where the user may work across multiple apps.

Example:

```txt
Work session
-> Spark earnings
-> DoorDash earnings
-> Uber Eats earnings
-> Miles driven
-> Estimated fuel cost
-> Non-fuel expenses
-> Net earnings
```

## Public Demo

The public demo uses generated sample data and stores user edits in browser
sessionStorage. Demo changes are temporary and can be reset from the demo
banner.

Available demo areas:

- Dashboard
- Sessions
- Fuel
- Expenses
- Settings

## Planned Phases

Next planned phases:

- `0.6`: Product demo video, stronger launch presentation assets, and
  additional public demo refinements.
- `1.0`: Authentication, onboarding, real database persistence, authenticated
  app workspace, and production CRUD backed by user data.

## Install dependencies:

```bash
pnpm install
```

## Start the development server:

```bash
pnpm dev
```

## Build:

```bash
pnpm build
```

## License

MIT License.

Copyright (c) 2026 [Carlos Marte](http://github.com/carlosmarte23)
