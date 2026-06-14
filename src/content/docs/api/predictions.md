---
title: Predicciones
description: Endpoints de predicción de congestión usando Graph Neural Networks.
---

## Predicción individual

```http
POST /predictions
Content-Type: application/json
```

Predice el nivel de congestión para una estación específica usando el modelo GAT (Graph Attention Network).

**Body:**

```json
{
  "stationId": "TM_001",
  "timestamp": "2026-05-11T18:00:00Z"
}
```

**Respuesta 200:**

```json
{
  "data": {
    "stationId": "TM_001",
    "stationName": "Portal Norte",
    "congestionLevel": 0.78,
    "category": "alto",
    "confidence": 0.92,
    "timestamp": "2026-05-11T18:00:00Z",
    "propagation": [
      { "stationId": "TM_002", "impact": 0.45 },
      { "stationId": "TM_003", "impact": 0.32 }
    ]
  }
}
```

---

## Predicción batch

```http
POST /predictions/batch
Content-Type: application/json
```

Predice la congestión para todas las estaciones del grafo.

**Body:**

```json
{
  "timestamp": "2026-05-11T18:00:00Z"
}
```

**Respuesta 200:**

```json
{
  "data": [
    {
      "stationId": "TM_001",
      "congestionLevel": 0.78,
      "category": "alto"
    },
    {
      "stationId": "TM_002",
      "congestionLevel": 0.34,
      "category": "bajo"
    }
  ],
  "meta": { "total": 7444, "timestamp": "2026-05-11T18:00:00Z" }
}
```

---

## Categorías de congestión

| Nivel | Rango | Color |
|-------|-------|-------|
| Bajo | 0.0 – 0.3 | 🟢 Verde |
| Medio | 0.3 – 0.6 | 🟡 Amarillo |
| Alto | 0.6 – 0.8 | 🟠 Naranja |
| Crítico | 0.8 – 1.0 | 🔴 Rojo |

---

## Predicción de Ruta

```http
POST /api/v1/predict-route
Content-Type: application/json
```

Predice la ruta óptima entre dos puntos con análisis de congestión por segmento usando Dijkstra + modelo GNN.

**Body:**

```json
{
  "origin": {"lat": 4.7330, "lng": -74.0500},
  "destination": {"lat": 4.6250, "lng": -74.0700},
  "departure_time": "2026-05-20T08:00:00Z"
}
```

**Respuesta 200:**

```json
{
  "route_id": "uuid",
  "total_time_minutes": 32.7,
  "total_distance_km": 12.5,
  "overall_risk": "high",
  "stations": ["Cardio Infantil", "Calle 146", "...", "Calle 26"],
  "risk_segments": [
    {
      "from_station": "Calle 127",
      "to_station": "Pepe Sierra",
      "congestion_level": 0.84,
      "risk_label": "high",
      "coordinates": [[4.701, -74.053], [4.692, -74.054]]
    }
  ],
  "explanation": "La ruta presenta congestión alta...",
  "departure_time": "2026-05-20T08:00:00Z"
}
```

### Colores de polilínea (Frontend)

| `risk_label` | `congestion_level` | Color |
|---|---|---|
| `low` | 0.0 – 0.3 | 🟢 `#22c55e` |
| `medium` | 0.3 – 0.6 | 🟡 `#eab308` |
| `high` | 0.6 – 0.85 | 🟠 `#f97316` |
| `critical` | 0.85 – 1.0 | 🔴 `#ef4444` |
