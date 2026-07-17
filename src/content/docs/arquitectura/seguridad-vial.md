---
title: Seguridad Vial
description: Sistema de scoring de seguridad basado en siniestralidad real de Bogotá
---

## Resumen

MoviCol integra datos reales de siniestralidad vial de Bogotá (196,152 registros) para calcular un **safety_score** por ruta y zona, permitiendo al usuario tomar decisiones informadas sobre seguridad.

## Fuentes de datos

| Dataset | Registros | Fuente |
|---------|-----------|--------|
| Siniestros viales consolidados | 196,152 | datosabiertos.bogota.gov.co |
| Mortalidad accidentes tránsito | 12,387 | datosabiertos.bogota.gov.co |

## Pipeline de procesamiento

```
siniestros_viales.xlsx (47MB)
    ↓ process_siniestralidad.py
    ↓ Agrupa por CODIGO_LOCALIDAD
    ↓ Mapea a 20 localidades de Bogotá
    ↓ Cruza con 2,000 paraderos SITP (por localidad)
    ↓
siniestralidad_georef.json (351KB)
    ├── por_localidad: score + nivel + fatales + por_hora
    └── heatmap_points: 1,998 puntos con lat/lon/intensity
```

## Safety Score

El `safety_score` (0-100) se calcula en la predicción de ruta:

```
safety_base = 100 - (avg_congestion × 60) - (tramos_criticos × 10) - (tramos_lentos × 5)
safety_score = clamp(safety_base, 10, 100)
```

### Niveles

| Score | Nivel | Color |
|-------|-------|-------|
| 70-100 | Segura | 🟢 Verde |
| 40-69 | Precaución | 🟡 Amarillo |
| 0-39 | Peligrosa | 🔴 Rojo |

## Endpoints

### GET /graph/siniestralidad
Resumen general con totales por localidad.

### GET /graph/siniestralidad/heatmap
1,998 puntos georreferenciados para visualización en mapa.

### GET /graph/siniestralidad/localidad/:nombre
Detalle de una localidad: siniestros por hora, tipos de accidente, fatales.

### GET /api/v1/predict-route/safety?ruta=7&hour=17
Safety score de una ruta SITP específica para una hora dada.

## Visualización (Frontend)

- **Botón ⚠️ flotante**: Toggle de heatmap de siniestros en el mapa
- **Círculos coloreados**: Rojo (alta intensidad), Amarillo (media), Verde (baja)
- **Badge en resultados**: Muestra `safety_score%` con color según nivel
- **Tooltip**: Al pasar sobre un punto muestra paradero + localidad + intensidad

## Localidades más peligrosas

| Localidad | Score | Siniestros | Fatales |
|-----------|-------|-----------|---------|
| Santa Fe | 886.8 | 5,648 | 85 |
| Chapinero | 561.0 | 11,502 | 86 |
| Los Mártires | 381.3 | 6,622 | 101 |
| Kennedy | 186.1 | 22,282 | 417 |

## Mejoras futuras

- Geocodificación directa de `DIRECCION` del xlsx para mayor precisión
- Integrar datos de siniestralidad como feature del modelo GNN
- Score por tramo específico (no solo promedio de localidad)
- Datos en tiempo real de cámaras/sensores de la SDM
