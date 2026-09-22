# CAMBIOS — Iconografía de la landing FixIT

Fecha: 2026-09-21
Estado: **PUBLICADO** en https://www.fixitsoluciones.com (deploy `1jr8tdmv5`, ✓ Ready in 7s) por
instrucción expresa del propietario ("al terminar sube los cambios"). Estilo inspirado en Nexcess,
sin copiar ningún SVG de Nexcess.
Archivo modificado: `index.html` (HTML + CSS). Ningún JS fue modificado.

---

## 1. Decisión de librería: Lucide

- **Librería elegida: Lucide** (`lucide-static` v1.47.0, fuente https://lucide.dev).
- **Licencia: ISC** (uso comercial libre). El subconjunto derivado de Feather (incluye `lock`,
  `map-pin`, `printer`, `refresh-cw`, `chart-column`, etc.) está bajo MIT. Ambas permiten uso
  comercial sin restricción; se conserva el aviso de licencia en este documento.
- Se descartaron los SVG de Nexcess por completo: solo se replicó el *estilo* (línea, 2 px,
  2 columnas, espacio en blanco, separadores sutiles).
- Alternativa evaluada: **Phosphor** (MIT, también libre). Se prefirió Lucide por su trazo de 2 px
  por defecto, cuadrícula consistente y ser la recomendación del brief. Cambiar a Phosphor más
  adelante implicaría reemplazar solo los 12 cuerpos SVG; la estructura y el CSS no cambian.

## 2. Método de integración

- **SVG inline** en `index.html`: sin CDN en tiempo de ejecución, sin npm en la landing, sin
  dependencia de JS para renderizar iconos.
- Atributos uniformes en todos los iconos: `viewBox="0 0 24 24"`, `fill="none"`,
  `stroke="currentColor"`, `stroke-width="2"`, `stroke-linecap="round"`,
  `stroke-linejoin="round"`.
- Tamaño: 24 px en Servicios, 32 px en Diferenciadores, 18 px dentro de botones y 16 px en el
  footer (clase `.ico` + contexto).
- Color: heredado con `currentColor` (coral en las tarjetas de Servicios, slate `#22344D` en la
  sección clara de Diferenciadores), conforme a "azul y negro" de FixIT.

## 3. Iconos elegidos (adaptados a nuestro producto)

### Servicios (4 tarjetas, icono de línea coral sobre tile suave)
| Bloque | Icono Lucide | Nota |
|---|---|---|
| Impresoras y redes | `printer` | Más literal para impresoras; se reservó `wrench` para mantenimiento |
| Mantenimiento preventivo | `wrench` | Herramienta = mantenimiento/reparación |
| Soporte remoto y local | `laptop` + badge `map-pin` | Composición del brief: laptop con pin de ubicación en la esquina |
| Respaldo empresarial | `lock` | Candado = respaldo protegido |

### Diferenciadores (`#diferenciadores`, nueva sección, icono slate de 32 px)
| Bloque | Icono Lucide | Nota |
|---|---|---|
| Cifrado en streaming | `lock-keyhole` | Candado con cerradura; en vez de "lock + waves" para mantener legibilidad a tamaño pequeño |
| Reanudación de subidas | `refresh-cw` | Ciclo de reintento; en vez de "upload + refresh" |
| Backups inmutables (Object Lock) | `shield-check` | Escudo con check; en vez de "shield + clock" |
| Keys aisladas por empresa | `key-round` | Llave por empresa |
| Dashboard en tiempo real | `chart-column` | Gráfica de estado/espacio |
| Soporte local en Mexicali | `map-pin` | Pin de ubicación local |

### Extras (iconos de producto en CTAs)
- Botón "Ver planes de respaldo" (hero) y línea de upsell del footer: `cloud-upload` en línea,
  reemplazando el icono Font Awesome de nube. Son decorativos: `aria-hidden="true"`.

## 4. Sección nueva y cambios de estructura

- "Lo que nos hace diferentes" pasó de ser 6 tarjetas con emoji dentro de `#respaldo` (fondo
  pizarra) a una **sección propia `#diferenciadores`** entre Respaldo y Cómo funciona.
- Estilo Nexcess: **2 columnas en desktop, 1 columna en móvil/tablet (≤900 px)**, icono arriba y
  texto abajo, mucho espacio en blanco, **separador vertical sutil** entre columnas y horizontales
  entre filas (borde `--border`), fondo blanco.
- Se eliminaron los emojis (🔐 🔄 🛡️ 🔑 📊 🏠) y el CSS muerto `.diff-grid` / `.diff-ico`.
- La sección pasó de `h3` a `h2` propio (`id="diff-title"`), mejorando la jerarquía.
- La estructura general se conserva: Respaldo → Diferenciadores → Cómo funciona → Paquetes →
  Testimonios → Contacto → FAQ → Cierre → Footer.

## 5. Accesibilidad

- Los 10 iconos de contenido llevan `role="img"` + `aria-label` descriptivo en español
  (p. ej. "Cifrado en streaming", "Soporte remoto y local").
- Los 2 iconos decorativos (botón de hero y footer) usan `aria-hidden="true"` para no duplicar el
  anuncio del texto que acompañan (buena práctica WCAG).
- Sin cambios en formularios, FAQ, navegación ni textos.

## 6. Verificación

- Tests/build: la landing es HTML/CSS/JS estático y **no tiene build ni tests** (no hay
  `package.json` en la raíz; `portfolio/` es otro proyecto Vite). Se ejecutó:
  - `node --check` en los 7 JS: OK.
  - Verificación estática de `index.html`: **108 checks, 0 fallos** (balance HTML/CSS, IDs únicos,
    anclas, assets, 12 `svg.ico`, 10 con `role="img"`, 2 decorativos, sin emojis previos, sin
    restos de `.diff-grid`, sin FA en Servicios, etc.).
- **QA real con Chrome headless** (puppeteer-core temporal, fuera del workspace):
  3 viewports × 10 comprobaciones = **30/30 OK**:
  - Desktop 1440: 2 columnas + separador vertical; tablet 768 y móvil 390: 1 columna sin
    separador vertical; cero overflow horizontal en los 3; 12 iconos visibles; 10 con aria-label;
    badge de pin presente; 4 iconos en Servicios.
- Capturas en `_capturas/iconografia/` (excluida del deploy):
  - `diferenciadores-desktop-1440.png`, `diferenciadores-tablet-768.png`, `diferenciadores-movil-390.png`
  - `servicios-desktop-1440.png`, `servicios-tablet-768.png`, `servicios-movil-390.png`
  - `hero-botones-desktop-1440.png`
  - `qa-resultado.txt` (salida completa del QA)
  Las capturas se tomaron con `prefers-reduced-motion: reduce` para congelar el revelado y mostrar
  todo el contenido.

## 7. Deploy

- Vercel producción (`npx vercel --prod --yes`), proyecto `fixit-landing`, alias
  https://www.fixitsoluciones.com — deploy `1jr8tdmv5`, ✓ Ready in 7s.
- `CAMBIOS_ICONOGRAFIA_2026-09-21.md` agregado a `.vercelignore` (igual que el doc anterior);
  verificado en producción: devuelve 404.
- Verificación post-deploy: home 200, `id="diferenciadores"` presente, 12 `class="ico"`, 10
  `role="img"` con `aria-label`, sin emojis previos, badge de pin presente.

## 8. Pendientes / notas

1. Validar con el propietario la selección final de iconos (se respetaron las sugerencias del brief
   con ajustes de adaptación documentados en la sección 3).
2. Si se prefiere Phosphor, se puede cambiar sin tocar CSS ni estructura.
3. Decidir si `#diferenciadores` se agrega al menú de navegación.
4. La verificación visual se hizo con Chrome headless; se recomienda una pasada humana rápida en
   desktop y móvil.
