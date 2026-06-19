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
# Descarga de datos
make download    # datos.gov.co → data/raw/

# Construcción del grafo raw
make process     # data/raw/ → data/graphs/ (MultiDiGraph 7,444 nodos, 41,990 aristas)

# Limpieza para ML (en movicol-ai)
make clean-graph # MultiDiGraph → Graph simple (7,290 nodos, 11,165 aristas)
                 # - Extrae componente principal (97.9%)
                 # - Simplifica aristas paralelas (conserva la más corta)
                 # - Calcula centralidad (betweenness, closeness)
                 # - Exporta features normalizadas (7290 × 8)
```

## Normalización

Z-score por feature (mean/std calculados sobre el grafo limpio):

| Feature | Mean | Std |
|---------|------|-----|
| lat | 4.639 | 0.068 |
| lon | -74.109 | 0.044 |
| degree | 3.06 | 1.35 |
| betweenness | 0.003 | 0.009 |
| closeness | 0.041 | 0.007 |
| siniestralidad | 0.016 | 0.221 |
| fallecidos | 0.071 | 0.960 |
| is_tm | 0.021 | 0.143 |
