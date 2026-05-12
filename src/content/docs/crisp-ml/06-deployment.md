---
title: '06 — Despliegue'
description: 'Arquitectura de despliegue, CI/CD y monitoreo.'
---

## Arquitectura de despliegue

| Componente | Tecnología | Repo | Puerto |
|-----------|-----------|------|--------|
| ETL | Python + pandas + NetworkX | `movicol-data` | — |
| AI | FastAPI + PyTorch Geometric + LangChain | `movicol-ai` | 8000 |
| Backend | NestJS + TypeORM + PostGIS + Socket.io | `movicol-backend` | 3001 |
| Frontend | React 19 + Vite + Hero UI + Leaflet | `movicol-frontend` | 3000 |
| Infra | Docker Compose | `movicol-infra` | — |

## CI/CD (GitHub Actions)

Cada repo tiene:
1. **Push a develop/main** → Lint + Tests
2. **Push a main** → Build Docker → Push a Docker Hub

## Demo para jurados

```bash
git clone https://github.com/Colombo-labs/movicol-infra
cd movicol-infra
cp .env.example .env
docker compose up -d
# http://localhost:3000
```

## Monitoreo

- Reentrenar GNN cuando se actualice el grafo
- Actualizar datos trimestralmente
- Docker Hub permite deploy en cualquier cloud
