# Como aplicar a migration no Supabase

Este repositório já contém a migration que corrige valores incorretos do campo `profiles.bible_version` (por exemplo `BKJ 1611` → `BKJ1611`):

  supabase/migrations/20251016120000_fix_bkj1611_values.sql

Existem 3 formas principais de aplicar essa migration ao seu banco Supabase. Escolha a que for mais adequada ao seu fluxo.

Opção A — Editor SQL do Supabase (UI)
1. Entre no painel do Supabase (https://app.supabase.com) e abra seu projeto.
2. Acesse a seção "SQL Editor" → "New query".
3. Cole o conteúdo do arquivo `supabase/migrations/20251016120000_fix_bkj1611_values.sql` e execute a query.

Opção B — Usando psql (linha de comando)
1. Obtenha a connection string do banco (host, porta, user, database, password). Você pode encontrar em Settings → Database → Connection string no painel do Supabase.
2. No Windows PowerShell (ou terminal), execute:

```powershell
# Exemplo (substitua os placeholders):
$env:PGPASSWORD = "<DB_PASSWORD>"
psql "postgresql://<DB_USER>@<DB_HOST>:5432/postgres?sslmode=require" -f "supabase/migrations/20251016120000_fix_bkj1611_values.sql"
```

Observações:
- O comando acima usa `psql` (cliente PostgreSQL). Instale-o se necessário (https://www.postgresql.org/download/).
- Não comite senhas no repositório. Use variáveis de ambiente seguras.

Opção C — Supabase CLI / Migrations (se você usa a CLI)
1. Se você já gerencia migrations via Supabase CLI, adicione o arquivo ao seu fluxo de migrations e rode o comando padrão do seu CI para aplicar migrations (`supabase db push` / `supabase migrations apply` dependendo da versão e do seu setup).
2. Caso não tenha um fluxo, prefira a Opção A ou B para aplicar essa correção pontual.

Depois de aplicar
- Verifique a tabela `public.profiles` para garantir que não existam mais valores com espaço em `bible_version`:

```sql
SELECT bible_version, COUNT(*) FROM public.profiles GROUP BY bible_version ORDER BY 2 DESC;
```

Se algo der errado, guarde o output do SQL e entre em contato — eu posso ajudar a interpretar.
