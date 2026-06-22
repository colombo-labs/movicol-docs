---
title: Estaciones
description: Endpoints para consultar estaciones y paraderos del sistema.
---

## Listar estaciones del grafo

```http
GET /graph/stations?limit=100&offset=0
```

Retorna estaciones del grafo de movilidad (SITP + TM).

**Parámetros query:**

| Param | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `limit` | int | 100 | Máximo de resultados |
| `offset` | int | 0 | Offset para paginación |

**Respuesta 200:**
```json
[
  {
    "id": "P_CAN-TM",
    "name": "P_CAN-TM",
    "lat": 4.6469,
    "lon": -74.0990,
    "route": "",
    "degree": 2,
    "betweenness": 0
  }
]
```

---

## Estaciones TM (GeoJSON)

```http
GET /graph/tm/estaciones
```

Retorna las 332 estaciones de TransMilenio con propiedades completas.

**Respuesta 200:** GeoJSON FeatureCollection con propiedades:
- `nom_est`: Nombre de la estación (ej: "AV. Chile")
- `id_trazado`: ID de la troncal (ej: "TZ008")
- `num_vag`: Número de vagones
- `cap_biart`: Capacidad biarticulados
- `esta_oper`: Estado operativo (1=activa)

---

## Paraderos SITP (GeoJSON)

```http
GET /graph/sitp/paraderos
```

Retorna ~2000 paraderos del SITP Zonal como GeoJSON FeatureCollection.

---

## Búsqueda de estaciones (Frontend)

El hook `useStationSearch` busca estaciones por nombre tanto en TM como en SITP:

```typescript
const { stations, isLoading, query, setQuery } = useStationSearch();
// setQuery("Portal") → stations = [{id, name: "TM Portal Norte", lat, lon}]
```

Cachea los datos en memoria tras la primera carga (~2300 estaciones).
