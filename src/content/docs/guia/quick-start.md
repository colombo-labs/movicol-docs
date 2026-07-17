---
title: Quick Start
description: Cómo levantar todo el proyecto MoviCol en tu máquina local.
---

## Requisitos

- Docker + Docker Compose
- Node.js 20+
- Python 3.9+ (system Python funciona)

## Levantar servicios de infraestructura

```bash
cd movicol-infra
docker compose up -d   # PostgreSQL + PostGIS + Redis
```

Verificar:
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

## AI Service (FastAPI)

```bash
cd movicol-ai
pip install -e .   # o pip install -r requirements.txt
uvicorn app.main:app --port 8000 --reload
```

Verificar: `curl http://localhost:8000/health`

## Backend (NestJS)

```bash
cd movicol-backend
npm install
npm run start:dev
```

Verificar: `curl http://localhost:3001/health`

## Frontend (React + Vite)

```bash
cd movicol-frontend
npm install
npm run dev
```

Abrir: `http://localhost:3000`

## Verificar que todo funciona

```bash
# Todos los endpoints
curl http://localhost:3001/graph/stats
curl http://localhost:3001/graph/tm/rutas
curl http://localhost:3001/graph/sitp/rutas
curl -X POST http://localhost:3001/route-prediction \
  -H "Content-Type: application/json" \
  -d '{"origin":{"lat":4.65,"lng":-74.11},"destination":{"lat":4.72,"lng":-74.06},"departure_time":"2026-06-21T15:00:00","mode":"vehiculo"}'
```

## Tests

```bash
# AI
cd movicol-ai && python -m pytest tests/ -v

# Frontend
cd movicol-frontend && npm test

# Backend
cd movicol-backend && npm test
```

## Variables de entorno

| Variable | Servicio | Default |
|----------|----------|---------|
| `DATABASE_URL` | Backend | `postgresql://movicol:movicol@localhost:5432/movicol` |
| `REDIS_URL` | Backend | `redis://localhost:6379` |
| `AI_SERVICE_URL` | Backend | `http://localhost:8000` |
| `VITE_API_URL` | Frontend | `http://localhost:3001` |
| `GRAPH_PATH` | AI | `data/grafo_movilidad_bogota_enriched.graphml` |

## Puertos

| Puerto | Servicio |
|--------|----------|
| 3000 | Frontend (Vite) |
| 3001 | Backend (NestJS) |
| 8000 | AI Service (FastAPI) |
| 5432 | PostgreSQL |
| 6379 | Redis |
