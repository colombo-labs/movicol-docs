---
title: '03 — Preparación de los Datos'
description: 'Construcción del grafo, feature engineering y normalización.'
---

## Construcción del grafo

1. **Nodos TM:** 153 estaciones de `estaciones_troncales_tm.geojson`
2. **Nodos SITP:** 7,291 paraderos únicos (deduplicados por cenefa)
3. **Aristas TM:** 83 rutas troncales
4. **Aristas SITP:** 41,907 secuencias de paradas

## Feature engineering

| Feature | Tipo | Descripción |
|---------|------|-------------|
| lat, lon | Geográfica | Coordenadas del nodo |
| grado | Topológica | Número de conexiones |
| betweenness | Topológica | Centralidad de intermediación |
| closeness | Topológica | Centralidad de cercanía |
| siniestralidad_score | Contextual | Índice de peligrosidad |
| is_tm | Categórica | 1 si es estación TM |
| day_of_week | Temporal | Día de la semana (0-6) |
| hour | Temporal | Hora del día (0-23) |
| is_rush_hour | Temporal | Hora pico (6-9, 17-20) |

## Pipeline ETL

```bash
make download    # datos.gov.co → data/raw/
make process     # data/raw/ → data/graphs/
make load        # data/graphs/ → PostGIS
```
