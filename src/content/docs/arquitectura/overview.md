---
title: Arquitectura General
description: Diagrama y flujo de datos del sistema MoviCol.
---

## Diagrama de Servicios

```
┌──────────────┐     ┌──────────────┐     ┌──────────────────────────────┐
│   Frontend   │     │   Backend    │     │     ArcGIS FeatureServer     │
│  React/Vite  │────▶│   NestJS     │────▶│  (datos.gov.co / SDM Bogotá) │
│   :3000      │     │   :3001      │     │                              │
└──────────────┘     └──────┬───────┘     │  • Paraderos SITP (7,694)    │
                            │             │  • Paraderos×Ruta (41,038)   │
                            │             │  • Estaciones TM (149)       │
                            │             │  • Rutas TM (155)            │
                            │             │  • Trazados TM (20)          │
                            │             │  • Rutas SITP shapes (700)   │
                            │             │  • Carril Preferencial (8)   │
                            │             │  • Siniestros 2024 (12,908)  │
                            │             │  • Siniestros×Localidad (20) │
                            │             │  • Rutas Zonales SITP (700)  │
                            │             └──────────────────────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │    Redis     │  Cache 24h (TTL 86400s)
                     │    :6379     │  Keys: arcgis:sitp:*, arcgis:tm:*
                     └──────────────┘
                            │
                            │
┌──────────────┐     ┌──────┴───────┐     ┌──────────────┐
│  PostGIS     │◀────│  AI Service  │────▶│    OSRM      │
│   :5432      │     │  FastAPI     │     │  (público)   │
│              │     │   :8000      │     │  HTTP        │
│ • Grafo TM   │     │              │     └──────────────┘
│ • Edges      │     │ • Predicción │
│ • Heatmap    │     │ • Alternativas│    ┌──────────────┐
└──────────────┘     │ • Congestión │───▶│  Nominatim   │
                     │ • Alertas TM │    │  (geocoding) │
                     └──────────────┘    └──────────────┘
```

## Flujo de datos

1. **ArcGIS REST API**: 10 datasets de datos abiertos consumidos vía HTTP con cache Redis 24h
2. **PostGIS**: Grafo de transporte para predicciones de congestión (GNN)
3. **movicol-ai**: Carga el grafo, entrena GNN/ST-GAT, routing OSRM, sirve predicciones
4. **OSRM** (externo): Routing vehicular real por calles de Bogotá con alternativas
5. **movicol-backend**: Orquesta ArcGIS + AI + Redis, expone API REST unificada
6. **movicol-frontend**: Mapa Leaflet con predicciones, planificador multi-modal, datos en vivo

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | React + Vite + TypeScript + Tailwind | React 18, Vite 5 |
| UI | Leaflet + react-leaflet + lucide-react | - |
| Backend | NestJS + TypeORM | NestJS 10 |
| AI | FastAPI + NetworkX + PyTorch | FastAPI 0.100+ |
| DB | PostgreSQL + PostGIS | 16 + 3.5 |
| Cache | Redis | 7 Alpine |
| Datos | ArcGIS FeatureServer (datos.gov.co) | REST API |
| Routing | OSRM (public API, HTTP) | - |
| POIs | Overpass API (OpenStreetMap) | - |
| Clima | Open-Meteo API | - |
| Alertas | Scraping transmilenio.gov.co | - |

## Fuentes de datos externas

| Fuente | Datos | Uso |
|--------|-------|-----|
| **ArcGIS SDM Bogotá** | 10 datasets (paraderos, rutas, estaciones, siniestros) | Datos principales |
| OSRM (router.project-osrm.org) | Routing vehículo/moto | Rutas por calles |
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
