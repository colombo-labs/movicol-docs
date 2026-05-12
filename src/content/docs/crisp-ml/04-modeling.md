---
title: '04 — Modelado'
description: 'Arquitectura del modelo GAT, hiperparámetros y justificación.'
---

## Arquitectura del modelo

**Graph Attention Network (GAT)** — PyTorch Geometric

```
Input (12 features)
    → GATConv(12→64, 4 heads) → ELU → Dropout(0.3)
    → GATConv(256→64, 4 heads) → ELU → Dropout(0.3)
    → GATConv(256→32, 1 head) → ELU
    → Linear(32→1) → Sigmoid
    → Output (congestion_level ∈ [0, 1])
```

## Hiperparámetros

| Parámetro | Valor |
|-----------|-------|
| Hidden channels | 64 |
| Num layers | 3 |
| Attention heads (capas 1-2) | 4 |
| Attention heads (capa final) | 1 |
| Dropout | 0.3 |
| Learning rate | 0.001 |
| Weight decay | 5e-4 |
| Epochs | 200 |
| Early stopping patience | 20 |
| Split | 70/15/15 (train/val/test) |

## Baseline comparativo

| Modelo | MSE | RMSE |
|--------|-----|------|
| Random Forest (baseline) | 0.25 | 0.50 |
| GCN (2 capas) | 0.21 | 0.46 |
| **GAT (3 capas, 4 heads)** | **0.18** | **0.42** |

## Justificación

- **GAT vs GCN:** GAT aprende pesos de atención por vecino, capturando que no todos los vecinos son igual de importantes para la propagación de congestión
- **4 heads:** Multi-head attention captura diferentes patrones de relación
- **3 capas:** Permite capturar información de vecinos a 3 saltos
- **Sigmoid final:** Output acotado a [0, 1] para representar nivel de congestión
