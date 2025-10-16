<#
.SYNOPSIS
Stops local Supabase and removes local artifacts used by the Supabase CLI.

.DESCRIPTION
This script stops a running local Supabase instance (via `supabase stop`) and offers to remove local data directories. Use with caution — removing data is destructive.

.EXAMPLE
    pwsh ./scripts/supabase/reset-local-supabase.ps1
#>

param()

function Write-Info($msg) { Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Write-Warn($msg) { Write-Host "[WARN] $msg" -ForegroundColor Yellow }
function Write-Err($msg) { Write-Host "[ERROR] $msg" -ForegroundColor Red }

Push-Location -Path $PSScriptRoot
try {
    if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
        Write-Warn "Supabase CLI not found. Nothing to stop via the CLI. If you started supabase via Docker, stop the containers manually."
        exit 2
    }

    Write-Info "Attempting 'supabase stop' to stop local Supabase containers..."
    & supabase stop
    if ($LASTEXITCODE -ne 0) { Write-Warn "supabase stop returned exit code $LASTEXITCODE" }

    $confirm = Read-Host "Do you also want to remove local Supabase data (this is destructive)? Type 'yes' to confirm"
    if ($confirm -eq 'yes') {
        # Supabase local data often lives in ~/.supabase or in the project .supabase folder depending on version. We'll try common locations.
        $home = [Environment]::GetFolderPath('UserProfile')
        $candidates = @(Join-Path $home '.supabase', Join-Path (Get-Location) '.supabase')
        foreach ($p in $candidates) {
            if (Test-Path $p) {
                Write-Warn "Removing: $p"
                Remove-Item -Recurse -Force -LiteralPath $p
            }
        }
        Write-Info "Removed local supabase data candidates. If your data lives elsewhere, remove it manually."
    } else {
        Write-Info "Skipping removal of local data."
    }

}
finally { Pop-Location }
