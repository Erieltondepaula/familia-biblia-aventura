# Documentação: Plano de Leitura Bíblica M'Cheyne

## 📋 Resumo do Sistema

Sistema de leitura bíblica anual baseado no plano Robert M'Cheyne, que permite ler toda a Bíblia em 1 ano com 4 capítulos por dia (2 para leitura familiar + 2 para leitura pessoal), intercalando Antigo e Novo Testamento.

## ✅ O Que Foi Implementado

### 1. Estrutura de Dados (`src/lib/mccheyneReadingPlan.ts`)

```typescript
interface McCheyneReading {
  day: number;           // Dia do ano (1-365)
  month: number;         // Mês (1-12)
  dayOfMonth: number;    // Dia do mês (1-31)
  familyOT: string;      // Leitura Familiar - Antigo Testamento
  familyNT: string;      // Leitura Familiar - Novo Testamento
  personalOT: string;    // Leitura Pessoal - Antigo Testamento
  personalNT: string;    // Leitura Pessoal - Novo Testamento
  morningVerse: string;  // Versículo matinal (Spurgeon)
  morningDevotional: string; // Devocional matinal (Spurgeon)
  eveningVerse: string;  // Versículo noturno (Spurgeon)
  eveningDevotional: string; // Devocional noturno (Spurgeon)
  reflection: string;    // Pergunta reflexiva
}
```

**Funções principais:**
- `getCurrentDayReading()` - Busca leitura pela data do calendário atual
- `getReadingByDate(month, day)` - Busca leitura por data específica
- `calculateReadingProgress(completedChapters)` - Calcula % de progresso (base: 1189 capítulos)
- `getAllChapters(reading)` - Retorna array com os 4 capítulos do dia

### 2. Página de Leitura Diária (`src/pages/ReadingDayMcCheyne.tsx`)

**Funcionalidades:**
- ✅ Exibição das 4 leituras diárias (2 familiares + 2 pessoais)
- ✅ Checkbox individual para cada capítulo
- ✅ Badges coloridos por tipo de livro:
  - 🟡 Antigo Testamento (amber)
  - 🟢 Novo Testamento (green)
- ✅ Cards separados com bordas coloridas:
  - 🔵 Leitura Familiar (blue border)
  - 🟣 Leitura Pessoal (purple border)
- ✅ Devocionais Manhã e Noite (Spurgeon)
- ✅ Campo de reflexão pessoal (auto-save)
- ✅ Sistema de memorização de versículos (+100 XP)
- ✅ Navegação entre dias (anterior/próximo)
- ✅ Bloqueio de dias futuros
- ✅ Progresso visual (% do dia e % total da Bíblia)
- ✅ Sistema de XP e níveis mantido

### 3. Integração com Dashboard (`src/pages/Dashboard.tsx`)

- ✅ Exibe as 4 leituras do dia atual
- ✅ Organizado por "Leitura Familiar" e "Leitura Pessoal"
- ✅ Badges coloridos por tipo de livro
- ✅ Link direto para a página de leitura

### 4. Sistema de Progresso Atualizado (`src/contexts/ProgressContext.tsx`)

- ✅ Função `totalChaptersRead()` - Conta capítulos únicos lidos
- ✅ Cálculo de progresso baseado em 1189 capítulos totais
- ✅ Sistema de XP e níveis preservado
- ✅ Compatível com múltiplos perfis

### 5. Rotas (`src/App.tsx`)

- ✅ Rota `/reading/:day` agora usa `ReadingDayMcCheyne`
- ✅ Parâmetro `:day` = dia do ano (1-365)

## 📊 Dados Atualmente no Sistema

**Dias implementados:** 2 de 365
1. **01 de Janeiro** (Dia 1):
   - Familiar: Gênesis 1, Mateus 1
   - Pessoal: Esdras 1, Atos 1

2. **06 de Outubro** (Dia 279):
   - Familiar: 1 Reis 9, Efésios 6
   - Pessoal: Ezequiel 39, Salmo 90

## 🔴 O Que Falta Fazer

### Prioridade ALTA

1. **Adicionar os 363 dias restantes** ao array `mcCheyneReadingPlan`
   - Arquivo: `src/lib/mccheyneReadingPlan.ts`
   - Seguir o plano Robert M'Cheyne completo
   - Incluir devocionais para cada dia (ou deixar genéricos temporariamente)

2. **Sistema de versões bíblicas**
   - Atualmente está fixo em "versão padrão"
   - Implementar seleção entre ACF, NAA e NVI
   - Pode ser em Settings ou na própria página de leitura

### Prioridade MÉDIA

3. **Melhorar devocionais**
   - Atualmente usa Spurgeon "Manhã e Noite"
   - Idealmente: criar reflexões específicas relacionando AT + NT do dia
   - Incluir aplicação prática e pergunta reflexiva

4. **Sistema de cores por seção bíblica**
   - Atualmente: apenas AT (amber) e NT (green)
   - Adicionar cores específicas para:
     - Pentateuco
     - Históricos
     - Poéticos
     - Profetas
     - Evangelhos
     - Atos
     - Epístolas Paulinas
     - Epístolas Gerais
     - Apocalipse

5. **Lembretes diários**
   - Notificação para leitura (sem pressão)
   - Pode usar Notification API do navegador

### Prioridade BAIXA

6. **Estatísticas avançadas**
   - Livros completos
   - Testamentos completos
   - Gráfico de progresso semanal/mensal

7. **Exportação de reflexões**
   - PDF ou texto com todas as reflexões do usuário

8. **Modo escuro aprimorado**
   - Verificar contraste em todos os componentes

## 📁 Estrutura de Arquivos

```
src/
├── lib/
│   ├── mccheyneReadingPlan.ts          # ⭐ Dados do plano (PRECISA DOS 365 DIAS)
│   ├── reflectionsStorage.ts            # Storage de reflexões
│   ├── memorizationStorage.ts           # Storage de versículos memorizados
│   └── progressCalculations.ts          # Cálculos de XP e níveis
├── pages/
│   ├── ReadingDayMcCheyne.tsx          # ⭐ Página principal de leitura
│   └── Dashboard.tsx                    # Dashboard com leitura do dia
├── contexts/
│   ├── ProgressContext.tsx              # Contexto de progresso/XP
│   └── ProfileContext.tsx               # Contexto de perfis
└── components/
    ├── CircularProgress.tsx             # Progresso circular
    ├── LevelUpModal.tsx                 # Modal de level up
    └── MemorizedVerses.tsx              # Lista de versículos memorizados
```

## 🎨 Design System

### Cores Semânticas Utilizadas

```css
/* Badges de livros */
--amber (AT)
--green (NT)

/* Cards de leitura */
--blue (border - Familiar)
--purple (border - Pessoal)

/* UI geral */
--primary
--secondary
--muted
--accent
```

### Componentes UI

- `Card`, `CardHeader`, `CardTitle`, `CardContent`
- `Checkbox` (individual por capítulo)
- `Badge` (tipo de livro)
- `Button` (navegação, ações)
- `Textarea` (reflexões)
- `Progress` (barra de progresso)

## 💾 Storage (localStorage)

### Chaves usadas por perfil:

- `progress_${profileId}` - XP e leituras completadas
- `reflections_${profileId}` - Reflexões diárias
- `memorized_${profileId}` - Versículos memorizados

### Estrutura de dados salvos:

```typescript
// Progress
{
  xp: number,
  completedReadings: Array<{
    day: number,
    chapters: string[],
    date: string
  }>
}

// Reflections
Array<{
  day: number,
  notes: string,
  date: string
}>

// Memorization
Array<{
  day: number,
  verse: string,
  date: string
}>
```

## 🎮 Sistema de XP

### Recompensas:
- **Capítulo lido:** 84 XP (cada um dos 4)
- **Reflexão escrita:** 50 XP
- **Versículo memorizado:** 100 XP
- **Total possível por dia:** 336 XP (leitura) + 50 XP (reflexão) + 100 XP (memorização) = **486 XP**

### Níveis:
- 1000 XP por nível
- 100 níveis máximo
- Títulos por faixa (definidos em `progressCalculations.ts`)

## 🔄 Fluxo de Uso

1. Usuário acessa Dashboard
2. Vê as 4 leituras do dia atual
3. Clica em "Começar Leitura"
4. Marca checkboxes conforme lê cada capítulo
5. Lê devocionais Manhã e Noite
6. Escreve reflexão pessoal (auto-save)
7. Opcionalmente memoriza versículo
8. Clica "Completar Leitura do Dia"
9. Recebe XP e possivelmente level up
10. Volta ao Dashboard

## 🚀 Próximos Passos Recomendados

### Sessão 1: Completar Dados Base
1. Adicionar todos os 365 dias ao plano
2. Testar navegação em diversos dias
3. Validar cálculo de progresso

### Sessão 2: Versões Bíblicas
1. Criar sistema de seleção de versão
2. Implementar ACF, NAA, NVI
3. Salvar preferência por perfil

### Sessão 3: Aprimorar Devocionais
1. Criar devocionais específicos para mais dias
2. Relacionar AT + NT nas reflexões
3. Adicionar aplicações práticas

### Sessão 4: Polimento e Estatísticas
1. Cores por seção bíblica
2. Estatísticas avançadas
3. Lembretes diários
4. Exportação de dados

## 📝 Notas Importantes

- ✅ Sistema usa data do calendário (não "dias desde início")
- ✅ Cada perfil tem progresso independente
- ✅ Reflexões são auto-salvas após 1 segundo de inatividade
- ✅ Dias futuros ficam bloqueados
- ✅ Pode navegar para dias anteriores a qualquer momento
- ✅ XP e níveis são preservados do sistema anterior

## 🐛 Issues Conhecidos

Nenhum no momento.

## 📚 Referências

- Plano original: Robert M'Cheyne (1842)
- Devocionais: Charles Spurgeon "Manhã e Noite"
- Total de capítulos da Bíblia: 1189

---

**Última atualização:** 2025-10-07  
**Status:** Base funcional implementada, aguardando dados completos dos 365 dias
