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
