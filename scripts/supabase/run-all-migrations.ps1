<#!
.SYNOPSIS
Aplica todas as migrations SQL em `supabase/migrations/` usando psql e a variável de ambiente SUPABASE_DB_URL.

.DESCRIPTION
Script simples para aplicar em sequência todos os arquivos `.sql` na pasta `supabase/migrations/`.
Requer o cliente `psql` instalado e a variável de ambiente `SUPABASE_DB_URL` definida com a connection string do Postgres.

.EXAMPLE
    pwsh ./scripts/supabase/run-all-migrations.ps1
#>

function Write-Info($msg) { Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Write-Warn($msg) { Write-Host "[WARN] $msg" -ForegroundColor Yellow }
function Write-Err($msg) { Write-Host "[ERROR] $msg" -ForegroundColor Red }

Push-Location -Path $PSScriptRoot
try {
    $repoRoot = Resolve-Path -Path "..\.."
    $migrationsDir = Join-Path $repoRoot 'supabase\migrations'

    if (-not (Test-Path $migrationsDir)) {
        Write-Err "Diretório de migrations não encontrado: $migrationsDir"
        exit 2
    }

    if (-not (Get-Command psql -ErrorAction SilentlyContinue)) {
        Write-Err "psql não encontrado no PATH. Instale o cliente PostgreSQL (psql) antes de continuar."
        exit 3
    }

    $dbUrl = $env:SUPABASE_DB_URL
    if (-not $dbUrl) {
        $dbUrl = Read-Host "Informe a SUPABASE_DB_URL (connection string Postgres) ou pressione Enter para cancelar"
        if (-not $dbUrl) { Write-Warn "Operação cancelada pelo usuário."; exit 0 }
    }

    Write-Info "Usando SUPABASE_DB_URL: **** (oculto)"

    $files = Get-ChildItem -Path $migrationsDir -Filter '*.sql' | Sort-Object Name
    if ($files.Count -eq 0) { Write-Info "Nenhuma migration encontrada em $migrationsDir"; exit 0 }

    foreach ($f in $files) {
        Write-Info "Aplicando: $($f.Name)"
        & psql $dbUrl -f $f.FullName
        if ($LASTEXITCODE -ne 0) {
            Write-Err "psql retornou código $LASTEXITCODE ao aplicar $($f.Name). Abortando."
            exit $LASTEXITCODE
        }
    }

    Write-Info "Todas as migrations aplicadas com sucesso."
}
finally { Pop-Location }
