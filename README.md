# Plantilla Dashboard SaaS - Morlo UI (Next.js 16 + Tailwind CSS v4)

Plantilla de dashboard profesional, moderna y 100% modular basada en una regla cromática **60-30-10** (Lienzo neutro, Verde Nórdico `#0F2A1D` y Acentos Esmeralda `#10B981`), construida con Next.js 16 (Turbopack), Tailwind CSS v4 y Base UI / Radix primitives.

---

## 🏛️ Estructura de Módulos

```text
Plantilla Dashboard SaaS
├── 1. Módulo Analítico & KPIs
│   ├── Resumen General (Vista: /)
│   └── Mesa de Reseñas & Reputación (Vista: /reviews · 16 reseñas)
├── 2. Módulo de Tablas & Data Grids CRUD
│   └── Gestor de Tareas Interactivo (Vista: /table · 9 tareas)
├── 3. Módulo de Componentes & UI Kit
│   └── Catálogo UI, Modales & Toasts (Vista: /components-showcase)
├── 4. Módulo de Formularios & Ajustes
│   └── Ajustes de Cuenta & Perfil (Vista: /settings)
└── 5. Módulo de Autenticación & Estados
    ├── Iniciar Sesión con Autocompletado Demo (Vista: /login)
    ├── Estados del Sistema: Empty, 500, 403, Offline (Vista: /states)
    └── Error 404 Oficial de Next.js (Vista: /_not-found)
```

---

## 🎨 Paleta Cromática 60-30-10

* **60% Dominante:** `#F4F7F6` en lienzo/fondo y `#FFFFFF` en tarjetas y cabecera en modo claro.
* **30% Secundario:** `#0F2A1D` (Verde Bosque Nórdico Profundo) en el sidebar vertical permanente.
* **10% Acento:** `#10B981` (Esmeralda / Menta vibrante) en badges, indicadores activos, CTAs y métricas clave.

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Compilar para producción (0 errores TypeScript & Turbopack)
pnpm build
```

Abre **[http://localhost:3000](http://localhost:3000)** en tu navegador.
Para detalles técnicos adicionales de la arquitectura y componentes, consulta **[STACK.md](STACK.md)**.
