# PadelData V3 — Next.js + Supabase

Versión V3 del proyecto PadelData: primera base dinámica preparada para crecer desde una maqueta estática a producto real.

## Qué incluye

- Next.js + React + Tailwind CSS
- Componentes reutilizables:
  - `TournamentCard`
  - `MatchRow`
  - `PlayerBadge`
  - `ConfidencePill`
  - `RankingTable`
  - `SubmitResultForm`
- Páginas:
  - `/`
  - `/rankings`
  - `/torneos`
  - `/torneos/[slug]`
  - `/jugadores`
  - `/jugadores/[slug]`
  - `/clubes`
  - `/metodologia`
  - `/fuentes`
  - `/sugerir-resultado`
- Datos demo en `lib/mockData.ts`
- Esquema SQL inicial en `supabase/schema.sql`

## Cómo arrancarlo

```bash
npm install
npm run dev
```

Abre:

```bash
http://localhost:3000
```

## Supabase

1. Crea un proyecto en Supabase.
2. Abre el SQL Editor.
3. Pega el contenido de `supabase/schema.sql`.
4. Crea un archivo `.env.local` copiando `.env.example`.
5. Añade tus claves públicas de Supabase.

## Próximo paso recomendado

Conectar las páginas a Supabase sustituyendo `lib/mockData.ts` por queries reales.

Orden recomendado:

1. Leer `players` desde Supabase.
2. Leer `tournaments` desde Supabase.
3. Leer `matches` por `tournament_id`.
4. Guardar el formulario en `submissions`.
5. Añadir panel de revisión para administrador.
