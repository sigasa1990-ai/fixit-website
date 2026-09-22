# Compatibilidad Windows 10/11 en la landing — 2026-09-22

Estado: **PUBLICADO** en https://www.fixitsoluciones.com (deploy Vercel producción,
`fixit-landing-l3lzyloej`, ✓ Ready in 6s) y **subido a GitHub** en
`sigasa1990-ai/fixit-website` (commit `2f847c1`, rama `main`), por instrucción del dueño
después de verificar el borrador.
Archivo modificado: `index.html` (CSS + HTML). Ningún JS fue modificado.
Documento nuevo: `CAMBIOS_COMPATIBILIDAD_2026-09-22.md`.

Objetivo: dejar claro en la landing que FixIT Backup funciona **exclusivamente en Windows 10
y Windows 11** y que **no** es compatible con macOS ni Linux, para evitar malentendidos con
clientes que asumen Mac/Linux.

---

## 1. Nueva sección "Compatibilidad"

- Ubicación: entre **"Cómo funciona"** (`#como-funciona`) y **"Negocios en Mexicali…"**
  (`#clientes`), es decir, antes de Preguntas frecuentes. `index.html:617`.
- Fondo `sec-alt` (gris `#F5F6FA`) para continuar la alternancia de fondos de la página:
  Cómo funciona (blanco) → Compatibilidad (gris) → Testimonios (blanco) → Cotizar (gris).
- Contenido:
  - `h2` "Compatibilidad" (con la línea coral estándar `.st`).
  - Intro: "FixIT Backup actualmente funciona en equipos con Windows 10 y Windows 11."
  - Dos bloques (`.compat-card`), como pedía el brief:
    - **Windows**: icono `monitor` (Lucide) en tile coral + checks verdes: Windows 10, Windows 11.
    - **macOS y Linux**: icono `circle-x` (Lucide) en tile gris + cruz roja:
      "No compatible con macOS ni Linux".
  - Nota al pie: "La protección se instala directamente en el equipo que quieres respaldar."
    (reutiliza el estilo `.support-setup-note` existente, con icono info coral).

Antes / después:

| | Antes | Después |
|---|---|---|
| Sección compatibilidad | No existía | `#compatibilidad` con 2 tarjetas y nota al pie |
| Mensaje SO | No se mencionaba Windows/Mac/Linux en ningún lado visible | Windows 10/11 soportado; Mac/Linux marcado como no compatible |
| Iconos | — | Lucide inline (`monitor`, `circle-x`, `check`), 2 con `role="img"`+`aria-label`, 3 decorativos `aria-hidden` |
| Estructura | Cómo funciona → Testimonios | Cómo funciona → **Compatibilidad** → Testimonios |

## 2. Nota debajo de los planes de respaldo

- Se agregó debajo del footer de pricing existente, en `#respaldo` (`index.html:520`), sin
  tocar la nota que ya estaba:
  - Se conserva: "Backups inmutables (protección anti-ransomware real) · Facturación mensual
    segura con Stripe · Cancela cuando quieras."
  - Se agrega debajo: "Compatibilidad: Windows 10 y Windows 11. Actualmente no compatible con
    macOS ni Linux."
- Estilo `.plan-compat-note`: centrado, `13.28px` (`.83rem`), gris claro `#C7D6E8`
  (contraste 6.6:1 sobre el fondo slate `#33475b`, AA).

| | Antes | Después |
|---|---|---|
| Nota de pricing | 1 línea (Stripe/cancelación) | 2 líneas: la original + nota de compatibilidad gris debajo |

## 3. Nueva FAQ

- Agregada **al final** de `#faq` (`index.html:743`), sin modificar las 7 existentes:
  - Pregunta: "¿FixIT Backup funciona en Mac o Linux?"
  - Respuesta: "Por ahora, no. FixIT Backup es compatible exclusivamente con Windows 10 y
    Windows 11. Estamos enfocados en ofrecer una experiencia de respaldo sólida y confiable
    para equipos Windows."
- Total de preguntas: 7 → 8.

## 4. CSS agregado

Bloque nuevo al final del `<style>` (`index.html:346-361`), reutilizando variables de la paleta
(`--accent`, `--accent-soft`, `--border`, `--r`, `--shadow`, `--dur`, `--ease`):

- `.compat-grid`: 2 columnas (1 columna ≤640px, máx. 480px).
- `.compat-card`, `.compat-head`, `.compat-ico`, `.compat-list`, `.compat-list li.ok/.no`.
- `.plan-compat-note`.
- Semántica de color: checks verdes `#1E9E6A` (mismo verde de "ok" ya usado en el modal),
  cruz roja `#C0392B` (mismo rojo de error ya usado en formularios). El resto del cromo
  (bordes, sombras, radios, tipografía Sora/Inter) es idéntico al resto de la landing.

## 5. Iconos (licencia)

- Se usaron iconos **Lucide** (`lucide-static` v1.47.0, licencia **ISC**, uso comercial libre)
  como SVG inline, mismo patrón que el resto de la landing: `viewBox="0 0 24 24"`,
  `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`, `stroke-linecap/linejoin="round"`.
  - `monitor` para Windows, `circle-x` para macOS/Linux, `check` para los checks de la lista.
- Accesibilidad: iconos de cabecera con `role="img"` + `aria-label`; iconos de lista
  decorativos con `aria-hidden="true"` (el texto ya comunica compatible/no compatible).
- Sin emojis ✅/❌ en el HTML (el brief los mencionaba como referencia visual).

## 6. Verificación

La landing es HTML/CSS/JS estático y **no tiene build ni tests** (no hay `package.json` en la
raíz; `portfolio/` es otro proyecto Vite). Se ejecutó:

1. `node --check` en los 7 JS de `assets/`: **7/7 OK** (ningún JS fue modificado).
2. Verificación estática de `index.html`: **49/49 OK, 0 fallos**
   - Balance de 23 etiquetas (`div` 158/158, `section` 12/12, `article` 22/22, `details` 8/8,
     `ul` 8/8, `li` 26/26, `p` 46/46, `svg` 25/25, etc.).
   - 62 IDs únicos, 6 anclas internas con destino válido.
   - Orden de secciones, contenido nuevo, CSS nuevo, FAQ total 8, sin emojis.
3. QA real con **Chrome headless sobre servidor HTTP local** (`http://127.0.0.1:8791/`,
   puppeteer-core temporal fuera del workspace), 3 viewports × 19 comprobaciones =
   **57/57 OK**, **0 errores de consola** y **0 requests locales fallidos**:

| Viewport | Columnas | Tarjetas/Ítems | Nota pricing | FAQ | Overflow X |
|---|---|---|---|---|---|
| Desktop 1440×900 | 2 | 2 / 3 | gris `rgb(199,214,232)`, 13.28px | 8 (Mac/Linux última) | 0 |
| Tablet 768×1024 | 2 | 2 / 3 | ídem | ídem | 0 |
| Móvil 390×844 | 1 | 2 / 3 | ídem | ídem | 0 |

   - Comprobaciones por viewport: columnas del grid, textos exactos, colores (check verde /
     cruz roja), fondo `sec-alt`, nota al pie, nota de pricing (texto, color, tamaño,
     visibilidad), FAQ, orden visual Cómo funciona < Compatibilidad < Testimonios < FAQ y
     ausencia de overflow horizontal.
   - Nota del QA: la petición externa a `backup.fixitsoluciones.com/api/public/backup-plans`
     se respondió con un stub 200 vía intercepción, porque en un origen local no tiene headers
     CORS (dependencia externa preexistente, ajena a este cambio). Con el stub, la consola
     queda limpia y las fuentes cargan normal sobre HTTP.

## 7. Capturas

En `_capturas/compatibilidad/` (carpeta excluida del deploy vía `.vercelignore`):

- `compatibilidad-desktop-1440.png`, `compatibilidad-tablet-768.png`, `compatibilidad-movil-390.png`
- `nota-pricing-desktop-1440.png`, `nota-pricing-tablet-768.png`, `nota-pricing-movil-390.png`
- `faq-mac-linux-desktop-1440.png` (FAQ nueva abierta)
- `respaldo-completo-desktop-1440.png` (sección de respaldo con la nota nueva)
- `qa-resultado.txt` (salida completa del QA headless)

Capturas tomadas con `prefers-reduced-motion: reduce` para congelar el revelado.

## 8. Restricciones respetadas durante el desarrollo

- El borrador se mantuvo sin publicar hasta que el dueño lo aprobó; la publicación se hizo
  después del QA (commit + push + `npx vercel --prod --yes`).
- **No se tocó el formulario de cotización** (`#quoteForm`) ni el modal de contratación.
- **No se modificaron secciones existentes**: solo se insertó contenido nuevo (sección,
  nota y FAQ); los textos previos quedaron idénticos.
- Sin librerías nuevas ni CDNs extra: iconos SVG inline (Lucide, ISC).

## 9. Publicación (2026-09-22)

- **Git**: `FixIT_Landing` se inicializó como repo git con remoto
  `https://github.com/sigasa1990-ai/fixit-website.git` (rama `main`); commit `2f847c1`
  ("Agrega la landing de FixIT con la nueva sección de compatibilidad Windows 10/11").
  - `apps_script_backend.js` (contiene API keys) se excluyó vía `.gitignore` porque el repo
    es público; `.env*`, `.vercel` y `portfolio/node_modules` ya estaban excluidos.
- **Deploy**: `npx vercel --prod --yes` sobre el proyecto `fixit-landing`; alias
  https://www.fixitsoluciones.com — ✓ Ready in 6s.
- **Verificación post-deploy**: home 200 (74,190 bytes), `id="compatibilidad"` presente,
  2 `.compat-card`, 2 checks, texto de no compatibilidad y 8 FAQ. Los docs
  (`CAMBIOS_COMPATIBILIDAD_2026-09-22.md`, `CAMBIOS_MAPA_2026-09-22.md`) y `_capturas/`
  devuelven 404 (agregados/ya listados en `.vercelignore`).

## 10. Pendientes / notas

1. Opcional: agregar un enlace "Compatibilidad" al menú (hoy no se agregó para no tocar
   navegación existente).
2. Opcional: si se prefiere, usar el icono `laptop` en vez de `monitor` para Windows
   (el brief permitía cualquiera de los dos).
3. Vercel no está conectado al repo git (los deploys siguen siendo con CLI); si se conecta,
   cada push a `main` desplegaría automáticamente.
