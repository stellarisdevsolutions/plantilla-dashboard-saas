# Stack de la plantilla

| Tecnología | Uso |
| --- | --- |
| Next.js 16 y React 19 | Rutas, renderizado y compilación con Turbopack |
| TypeScript | Tipos y validación durante la compilación |
| Tailwind CSS 4 y shadcn/ui con Base UI | Variables de tema y componentes editables |
| next-themes | Cambio entre modo claro y oscuro |
| TanStack Table 8 | Búsqueda, filtros, ordenación, paginación y selección |
| Recharts | Gráficos de métricas y reseñas |
| React Hook Form y Zod | Formularios y validación en la tabla de usuarios |
| Sonner y Lucide React | Notificaciones e iconos |

## Estructura

- `src/app/` contiene las rutas, el layout raíz y los estilos globales.
- `src/config/` contiene la identidad del panel, sus valores por defecto y la navegación.
- `src/components/layout/` reúne la navegación, la cabecera y el contenedor de página.
- `src/components/ui/` contiene los componentes base reutilizables.
- `src/features/` contiene los componentes y datos de resumen, usuarios y reseñas.

La plantilla utiliza datos de ejemplo. Para conectar un proyecto real, integra la autenticación, la autorización y la persistencia que requiera tu aplicación. Mantén los colores de marca y de estado en las variables de `src/app/globals.css`.
