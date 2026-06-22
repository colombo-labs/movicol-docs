---
title: Demo para Jurados
description: Flujo guiado para presentación del concurso MinTIC
---

## 🎬 Guión de Demo — MoviCol (3-5 minutos)

### Setup previo
- Abrir http://localhost:3000 en Chrome (responsive mobile o pantalla completa)
- Dark mode activado
- Panel cerrado, mapa centrado en Bogotá

---

### Acto 1: El problema (30s)

> "En Bogotá, 8 millones de personas se mueven diariamente sin saber cuál es la mejor ruta, si hay congestión, o si la zona es segura. MoviCol resuelve esto con IA."

### Acto 2: Planificar viaje (60s)

1. Click en ícono **"Viaje"** del sidebar
2. Click en el mapa: punto A = **Centro (Av. Jiménez)** → aparece marker verde "A"
3. Click en el mapa: punto B = **CAN / Calle 26** → aparece marker rojo "B"
4. Se activa automáticamente "Calculando mejor ruta..."
5. Mostrar resultado:
   - ⏱️ **14 min** | 📏 **6 km** | 💰 **$2,650**
   - 🛡️ **Safety score: 67%** (badge amarillo)
   - Polyline coloreada en el mapa (verde=fluido, amarillo=moderado)
   - Estaciones intermedias listadas

> "Nuestro modelo GNN predice la congestión en tiempo real basándose en día, hora y demanda histórica."

### Acto 3: Seguridad vial (45s)

6. Click en botón **⚠️** (esquina inferior derecha)
7. Se ilumina el heatmap de siniestralidad → zonas rojas visibles
8. Señalar zonas críticas:
   - Santa Fe, Los Mártires = alta intensidad
   - El badge de seguridad en la ruta refleja esto

> "Integramos 196 mil registros reales de accidentes de Bogotá para alertar sobre zonas peligrosas."

### Acto 4: Hora importa (30s)

9. Cambiar hora a "Programar" → seleccionar **7:00 AM** (lunes)
10. Click "Recalcular" → congestión sube, safety baja

> "La predicción cambia según hora y día. Lunes 7am = hora pico, la congestión es 40% mayor."

### Acto 5: Rutas SITP (45s)

11. Click en ícono **"Rutas"** del sidebar
12. Tab SITP → se listan las 689 rutas reales
13. Seleccionar una ruta → se dibuja en el mapa con paraderos numerados
14. Mostrar tooltip de un paradero

> "Tenemos las 689 rutas SITP con sus paraderos georreferenciados."

### Acto 6: Métricas del grafo (30s)

15. Click en **"Datos"** → muestra stats del grafo (7,290 nodos, 11,165 edges)
16. Heatmap de congestión por estación

> "El grafo de movilidad tiene más de 7 mil estaciones interconectadas, analizado con Graph Attention Networks."

### Cierre (15s)

> "MoviCol: movilidad inteligente, segura y accesible para Bogotá. Datos abiertos + IA = mejores decisiones."

---

## 📍 Coordenadas predefinidas para demo

| Lugar | Lat | Lng |
|-------|-----|-----|
| Centro (Av Jiménez) | 4.6010 | -74.0721 |
| CAN / Calle 26 | 4.6469 | -74.0991 |
| Kennedy (Terminal) | 4.6248 | -74.1547 |
| Suba (Portal) | 4.7412 | -74.0847 |
| Usme (sur) | 4.4821 | -74.1228 |

## 🔑 Puntos clave para jurados

- ✅ **Datos reales**: 196K siniestros + 689 rutas + recargas TM 2026
- ✅ **IA funcional**: GNN (GAT) entrenado con grafo de 15K nodos
- ✅ **Full-stack**: React + NestJS + FastAPI + Leaflet
- ✅ **Tiempo real**: Predicción cambia por hora/día/congestión
- ✅ **Impacto social**: Seguridad vial + movilidad sostenible
- ✅ **PWA**: Instalable en celular
