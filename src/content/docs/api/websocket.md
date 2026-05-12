---
title: WebSocket
description: Eventos en tiempo real para predicciones y chat.
---

## Conexión

```
ws://localhost:3001
```

MoviCol usa Socket.IO para comunicación en tiempo real. Los clientes deben conectarse usando la librería `socket.io-client`.

---

## Namespace: `/predictions`

Canal de predicciones en tiempo real.

### Eventos del cliente → servidor

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `subscribe` | `{ stationId: string }` | Suscribirse a updates de una estación |
| `unsubscribe` | `{ stationId: string }` | Cancelar suscripción |

### Eventos del servidor → cliente

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `update` | `{ stationId, congestionLevel, category, timestamp }` | Actualización de predicción |

### Ejemplo

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001/predictions');

socket.emit('subscribe', { stationId: 'TM_001' });

socket.on('update', (data) => {
  console.log(`${data.stationId}: ${data.congestionLevel}`);
});
```

---

## Namespace: `/chat`

Canal de chat con streaming de respuestas del agente IA.

### Eventos del cliente → servidor

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `message` | `{ text: string, sessionId: string }` | Enviar mensaje al agente |

### Eventos del servidor → cliente

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `stream:start` | `{ sessionId }` | Inicio de respuesta |
| `stream:token` | `{ token: string }` | Token parcial de la respuesta |
| `stream:end` | `{ sessionId }` | Fin de respuesta |

### Ejemplo

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001/chat');

socket.emit('message', {
  text: '¿Cómo está el tráfico en Portal Norte?',
  sessionId: 'abc-123'
});

socket.on('stream:token', ({ token }) => {
  process.stdout.write(token);
});

socket.on('stream:end', () => {
  console.log('\n--- Respuesta completa ---');
});
```
