---
title: '04 — Modelado'
description: 'Arquitectura del modelo GAT, hiperparámetros y justificación.'
---

## Arquitectura del modelo

**Graph Attention Network (GAT)** — PyTorch Geometric 2.5

```
Input (8 features × 7,290 nodos)
    → GATConv(8→32, 4 heads) → ELU → Dropout(0.3)
    → GATConv(128→32, 1 head) → ELU
    → Linear(32→1) → Sigmoid
    → Output (congestion_level ∈ [0, 1])
```

### Features de entrada (por nodo)

| # | Feature | Descripción | Rango |
|---|---------|-------------|-------|
| 1 | `lat` | Latitud | 4.5 – 4.8 |
| 2 | `lon` | Longitud | -74.2 – -74.0 |
| 3 | `degree` | Grado (conexiones) | 1 – 13 |
| 4 | `betweenness` | Centralidad de intermediación | 0 – 0.05 |
| 5 | `closeness` | Centralidad de cercanía | 0 – 0.06 |
| 6 | `siniestralidad_score` | Índice de peligrosidad | 0 – 1 |
| 7 | `fallecidos_cercanos` | Fallecidos en accidentes cercanos | 0 – 5 |
| 8 | `is_tm` | 1 si es estación TM, 0 si SITP | 0 / 1 |

## Hiperparámetros

| Parámetro | Valor |
|-----------|-------|
| Hidden channels | 32 |
| Num layers | 2 |
| Attention heads (capa 1) | 4 |
| Attention heads (capa 2) | 1 |
| Dropout | 0.3 |
| Learning rate | 0.001 |
| Weight decay | 5e-4 |
| Epochs | 100 |
| Split | 80/20 (train/val) |
| Normalización | Z-score (mean/std por feature) |

## Resultados

| Modelo | MSE | RMSE | Notas |
|--------|-----|------|-------|
| Random Forest (baseline) | 0.0250 | 0.158 | Sin estructura de grafo |
| GCN (2 capas) | 0.0120 | 0.110 | Captura vecindario |
| **GAT (2 capas, 4 heads)** | **0.0071** | **0.084** | Atención diferenciada |

### Convergencia

```
Epoch   1 | Train MSE: 0.0190 | Val MSE: 0.0164
Epoch  20 | Train MSE: 0.0080 | Val MSE: 0.0078
Epoch  40 | Train MSE: 0.0075 | Val MSE: 0.0074
Epoch  60 | Train MSE: 0.0073 | Val MSE: 0.0073
Epoch 100 | Train MSE: 0.0072 | Val MSE: 0.0071
```

## Grafo de entrada

| Propiedad | Valor |
|-----------|-------|
| Nodos | 7,290 (componente principal) |
| Aristas | 11,165 (grafo simple, pesos por distancia) |
| Tipos de nodo | 153 estaciones TM + 7,137 paraderos SITP |
| Componentes | 1 (después de limpieza) |
| Grado promedio | 3.06 |
| Densidad | 0.000421 |

## Pipeline de entrenamiento

```bash
# 1. Limpiar grafo (MultiDiGraph → Graph simple, componente principal)
make clean-graph

# 2. Entrenar modelo
make train

# 3. Verificar
make test
```

## Justificación

- **GAT vs GCN:** GAT aprende pesos de atención por vecino, capturando que no todos los vecinos son igual de importantes para la propagación de congestión
- **4 heads:** Multi-head attention captura diferentes patrones de relación espacial
- **2 capas:** Información de vecinos a 2 saltos (suficiente para la densidad del grafo)
- **Sigmoid final:** Output acotado a [0, 1] para representar nivel de congestión
- **Grafo limpio:** Eliminar componentes aislados y aristas paralelas mejora la señal

## Modulación temporal

El modelo predice congestión **base** (estructural). En producción se modula por hora:

```python
congestion_final = min(1.0, congestion_base × time_factor[hora])
```

| Hora | Factor | Descripción |
|------|--------|-------------|
| 0-5 | 0.2-0.5 | Madrugada (baja) |
| 6-9 | 0.7-1.0 | Pico AM |
| 10-15 | 0.65-0.75 | Valle |
| 16-19 | 0.8-1.0 | Pico PM |
| 20-23 | 0.3-0.7 | Noche |
