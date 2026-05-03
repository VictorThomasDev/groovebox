# Groovebox

Gérez votre collection de vinyles. Suivez vos disques, construisez votre wishlist et consultez vos statistiques — le tout synchronisé avec Discogs.

## Stack

| Couche | Technologie |
|--------|-------------|
| Frontend | React 19, Vite, TanStack Query, Zustand, Tailwind, React Router v7 |
| Backend | NestJS, Prisma |
| Base de données | PostgreSQL 16 |
| Externe | Discogs API, YouTube IFrame API |

## Prérequis

- Node.js ≥ 20
- Docker (pour PostgreSQL)
- Un compte développeur Discogs pour les clés API

## Installation

```bash
# Cloner le repo
git clone https://github.com/you/groovebox.git
cd groovebox

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env : JWT_SECRET, DISCOGS_CONSUMER_KEY, DISCOGS_CONSUMER_SECRET

# Démarrer la base de données
docker compose up -d

# Appliquer les migrations Prisma
npm run db:migrate
```

## Développement

```bash
# Lancer l'API (port 3000) et le frontend (port 5173) en parallèle
npm run dev

# Ou séparément
npm run dev:api
npm run dev:web

# Ouvrir Prisma Studio
npm run db:studio
```

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | API + frontend en parallèle |
| `npm run build` | Build de production (tous les workspaces) |
| `npm run db:migrate` | Appliquer les migrations Prisma |
| `npm run db:generate` | Régénérer le client Prisma |
| `npm run db:studio` | Interface visuelle de la base de données |

## Structure du projet

```
groovebox/
├── apps/
│   ├── api/                  # Backend NestJS
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── src/
│   │       ├── auth/         # JWT auth
│   │       ├── collection/   # Gestion des disques
│   │       ├── discogs/      # Intégration Discogs
│   │       ├── stats/        # Statistiques de collection
│   │       └── wishlist/     # Liste de souhaits
│   └── web/                  # Frontend React
│       └── src/
│           ├── components/
│           ├── pages/
│           └── store/
├── docker-compose.yml
└── .env.example
```

## Variables d'environnement

Copier `.env.example` en `.env` et remplir :

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | URL de connexion PostgreSQL |
| `JWT_SECRET` | Secret pour signer les tokens JWT |
| `DISCOGS_CONSUMER_KEY` | Clé API Discogs |
| `DISCOGS_CONSUMER_SECRET` | Secret API Discogs |
| `VITE_API_URL` | URL de l'API côté frontend |
