---
title: Rutas y Grafo
description: Endpoints para consultar rutas TM/SITP, estaciones, paraderos y datos del grafo.
---

## Estadísticas del grafo

```http
GET /graph/stats
```

**Respuesta 200:**
```json
{ "nodes": 7290, "edges": 11165 }
```

---

## TransMilenio

### Troncales (GeoJSON)

```http
GET /graph/tm/troncales
```

Retorna las 20 troncales TM como GeoJSON FeatureCollection con geometrías LineString.

### Estaciones (GeoJSON)

```http
GET /graph/tm/estaciones
```

Retorna las 332 estaciones TM como GeoJSON FeatureCollection con coordenadas y propiedades (`nom_est`, `id_trazado`, etc.).

### Rutas TM

```http
GET /graph/tm/rutas
```

**Respuesta 200:**
```json
{
  "rutas": [
    {
      "codigo": "1-1",
      "nombre": "1 U",
      "origen": "UNIVERSIDADES – CITYU",
      "destino": "PORTAL EL DORADO",
      "tipo_bus": "BIARTICULADO",
      "tipo_ruta": "TRONCAL",
      "horario_lv": "04:30 - 23:00",
      "horario_sab": "04:30 - 23:00",
      "horario_dom": "04:30 - 22:00",
      "estado": "OPERATIVA",
      "coords": [[4.60, -74.06], ...],
      "estaciones": [{"nombre": "...", "lat": 4.6, "lon": -74.0}]
    }
  ]
}
```

---

## SITP

### Rutas SITP

```http
GET /graph/sitp/rutas
```

**Respuesta 200:**
```json
{
  "total": 689,
  "rutas": [
    {
      "ruta": "674",
      "cenefa": "297A13",
      "paraderos": [
        { "lat": 4.58, "lon": -74.07, "nombre": "IED Aulas Colombianas", "orden": "PBO001" }
      ]
    }
  ]
}
```

> `cenefa` es el color hexadecimal oficial de la ruta SITP.

### Paraderos (GeoJSON)

```http
GET /graph/sitp/paraderos
```

Retorna ~2000 paraderos SITP como GeoJSON FeatureCollection.

---

## Rutas cercanas

```http
GET /graph/rutas-cercanas?lat={lat}&lng={lng}&radius={metros}
```

Retorna rutas SITP con paraderos dentro del radio especificado, ordenadas por distancia.

**Parámetros query:**

| Param | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `lat` | float | requerido | Latitud del usuario |
| `lng` | float | requerido | Longitud del usuario |
| `radius` | int | 500 | Radio en metros |

**Respuesta 200:**
```json
{
  "total": 30,
  "radio": 500,
  "rutas": [
    {
      "ruta": "674",
      "cenefa": "297A13",
      "paraderosCercanos": [
        { "nombre": "IED Florida Blanca", "distancia": 77 }
      ],
      "distanciaMinima": 77
    }
  ]
}
```

---

## Heatmap de congestión

```http
GET /graph/heatmap
```

Retorna las estaciones del grafo con nivel de congestión calculado por hora + día de la semana.

---

## Accesibilidad

```http
GET /graph/accesibilidad
```

**Respuesta 200:**
```json
{
  "totalParaderos": 7290,
  "totalRutas": 689,
  "rutasTroncales": 125,
  "rutasZonales": 564,
  "totalPuntos": 2000
}
```
