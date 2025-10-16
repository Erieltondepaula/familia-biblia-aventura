<#
.SYNOPSIS
Starts local Supabase using the Supabase CLI (requires Docker and supabase CLI installed).

.DESCRIPTION
This helper checks for Docker and the supabase CLI, shows helpful messages if missing, and runs `supabase start` in the repository.
It intentionally does not attempt to install global tools. Run this script from the repository root or adjust the -RepoRoot parameter.

.PARAMETER RepoRoot
Path to the repository root where the `supabase` folder lives. Defaults to the script's parent repo root.

.EXAMPLE
.
    pwsh ./scripts/supabase/start-local-supabase.ps1
#>

param(
    [string]$RepoRoot = (Resolve-Path -Path "..\.." -Relative)
)

function Write-Info($msg) { Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Write-Warn($msg) { Write-Host "[WARN] $msg" -ForegroundColor Yellow }
function Write-Err($msg) { Write-Host "[ERROR] $msg" -ForegroundColor Red }

Push-Location -Path $PSScriptRoot
try {
    Write-Info "Repository root: $RepoRoot"

    if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Warn "Docker not found on PATH. Please install Docker Desktop and ensure 'docker' is on PATH before running this script."
        Write-Info "See: https://docs.docker.com/get-docker/"
        exit 2
    }

    if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
        Write-Warn "Supabase CLI not found on PATH. Install it locally on your machine: https://github.com/supabase/cli#installation"
        Write-Info "If you use npm: npm install -g supabase (may require admin). Or use the release binaries for Windows from the Supabase CLI releases page."
        exit 3
    }

    Write-Info "Docker and Supabase CLI detected. Running 'supabase start' in: $RepoRoot"
    Set-Location -Path $RepoRoot

    Write-Host "You may be asked for elevated permissions by Docker during startup."
    Write-Info "Starting local Supabase (this will run in your terminal). Press Ctrl+C to stop."

    # Run supabase start and keep the session attached so the user can see logs.
    & supabase start
    $exitCode = $LASTEXITCODE
    if ($exitCode -ne 0) {
        Write-Err "'supabase start' exited with code $exitCode"
        exit $exitCode
    }
}
finally {
    Pop-Location
}
