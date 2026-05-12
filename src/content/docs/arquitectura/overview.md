---
title: Arquitectura General
description: Diagrama y flujo de datos del sistema MoviCol.
---

## Diagrama de Servicios

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│   Backend        │────▶│   AI Service    │
│   React + Vite  │◀────│   NestJS         │◀────│   FastAPI       │
│   :3000         │ WS  │   :3001          │ HTTP│   :8000         │
└─────────────────┘     └────────┬─────────┘     └────────┬────────┘
                                 │                         │
                                 ▼                         ▼
                        ┌─────────────────┐       ┌───────────────┐
                        │   PostgreSQL    │       │  GNN Model    │
                        │   + PostGIS     │       │  (GAT .pt)    │
                        │   :5432         │       └───────────────┘
                        └─────────────────┘
```

## Flujo de datos

1. `movicol-data` descarga y procesa datos de datos.gov.co
2. Los datos se cargan en PostGIS
3. `movicol-ai` entrena el modelo GNN con los datos del grafo
4. `movicol-backend` expone la API REST + WebSocket
5. `movicol-frontend` consume la API y muestra el mapa con predicciones

## Comunicación entre servicios

| De → A | Protocolo | Descripción |
|--------|-----------|-------------|
| Frontend → Backend | HTTP REST + WebSocket | Datos y predicciones en tiempo real |
| Backend → AI | HTTP interno | Proxy pattern (predicciones, chat) |
| Backend → DB | TypeORM + PostGIS | Datos espaciales |
| AI → DB | SQLAlchemy + GeoAlchemy2 | Solo lectura |

## WebSocket (tiempo real)

| Namespace | Uso |
|-----------|-----|
| `/predictions` | Suscripción a predicciones live por estación/zona |
| `/chat` | Streaming de respuestas del agente LLM token por token |

## Repositorios

| Repo | Responsabilidad |
|------|-----------------|
| `movicol-data` | ETL, descarga, procesamiento, carga a PostGIS |
| `movicol-ai` | GNN, predicciones, agente conversacional |
| `movicol-backend` | Gateway API, datos espaciales, WebSocket |
| `movicol-frontend` | UI, mapa, dashboard, chat |
| `movicol-infra` | Docker Compose, orquestación |
| `movicol-docs` | Esta documentación |
