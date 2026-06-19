---
title: '06 — Despliegue'
description: 'Contenedorización, orquestación y cómo levantar el sistema.'
---

## Arquitectura de despliegue

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│   Backend        │────▶│   AI Service    │
│   React + Nginx │     │   NestJS         │     │   FastAPI       │
│   :3000         │     │   :3001          │     │   :8000         │
└─────────────────┘     └────────┬─────────┘     └────────┬────────┘
                                 │                         │
                                 ▼                         ▼
                        ┌─────────────────┐       ┌───────────────┐
                        │   PostgreSQL    │       │  GAT Model    │
                        │   + PostGIS     │       │  + Graph      │
                        │   :5432         │       └───────────────┘
                        └─────────────────┘
```

## Quick Start (Docker)

```bash
cd movicol-infra

# Copiar variables de entorno
cp .env.example .env
# Editar .env → agregar OPENAI_API_KEY (opcional)

# Levantar todo el stack
docker compose -f docker-compose.dev.yml up -d --build

# Verificar
docker compose ps
curl http://localhost:8000/health
curl http://localhost:3001/health
open http://localhost:3000
```

## Quick Start (Local sin Docker)

```bash
# Terminal 1: AI Service
cd movicol-ai
pip install -e ".[dev]"
make dev    # http://localhost:8000

# Terminal 2: Backend
cd movicol-backend
npm install
npm run dev    # http://localhost:3001

# Terminal 3: Frontend
cd movicol-frontend
npm install --legacy-peer-deps
npm run dev    # http://localhost:3000
```

## Pipeline ML

```bash
cd movicol-ai

# Limpiar grafo (raw → clean)
make clean-graph

# Entrenar modelo GAT
make train

# Verificar
make test
```

## Servicios

| Servicio | Puerto | Health | Swagger |
|----------|--------|--------|---------|
| Frontend | 3000 | — | — |
| Backend | 3001 | `/health` | `/api/docs` |
| AI | 8000 | `/health` | `/docs` |
| PostGIS | 5432 | — | — |

## Variables de entorno

| Variable | Servicio | Requerida | Default |
|----------|----------|-----------|---------|
| `POSTGRES_USER` | DB | No | `movicol` |
| `POSTGRES_PASSWORD` | DB | No | `movicol_dev` |
| `OPENAI_API_KEY` | AI | No | (usa rule-based) |
| `AI_SERVICE_URL` | Backend | No | `http://localhost:8000` |
| `VITE_API_URL` | Frontend | No | `http://localhost:3001` |

## Monitoreo

- **Health checks:** Cada servicio expone `/health`
- **Logs:** `docker compose logs -f [servicio]`
- **Swagger:** AI en `:8000/docs`, Backend en `:3001/api/docs`
