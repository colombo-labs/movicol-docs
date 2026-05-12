---
title: Quick Start
description: Cómo levantar todo el proyecto MoviCol en tu máquina local.
---

## Requisitos

- Docker + Docker Compose
- Node.js 20+
- Python 3.11+

## Opción 1: Todo junto (demo)

```bash
git clone https://github.com/Colombo-labs/movicol-infra
cd movicol-infra
cp .env.example .env  # Agregar OPENAI_API_KEY
docker compose up -d
# Abrir http://localhost:3000
```

## Opción 2: Desarrollo (servicio por servicio)

### 1. Data (ETL)
```bash
cd movicol-data
make install
docker compose -f docker-compose.dev.yml up -d  # PostGIS
make download   # Descarga datos de datos.gov.co
make process    # Construye el grafo
make load       # Carga a PostGIS
```

### 2. AI Service
```bash
cd movicol-ai
make install
make dev        # FastAPI en http://localhost:8000
```

### 3. Backend
```bash
cd movicol-backend
npm install
npm run dev     # NestJS en http://localhost:3001
```

### 4. Frontend
```bash
cd movicol-frontend
npm install --legacy-peer-deps
npm run dev     # React en http://localhost:3000
```

## Puertos

| Servicio | Puerto |
|----------|--------|
| Frontend | 3000 |
| Backend | 3001 |
| AI | 8000 |
| PostGIS | 5432 |
