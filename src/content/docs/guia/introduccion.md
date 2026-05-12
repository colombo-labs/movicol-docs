---
title: MoviCol — Movilidad Inteligente
description: Predicción de congestión para el transporte público de Bogotá usando Graph Neural Networks.
---

## ¿Qué es MoviCol?

**MoviCol** es una plataforma de predicción inteligente de movilidad urbana que usa **Graph Neural Networks (GNN)** para predecir la congestión en el sistema de transporte público de Bogotá (TransMilenio + SITP).

## El Problema

7 millones de bogotanos usan TransMilenio y SITP diariamente **sin saber si su estación estará congestionada**.

Los datos de movilidad están fragmentados entre múltiples entidades (Transmilenio S.A., Secretaría de Movilidad, RUNT, ANSV) y no existe una herramienta que los integre para tomar decisiones basadas en evidencia.

## La Solución

MoviCol construye un **grafo de la red de transporte** donde:
- **Nodos** = estaciones / paraderos (7,444)
- **Aristas** = rutas / conexiones (41,990)
- **Features** = demanda, siniestralidad, centralidad

Y usa un modelo **GAT (Graph Attention Network)** para predecir la congestión a 15, 30 y 60 minutos.

## Stack Técnico

| Componente | Tecnología |
|-----------|-----------|
| Frontend | React 19 + Vite + Hero UI + Leaflet |
| Backend | NestJS + TypeORM + PostGIS + Socket.io |
| AI | FastAPI + PyTorch Geometric + LangChain |
| Data | Python + pandas + NetworkX + PostGIS |
| Infra | Docker Compose + GitHub Actions |

## Concurso

**Datos al Ecosistema 2026: IA para Colombia** — MinTIC (datos.gov.co)

- **Organización:** Colombo-labs
- **Nivel:** Avanzado (GNN, LLMs, multi-agente, real-time)
- **Reto:** Transporte
