# Guía del Stack Tecnológico - Plantilla Dashboard

Esta plantilla está diseñada como una base sólida, moderna y 100% reutilizable para aplicaciones web, paneles de administración, ERPs y SaaS (pequeños, medianos y grandes).

---

## 1. Resumen del Stack Instalado

| Tecnología | Versión | Rol Principal |
| :--- | :--- | :--- |
| **Next.js (App Router)** | `16.x` | Framework full-stack con React 19 y Turbopack |
| **TypeScript** | `5.x` | Tipado estricto y seguridad en tiempo de desarrollo |
| **Tailwind CSS** | `4.x` | Motor de estilos de alto rendimiento mediante variables CSS |
| **shadcn/ui** | `4.x` | Sistema de componentes accesibles y personalizables |
| **Lucide React** | `1.x` | Set de iconos limpio y consistente |
| **next-themes** | `0.4.x` | Soporte para temas (Claro, Oscuro y Sistema) sin parpadeo |
| **TanStack Table** | `9.x` | Motor agnóstico para tablas de datos avanzadas |
| **Recharts** | `3.x` | Gráficos reactivos y visualización de datos |
| **React Hook Form + Zod** | `7.x` / `4.x` | Manejo de formularios de alto rendimiento y validación estricta |
| **Sonner** | `2.x` | Notificaciones flotantes (toasts) animadas y accesibles |
| **Nuqs** | `2.x` | Sincronización del estado de filtros/búsqueda con los query params de la URL |
| **Zustand** | `5.x` | Manejo de estado global en cliente (ligero, sin boilerplate) |
| **pnpm** | `10.x` | Gestor de paquetes rápido, eficiente en disco y determinista |

---

## 2. Detalle de Cada Tecnología y Por Qué Está Aquí

### 🚀 Next.js (App Router) + React 19
* **Por qué:** Permite usar **React Server Components (RSC)**. La mayor parte de la interfaz y la lógica de lectura de datos se procesa en el servidor, enviando un bundle mínimo de JavaScript al navegador.
* **Ventaja:** Carga ultrarrápida, streaming progresivo mediante `<Suspense />` y soporte nativo para Server Actions.

### 🎨 Tailwind CSS v4 + shadcn/ui
* **Por qué:** No es una librería de componentes en `node_modules` cerrada. Los componentes se copian directamente en `src/components/ui/`, lo que te da el **control del 100% del código fuente**.
* **Ventaja:** No hay "vendor lock-in", se adapta a cualquier identidad visual y Tailwind v4 optimiza la compilación al máximo.

### 🌓 next-themes
* **Por qué:** La gestión manual de modo oscuro suele provocar *hydration mismatch* (pantallazos blancos antes de cargar el tema oscuro). `next-themes` resuelve esto inyectando el script de bloqueo adecuado en el head.

### 📊 TanStack Table (v8/v9)
* **Por qué:** En cualquier dashboard, las tablas son el componente más exigente. TanStack Table maneja:
  * Paginación (tanto local en memoria como remota vía API/base de datos).
  * Ordenamiento multicolumna.
  * Filtros globales y por columna.
  * Visibilidad y redimensionamiento de columnas.
  * Selección masiva de filas para acciones por lote.

### 📈 Recharts
* **Por qué:** Visualización de métricas clave (ingresos, altas de usuarios, retención, etc.). Se integra de forma limpia con los temas y variables de Tailwind, permitiendo tooltips estilizados y gráficos responsivos.

### 📝 React Hook Form + Zod
* **Por qué:** 
  * `React Hook Form` no re-renderiza todo el componente al tipear en un input (altamente eficiente en formularios densos).
  * `Zod` garantiza que los datos cumplan las reglas de negocio antes de enviarse al backend, compartiendo esquemas entre cliente y servidor.

### 🔔 Sonner
* **Por qué:** Sistema de toasts ligero, moderno y elegante. Soporta estados de carga con promesa (`toast.promise`), acciones integradas y soporte nativo de temas.

### 🔗 Nuqs (Type-safe Search Params)
* **Por qué:** En un dashboard profesional, el usuario necesita compartir URLs con los filtros ya aplicados (ej. `?page=3&status=active&search=john`). Nuqs sincroniza el estado de React con la URL automáticamente con tipado estricto.

### 🐻 Zustand
* **Por qué:** Cuando se necesita estado compartido puramente en la UI (por ejemplo: si el sidebar está colapsado, o para abrir/cerrar un modal global de confirmación), Zustand evita envolver la app en Providers pesados.

---

## 3. Estructura de Carpetas Recomendada (Arquitectura por Features)

Para que el proyecto escale fácilmente desde 3 páginas hasta 50 páginas sin desorden, se recomienda esta estructura:

```text
src/
├── app/                      # Rutas de la aplicación (Next.js App Router)
│   ├── (auth)/               # Grupo de rutas de autenticación (login, registro)
│   │   ├── login/
│   │   └── layout.tsx
│   ├── (dashboard)/          # Grupo con el layout principal del dashboard
│   │   ├── layout.tsx        # Shell con Sidebar + Header sticky
│   │   ├── page.tsx          # Overview / Métricas principales
│   │   ├── users/            # Módulo de usuarios
│   │   └── settings/         # Configuración del sistema
│   ├── globals.css           # Estilos base y tokens de color
│   └── layout.tsx            # Root layout con providers (Theme, Toaster)
│
├── components/
│   ├── ui/                   # Componentes base de shadcn (button, dialog, input, etc.)
│   ├── layout/               # Header, Sidebar, UserNav, Breadcrumbs
│   └── shared/               # Componentes reutilizables (EmptyState, PageHeader)
│
├── features/                 # <-- Lógica modular por dominio de negocio
│   ├── analytics/
│   │   ├── components/       # Gráficas de ingresos, tarjetas KPI
│   │   ├── data/             # Mock data o llamadas API
│   │   └── types/            # Tipos de analítica
│   ├── users/
│   │   ├── components/       # Tabla de usuarios, modales de crear/editar
│   │   ├── schemas/          # Esquemas Zod de usuario
│   │   └── hooks/            # Hooks específicos de usuarios
│   └── settings/
│
├── hooks/                    # Hooks reutilizables globales
├── lib/                      # Utilidades compartidas (cn, formateadores de fecha/moneda)
└── types/                    # Tipos globales de TypeScript
```

---

## 4. Guía de Escalabilidad: Cómo Crecer sin Dolor

1. **De Mock Data a Backend Real:**
   * Al inicio, usa archivos `data/mock.ts` para prototipar rápido la UI.
   * Para conectar tu backend (Supabase, Firebase, NestJS, etc.), solo reemplazas la función en `data/` por un Server Action o llamada `fetch()`, sin tocar los componentes visuales.
2. **De Paginación Local a Paginación en Servidor:**
   * TanStack Table admite un prop `manualPagination: true`. Cuando la base de datos supere las 1,000 filas, activas este flag y pasas la página actual desde la URL (vía Nuqs).
3. **Nuevos Módulos:**
   * Cada nueva sección (por ejemplo, "Facturas" o "Inventario") se añade como una carpeta independiente en `features/` y una ruta en `app/(dashboard)/`. No hay riesgo de romper código existente.

---

## 5. Comandos Frecuentes

```bash
# Iniciar servidor de desarrollo con Turbopack
pnpm dev

# Compilar para producción (validación de tipos y build)
pnpm build

# Iniciar servidor de producción
pnpm start

# Añadir nuevos componentes de shadcn cuando los necesites
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add table
pnpm dlx shadcn@latest add sheet
```
