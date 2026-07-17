---
title: Predicción de Rutas
description: Endpoints para predicción multi-modal de rutas con congestión, navegación y alternativas.
---

## Predecir ruta

```http
POST /route-prediction
```

Predice la ruta óptima entre dos puntos con segmentos de riesgo por congestión.

**Body:**
```json
{
  "origin": { "lat": 4.65, "lng": -74.11 },
  "destination": { "lat": 4.72, "lng": -74.06 },
  "departure_time": "2026-06-21T15:00:00",
  "mode": "vehiculo"
}
```

**Modos disponibles:** `transmilenio` | `sitp` | `vehiculo`

**Respuesta 201:**
```json
{
  "route_id": "uuid",
  "total_time_minutes": 15.8,
  "total_distance_km": 10.3,
  "cost": "$20.700",
  "mode": "vehiculo",
  "risk_segments": [
    {
      "from_station": "Calle 70A",
      "to_station": "Carrera 90B",
      "congestion_level": 0.42,
      "risk_label": "medium",
      "coordinates": [[4.65, -74.11], [4.66, -74.10]]
    }
  ],
  "overall_risk": "medium",
  "safety_score": 75,
  "explanation": "Ruta con congestión moderada...",
  "stations": ["Calle 70A", "Carrera 90B", "Avenida Calle 72"],
  "departure_time": "2026-06-21T15:00:00",
  "route_code": "",
  "navigation_steps": [
    {
      "instruction": "Inicia el recorrido en Calle 23",
      "street": "Calle 23",
      "distance_m": 121,
      "duration_s": 23,
      "maneuver": "depart"
    },
    {
      "instruction": "Gira a la izquierda en Carrera 68A",
      "street": "Carrera 68A",
      "distance_m": 345,
      "duration_s": 52,
      "maneuver": "left"
    }
  ]
}
```

### Notas sobre la predicción

- **Congestión:** Calculada por hora del día × día de la semana (L-V: 1.0, Sáb: 0.6, Dom: 0.4)
- **Costo vehículo:** ~$2,000/km (gasolina + desgaste + parqueadero)
- **Costo transporte público:** $3,550 (TM y SITP, 2026)
- **Vehículo:** Usa OSRM para routing real por calles con `navigation_steps`
- **TM/SITP:** Usa grafo Dijkstra + GNN para predicción de congestión

---

## Alternativas de ruta (Vehículo)

```http
POST /route-prediction/alternatives
```

Retorna hasta 3 rutas alternativas para modo vehículo (si OSRM las encuentra).

**Body:** Igual que `POST /route-prediction`

**Respuesta 201:**
```json
[
  { "route_id": "alt-1", "total_time_minutes": 15.8, "total_distance_km": 10.3, ... },
  { "route_id": "alt-2", "total_time_minutes": 18.2, "total_distance_km": 12.1, ... }
]
```

> Si OSRM no encuentra alternativas, retorna 1 sola ruta.

---

## Alertas operacionales

```http
GET /route-prediction/alerts
```

Scrapea alertas operacionales en tiempo real desde transmilenio.gov.co.

**Respuesta 200:**
```json
{
  "operating": 123,
  "delayed": 2,
  "suspended": 0,
  "alerts": [
    {
      "title": "TransMiZonal 2-3 San Antonio modifica su operación",
      "url": "https://www.transmilenio.gov.co/...",
      "route_codes": ["2-3"]
    }
  ]
}
```

---

## Seguridad de ruta SITP

```http
GET /route-prediction/safety?ruta={codigo}&hour={hora}
```

Calcula un puntaje de seguridad para una ruta SITP basado en congestión promedio de sus paraderos.

**Parámetros query:**

| Param | Tipo | Descripción |
|-------|------|-------------|
| `ruta` | string | Código de la ruta (ej: "674") |
| `hour` | int (0-23) | Hora del día |

**Respuesta 200:**
```json
{
  "ruta": "674",
  "hour": 8,
  "safety_score": 72,
  "nivel": "segura",
  "avg_congestion": 0.45,
  "paraderos_analizados": 20,
  "tramos_criticos": 0,
  "tramos_lentos": 3
}
```
