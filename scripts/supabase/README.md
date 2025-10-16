# Scripts auxiliares para Supabase (PowerShell)

Esta pasta contém scripts PowerShell para facilitar o desenvolvimento local com Supabase. Os scripts são conservadores: checam pré-requisitos e dão instruções em vez de tentar instalar ferramentas com permissões elevadas.

Arquivos incluídos:

- `start-local-supabase.ps1` — verifica Docker e a CLI do Supabase e executa `supabase start` na raiz do repositório. Execute somente se tiver Docker e a CLI instalados.
- `apply-migration.ps1` — aplica um arquivo SQL da pasta `supabase/migrations/`.
	- Modos suportados:
		1. Usando a variável de ambiente `SUPABASE_DB_URL` (string de conexão Postgres) — o script usa `psql`.
		2. Usando a CLI `supabase` local — exibe instruções (requer `supabase start` rodando).
		3. Manualmente via Editor SQL no painel do Supabase.
- `reset-local-supabase.ps1` — tenta `supabase stop` e, opcionalmente, remove dados locais (ação destrutiva). Use com cuidado.

Exemplos (PowerShell) — execute a partir da raiz do repositório:

```powershell
# Iniciar Supabase local (requer Docker + supabase CLI no PATH)
powershell -ExecutionPolicy Bypass -File .\scripts\supabase\start-local-supabase.ps1

# Aplicar uma migration específica (modo SUPABASE_DB_URL)
setx SUPABASE_DB_URL "postgres://postgres:<senha>@<host>:5432/postgres"
powershell -ExecutionPolicy Bypass -File .\scripts\supabase\apply-migration.ps1 -MigrationFile .\supabase\migrations\20251016120000_fix_bkj1611_values.sql

# Parar e opcionalmente remover dados locais
powershell -ExecutionPolicy Bypass -File .\scripts\supabase\reset-local-supabase.ps1
```

Observações:

- Os scripts não instalam Docker ou a CLI do Supabase. Instale Docker Desktop e a Supabase CLI manualmente se necessário.
- Para produção, a forma mais simples de aplicar migrations é usar o Editor SQL no painel do Supabase.
- `apply-migration.ps1` suporta a variável `SUPABASE_DB_URL` (recomendado para CI) ou instruções para uso local via supabase CLI.

Workflow de CI (GitHub Actions):

- Este repositório contém o workflow `.github/workflows/apply-supabase-migrations.yml` que aplica os arquivos em `supabase/migrations/`.
- Para usá-lo, adicione o Secret `SUPABASE_DB_URL` (Settings → Secrets) com a connection string do Postgres do seu projeto.

Avisos importantes:

- CUIDADO: armazenar credenciais em Secrets é sensível — use um usuário/role com permissões mínimas necessárias.
- O workflow executa os arquivos `.sql` em ordem alfabética. Garanta que os arquivos estejam corretamente versionados.

