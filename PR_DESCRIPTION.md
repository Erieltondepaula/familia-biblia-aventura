## Resumo das alterações

Este PR contém várias correções e refatorações solicitadas para preparar o projeto para Beta e corrigir um erro de validação do campo `profiles.bible_version` que causava 400s no Supabase.

Principais mudanças
- Normalização e fallback para `bible_version` em `ProfileContext` (usa 'NVI' como fallback e notifica o usuário).
- Migração SQL para corrigir registros existentes (`supabase/migrations/20251016120000_fix_bkj1611_values.sql`).
- Extração de `*ContextDef.ts` para Profile/Auth/Progress e separação de hooks.
- Mover variantes e constantes de UI para arquivos helper (ex: `buttonVariants`, `toggleVariants`, `sidebarConstants`, `formHelpers`).
- Correções de TypeScript e build (resolvidos imports e avisos de Fast Refresh).

Checklist
- [ ] Testar localmente com `npm run dev` e validar flows de criação/edição de perfil.
- [ ] Aplicar migration no Supabase (ver `SUPABASE_MIGRATION.md`).
- [ ] Revisar diff e aprovar alterações.

Observações
- O build passou localmente (`npm run build`). Há avisos de chunk grande (jspdf/xlsx/html2canvas) que podem ser resolvidos com code-splitting.
