import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'MoviCol',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/Colombo-labs' },
      ],
      sidebar: [
        {
          label: 'Guía',
          items: [
            { label: 'Introducción', link: '/guia/introduccion/' },
            { label: 'Quick Start', link: '/guia/quick-start/' },
            { label: 'Arquitectura', link: '/arquitectura/overview/' },
            { label: 'Decisiones (ADR)', link: '/arquitectura/decisiones/' },
          ],
        },
        {
          label: 'CRISP-ML',
          items: [
            { label: '01 — Negocio', link: '/crisp-ml/01-business/' },
            { label: '02 — Datos', link: '/crisp-ml/02-data/' },
            { label: '03 — Preparación', link: '/crisp-ml/03-preparation/' },
            { label: '04 — Modelado', link: '/crisp-ml/04-modeling/' },
            { label: '05 — Evaluación', link: '/crisp-ml/05-evaluation/' },
            { label: '06 — Despliegue', link: '/crisp-ml/06-deployment/' },
          ],
        },
        {
          label: 'API',
          items: [
            { label: 'Introducción', link: '/api/endpoints/' },
            { label: 'Estaciones', link: '/api/stations/' },
            { label: 'Rutas', link: '/api/routes/' },
            { label: 'Predicciones', link: '/api/predictions/' },
            { label: 'Agente IA', link: '/api/agent/' },
            { label: 'WebSocket', link: '/api/websocket/' },
          ],
        },
      ],
    }),
  ],
});
