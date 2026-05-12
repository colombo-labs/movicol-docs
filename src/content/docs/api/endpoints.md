---
title: Introducción a la API
description: Documentación de la API REST y WebSocket de MoviCol.
---

MoviCol expone dos servicios principales:

| Servicio | Tecnología | Puerto | Docs |
|----------|-----------|--------|------|
| **Backend** | NestJS | `:3001` | `/api/docs` (Swagger) |
| **AI Service** | FastAPI | `:8000` | `/docs` (Swagger) |

## Base URLs

```
# Backend
http://localhost:3001

# AI Service
http://localhost:8000
```

## Autenticación

Actualmente la API no requiere autenticación. En producción se implementará OAuth2 / JWT.

## Formato de respuestas

Todas las respuestas siguen el formato JSON:

```json
{
  "data": { ... },
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

## Errores

Los errores siguen el estándar HTTP con el siguiente formato:

```json
{
  "statusCode": 404,
  "message": "Station not found",
  "error": "Not Found"
}
```

## Límites

| Recurso | Límite |
|---------|--------|
| Requests por minuto | 100 |
| Tamaño máximo de payload | 1 MB |

## Secciones

- [Estaciones](/api/stations/) — CRUD de estaciones y paraderos
- [Rutas](/api/routes/) — Consulta de rutas del sistema
- [Predicciones](/api/predictions/) — Predicción de congestión con GNN
- [Agente IA](/api/agent/) — Chat conversacional con el grafo
- [WebSocket](/api/websocket/) — Eventos en tiempo real
