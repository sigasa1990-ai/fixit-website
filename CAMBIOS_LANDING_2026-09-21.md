# CAMBIOS — Landing FixIT Soluciones (borrador)

Fecha: 2026-09-21
Estado: **PUBLICADO el 2026-09-21 por instrucción expresa del propietario** (deploy en Vercel,
producción https://www.fixitsoluciones.com, deployment `EMHjfFSkp5FaKgvr93CaDvBkngrJ`).
No se hizo anuncio de lanzamiento.
Archivo modificado: `index.html` (copy + CSS nuevo). Ningún JS fue modificado.

---

## 1. Resumen

Landing actualizada al nuevo posicionamiento: soporte técnico como negocio principal, respaldo
empresarial como servicio complementario, con la certeza de recuperación como mensaje central.
La estructura principal se mantiene: Hero → Servicios → Planes de soporte → Respaldo →
Testimonios → Contacto → FAQ → Footer. Las secciones nuevas (diferenciadores, cómo funciona y
paquetes combinados) se insertaron entre Respaldo y Testimonios.

## 2. Cambios por sección

### Hero
- Título: se conserva (ya reflejaba el nuevo posicionamiento).
- Subtítulo nuevo: "Impresoras, redes y equipos, más respaldos cifrados en la nube que realmente
  puedes recuperar. Remoto y presencial en Mexicali. Cuando algo falla, respondemos el mismo día."
- Segundo CTA agregado: **Ver planes de respaldo** (ancla a `#respaldo`), junto a Cotizar por WhatsApp.

### Respaldo (`#respaldo`)
- Encabezado nuevo: "No vendemos backups. Vendemos la certeza de que puedes recuperar."
- Subtítulo nuevo (ransomware 2am / servidor muere / deploy sale mal).
- Sección de dolor nueva: "¿Te suena familiar?" con los 4 escenarios indicados.
- Planes reescritos (Básico 500 GB $499, Negocio 1 TB $999, Empresa 3 TB $2,999 MXN/mes + IVA)
  con la lista de features nueva de cada uno. Se conservan `data-plan-precio` y `data-plan-cta`
  (checkout Stripe/API intacto).
- Nota de pricing nueva: "Backups inmutables (protección anti-ransomware real) · Facturación
  mensual segura con Stripe · Cancela cuando quieras."

### Diferenciadores (nueva, dentro de `#respaldo`, después de los planes)
- Encabezado "Lo que nos hace diferentes" y los 6 bloques: cifrado en streaming, reanudación de
  subidas, backups inmutables (Object Lock), keys aisladas por empresa, dashboard en tiempo real y
  soporte local en Mexicali. Emojis con `aria-hidden`.

### Cómo funciona (nueva, `#como-funciona`)
- 4 pasos: instalamos el agente / tu backup corre solo / tú controlas desde el dashboard /
  si algo falla, estamos aquí. Numeración visible decorativa + "Paso N" para lectores de pantalla.

### Paquetes combinados (nueva, `#paquetes`)
- Tabla con PyME Esencial ($899), PyME Profesional ($1,699) y PyME Empresarial ($4,499 MXN/mes),
  con CTA "Cotizar por WhatsApp". En móvil la tabla se apila con etiquetas.

### FAQ (7)
- Se mantienen las 3 preguntas actuales.
- Se agregan 4: ransomware en backups, dónde están los backups, restauración self-serve y cuánto
  tarda un backup.
- Ajustes del 2026-09-21 a petición del propietario: se eliminó la pregunta "¿Qué pasa si supero el
  límite de mi plan?" y "¿Dónde están mis backups?" ya no menciona al proveedor por nombre
  ("En infraestructura de almacenamiento de objetos de nivel empresarial, con cifrado AES-256-GCM").

### Cierre
- Encabezado, subtítulo base y CTA solicitados se conservan. Se amplió el subtítulo y se agregaron
  3 puntos de confianza (diagnóstico inicial sin costo, remoto/presencial en Mexicali, respuesta el
  mismo día hábil) y una nota de horario con enlace a los planes de respaldo.

### Footer
- Texto de marca actualizado: ahora incluye "respaldo automático cifrado en la nube".
- Nueva línea de upsell con enlace a `#respaldo` ("Ver planes de respaldo →") y enlace
  "Paquetes combinados" en la columna Empresa.
- Los textos de marca usan `--slate` para mejorar el contraste sobre el fondo coral.

### Metadatos
- `<title>`, `meta description`, OG y Twitter actualizados para incluir respaldo automático.
  JSON-LD intacto.

### CSS nuevo (dentro de `index.html`)
- `.btn-outline`, `.pending`, `.h-sub`, `.pain-box`/`.pain-list`, `.diff-grid`/`.diff-ico`,
  `.steps`/`.step`/`.step-num`, `.pk-wrap`/`.pk-table`/`.pk-cta`, con breakpoints 992/768/640.
- Sin cambios en estilos existentes salvo la nueva franja de reglas al final del bloque `<style>`.

## 3. Lo que NO se tocó

- Testimonios reales: Daniel Gutierrez, Ing. Germán Aranda y Alejandra Arreguín, con sus fotos.
- Planes de soporte técnico, `assets/precios.js`, `assets/precios-landing.js` y el cotizador.
- Formulario de contacto, honeypot y backend de Apps Script.
- WhatsApp como canal principal (mismo número 686 195 9581, 12 enlaces).
- Orden de secciones de la estructura original.

## 4. Marcas [PENDIENTE] (0)

Ya no queda ninguna marca en la página. A petición del propietario (2026-09-21) se eliminaron:
- La línea "Avisos cuando te acerques al límite de espacio [PENDIENTE]" del plan Backup Negocio.
- La FAQ "¿Qué pasa si supero el límite de mi plan?" (con su marca [PENDIENTE]).
- La marca **[PENDIENTE]** del subtítulo de planes de respaldo (la frase queda sin el marcador).
- Se retiró también la clase CSS `.pending`, que ya no se usaba.

## 5. Decisiones de formato

- Las features de planes conservan el "✓" del sitio (en lugar del emoji ✅ del brief) para
  consistencia visual con los planes de soporte. El texto es idéntico.
- El subtítulo de planes se marcó [PENDIENTE] en su momento porque la misma promesa de avisos ya
  estaba marcada como pendiente en el brief (feature y FAQ); el propietario pidió retirar todos los
  marcadores el 2026-09-21.
- Los precios de los paquetes combinados se usaron tal como se entregaron (Profesional $800 /
  Empresarial $1,750); los planes de soporte de la página mantienen sus rangos actuales porque no
  formaban parte del alcance.

## 6. Verificación ejecutada

- `node --check` en `assets/precios.js`, `assets/precios-landing.js`, `assets/motion.js`,
  `assets/reveal.js`, `assets/form.js`, `assets/backup-planes.js` y `voice-plans.js`: OK.
- Verificación estática de `index.html` (92 checks, 0 fallos): balance de etiquetas HTML,
  llaves CSS balanceadas, IDs únicos, anclas internas resueltas, assets locales existentes,
  1 solo `h1`, 3 testimonios, 7 FAQ, CTAs de WhatsApp, copy clave presente, atributos de precios
  y botones de contratación intactos, sin menciones a "Backblaze", sin la FAQ de límite, sin
  marcas [PENDIENTE] y sin restos de la clase `.pending`.
- La landing es HTML/CSS/JS estático y **no tiene build ni tests** (no hay `package.json` en la
  raíz; `portfolio/` es otro proyecto Vite independiente). No se ejecutó navegador real
  (sin Playwright/puppeteer en el entorno): la revisión visual desktop/móvil queda pendiente.

## 7. Pendiente antes de publicar

1. Revisión visual de las nuevas secciones (diferenciadores sobre fondo pizarra y tabla de paquetes
   en móvil).
2. Implementar los avisos de límite de espacio (80% / 100%) para respaldar la promesa que hoy
   aparece sin marcador en el subtítulo de planes.
3. Confirmar con operación los SLA prometidos (respuesta <4h y <2h hábiles).
4. Revisar consistencia de los precios de paquetes combinados con el cotizador.
5. Decidir si `#paquetes` y `#como-funciona` se enlazan en el nav (el footer ya enlaza a ambos).

## 8. Deploy (2026-09-21)

- Publicado con Vercel CLI 59.23.2 (`npx vercel --prod --yes`) en el proyecto existente
  `fixit-landing`, org `sigasa1990-ais-projects`. Alias actualizado: https://www.fixitsoluciones.com
  (✓ Ready in 6s).
- Verificación post-deploy: home 200 con el copy nuevo (hero, dolor, diferenciadores, cómo
  funciona, paquetes, FAQ, cierre) y `[PENDIENTE]` presentes; `assets/precios.js`,
  `assets/reveal.js` y `assets/backup-planes.js` 200.
- Protección previa al deploy: `.vercelignore` ahora excluye `.env*` y
  `CAMBIOS_LANDING_2026-09-21.md`. Verificado en producción: ambos devuelven 404.
- Segundo deploy (2026-09-21): elimina del plan Backup Negocio la línea "Avisos cuando te acerques
  al límite de espacio [PENDIENTE]" a petición del propietario. Verificado en producción: la línea
  ya no aparece.
- Tercer deploy (2026-09-21): elimina la FAQ "¿Qué pasa si supero el límite de mi plan?", reescribe
  "¿Dónde están mis backups?" sin el nombre del proveedor, da vida al cierre (subtítulo ampliado,
  3 puntos de confianza y nota de horario con enlace a respaldo) y actualiza el footer con el
  upsell de respaldo y el enlace a paquetes. Verificado en producción: cambios presentes y sin
  menciones a "Backblaze".
- Cuarto deploy (2026-09-21): retira el último marcador `[PENDIENTE]` del subtítulo de planes y
  limpia la clase CSS `.pending` (ya sin uso). Verificado en producción: cero marcas `[PENDIENTE]`.
