---
title: '05 — Evaluación'
description: 'Resultados del modelo GAT y cumplimiento de criterios de éxito.'
---

## Resultados del modelo (v2 — re-entrenado)

| Métrica | Train | Validation | Mejora vs v1 |
|---------|-------|------------|--------------|
| MSE | 0.0072 | **0.0071** | 25× mejor |
| RMSE | 0.0849 | **0.0841** | 5× mejor |

Entrenamiento: 100 epochs, sin early stopping (convergencia estable).

### Comparación de versiones

| Versión | MSE | RMSE | Grafo | Notas |
|---------|-----|------|-------|-------|
| v1 (original) | 0.1809 | 0.4253 | Raw MultiDiGraph | Sin limpieza |
| **v2 (actual)** | **0.0071** | **0.0841** | Limpio (componente principal) | Con centralidad |

### Distribución de predicciones

```
Rango predicciones: [0.378, 0.876]
Media: 0.538
Desviación estándar: 0.09

Distribución por riesgo (hora pico 8am):
  Critical: 4 estaciones (0.05%)
  High: 1,532 estaciones (21%)
  Medium: 5,754 estaciones (79%)
  Low: 0 estaciones (0%)
```

## Cumplimiento de criterios

| Criterio | Objetivo | Resultado | ✓ |
|----------|----------|-----------|---|
| RMSE predicción | < 0.5 | **0.084** | ✅ |
| Cobertura grafo | > 95% | 97.9% (7,290/7,444) | ✅ |
| Siniestralidad | > 30 nodos | 316 sectores | ✅ |
| Accesibilidad | 100% closeness | 100% (7,290 nodos) | ✅ |
| Latencia inferencia | < 500ms | ~150ms (7,290 nodos) | ✅ |
| Routing funcional | Dijkstra E2E | 42 estaciones en ruta real | ✅ |
| Agente conversacional | Responde preguntas | Rule-based + LLM fallback | ✅ |

## Hallazgos clave

- **Nodo más congestionado (GNN):** Estación San Victorino — zona centro, alta conectividad
- **Hub más conectado:** Br. Provivienda Occidental (degree 13)
- **Zona más peligrosa:** Fontibón (KR 123) — 13 fallecidos, score 2.99
- **Atención del modelo:** Estaciones TM reciben mayor peso que paraderos SITP
- **Efecto de limpieza:** Eliminar 154 nodos aislados y simplificar aristas paralelas mejoró MSE 25×

## Validación end-to-end

| Test | Resultado |
|------|-----------|
| Predicción estación (8am peak) | Portal Suba: 50% (medium) ✅ |
| Predicción estación (3am off-peak) | Portal Suba: 10% (low) ✅ |
| Ruta Portal Suba → Centro | 42 estaciones, 17.7km, 46.8min ✅ |
| Heatmap completo | 7,290 predicciones en <200ms ✅ |
| Agente: "Info Calle 72" | Responde con coordenadas y vecinos ✅ |
| Agente: "Tráfico 8am" | Responde 55% congestión ✅ |

## Tests automatizados

```
18 tests passing (pytest)
- 4 tests de grafo (estructura, atributos)
- 4 tests de servicio (predicción, hora, dirección)
- 2 tests de API (endpoint, validación)
- 7 tests de agente (estación, congestión, lista, default, API)
- 1 test de health
```
