---
title: '02 — Comprensión de los Datos'
description: 'Fuentes de datos, calidad y exploración del grafo.'
---

## Fuentes de datos

| Fuente | Registros | Formato | Tipo |
|--------|-----------|---------|------|
| GIS Transmilenio | 153 estaciones, 126 rutas | GeoJSON | 🏛️ Gubernamental |
| ArcGIS Hub SDM | 7,694 paraderos, 154 nodos | GeoJSON | 🏛️ Gubernamental |
| datos.gov.co | 1,490 pasajeros, 316 siniestros, 50K accidentes | CSV | 🏛️ Gubernamental |
| datosabiertos.bogota.gov.co | 196K siniestros consolidados | XLSX | 🏛️ Gubernamental |
| OpenStreetMap | 100K+ segmentos viales | JSON | 🌐 Comunitaria |

## Grafo resultante

| Métrica | Valor |
|---------|-------|
| Nodos | 7,444 |
| Aristas | 41,990 |
| Componente principal | 97.9% |
| Grado promedio | 11.28 |
| Nodo más central | Br. San Benito (betweenness 0.26) |

## Calidad

- ✅ 100% de nodos con coordenadas geográficas
- ⚠️ Demanda limitada a período pandemia (2020) — mitigado con recargas 2023-2026
- ⚠️ Siniestralidad sin geolocalización precisa por evento — mitigado con consolidado 196K registros
