---
title: Arquitectura General
description: Diagrama y flujo de datos del sistema MoviCol.
---

## Diagrama de Servicios

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│   Backend        │────▶│   AI Service    │
│   React + Vite  │◀────│   NestJS         │◀────│   FastAPI       │
│   :3000         │     │   :3001          │ HTTP│   :8000         │
└─────────────────┘     └────────┬─────────┘     └────────┬────────┘
                                 │                         │
                        ┌────────┴─────────┐     ┌────────┴────────┐
                        │   PostgreSQL     │     │  OSRM (externo) │
                        │   + PostGIS      │     │  Routing real   │
                        │   :5432          │     └─────────────────┘
                        └──────────────────┘              │
                                 │                ┌───────┴────────┐
                        ┌────────┴─────────┐     │  GNN + ST-GAT  │
                        │   Redis 7        │     │  Predicciones   │
                        │   Cache :6379    │     └────────────────┘
                        └──────────────────┘
```

## Flujo de datos

1. **movicol-data**: Descarga datos de datos.gov.co + TransMilenio GIS, construye grafo NetworkX
2. **PostGIS**: Almacena troncales, estaciones, paraderos con geometrías
3. **movicol-ai**: Carga el grafo, entrena GNN (congestión) y ST-GAT (demanda), sirve predicciones
4. **OSRM** (externo): Routing vehicular real por calles de Bogotá con alternativas
5. **movicol-backend**: Orquesta PostGIS + AI, cachea en Redis, expone API REST
6. **movicol-frontend**: Mapa Leaflet con predicciones, planificador multi-modal, rutas en tiempo real

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | React + Vite + TypeScript + Tailwind | React 18, Vite 5 |
| UI | Leaflet + react-leaflet + lucide-react | - |
| Backend | NestJS + TypeORM | NestJS 10 |
| AI | FastAPI + NetworkX + PyTorch | FastAPI 0.100+ |
| DB | PostgreSQL + PostGIS | 16 + 3.5 |
| Cache | Redis | 7 Alpine |
| Routing | OSRM (public API) | - |
| POIs | Overpass API (OpenStreetMap) | - |
| Clima | Open-Meteo API | - |
| Alertas | Scraping transmilenio.gov.co | - |

## Fuentes de datos externas

| Fuente | Datos | Uso |
|--------|-------|-----|
| datos.gov.co | SITP paraderos, rutas, GeoJSON | Grafo base |
| TransMilenio GIS (ArcGIS) | Troncales, estaciones | Mapa TM |
| OSRM (router.project-osrm.org) | Routing vehículo | Rutas por calles |
| Overpass/OSM | POIs (cafés, cajeros, etc.) | "Cerca de tu destino" |
| Open-Meteo | Temperatura actual | Barra de info |
| transmilenio.gov.co | Alertas operacionales | Estado del sistema |
| Nominatim | Geocoding (búsqueda de direcciones) | Búsqueda en campos |

## Modelos de IA

| Modelo | Tipo | Input | Output |
|--------|------|-------|--------|
| GNN (GAT) | Graph Attention Network | Nodo del grafo + hora | Congestión (0-1) |
| ST-GAT | Spatio-Temporal GAT | Estación + hora | Demanda (score) |
| OSRM | Dijkstra sobre red vial | Coords origen/destino | Ruta real + steps |

## Congestión

La predicción de congestión combina:
- **GNN base** (60%): Predicción por nodo del grafo
- **ST-GAT demanda** (40%): Score de demanda por estación
- **Factor horario**: Pico mañana (8am=1.0), madrugada (3am=0.2)
- **Factor día**: L-J=1.0, Viernes=1.05, Sábado=0.6, Domingo=0.4
