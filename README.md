# 📚 MoviCol Docs

Documentación oficial del proyecto MoviCol — Astro Starlight.

## Stack

- **Astro** 4.5
- **@astrojs/starlight** 0.21 (template de documentación)
- **Deploy:** GitHub Pages (automático con Actions)

## Quick Start

```bash
npm install
npm run dev     # http://localhost:4321
```

## Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Build estático (dist/) |
| `npm run preview` | Preview del build |

## Estructura

```
src/content/docs/
├── index.mdx                # Landing (hero + cards)
├── guia/
│   ├── introduccion.md      # Qué es MoviCol
│   └── quick-start.md       # Cómo levantar todo
├── arquitectura/
│   ├── overview.md          # Diagrama + flujo
│   └── decisiones.md        # ADRs
├── crisp-ml/
│   ├── 01-business.md       # Problema + objetivos
│   ├── 02-data.md           # Fuentes + grafo
│   ├── 03-preparation.md    # ETL + features
│   ├── 04-modeling.md       # GAT + hiperparámetros
│   ├── 05-evaluation.md     # Resultados
│   └── 06-deployment.md     # Docker + CI/CD
└── api/
    └── endpoints.md         # REST + WebSocket
```

## Deploy

Push a `main` → GitHub Actions → Build → GitHub Pages (automático).
