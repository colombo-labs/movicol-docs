---
title: Estaciones
description: Endpoints para consultar y gestionar estaciones y paraderos.
---

## Listar estaciones

```http
GET /stations?page=1&limit=20
```

Retorna la lista paginada de estaciones del grafo de transporte.

**Parámetros query:**

| Param | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `page` | number | 1 | Página actual |
| `limit` | number | 20 | Resultados por página |

**Respuesta 200:**

```json
{
  "data": [
    {
      "id": "TM_001",
      "name": "Portal Norte",
      "type": "transmilenio",
      "lat": 4.7586,
      "lng": -74.0453
    }
  ],
  "meta": { "total": 7444, "page": 1, "limit": 20 }
}
```

---

## Obtener estación por ID

```http
GET /stations/:id
```

**Respuesta 200:**

```json
{
  "data": {
    "id": "TM_001",
    "name": "Portal Norte",
    "type": "transmilenio",
    "lat": 4.7586,
    "lng": -74.0453,
    "connections": ["TM_002", "TM_003"]
  }
}
```

---

## Crear estación

```http
POST /stations
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Nueva Estación",
  "type": "sitp",
  "lat": 4.6500,
  "lng": -74.1000
}
```

**Respuesta 201:**

```json
{
  "data": {
    "id": "SITP_500",
    "name": "Nueva Estación",
    "type": "sitp",
    "lat": 4.6500,
    "lng": -74.1000
  }
}
```
