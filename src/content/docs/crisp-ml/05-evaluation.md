---
title: '05 — Evaluación'
description: 'Resultados del modelo GAT y cumplimiento de criterios de éxito.'
---

## Resultados del modelo

| Métrica | Train | Validation | Test |
|---------|-------|------------|------|
| MSE | 0.1523 | 0.1701 | **0.1809** |
| MAE | 0.2891 | 0.3142 | 0.3355 |
| RMSE | 0.3903 | 0.4124 | **0.4253** |

Early stopping: Epoch 163/200.

## Cumplimiento de criterios

| Criterio | Objetivo | Resultado | ✓ |
|----------|----------|-----------|---|
| RMSE predicción | < 0.5 | 0.4253 | ✅ |
| Cobertura grafo | > 95% | 97.9% | ✅ |
| Siniestralidad | > 30 nodos | 316 sectores | ✅ |
| Accesibilidad | 100% closeness | 100% | ✅ |
| Latencia | < 500ms | ~200ms | ✅ |

## Hallazgos clave

- **Nodo más central:** Br. San Benito (Ciudad Bolívar) — cuello de botella
- **Zona más peligrosa:** Fontibón (KR 123) — 13 fallecidos, score 2.99
- **Atención del modelo:** Estaciones TM reciben mayor peso que paraderos SITP
