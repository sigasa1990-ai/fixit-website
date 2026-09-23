# Cambios Stripe + Landing + Cotizador — 2026-09-23

Alcance: 9 productos en Stripe (modo LIVE), landing con precios fijos + IVA y paquetes
combinados, cotizador con flujo de pago, pólizas de backup/combinado, términos y condiciones, y
email de póliza (pendiente de pegar en Apps Script). **Sin secretos:** no se incluye la API key.

---

## 1. Stripe (modo LIVE)

**Tax Rate creado:** `IVA México 16%` → `txr_1UIqMi0cfrUgLUpWa12j0MlX`
(percentage 16.0, inclusive `false`, metadata `fixit_app=backup`).
Se archivó el Tax Rate viejo `IVA 16%` (`txr_1UHEvY0cfrUgLUpWDphCZvJe`) para que el backend use
solo el nuevo.

**9 productos y precios** (todos MXN, recurrentes mensuales, `tax_behavior=exclusive`):

| Producto | Product ID | Price ID | Precio | Tipo |
|---|---|---|---|---|
| Soporte Básico | `prod_VJTJsIQFFlPVXj` | `price_1UIqMj0cfrUgLUpWKpc3jMEB` | $450 | soporte |
| Soporte Profesional | `prod_VJTJgRazrNxMYO` | `price_1UIqMj0cfrUgLUpWnJ5bAMhv` | $900 | soporte |
| Soporte Empresarial | `prod_VJTJ8UFiuYRPme` | `price_1UIqMk0cfrUgLUpWb2XvEMuC` | $2,000 | soporte |
| Backup Básico | `prod_VJTJ0tDGQs27bP` | `price_1UIqMk0cfrUgLUpWCHB3gFUR` | $499 | backup |
| Backup Negocio | `prod_VJTJXfLm0CyhLb` | `price_1UIqMk0cfrUgLUpW4HAacbP3` | $999 | backup |
| Backup Empresa | `prod_VJTJhAeV2gzy1q` | `price_1UIqMl0cfrUgLUpWfTvHrUNz` | $2,999 | backup |
| PyME Esencial | `prod_VJTJZCzM1uLCfU` | `price_1UIqMl0cfrUgLUpW9UIHFrIm` | $899 | combinado |
| PyME Profesional | `prod_VJTJVG4x73kIk2` | `price_1UIqMl0cfrUgLUpWaw4pc1GG` | $1,699 | combinado |
| PyME Empresarial | `prod_VJTJAQ5JrsxbHZ` | `price_1UIqMm0cfrUgLUpWIzZXFQYk` | $4,499 | combinado |

**Limpieza de catálogo (sin duplicados):** se archivaron 8 productos legacy de backup
("Fixit Backup - Básico/Negocio" y "FixIT Backup - Básico/Negocio/Empresa" de versiones
anteriores) y sus precios quedaron inactivos. No había suscripciones activas (0 en la cuenta al
momento del cambio), por lo que no se afectó a ningún cliente. El IVA se aplica al crear el
Checkout/Invoice con el Tax Rate nuevo (los precios se marcan `exclusive`).

---

## 2. Landing (index.html + assets)

- **Precios de soporte fijos (al tope del rango) + IVA:** Básico $450, Profesional $900,
  Empresarial $2,000. El motor `assets/precios.js` se ajustó para devolver precio fijo por
  tramo (1, 2–3, 4–10 equipos); `precios-landing.js` sigue pintando los precios.
- **Botones híbridos de soporte:** cada plan conserva "Cotizar por WhatsApp" y agrega
  "Contratar ahora" (`data-service-cta="soporte-*"`), que usa el mismo modal de pago.
- **Nueva sección "Combina soporte técnico + respaldo y ahorra"** después de los planes de
  respaldo, con 3 tarjetas (PyME Esencial, Profesional con badge "Más popular", Empresarial),
  precio + IVA, ahorro visible y botón "Contratar ahora".
- **Modal de contratación** (`#backupModal`) generalizado a "Contratar servicio": acepta
  backup, soporte y combinados. `assets/backup-planes.js` ahora envía `slug` (el backend lo
  resuelve por slug con el precio de Stripe) y muestra los servicios que no vienen de
  `/backup-plans`.
- Los CTAs de "Contratar ahora" apuntan a `POST /api/public/backup-checkout` (sin cambios de
  endpoint, adaptado para aceptar `slug` y `successPath`). `success_url` sigue siendo
  `/thanks.html`.

---

## 3. Cotizador (cotizador.html)

- **Dropdown "Servicio a cotizar":** Soporte técnico / Backup / Paquete combinado. Al elegir
  backup o combinado aparece el selector de plan con precios fijos + IVA y se ocultan los
  controles de soporte.
- **Campo de correo** del cliente (obligatorio para backup/combinado; el pago y la póliza lo
  requieren).
- **Flujo Soporte (sin cambios):** cotizador → link → firma → póliza PDF (imprimir) → gracias.
- **Flujo Backup y Combinado (nuevo):** cotizador → link → el cliente ve plan + precio + botón
  **"Pagar con Stripe"** → Checkout → regresa a la firma (`successPath` incluye `pago=ok`) →
  firma en canvas → póliza con cláusulas de backup/combinado y estado de pago → imprimir/PDF →
  gracias.
- **Póliza:** cláusulas específicas de backup (alcance, cifrado AES-256-GCM con llaves únicas
  por empresa, inmutabilidad Object Lock 30/90/365, retención, restauración, pausa por tope,
  proveedores de terceros sin nombrar al proveedor, compatibilidad Windows 10/11, cancelación,
  limitación de responsabilidad, privacidad y renovación automática). Los paquetes combinados
  incluyen además las cláusulas de soporte y el descuento. Se agregó el renglón "Pago"
  (Confirmado con Stripe / Pendiente / Acordado por WhatsApp).
- El link de firma ahora incluye `servicio`, `plan` (slug), `email` y `pago`.

---

## 4. Backend (repo fixit-rmm) — cambios de soporte

- **Migración `20260923150000_align_backup_stripe_prices`:** apunta los 3 planes de backup a
  los Price IDs nuevos (exclusive).
- **Migración `20260923151000_add_plan_tipo_and_services`:** agrega `BackupPlan.tipo`
  (`backup|soporte|combinado`) y siembra los 6 servicios (soporte y combinados) con sus
  `stripe_price_id`, precios y features. Idempotente.
- **`/api/public/backup-checkout`:** acepta `slug` además de `planId`, agrega `plan_tipo` a la
  metadata y acepta `successPath` (solo orígenes `fixitsoluciones.com` y rutas relativas
  válidas) para regresar al cotizador después del pago.
- **`/api/public/backup-plans` y `/api/backup-service/plans`:** filtran `tipo: 'backup'` para
  que el portal y la landing no muestren los servicios de soporte/combinados.
- **`storage-control`:** retención y límites para los slugs de combinados (30/90/365 días).
- **Webhook:** registra la suscripción (BackupSubscription) y factura para los 9 planes; no
  envía el correo de bienvenida de backup en planes de solo soporte.
- `seed.js` alineado con los 9 planes y sus price IDs.

---

## 5. Términos y condiciones (terminos.html)

Nueva sección **"2.1 Servicio de respaldo (FixIT Backup)"**: alcance, cifrado, inmutabilidad,
retención, restauración, pausa por tope, proveedores de terceros (sin nombrar al proveedor de
almacenamiento), compatibilidad Windows 10/11, cancelación, limitación de responsabilidad,
privacidad y vigencia/renovación automática. La sección de soporte existente se mantiene.

---

## 6. Apps Script — pendiente de pegar y redesplegar

Archivo actualizado en el repo: `apps_script_backend.js` (copia).

**Qué cambió:**
1. En `doPost`, caso `poliza-firmada`: después de guardar la póliza y avisar por WhatsApp, se
   llama `enviarPolizaEmailCliente(datos)` dentro de `try/catch`.
2. Nuevas funciones al final: `enviarPolizaEmailCliente`, `escaparHtmlSeguro` y
   `polizaRowSeguro`. Envían un correo al cliente con:
   - confirmación de pago (Stripe) cuando `pagoConfirmado` es true,
   - póliza en PDF adjunta (generada desde HTML con `Utilities.newBlob(...).getAs('application/pdf')`),
   - instrucciones de instalación del agente y link al portal para backup/combinados,
   - cláusulas aplicables.

**Pasos para publicar (manual):**
1. Abrir el proyecto de Apps Script en `script.google.com` (el asociado al cotizador).
2. Reemplazar el contenido por la versión actualizada de `apps_script_backend.js` (o copiar
   solo las funciones nuevas y el bloque `poliza-firmada`).
3. Guardar y **Implementar → Administrar implementaciones → Editar → Nueva versión → Implementar**
   (mantener la misma URL `/exec`; el cotizador ya apunta ahí).
4. Verificar permisos de `MailApp` (la primera ejecución pedirá autorización de envío de correo).
5. Prueba sugerida: generar un link de backup, pagar, firmar y confirmar que llega el correo con
   el PDF adjunto.

Nota: si `Utilities.newBlob(...).getAs('application/pdf')` fallara en la cuenta, el correo se
envía igual sin adjunto (la póliza sigue disponible por la impresión del navegador) y el error
queda en el log de Apps Script.

---

## 7. Verificación

- **Backend:** 157/157 tests en verde y `tsc --noEmit` limpio; migraciones aplicadas en local.
- **Landing/cotizador:** HTML balanceado, sin IDs duplicados, JavaScript inline válido
  (`new Function`) en index.html, cotizador.html y terminos.html.
- **Stripe:** 9/9 productos con precio exclusivo y Tax Rate; catálogo legacy archivado.
- **Pendiente de prueba con pago real:** completar un Checkout LIVE (el flujo de webhook →
  suscripción en DB → correo con póliza). No se hicieron cargos ni suscripciones de prueba.

---

## 8. Pendientes

1. Pegar y redesplegar `apps_script_backend.js` en Apps Script (sección 6).
2. Prueba de pago real de punta a punta (backup, soporte y combinado) y verificación del webhook
   y de la suscripción en la DB.
3. Prueba del correo con PDF adjunto una vez redesplegado Apps Script.
4. Revisar el copy de la landing en producción tras el deploy de Vercel (deploy automático por git).
5. `stripe-setup.md` fue eliminado y nunca se commiteó.
