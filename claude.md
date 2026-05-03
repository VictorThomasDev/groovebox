# Groovebox — context for Claude Code

## Stack

- Frontend: React 19 + Vite, TanStack Query, Zustand, Tailwind, React Router v7
- Backend: NestJS, Prisma, PostgreSQL
- External: Discogs API, YouTube IFrame API

## Conventions

- TypeScript strict partout, pas de `any`
- Commits en anglais, format conventionnel (feat/fix/chore)
- Tests avec Jest côté API, Vitest côté web
- Variables d'env via `.env`, jamais hardcodées

## Structure

- apps/api/src/[module]/ → controller, service, module, dto
- apps/web/src/components/ → composants réutilisables
- apps/web/src/pages/ → une page = un dossier
