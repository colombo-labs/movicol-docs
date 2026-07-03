---
title: Datos Abiertos — ArcGIS REST API
description: Datasets públicos consumidos desde datos.gov.co / SDM Bogotá vía ArcGIS FeatureServer.
---

## Fuente de Datos

MoviCol consume datos en tiempo real desde las APIs públicas de la **Secretaría Distrital de Movilidad de Bogotá** a través de ArcGIS FeatureServer.

**Base URL:**
```
https://services2.arcgis.com/NEwhEo9GGSHXcRXV/arcgis/rest/services/{SERVICE}/FeatureServer/{LAYER}/query
```

## Datasets Consumidos

| Dataset | Servicio ArcGIS | Layer | Records | Uso |
|---------|----------------|-------|---------|-----|
| Paraderos SITP | `Paraderos_SITP_Bogotá_D_C` | 0 | 7,694 | Mapa de paraderos, nearby |
| Paraderos × Ruta | `Paraderos_Ruta` | 0 | 41,038 | Relación paradero↔ruta SITP |
| Rutas Zonales SITP | `Rutas_zonales_SITP` | 0 | 700 | Clasificación y colores de ruta |
| Estaciones TM | `Estaciones_y_trazados_de_Transmilenio_WFL1` | 0 | 149 | Estaciones con troncal, vagones |
| Rutas Troncales TM | `Estaciones_y_trazados_de_Transmilenio_WFL1` | 2 | 155 | Rutas con horarios, tipo bus, shape |
| Trazados Troncales | `Trazados_Troncales_de_TRANSMILENIO` | 0 | 20 | Líneas troncales en mapa |
| Rutas SITP (shapes) | `Rutas_SITP` | 0 | 700 | LineStrings de rutas |
| Carril Preferencial | `Carril_Preferencial_SITP_Bogota_D_C` | 0 | 8 | Carriles exclusivos SITP |
| Siniestros 2024 | `Siniestros_graves_2024` | 0 | 12,908 | Heatmap de accidentalidad |
| Siniestros × Localidad | `Siniestros_Fallecidos_por_Localidad` | 0 | 20 | Estadísticas por localidad |

## Estrategia de Cache

```
Request → Redis (hit?) → sí → respuesta inmediata (<1ms)
                   └─ no → ArcGIS REST API (2-5s) → Redis SET (TTL 24h) → respuesta
```

- **TTL:** 86,400 segundos (24 horas)
- **Keys:** `arcgis:sitp:paraderos`, `arcgis:tm:rutas`, `arcgis:siniestros:2024`, etc.
- Primera request del día es lenta (~3-5s por paginación ArcGIS), las siguientes son instantáneas.

## Colores SITP

Los colores de las rutas SITP se obtienen del campo `desc_tipo_` de `Rutas_zonales_SITP`:

| Tipo | Color | Hex |
|------|-------|-----|
| URBANA | 🔵 Azul | `#1565C0` |
| ALIMENTADORA | 🟢 Verde | `#2E7D32` |
| COMPLEMENTARIA | 🟠 Naranja | `#E65100` |
| ESPECIAL | 🟣 Morado | `#6A1B9A` |

## Tipos de Bus TM

Del campo `tipo_bus_r` en Layer 2 de `Estaciones_y_trazados_de_Transmilenio_WFL1`:

| Código | Tipo | Color |
|--------|------|-------|
| 1 | BIARTICULADO | 🔴 `#E3342F` |
| 2 | ARTICULADO | 🟠 `#F6993F` |
| 3 | DUAL | 🟢 `#38A169` |
| 4 | PADRON | 🔵 `#3B82F6` |

## Ejemplo de Query

```bash
curl "https://services2.arcgis.com/NEwhEo9GGSHXcRXV/arcgis/rest/services/Paraderos_SITP_Bogot%C3%A1_D_C/FeatureServer/0/query?where=1=1&outFields=*&f=geojson&resultRecordCount=10"
```

## Registro en datos.gov.co

- Portal: https://www.datos.gov.co
- Categoría: Transporte
- Entidad: Secretaría Distrital de Movilidad — Bogotá D.C.
- Licencia: Datos abiertos (uso libre con atribución)
