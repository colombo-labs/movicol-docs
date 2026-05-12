---
title: Decisiones de Arquitectura (ADR)
description: Architecture Decision Records del proyecto MoviCol.
---

## ADR-001: Microservicios separados

**Contexto:** El proyecto tiene 3 dominios distintos (datos, IA, web).

**Decisión:** Separar en repos independientes con Docker.

**Razón:** Permite desarrollo paralelo, CI/CD independiente, y escalabilidad.

## ADR-002: NestJS como gateway

**Contexto:** El frontend necesita un punto de entrada único.

**Decisión:** NestJS como API gateway que proxea al servicio de IA.

**Razón:** Maneja auth, validación, y datos espaciales. El frontend solo habla con un servicio.

## ADR-003: WebSocket híbrido

**Contexto:** Necesitamos predicciones en tiempo real y chat streaming.

**Decisión:** HTTP para CRUD + WebSocket para real-time, usando el mismo service.

**Razón:** Zero duplicación de lógica. El gateway WS reutiliza el service del controller.

## ADR-004: PostGIS compartido

**Contexto:** Tanto el backend como el AI service necesitan datos geoespaciales.

**Decisión:** Una sola instancia de PostGIS. Backend gestiona schema, AI solo lee.

**Razón:** Evita sincronización entre DBs. Fuente de verdad única.

## ADR-005: Hero UI + Tailwind

**Contexto:** Necesitamos UI moderna rápido.

**Decisión:** Hero UI (componentes) + Tailwind (utilidades) + Leaflet (mapas).

**Razón:** Desarrollo rápido, dark mode built-in, accesible.

## ADR-006: Astro Starlight para docs

**Contexto:** La documentación debe ser profesional y fácil de mantener.

**Decisión:** Astro Starlight como framework de documentación.

**Razón:** Estático, rápido, markdown nativo, sidebar automática, deploy fácil.
