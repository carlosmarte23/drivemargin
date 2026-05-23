# DriveMargin

DriveMargin is a fullstack profitability dashboard for multi-app delivery workers.

The app helps users track work sessions, split earnings by platform, estimate fuel costs, log non-fuel expenses, and understand real profit per hour and per mile.

## Status

Early development.

Current milestone:

- Project scaffold
- UI foundation
- Public demo prototype
- Calculation engine

## Tech stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase Auth
- Supabase Postgres
- Drizzle ORM
- React Hook Form
- Zod
- Recharts
- Vitest
- Vercel

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

## MVP goals

- Public landing page
- Public demo with sample data
- Authentication
- Onboarding
- Work sessions CRUD
- Fuel purchases CRUD
- Expenses CRUD
- Dashboard metrics
- Rule-based insights
- Responsive design
- Development

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
