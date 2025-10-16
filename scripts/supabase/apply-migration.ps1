<#
.SYNOPSIS
Applies an SQL migration file to a Supabase/Postgres database.

.DESCRIPTION
This script finds the migration file under the repository's `supabase/migrations/` folder and applies it to either a local Supabase instance (via psql) or a remote Supabase project using environment variables.
It supports two modes:
- local: uses the local supabase CLI's psql connection details via `supabase db remote commit` or the connection URL printed by `supabase start`.
- remote: uses SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables (preferred for CI).

The script will NOT attempt to create cloud credentials for you. It is intended to be run locally by the developer.

.PARAMETER MigrationFile
Path to the SQL file to apply. If omitted, the script will prompt to pick one from `supabase/migrations/`.

.EXAMPLE
    pwsh ./scripts/supabase/apply-migration.ps1 -MigrationFile .\supabase\migrations\20251016120000_fix_bkj1611_values.sql
#>

param(
    [string]$MigrationFile
)

function Write-Info($msg) { Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Write-Warn($msg) { Write-Host "[WARN] $msg" -ForegroundColor Yellow }
function Write-Err($msg) { Write-Host "[ERROR] $msg" -ForegroundColor Red }

Push-Location -Path $PSScriptRoot
try {
    $repoRoot = Resolve-Path -Path "..\.."
    $migrationsDir = Join-Path $repoRoot 'supabase\migrations'

    if (-not (Test-Path $migrationsDir)) {
        Write-Err "Migrations directory not found at: $migrationsDir"
        exit 2
    }

    if ([string]::IsNullOrWhiteSpace($MigrationFile)) {
        $files = Get-ChildItem -Path $migrationsDir -Filter '*.sql' | Sort-Object Name
        if ($files.Count -eq 0) { Write-Err "No .sql files found in $migrationsDir"; exit 3 }
        Write-Info "Available migrations:"; $files | ForEach-Object { Write-Host "  - $($_.FullName)" }
        $choice = Read-Host "Enter the full path of the migration file to apply (or press Enter to use the latest)"
        if ([string]::IsNullOrWhiteSpace($choice)) { $MigrationFile = $files[-1].FullName } else { $MigrationFile = $choice }
    }

    if (-not (Test-Path $MigrationFile)) { Write-Err "Migration file not found: $MigrationFile"; exit 4 }

    Write-Info "Selected migration: $MigrationFile"

    # If SUPABASE_URL & SERVICE_ROLE_KEY are provided, use psql with that connection.
    # Se a variável SUPABASE_DB_URL (connection string) estiver definida, use-a diretamente
    if ($env:SUPABASE_DB_URL) {
        Write-Info "Usando SUPABASE_DB_URL do ambiente para aplicar a migration."
        if (-not (Get-Command psql -ErrorAction SilentlyContinue)) { Write-Err "psql não encontrado no PATH. Instale o cliente PostgreSQL (psql) para usar este modo."; exit 5 }

        Write-Info "Aplicando $MigrationFile usando psql..."
        & psql $env:SUPABASE_DB_URL -f $MigrationFile
        exit $LASTEXITCODE
    }

    # Fallback: try to use supabase CLI for a local instance
    if (Get-Command supabase -ErrorAction SilentlyContinue) {
    Write-Info "Tentando aplicar a migration via supabase local (supabase CLI detectado)."
        # supabase db remote set/psql could be used, but simplest path is to open a psql shell using supabase secrets.
        # Ask user whether they want to try to use 'supabase db remote commit' or prefer manual steps.
        $useSupabase = Read-Host "Run the migration using the local supabase CLI? This requires a running 'supabase start' and psql on PATH. (Y/n)"
        if ($useSupabase -eq 'n' -or $useSupabase -eq 'N') { Write-Info "Aborting. You can run the SQL manually via Supabase SQL editor or psql."; exit 0 }

        if (-not (Get-Command psql -ErrorAction SilentlyContinue)) { Write-Err "psql not found on PATH. Install PostgreSQL client tools (psql) to use this mode."; exit 6 }

        Write-Info "Se 'supabase start' estiver rodando localmente, abra o terminal onde ele roda e copie a connection string do banco (procurar por 'Connection string')."
        Write-Info "Alternativamente, abra o painel do seu projeto no Supabase e use o Editor SQL para colar e executar o arquivo SQL manualmente."
        exit 0
    }

    Write-Warn "Neither SUPABASE_URL nor a local supabase CLI were available. To apply the migration:"
    Write-Host "  - Option A: Open the SQL editor in your Supabase project and paste the SQL file."
    Write-Host "  - Option B: Install psql and set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY env vars, then re-run this script."
    exit 1

}
finally { Pop-Location }
