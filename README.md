# Plantilla de panel administrativo SaaS

Base reutilizable en español con Next.js, Tailwind CSS y componentes editables. Incluye temas claro y oscuro y ejemplos con datos locales.

## Empezar

Usa Node.js 24 LTS y la versión de pnpm fijada en `package.json`.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Abre el puerto 3000 en tu navegador. Ejecuta `pnpm lint` para revisar el código y `pnpm build` para comprobar la compilación de producción y los tipos.

## Personalizar después de clonar

1. Cambia el nombre, las iniciales, el tema, la paleta inicial y el usuario de ejemplo en `src/config/dashboard.ts`. Las variables `--brand-*` en `src/app/globals.css` definen los acentos que usan la navegación y las facturas.
2. Ajusta las opciones del menú en `src/config/navigation.ts`. Las páginas disponibles están en `src/app/`.
3. Edita los colores en `src/app/globals.css`. Mantén el fondo y las tarjetas como superficies dominantes, usa el tono secundario para la navegación y reserva el acento para acciones, selecciones y gráficos. El 60/30/10 es una guía de composición.
4. Reemplaza los datos de ejemplo en `src/features/` y conecta los formularios a los servicios de tu proyecto. El acceso, las operaciones de usuarios y la configuración que trae la plantilla son demostraciones locales.

## Módulos

| Módulo | Ruta | Incluye |
| --- | --- | --- |
| Analítica y KPIs | `/` | Facturación y analítica de ingresos, adquisición, clientes y operaciones. Ejemplos de proyectos en `/projects` y reseñas en `/reviews` |
| Tablas y grids | `/table` | Directorio en tabla o tarjetas con búsqueda, selección, paginación y edición en memoria |
| Componentes UI y kit | `/components-showcase` | Controles, diálogos, notificaciones y estados del sistema en `/states` |
| Formularios y ajustes | `/settings` | Perfil, notificaciones y credenciales de ejemplo |
| Autenticación | `/login` | Inicio de sesión y recuperación de acceso simulados |

El panel de analítica recibe una serie mensual ordenada de la más antigua a la más reciente. Reemplaza `demoMonths` en `src/features/analytics/data.ts` para conectar tus datos. Con 24 meses puedes comparar las tres ventanas (3, 6 y 12 meses) con el periodo anterior de la misma duración.

Consulta [STACK.md](STACK.md) para conocer las dependencias y la estructura.
