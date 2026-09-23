# Revert de paquetes combinados — 2026-09-23

Alcance: se eliminan los paquetes combinados (soporte + backup) y se dejan soporte y backup como
servicios separados, ambos con Stripe. Cambios **publicados** el 2026-09-23 (Vercel para la landing
y Render para el backend con la migración de desactivación). **Sin secretos.**

---

## 1. Qué se eliminó

- **Landing (`index.html`)**: sección completa "Combina soporte técnico + respaldo y ahorra" con
  sus 3 tarjetas (PyME Esencial, PyME Profesional, PyME Empresarial). Ya no queda ninguna
  referencia a `combinado`, `PyME`, `pyme-` ni `paquete`.
- **Cotizador (`cotizador.html`)**: opción "Paquete combinado" del dropdown de servicio; el arreglo
  `PLANES_SERVICIO.combinado` y todas las condiciones de pago/cláusulas que lo mencionaban.
- **Términos (`terminos.html`)**: referencias al "paquete combinado" en la sección de respaldo.
- **Backend** (`server/`):
  - Migración nueva `20260923180000_deactivate_combinados`: desactiva los planes
    `pyme-esencial`, `pyme-profesional` y `pyme-empresarial` en la DB (no se borran).
  - `storage-control.js`: se quitaron los mapeos de retención/límites de los slugs `pyme-*`.
  - `seed.js`: se quitaron las 3 entradas de combinados (evita que vuelvan a sembrarse).

## 2. Qué se actualizó

- **Soporte (landing)**: equipos por plan ahora **Básico 1**, **Profesional 2 a 5**,
  **Empresarial 6 a 10**; precios fijos **$450 / $900 / $2,000 MXN/mes + IVA**.
- **Cotizador**: `assets/precios.js` asigna el plan por tramos (1 / 2-5 / 6-10) con precio fijo;
  el plan de soporte se cobra con Stripe (`soporte-basico`, `soporte-profesional`,
  `soporte-empresarial`) y el correo del cliente es obligatorio para el link.
- **Botones de tarjetas de soporte**: se quitó "Cotizar por WhatsApp"; queda solo
  **"Contratar ahora"** → Stripe Checkout.
- **Texto de la sección de planes**: "El precio exacto depende del número de equipos. Cotiza el
  tuyo en segundos." → **"El precio es fijo por plan. Si tu negocio crece, cambia al siguiente
  plan."**; se mantiene "Precios fijos por plan en MXN + IVA · Cancela con 5 días de aviso."
- **CTA de la sección de planes**: "Cotizar mi plan" (→ cotizador) → **"Contactar a soporte"** (→
  WhatsApp).
- **WhatsApp se mantiene** como canal de comunicación: botón flotante, sección de cotización
  general (formulario), footer y los enlaces de contacto. Solo se quitó de las tarjetas de planes.
- **Flujo del cotizador**: soporte y backup ahora siguen el mismo flujo:
  cotizar → link → **Stripe** → firma → póliza PDF → gracias → email.
- **Pólizas**: se quitó el caso combinado; la póliza de backup conserva sus cláusulas y la de
  soporte las suyas. El renglón "Pago" refleja "Confirmado con Stripe" cuando aplica.

## 3. Stripe (productos de combinados archivados)

Los 3 productos de combinados quedaron **archivados** (no borrados) en Stripe LIVE el 2026-09-23:

| Producto | Product ID | Estado |
|---|---|---|
| PyME Esencial | `prod_VJTJZCzM1uLCfU` | Archivado |
| PyME Profesional | `prod_VJTJVG4x73kIk2` | Archivado |
| PyME Empresarial | `prod_VJTJAQ5JrsxbHZ` | Archivado |

Los 6 productos de soporte y backup siguen **activos** (verificado contra la API): Soporte Básico
(`prod_VJTJsIQFFlPVXj`), Soporte Profesional (`prod_VJTJgRazrNxMYO`), Soporte Empresarial
(`prod_VJTJ8UFiuYRPme`), Backup Básico (`prod_VJTJ0tDGQs27bP`), Backup Negocio
(`prod_VJTJXfLm0CyhLb`) y Backup Empresa (`prod_VJTJhAeV2gzy1q`). No se borró ningún producto.

## 4. Verificación

- **Backend**: `157/157` tests en verde y `tsc --noEmit` limpio; migración aplicada en la DB
  local (6 planes activos: 3 backup + 3 soporte; 3 combinados inactivos).
- **Landing/cotizador/términos**: HTML balanceado, sin IDs duplicados, JavaScript válido
  (`new Function`); 0 referencias a `combinado`/`PyME`/`pyme-`/`paquete` en los archivos servidos.
- **Pendiente de prueba real**: checkout de soporte y de backup con pago real (webhook →
  suscripción en DB → correo con póliza). No se hicieron cargos.

## 5. Archivos modificados (pendientes de revisión)

Landing (`fixit-website`): `index.html`, `cotizador.html`, `terminos.html`,
`assets/precios.js`, `assets/backup-planes.js`, `CAMBIOS_REVERT_COMBINADOS_2026-09-23.md`.

Backend (`fixit-rmm`): `server/prisma/migrations/20260923180000_deactivate_combinados/`,
`server/prisma/seed.js`, `server/src/services/storage-control.js`.

## 6. Pendientes

1. Prueba de pago real de soporte y backup (webhook → suscripción en DB → correo con póliza).
