# Supabase helper scripts

This folder contains PowerShell helper scripts to assist with local Supabase development. They are intentionally conservative: they check prerequisites and guide you instead of attempting privileged installs.

Files:

- `start-local-supabase.ps1` — checks for Docker and the Supabase CLI, then runs `supabase start` from the repository root. Do not run this script unless you have Docker and the Supabase CLI installed.
- `apply-migration.ps1` — assists in applying a migration SQL file from `supabase/migrations/`. Supports applying via environment variables (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY) or guidance for local supabase instances.
- `reset-local-supabase.ps1` — attempts `supabase stop` and optionally deletes local supabase data (destructive). Use with care.

Windows PowerShell usage examples:

Open an elevated PowerShell or normal PowerShell depending on your Docker setup, then from the repo root:

```powershell
# Start local Supabase (requires Docker + supabase CLI on PATH)
powershell -ExecutionPolicy Bypass -File .\scripts\supabase\start-local-supabase.ps1

# Apply a specific migration file
powershell -ExecutionPolicy Bypass -File .\scripts\supabase\apply-migration.ps1 -MigrationFile .\supabase\migrations\20251016120000_fix_bkj1611_values.sql

# Stop and optionally remove local data
powershell -ExecutionPolicy Bypass -File .\scripts\supabase\reset-local-supabase.ps1
```

Notes:

- These scripts do not perform global npm installs or install Docker for you. Install Docker Desktop and the Supabase CLI manually if you need them.
- If you prefer using the Supabase web dashboard to run SQL, you can open the migration SQL file and paste it into the SQL editor there (this is often the simplest route for production projects).
- The `apply-migration.ps1` script supports using `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` environment variables with `psql` if you have the PostgreSQL client installed.

If you'd like, I can add a GitHub Actions workflow to automatically apply migrations when merging to a protected branch (requires storing the service role key in Secrets).
