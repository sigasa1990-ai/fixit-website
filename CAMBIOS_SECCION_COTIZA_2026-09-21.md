# CAMBIOS — Sección "Cotiza o reporta una falla"

Fecha: 2026-09-21
Estado: **PUBLICADO** en https://www.fixitsoluciones.com (deploy `jvvnrrml7`) por instrucción
expresa del propietario ("al final sube los cambios").
Archivo modificado: `index.html` (HTML de bullets + mapa, CSS). Ningún JS modificado.

---

## 1. Formulario compacto (solo CSS, funcionalidad intacta)

Se redujo la altura visual del formulario con reglas acotadas a `.reg-form` (no afectan al modal
de respaldo `.bk-modal`):

| Elemento | Antes | Después |
|---|---|---|
| Padding del contenedor `.reg-form` | 32px (móvil 22/18px) | 24/22px (móvil 18/16px) |
| Separación entre campos `.form-group` | 16px | 12px |
| Separación label → input | 6px | 4px |
| Altura de inputs/selects | 48px | 40px |
| Textarea | 96px | 80px |
| Opciones radio | 48px de alto | 40px de alto, gap 8→6px |

**Medición real (Chrome headless):**

| Vista | Métrica | Antes | Después | Cambio |
|---|---|---|---|---|
| Desktop 1440 | Sección `#cotizar` | 930px | 803px | −127px |
| Desktop 1440 | Formulario | 800px | 673px | −127px (−16%) |
| Móvil 390 | Formulario | 1056px | 894px | −162px (−15%) |
| Móvil 390 | Sección | 1472px | 1518px | +46px (por el mapa nuevo) |

**Funcionalidad intacta:** no se tocaron campos, `name`, `id`, `required`, orden, honeypot,
validaciones, el modal Stripe ni `assets/form.js` / Apps Script. Los tickets y alertas siguen
exactamente igual.

## 2. Fondo con gradiente sutil (Opción A)

- `#cotizar{background:linear-gradient(180deg,#E9F0F8 0%,#FFFFFF 58%,#FDF2ED 100%)}`:
  azul muy suave (tono de la paleta slate de FixIT) → blanco → coral apenas perceptible al final.
- Sin imágenes ni patrones: cero peso extra y responsive por definición. Los bordes superiores e
  inferiores de `.sec-alt` se conservan como separadores.

## 3. Íconos de los bullets (Lucide, línea, sin emojis)

- Librería: **Lucide** (`lucide-static` v1.47.0), licencia **ISC** (uso comercial libre; parte
  derivada de Feather bajo MIT). Misma librería usada en la iconografía anterior.
- Tamaño 20px, `stroke-width="2"`, `fill="none"`, color coral de FixIT vía `currentColor`.

| Bullet | Ícono Lucide | aria-label |
|---|---|---|
| Diagnóstico inicial sin costo | `stethoscope` | "Diagnóstico inicial sin costo" |
| Respuesta el mismo día hábil | `clock` | "Respuesta el mismo día hábil" |
| Remoto y visitas locales en Mexicali | `map-pin` | "Remoto y visitas locales en Mexicali" |

- Los 3 SVG llevan `role="img"` + `aria-label`; se eliminó el `fa-circle-check` de Font Awesome
  solo en esta lista. El copy de los bullets no cambió.

## 4. Elemento visual: mapa estilizado de Mexicali (Opción B)

- **No existe foto del equipo en el proyecto**: se revisaron todos los assets de imagen
  (`assets/`: hero/confianza-empresarial/testimonios/logo; `portfolio/`: portadas de proyectos).
  Por eso se implementó la Opción B del brief.
- Asset: **SVG inline original** creado a mano (sin assets de terceros ni de Nexcess, sin licencias
  restrictivas). Representa abstractamente la cuadrícula de la ciudad (18 bloques), una avenida
  diagonal, un canal y un pin coral con anillos de pulso.
- Etiqueta inferior: "Mexicali, B.C." (sin dirección ni datos inventados).
- Accesibilidad: `role="img"` + `aria-label="Mapa estilizado de Mexicali, B.C., con la ubicación de
  FixIT Soluciones"`.
- Responsive: ancho 100% del contenedor; en móvil se limita a 140px de alto con
  `preserveAspectRatio="xMidYMid slice"` para no alargar la sección.

## 5. Lo que NO se tocó

- Copy del título, subtítulo, bullets y link de WhatsApp de la columna izquierda.
- Campos, lógica, validaciones, honeypot y backend del formulario (tickets/alertas).
- Modal de contratación de respaldo (`#backupModal`), planes, precios y testimonios.
- Font Awesome se mantiene donde ya existía (WhatsApp, redes, etc.); solo se retiró de los bullets
  de esta sección.

## 6. Verificación

- `node --check` en los 7 JS: OK (ningún archivo JS fue modificado).
- Verificación estática de `index.html`: **118 checks, 0 fallos** (incluye balance HTML/CSS,
  3 `quote-ico` con `role="img"`, mapa presente, gradiente, regla de compactado, sin FA en
  `.quote-points`).
- QA real con Chrome headless (puppeteer-core temporal, fuera del workspace):
  - Medición antes (producción) vs después (local) en 1440 y 390, sin overflow horizontal.
  - Capturas: `_capturas/cotiza/before-desktop-1440.png`, `before-movil-390.png`,
    `after-desktop-1440.png`, `after-movil-390.png`.
- La landing es estática y no tiene build ni tests propios (no hay `package.json` en la raíz);
  se usó el mismo set de checks y QA de las tareas anteriores.

## 7. Deploy

- Vercel producción (`npx vercel --prod --yes`), proyecto `fixit-landing`, alias
  https://www.fixitsoluciones.com — deploy `jvvnrrml7`.
- `CAMBIOS_SECCION_COTIZA_2026-09-21.md` agregado a `.vercelignore`; verificado en producción:
  devuelve 404.
- Verificación post-deploy: home 200 con el gradiente, los 3 `quote-ico`, el mapa estilizado y las
  reglas del formulario compacto presentes.

## 8. Pendientes / notas

1. Cuando exista una foto real del equipo, se puede sustituir el mapa (Opción A) sin tocar el
   layout: reemplazar el `<svg>` del `figure.mapa-mexicali`.
2. Revisión humana rápida en iOS/Android reales; la verificación fue con Chrome headless.
3. La sección móvil creció ~46px por el mapa; el formulario bajó 162px. Si se prefiere priorizar
   altura total, se puede ocultar el mapa bajo 480px con una regla de una línea.
