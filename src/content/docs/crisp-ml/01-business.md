---
title: '01 — Comprensión del Negocio'
description: 'Problema, objetivos y criterios de éxito del proyecto MoviCol.'
---

## Problema

Bogotá tiene uno de los peores sistemas de transporte público de Latinoamérica. 7 millones de bogotanos usan TransMilenio y SITP diariamente **sin saber si su estación estará congestionada**.

## Objetivos

1. **Predecir congestión** en estaciones y paraderos a 15, 30 y 60 minutos
2. **Detectar zonas de alta siniestralidad** cercanas a rutas de transporte
3. **Medir accesibilidad** e identificar zonas mal conectadas (inequidad)
4. **Democratizar el acceso** a la información mediante un agente conversacional

## Criterios de éxito

| Criterio | Métrica | Objetivo |
|----------|---------|----------|
| Predicción de congestión | RMSE | < 0.5 |
| Cobertura del grafo | % nodos en componente principal | > 95% |
| Siniestralidad | Nodos con score > 0 | > 30 |
| Accesibilidad | Closeness centrality calculada | 100% nodos |
| Agente | Respuestas correctas | > 80% |
| Latencia de predicción | Tiempo de respuesta | < 500ms |

## Concurso

- **Concurso:** Datos al Ecosistema 2026: IA para Colombia
- **Organizador:** MinTIC — datos.gov.co
- **Nivel:** Avanzado (GNN, LLMs, multi-agente, real-time)
