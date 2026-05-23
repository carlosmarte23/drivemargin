<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## DriveMargin Agent Guide

### Project

DriveMargin is a fullstack profitability dashboard for multi-app delivery workers.

The app helps users track work sessions, split earnings by platform, estimate fuel costs, log non-fuel expenses, and understand real profit per hour and per mile.

### Tech stack

- Next.js App Router
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

### Development rules

- Use current Next.js App Router patterns.
- Prefer Server Components by default.
- Use Client Components only when interactivity is required.
- Do not add features outside the current implementation phase.
- Keep business calculations in `src/lib/calculations`.
- Do not calculate financial metrics inside UI components.
- Keep calculation functions pure and testable.
- Use cents for persisted money values.
- Do not use AI for financial calculations.
- Do not use official delivery app logos in the MVP.
- Use generic icons, app names, or app initials instead.

### Product rules

- The core unit is a work session, not one session per app.
- A work session can contain multiple app earnings.
- Fuel purchases and expenses are separate data sources.
- Fuel purchases are used for actual gas spending and fuel-specific analysis.
- Expenses are used for non-fuel costs.
- Spending charts can combine both sources by showing fuel purchases as a visual "Fuel" category.
- Profit calculations use estimated fuel cost, not total fuel purchased, to avoid double-counting.
- Reports use an active report period with `startDate` and `endDate`.
- Default report period is the current week.
- Users can navigate previous week, next week, or choose a custom date range.

### MVP boundaries

Do not implement these in the MVP unless explicitly requested:

- AI summaries
- Mobile app
- GPS tracking
- OCR receipts
- Delivery app integrations
- Bank sync
- Advanced tax reports
- PDF reports
- CSV import/export
- CMS
- Team accounts
