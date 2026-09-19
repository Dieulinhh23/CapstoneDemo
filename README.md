# CapstoneDemo

An Express API backed by Supabase (PostgreSQL), with a React frontend.

## Structure

- `server/` — Express API, connects to Supabase via `@supabase/supabase-js`.
- `frontend/` — React (Vite) app: booking flow, AI assistant, customer/employee/admin dashboards.

## Setup

1. In `server/.env`, set `SUPABASE_URL` and `SUPABASE_ANON_KEY` from your Supabase
   project (**Project Settings → API**).
2. Create the `services` table in Supabase — see `server/migrations/001_create_services.sql`
   and run it in the Supabase SQL Editor.
3. Start the backend:

   ```bash
   npm start
   # or from the repo root: npm run dev (auto-restarts on changes)
   ```

   This runs `server/` and listens on `http://localhost:4000`. Check it at
   `http://localhost:4000/api/health`.

4. In a separate terminal, start the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

   Open `http://localhost:5173`.

## Commands (from repo root)

- `npm run dev` — starts the backend with automatic restarts.
- `npm start` — starts the backend normally.
- `npm run check` — checks the backend's JavaScript files for syntax errors.

The local `server/.env` file is excluded from Git. Commit `server/.env.example` only,
and never commit real Supabase keys.
