---
title: Rutas
description: Endpoints para consultar rutas del sistema de transporte.
---

## Listar rutas

```http
GET /routes?page=1&limit=20
```

Retorna la lista paginada de rutas disponibles.

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
      "id": "B23",
      "name": "Ruta B23",
      "type": "transmilenio",
      "stations": ["TM_001", "TM_002", "TM_003"]
    }
  ],
  "meta": { "total": 50, "page": 1, "limit": 20 }
}
```

---

## Obtener ruta por ID

```http
GET /routes/:id
```

**Respuesta 200:**

```json
{
  "data": {
    "id": "B23",
    "name": "Ruta B23",
    "type": "transmilenio",
    "stations": ["TM_001", "TM_002", "TM_003"],
    "schedule": {
      "weekday": { "start": "04:30", "end": "23:00" },
      "weekend": { "start": "05:00", "end": "22:00" }
    }
  }
}
```

---

## Rutas por estación

```http
GET /routes/station/:id
```

Retorna todas las rutas que pasan por una estación específica.

**Respuesta 200:**

```json
{
  "data": [
    { "id": "B23", "name": "Ruta B23", "type": "transmilenio" },
    { "id": "J24", "name": "Ruta J24", "type": "transmilenio" }
  ]
}
```
