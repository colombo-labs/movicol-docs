---
title: Agente IA
description: Endpoint del agente conversacional que consulta el grafo en lenguaje natural.
---

## Chat con el agente

```http
POST /agent/chat
Content-Type: application/json
```

Envía un mensaje al agente IA que puede consultar el grafo de transporte en lenguaje natural.

**Body:**

```json
{
  "message": "¿Cuál es la estación más congestionada ahora?",
  "sessionId": "abc-123"
}
```

**Respuesta 200:**

```json
{
  "data": {
    "response": "La estación más congestionada actualmente es Portal Norte con un nivel de 0.78 (alto). Las estaciones cercanas también presentan congestión moderada.",
    "sessionId": "abc-123",
    "sources": [
      { "stationId": "TM_001", "name": "Portal Norte", "congestion": 0.78 }
    ]
  }
}
```

---

## Capacidades del agente

El agente puede responder preguntas sobre:

- Estado actual de congestión en estaciones
- Rutas óptimas entre dos puntos
- Estaciones cercanas a una ubicación
- Estadísticas del grafo de transporte
- Predicciones de congestión futura

---

## Ejemplos de preguntas

```
"¿Cómo llego de Portal Norte a Portal Sur?"
"¿Qué estaciones están cerca de la calle 72?"
"¿Cuántas estaciones tiene el sistema?"
"¿Cuál es la mejor hora para viajar por la ruta B23?"
```
