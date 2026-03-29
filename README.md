Aquí tienes tu contenido listo para pegar directamente en `README.md` con formato **Markdown limpio y bien organizado** 👇

---

````markdown
# 🏗️ Arquitectura — SISA Control de Cobros (Next.js Frontend)

## 📁 Estructura del proyecto

```bash
sisa-control/
│
├── public/
│   ├── favicon.ico
│   └── logo-sisa.png
│
├── src/
│   │
│   ├── api/                          # Data JSON (reemplazables por API real)
│   │   ├── auth.json
│   │   ├── socios.json
│   │   ├── puestos.json
│   │   ├── sectores.json
│   │   ├── cobros.json
│   │   ├── asistencias.json
│   │   └── config.json
│   │
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── map/
│   │   ├── puesto/
│   │   ├── ticket/
│   │   ├── stats/
│   │   ├── deudores/
│   │   ├── historial/
│   │   └── auth/
│   │
│   ├── hooks/
│   ├── interfaces/
│   ├── redux/
│   ├── screens/
│   ├── styles/
│   ├── themes/
│   └── utils/
│
├── app/                              # Next.js App Router
│
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
````

---

## 📦 Dependencias clave

```json
{
  "dependencies": {
    "next": "15.x",
    "react": "19.x",
    "react-dom": "19.x",
    "@reduxjs/toolkit": "^2.x",
    "react-redux": "^9.x",
    "tailwindcss": "^3.x",
    "recharts": "^2.x",
    "react-hot-toast": "^2.x",
    "jspdf": "^2.x",
    "html2canvas": "^1.x",
    "clsx": "^2.x"
  }
}
```

---

## 🔄 Flujo de datos (localStorage)

```bash
seedData.ts (carga inicial)
       ↓
localStorage keys:
  "sisa_socios"
  "sisa_puestos"
  "sisa_sectores"
  "sisa_cobros"
  "sisa_asistencias"
  "sisa_config"
  "sisa_auth"
       ↓
Redux slices (estado en memoria)
       ↓
Screens → Components
```

---

## 📱 Responsividad (Tailwind)

```bash
sm  (640px)  → Móvil: layout centrado max-w-sm, bottom nav
md  (768px)  → Tablet: max-w-2xl, side nav colapsable
lg  (1024px) → Desktop: side nav fijo, contenido en 2 columnas
```

---

## 🚀 Descripción

**SISA Control de Cobros** es una aplicación frontend desarrollada con Next.js que permite:

* Gestión de socios e inquilinos
* Control de cobros diarios
* Registro de asistencias
* Visualización de deuda
* Estadísticas por período
* Generación de tickets

---

## 🧠 Arquitectura

* **Frontend:** Next.js (App Router)
* **Estado global:** Redux Toolkit
* **Persistencia:** localStorage
* **UI:** TailwindCSS + componentes reutilizables
* **Gráficas:** Recharts
* **Exportación:** jsPDF + html2canvas

---

## ⚙️ Ejecución local

```bash
npm install
npm run dev
```

---

## 🔐 Credenciales demo

```
Usuario: sisa@gmail.com
Password: 12345
```

```

---

Si quieres, en el siguiente paso puedo ayudarte a hacerlo más pro 🔥:
- agregar badges (build, version, etc.)
- poner screenshots del sistema
- o dejarlo listo para portafolio tipo senior 😎
```
