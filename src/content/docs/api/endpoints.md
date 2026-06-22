---
title: Catálogo de Endpoints
description: Listado completo de endpoints disponibles en la API de MoviCol.
---

## Arquitectura

```
Browser → Frontend (Vite :3000) → Backend (NestJS :3001) → AI Service (FastAPI :8000)
                                           ↕
                                     PostgreSQL + Redis
```

## Backend (NestJS :3001)

### Graph / Rutas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/graph/stats` | Nodos y edges del grafo |
| GET | `/graph/tm/troncales` | Troncales TM (GeoJSON) |
| GET | `/graph/tm/estaciones` | Estaciones TM (GeoJSON) |
| GET | `/graph/tm/rutas` | 125 rutas TM con coords y horarios |
| GET | `/graph/sitp/rutas` | 689 rutas SITP con cenefa (color) |
| GET | `/graph/sitp/paraderos` | ~2000 paraderos SITP (GeoJSON) |
| GET | `/graph/heatmap` | Mapa de calor de congestión |
| GET | `/graph/accesibilidad` | Estadísticas de accesibilidad |
| GET | `/graph/rutas-cercanas` | Rutas cercanas por GPS |
| GET | `/graph/siniestralidad` | Datos de siniestralidad |

### Predicción de Rutas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/route-prediction` | Predicción de ruta (TM/SITP/Vehículo) |
| POST | `/route-prediction/alternatives` | Rutas alternativas (vehículo) |
| GET | `/route-prediction/alerts` | Alertas operacionales (scraping TM) |
| GET | `/route-prediction/safety` | Score de seguridad por ruta |

### Health

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Health check |

---

## AI Service (FastAPI :8000)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/v1/predict-route` | Predicción de ruta con OSRM + GNN |
| POST | `/api/v1/predict-route/alternatives` | Alternativas vehiculares |
| GET | `/api/v1/predict-route/alerts` | Scraping alertas TransMilenio |
| GET | `/api/v1/predict-route/safety` | Safety score por ruta |
| GET | `/graph/stations` | Estaciones del grafo |
| GET | `/graph/stats` | Stats del grafo |
| GET | `/graph/heatmap` | Congestión por estación |
| POST | `/predictions` | Predicción GNN por estación |
| POST | `/predictions/batch` | Predicciones batch |
| GET | `/demand/predict` | Predicción de demanda ST-GAT |
| POST | `/agent/chat` | Chat con agente IA |
| GET | `/health` | Health check |

---

## Autenticación

No se requiere autenticación para desarrollo local. En producción se usa JWT vía API Gateway.

---

## Errores comunes

| Código | Significado |
|--------|-------------|
| 200/201 | Éxito |
| 404 | Endpoint no existe |
| 422 | Validación fallida (campos requeridos) |
| 502 | AI service no disponible |
| 504 | Timeout (OSRM o Overpass lento) |
