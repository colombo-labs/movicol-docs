---
title: Guía de Contribución
description: Convenciones de ramas, commits, PRs y calidad de código para el proyecto MoviCol.
---

## Ramas

| Tipo | Formato | Ejemplo |
|------|---------|---------|
| Feature | `DOM-XXXX` | `DOM-0012` |
| Bugfix | `bugfix/DOM-XXXX` | `bugfix/DOM-0005` |
| Hotfix | `hotfix/DOM-XXXX` | `hotfix/DOM-0099` |

- Siempre crear desde `develop` actualizado.
- `main` es la rama de producción — solo se mergea desde `develop`.

## Commits

Formato: `emoji DOM-XXXX: Descripción en inglés`

| Emoji | Uso |
|-------|-----|
| ✨ | Nueva feature |
| 🐛 | Bugfix |
| 🔖 | Release/versión |
| ✅ | Tests |
| 🚨 | Linters/formatters |
| 🔒️ | Seguridad |
| ♻️ | Refactor |
| 📝 | Documentación |
| 🔧 | Configuración |
| ⚡ | Performance |

## Pull Requests

### Reglas

1. **Un PR = un tipo de cambio.** No mezclar features con refactors.
2. **Base branch:** siempre `develop` (excepto hotfixes → `main`).
3. **Título:** conciso, < 70 caracteres. Ej: `✨ DOM-0012: Add real-time congestion overlay`
4. **Descripción:** llenar la checklist completa (se carga automáticamente).
5. **Review:** al menos 1 aprobación antes de merge.
6. **CI verde:** todos los checks deben pasar.

### Checklist Requerida

Al crear un PR, se carga automáticamente el template con:

- [ ] Agregué pruebas para los cambios (aplica para fixes/features)
- [ ] Revisé y actualicé la documentación relacionada
- [ ] Compilé localmente antes de subir
- [ ] Ejecuté los linters de código localmente con éxito

### Tipo de cambio

Marcar **solo uno**:

- Bugfix
- Feature
- Actualización de estilo (formatting, renaming)
- Refactor (cambios no funcionales)
- Mejoras de rendimiento
- Documentación
- Otro

## Calidad de Código

### Frontend (React/Vite)

```bash
npm run lint          # ESLint
npm run format:check  # Prettier
npm run build         # Build sin errores
npm test              # Tests
```

### Backend (NestJS)

```bash
npm run lint          # ESLint
npx prettier --check "src/**/*.ts"
npm run build         # Build sin errores
npm test              # Tests
```

### AI Service (FastAPI)

```bash
ruff check .          # Linter
ruff format --check . # Formatter
pytest                # Tests
```

## Flujo de Trabajo

```
1. git checkout develop && git pull
2. git checkout -b DOM-XXXX
3. ... hacer cambios ...
4. git add <archivos> && git commit -m "✨ DOM-XXXX: Description"
5. git push -u origin DOM-XXXX
6. Crear PR en GitHub (develop ← DOM-XXXX)
7. Esperar CI + review
8. Merge (squash o merge commit)
```

## Responsabilidad

Al crear un PR, el **autor** declara que:
- Es responsable de cualquier código malicioso que contenga
- No incluye funciones que perjudiquen datos, software o hardware de participantes

Al aprobar un PR, el **revisor** declara que:
- Realizó una revisión adecuada
- Comparte responsabilidad con el autor
