# FIXIT Soluciones — Plan de Rediseño Premium con Scroll Storytelling

> Estado: PROPUESTA / AUDITORÍA. No se modificó ningún archivo existente. No se instaló nada. No hay commits.
> Fecha: 2026-09-15
> Alcance: `index.html` (landing principal). Archivos satélite (`cotizador.html`, `aviso-privacidad.html`, `terminos.html`, `apps_script_backend.js`, `portfolio/`) fuera de alcance salvo integración.

---

## 1. Auditoría — Stack real descubierto (no asumido)

**Framework / lenguaje / build:**
- Sin framework. HTML + CSS + JS vanilla en un solo archivo `index.html` (~54KB, ~1120 líneas, CSS en `<style>`, JS en `<script>` al final).
- Sin `package.json`, sin bundler, sin build. Deploy estático en Vercel (`vercel.json` solo con rewrites a `/portfolio/dist`). `cleanUrls: true`.
- `portfolio/` es un proyecto Vite separado (con `node_modules`), no afecta la landing. No tocar.
- `.bak` (`script.js.bak`, `style.css.bak`, `index-*.bak`) son residuos históricos. No se cargan. Candidatos a archivar fuera del repo, no borrar aún.

**Entry points:** `index.html` → `#hdr`, `.hero`, `.pain`, `#servicios`, `#trans`, `#planes` (+ `.cta` anidado), `#how`, `#cotizar`, `#faq`, `#contact` (footer), `.wa-float`, `#backToTop`, `#cookieBanner`.

**Sistema de diseño existente:**
- Tokens en `:root`: `--bg #FFFFFF`, `--bg2 #F5F6FA`, `--text #33475B`, `--text2 #516F90`, `--muted #7C98B6`, `--accent #FF7A59` (coral), `--accent-hover #FF8F73`, `--border #CBD6E2`, `--mw 1200px`, `--r 16px`, sombras suaves.
- Tipografías: `Inter` (cuerpo) + `Lexend Deca` (headings). Cargadas con `display=swap` + preconnect — bien.
- Iconos: Font Awesome 6.5 CDN. Imágenes: `assets/logo-fixit.png`, `assets/hero.jpg` (2.1MB — problema), `hero.png`, `confianza-empresarial.jpg`, `diagnostico-tecnico.jpg` (estas dos últimas no se usan en `index.html`).
- Animación actual: CSS-only. `heroIn`/`heroMediaIn` (una vez) + `.reveal`/`.stagger` con IntersectionObserver. Hover `translateY`. `waPulse`. Respeta `prefers-reduced-motion`. Sin GSAP, sin ScrollTrigger, sin Three.js.

**Integraciones / conversión / tracking:**
- CTA principal = WhatsApp `wa.me/526861959581` con texto pre-llenado (hero, nav, planes ×3, CTA intermedio, footer, barra móvil). Bien implementado.
- Formulario `#quoteForm` → `POST` a Google Apps Script (`APPS_SCRIPT_URL`) con `mode: no-cors`, guarda en Sheets + notifica por CallMeBot a WhatsApp. Doble propósito: `cotizacion` / `ticket`. Sin validación avanzada, sin honeypot, sin `aria-describedby`.
- Sin analytics (no GA, no Pixel, no GTM). Sin OG/Twitter meta, sin favicon propio (solo cotizador tiene favicon inline), sin JSON-LD, sin sitemap/robots visibles.

**Responsive:** breakpoints 992px / 768px / 600px. Nav hamburger con drawer. Grids colapsan a 1 col. Barra `.wa-float` fija solo móvil + `body{padding-bottom:64px}`. `back-to-top` cambia a `bottom:84px` en móvil para no chocar.

**SEO actual:** solo `<title>` + `description`. Faltan: canonical, OG, Twitter, `lang` es `es` (debería ser `es-MX`), hero img sin `fetchpriority`, sin headings estructurados para rich results.

**Accesibilidad actual (base decente):** `details/summary` nativo para FAQ (bien), `label for` en form, `aria-label` en menú/back-to-top/social, `:focus` de inputs visible. Faltan: skip-link, `<main>`/landmarks, `aria-expanded` en menú, foco visible global, `aria-live` en `#formMessage`, contraste de `--muted #7C98B6` sobre blanco (~3.5:1, falla 4.5:1 para texto pequeño), targets de 34px en social.

---

## 2. Problemas encontrados (severidad)

### Críticos
1. **Hero.jpg de 2.1MB sin optimizar, sin `width/height`, sin `fetchpriority`, sin WebP/AVIF.** Es el LCP. Cada segundo extra ≈ −7% conversión (skill `landing`).
2. **Cero prueba social.** Sin testimonios, sin logos, sin números, sin reseñas. `hasSocialProofAboveFold: false` = fallo mayor según `landing/CONVERSION.md`. Para un servicio B2B local esto es el killer #1.
3. **Sin OG/Twitter/canonical/JSON-LD.** Cada share en WhatsApp/Facebook (canal principal del negocio) sale sin preview.

### Importantes
4. **Arquitectura plana y genérica:** Hero → Dolor → Servicios → Antes/Después (6 tarjetas, demasiado largo) → Planes → CTA anidado dentro de planes (pierde fuerza) → Proceso → Form → FAQ → Footer. Orden casi correcto según CONVERSION.md pero: falta prueba social entre hero y dolor, y el CTA final real es el formulario, que queda enterrado tras 4 pasos del proceso.
5. **Sección Transformación (6 tarjetas antes/después) es el punto más débil:** texto repetitivo, flecha decorativa, mismo peso visual ×6. Es donde debe ir la experiencia de scroll, hoy es donde más se escanea y menos se lee.
6. **Diseño visual "correcto pero genérico":** Inter + cards blancas + radio 16px + sombra suave + acento coral <10% — pasa el test de los 5s (qué/quién/qué-hacer) pero falla el de memorabilidad (skill `reviewing-interface-quality`: "clean y modern = sin dirección"). `Lexend Deca` como display no tiene opinión; `Inter` como display es señal anti-slop.
7. **Sistema de tokens incoherente:** `--r:16px` pero cards usan 8/10/12/20/24px; sombras `shadow` + `shadow-lg` + valores ad hoc; `transition: all` en todas las cards (dispara layout/paint).
8. **Tipografía pequeña en móvil:** `hero h1 1.8rem` a 375px empuja el CTA bajo el fold. Regla `landing`: CTA visible a 375×812 sin scroll.
9. **Formulario con fricción:** 7 campos (nombre, empresa, teléfono, ubicación, servicio, prioridad, descripción) + radios. Sin `inputmode/autocomplete`, sin validación por campo con `aria-describedby`, el botón se deshabilita sin explicar, el mensaje de éxito se auto-borra a los 8s (el usuario puede perderlo), error genérico.

### Menores / polish
10. `scroll-behavior: smooth` sin gate de `prefers-reduced-motion` (el bloque reduce-motion sí cubre animaciones pero no el smooth scroll).
11. `overflow-x: hidden` en `body` (rompe `position: sticky` futuro — usar `clip`).
12. Contraste `--muted`, social icons 34px, `back-to-top` solo aparece con footer (descubribilidad baja).
13. `cotizador.html` duplica tokens y compite con `#cotizar` (dos caminos de cotización confunden).

**Test de 5 segundos (aplicado):** ¿Qué? Soporte técnico. ¿Para quién? Negocios en Mexicali. ¿Siguiente paso? Cotizar por WhatsApp. **Pasa.** Lo que falla es: ¿por qué creerles? (sin prueba) y ¿qué recordaré? (nada distintivo).

---

## 3. Lo que debe conservarse (no tocar sin justificación)

- **Propuesta de valor y copy en español claro, sin jerga.** "Soporte remoto + visitas en Mexicali", "respuesta el mismo día", "sin contratos forzosos". Convierte. Solo reescribir titulares para fuerza verbal, no cambiar el mensaje.
- **WhatsApp como CTA único primario.** Número, textos pre-llenados por plan, barra móvil con pulse. Es el motor comercial. Se amplifica, no se reemplaza.
- **Estructura de 3 planes + plan popular destacado + nota de "precios pueden variar".** Psicología de anclaje correcta. Conservar precios y lógica.
- **FAQ con `details/summary` nativo.** Accesible por defecto. Solo mejorar estilos + `name` para acordeón exclusivo si se desea.
- **Formulario dual cotización/ticket + backend Apps Script/Sheets/CallMeBot.** Flujo operativo real del negocio. Mejorar UX/a11y del front, no tocar el backend.
- **Reveal CSS actual como base no-JS.** Todo contenido visible sin JS (`.js` gate). Cualquier GSAP debe seguir esta regla: estado inicial visible, estado oculto solo dentro de GSAP.
- **Paleta coral + azul pizarra.** Es la marca. Se sistematiza (rampas, tokens), no se cambia de hue.
- **Archivos `.bak`, `portfolio/`, `voice-plans.js`, `index-*.bak`.** Ignorar. Limpieza posterior en fase separada.

---

## 4. Skills consultados y decisión ante conflictos

| Skill | Aporte adoptado |
|---|---|
| `landing` + `CONVERSION.md` | Orden de secciones, CTA único por viewport, prueba social inmediata, pricing después del valor, FAQ objeciones reales, targets LCP<2.5s, CTA a 375px. Autoridad final en todo lo comercial. |
| `gsap-frontend` | Engine central, `matchMedia(reduced-motion)`, `scrub` numérico, pin de sección completa, `refreshAfterAssets`, `overflow-x: clip`, transforms/opacity only. Autoridad en scroll. |
| `motion-design` | Arquetipo **Corporate-Premium**: `cubic-bezier(0.2,0,0,1)`, duraciones 200-400ms, stagger <500ms, 3 capas (primaria/secundaria/ambiental), entrance ease-out / exit ease-in. |
| `designing-frontend-interfaces` | Brief de 8 líneas + token block + una dirección estética + un momento memorable + restraint. Obliga a no usar Inter como display. |
| `designing-user-experience` | Estados del formulario (loading/error/success persistente), validación on-blur, `inputmode/autocomplete`, no borrar datos, CTA en alcance del pulgar. |
| `building-accessible-interfaces` | Skip-link, landmarks, foco `:focus-visible`, `aria-live`, contraste 4.5:1, targets 44px. Gate de salida. |
| `reviewing-interface-quality` | Rúbrica de revisión (2 anchos + valores computados), severidad Critical/Important/Minor. Gate final. |
| `applying-themes` | Se evaluó `tech-innovation` (dark terminal). **Rechazado** como tema global: el negocio es confianza local/diurna, no dev-tool. Se reserva como acento para el panel diagnóstico (sección oscura puntual). Prevalece la identidad coral clara existente. |
| `threejs-web` | Evaluado abajo. **Rechazado.** Ver §8. |

**Conflicto resuelto:** `landing` pide nav mínima (logo + CTA) vs UX que pide orientación. Decisión: nav desktop reducida a 4 anclas + CTA (se eliminan 2), móvil drawer igual. Gana `landing` porque el tráfico es campaña/WhatsApp, no exploración.

---

## 5. Tres conceptos visuales (metáforas propias, ninguna copia)

### Concepto A — "Panel de Diagnóstico / Estado del Sistema"
- **Metáfora:** la infraestructura del cliente vista como un tablero de salud FixIT: nodos (impresora, red, equipos) con estados.
- **Narrativa scroll:** cada fase del relato cambia el estado global: `CRÍTICO (rojo)` → `INESTABLE (ámbar)` → `DIAGNÓSTICO (escaneo)` → `INTERVENCIÓN (reparando)` → `ÓPTIMO (verde/coral)` → `PROTEGIDO (sello FixIT)`.
- **Comportamiento:** sección pinned de ~300vh. A la izquierda, panel sticky con barra de "salud del sistema" (0→100%), log de eventos y semáforos por nodo. A la derecha, las 7 fases hacen crossfade. Al avanzar, nodos se encienden, el log escribe líneas, la barra sube, el fondo pasa de gris frío a cálido.
- **Sensación:** alivio técnico, control, "alguien competente está al mando".
- **Ventajas:** mapea 1:1 con el servicio real (diagnóstico remoto), reutiliza iconos FA existentes, 100% DOM/CSS (baratísimo), accesible (texto real del log).
- **Riesgos:** puede leerse frío/clínico si el copy no humaniza.
- **Dificultad:** media-baja. GSAP timeline + ScrollTrigger scrub, sin canvas.
- **Mobile:** el panel se vuelve tira superior compacta (barra + % + 3 dots), fases en crossfade vertical normal sin pin largo.

### Concepto B — "La Oficina Que Vuelve a Respirar"
- **Metáfora:** una escena ilustrada (SVG) de una estación de trabajo/oficina: impresora con papel atascado, monitor con error, router con luz roja, reloj que avanza.
- **Narrativa:** con el scroll la escena se repara: el papel se libera, la pantalla pasa de error a dashboard, el router parpadea verde, sale sol por la ventana, el reloj se normaliza.
- **Comportamiento:** SVG pinned con capas parallax; cada fase dispara morphs (papel, ondas wifi, checkmarks que se dibujan con `stroke-dashoffset`).
- **Sensación:** cálida, humana, cercana al comercio local.
- **Ventajas:** máxima memorabilidad, diferenciación total.
- **Riesgos:** ilustración custom costosa; riesgo de look infantil si el trazo falla; más nodos SVG = más trabajo a11y (todo decorativo + texto real al lado).
- **Dificultad:** alta (ilustración + animación de paths).
- **Mobile:** SVG simplificado (3 elementos) o secuencia estática por fase.

### Concepto C — "Flujo de Información / Red Viva"
- **Metáfora:** paquetes de datos como partículas que viajan entre dispositivos; la red está rota (paquetes perdidos, líneas cortadas) y se restaura.
- **Narrativa:** caos de paquetes → diagnóstico (un pulso recorre la red) → reconexión (líneas se sueldan) → flujo laminar óptimo.
- **Comportamiento:** canvas 2D ligero o SVG animado con dash-flow + dots en `offset-path`; progress del scroll = integridad de la red (%).
- **Sensación:** moderna, dinámica, "velocidad".
- **Ventajas:** comunica "redes" (servicio estrella) mejor que ningún otro.
- **Riesgos:** abstracto para dueños de negocio no técnicos; canvas exige fallback y `prefers-reduced-motion` estricto; tienta a usar Three.js innecesariamente.
- **Dificultad:** media-alta.
- **Mobile:** se degrada a líneas estáticas + % textual; canvas apagado por defecto en móvil.

---

## 6. Concepto recomendado: A — Panel de Diagnóstico

**Por qué gana:** es el único que (1) el dueño de negocio entiende sin explicación ("así está mi sistema ahora"), (2) se construye con DOM semántico (SEO + a11y + performance intactos), (3) reutiliza el contenido existente de Antes/Después sin reescribirlo, solo re-coreografiándolo, y (4) convierte mejor: el estado final `PROTEGIDO` desemboca naturalmente en planes/CTA. B es más memorable pero su costo ilustración/calidad es desproporcionado para una landing operativa. C es bello pero abstracto para el público (comercios, oficinas, no ingenieros).

**Dirección estética (brief 8 líneas, skill `designing-frontend-interfaces`):**
```
Purpose:    Convertir visitas en cotizaciones WhatsApp para soporte técnico local.
Audience:   Dueños/encargados de negocios en Mexicali, 30-55 años, móvil 70%, sin vocabulario técnico.
Tone:       Instrumento de precisión cálido — clinical trust + trato humano.
Reference:  Tablero de aviónica simplificado + papelería de taller de barrio impecable.
Palette:    Papel claro base / pizarra tinta / un coral señal. Panel diagnóstico en pizarra oscura puntual.
Type:       Display con opinión (p.ej. Sora o Space Grotesk) + Inter solo cuerpo. Mono (JetBrains Mono/IBM Plex Mono) solo para el log del panel.
Memorable:  El "semáforo FixIT": tres nodos que pasan de rojo a verde mientras sube la salud del sistema.
Restraint:  Sin 3D, sin degradados morados, sin glassmorphism, sin más de un radio (12px) ni más de dos sombras.
```

---

## 7. Narrativa de scroll (7 batidas)

Pinned `#story` (~280vh desktop) + secciones normales antes/después. El panel es `position: sticky`, el progreso lo gobierna un timeline GSAP con `scrub: 1`.

| # | Fase narrativa | Estado sistema | UI del panel | Copy lateral |
|---|---|---|---|---|
| 1 | PROBLEMA | `CRÍTICO 18%` — 3 nodos rojos, log: "impresora sin respuesta…", "latencia 900ms…" | Fondo frío, parpadeo sutil | "Tres riesgos que tu negocio corre a diario" (reúso pain-cards, compactadas) |
| 2 | TENSIÓN | `INESTABLE 34%` — paquetes perdidos, ámbar | Contador de "horas perdidas" sube | "Cada falla es un viaje y horas esperando" |
| 3 | DIAGNÓSTICO | `ESCANEANDO 52%` — barrido vertical sobre nodos | Log escribe en vivo, mono | "Diagnóstico inicial sin costo. Revisamos impresoras, red y equipos" |
| 4 | INTERVENCIÓN | `REPARANDO 71%` — nodos pasan a ámbar→verde uno por uno | Checkmarks `stroke-dashoffset` | "La mayoría se resuelve remoto el mismo día" |
| 5 | RECUPERACIÓN | `ÓPTIMO 92%` — todo verde, flujo laminar | Barra llena, fondo se entibia | Antes/Después (3 pares, no 6 — se podan los redundantes) |
| 6 | CONFIANZA | `PROTEGIDO 100%` — sello FixIT + "monitoreo continuo" | Pulso calmado | Mini prueba social (la que hay que conseguir: clientes, equipos, tiempo respuesta) |
| 7 | ACCIÓN | Panel se colapsa en tarjeta CTA | Botón WhatsApp hereda el verde "sistema listo" | Sticky CTA: "Tu sistema también puede estar en 100%" + botones WA + ver planes |

Mobile/touch: sin pin largo; el panel es cabecera compacta que refleja la fase visible por IntersectionObserver; todo contenido legible sin scrub.

---

## 8. Motion strategy

**Taxonomía de uso (cada animación con función):**

- **Scroll-linked (scrub):** SOLO el timeline `#story` (salud %, log, semáforos, crossfade fases). `scrub: 1.1` desktop. Función: narrativa.
- **Entrance:** `Reveal` existente migrado a GSAP `batch` (y-translate 24px + opacity, 0.6s, `ease: power3.out`, stagger 0.08, presupuesto total <500ms). Función: jerarquía.
- **Pinned:** SOLO `#story`. Nada más se pinea (regla anti-mareo).
- **Parallax:** solo decorativo sutil en hero (`yPercent ±8`, `scrub: true`) + blobs del panel. Prohibido en texto.
- **Microinteractions:** botones (press 150ms + settle), FAQ chevron rotate, copy de plan seleccionado. Función: feedback.
- **Hover:** solo `transform + box-shadow`, nunca `all`. Desactivado en `hover: none`.
- **Count-up:** % salud + contador "horas recuperadas" (respeta reduced-motion: muestra valor final).
- **Morph:** checkmarks SVG y barra de salud (`scaleX` con `transform-origin: left`). Nada de morph de paths complejos.
- **Progress:** barra fina superior de lectura (2px coral) — ayuda a orientarse en página larga.

**Propiedades permitidas:** `transform`, `opacity`, `clip-path` (reveal de titulares), CSS vars (`--health`, `--phase`). Prohibido animar `width/height/top/left/margin/padding/box-shadow` en scrub.

**Firma de movimiento (skill `motion-design`, Corporate-Premium):**
```css
--dur-fast:120ms; --dur:240ms; --dur-slow:480ms;
--ease: cubic-bezier(0.2,0,0,1); --ease-out: cubic-bezier(0.16,1,0.3,1);
```

**Defensas:**
- `prefers-reduced-motion: reduce` → `mm.revert()`, contenido 100% visible, scrub desactivado, counters en valor final, `scroll-behavior: auto`.
- Touch/low-power: `matchMedia('(hover:none)')` o `hardwareConcurrency<=4` o `save-data` → sin pin, sin parallax, reveals instantáneos, canvas ninguno.
- `refreshAfterAssets` tras `hero.jpg` + `ResizeObserver` + `ScrollTrigger.refresh()`.

---

## 9. Decisión Three.js: NO se utiliza

Declaración explícita: **Three.js NO debe utilizarse en este proyecto.**

Razones: (a) ningún objeto necesita volumen real — semáforos, logs, barras y checks son información 2D; 3D añadiría peso (~600KB+) y riesgo WebGL sin ganancia narrativa; (b) el público usa móviles medios y redes variables en Mexicali — el costo perf/conversión es directo; (c) el skill `threejs-web` exige justificar "dónde 3D mejora significativamente la narrativa" — aquí no existe ese punto; un canvas 2D ya sería exceso. Si a futuro se quiere hero 3D, re-evaluar con presupuesto de frames y fallback, pero hoy es un anti-patrón para conversión local.

---

## 10. Estrategia de conversión (lo visual al servicio del CTA)

- **CTA primario único:** "Cotizar por WhatsApp" (verbo + beneficio). Secundario fantasma: "Ver servicios/planes". Nunca dos primarios juntos.
- **Aparición:** hero (above-fold) → sticky header CTA al hacer scroll (hoy el header lo pierde al abrir menú; se fija) → salida de `#story` (CTA contextual "Quiero mi sistema al 100%") → después de prueba social → cada plan → CTA final + formulario. Cobertura en los 4 cuartiles (regla `landing`).
- **Sticky mobile:** la barra `.wa-float` se conserva; se le añade `aria-label` y se oculta cuando el formulario está en viewport (evita tapar el submit).
- **Prueba social (hay que producirla, es la tarea comercial #1):** fila bajo el hero: "X negocios atendidos · Y equipos bajo soporte · respuesta el mismo día" + 2-3 testimonios con nombre/cargo/negocio/foto cuando existan. Sin inventar cifras: si no hay datos, usar garantías ("Diagnóstico inicial sin costo · Sin contratos forzosos · Respuesta el mismo día") como trust-line inmediata.
- **Formulario:** reducir a 5 campos (nombre, empresa, WhatsApp, servicio, descripción; ubicación/prioridad opcionales colapsadas), `inputmode`/`autocomplete`, validación on-blur con mensajes junto al campo + `aria-describedby`, mensaje de éxito persistente con folio (no auto-borrar), preservar datos al error, honeypot anti-spam.
- **Pricing:** conservar 3 tiers + badge popular. Añadir trust-line bajo planes ("Sin contratos forzosos · Cancela con 10 días de aviso").
- **FAQ:** conservar; añadir 1 pregunta de objeción real ("¿Qué pasa si no me convence el primer mes?") con respuesta de garantía.

---

## 11. Nueva arquitectura propuesta

```
Header sticky (logo + 4 anclas + CTA WA siempre visible)
↓
Hero (value prop + doble CTA + trust-line + hero.jpg optimizada)
↓
Trust-strip (números/garantías — NUEVO, compacto)
↓
Problem (3 pain-cards, podadas a 2 líneas c/u)
↓
#story — Panel Diagnóstico pinned (Problema→…→Confianza, §7)
↓
Services (3 servicios, reescritos como outcome: "Imprime sin fallas…")
↓
Plans (3 tiers, intactos + trust-line)
↓
Process (4 pasos, intacto, más compacto)
↓
CTA contextual ("¿No sabes qué plan te conviene?" — se mueve aquí, fuera de planes)
↓
Quote form (simplificado, §10)
↓
FAQ (7 preguntas, intactas + 1 de garantía)
↓
Final CTA (repetición exacta de la oferta del hero — NUEVO, hoy no existe)
↓
Footer + Contact (intacto)
```

Cambios vs actual: se inserta `Trust-strip` y `Final CTA`; el CTA anidado sale de planes; Transformación de 6 tarjetas se absorbe en `#story` (3 pares); nada más se elimina.

---

## 12. Componentes nuevos (todos vanilla, sin framework)

| Nombre | Propósito | Comportamiento / animación | Deps | Responsive |
|---|---|---|---|---|
| `StoryPanel` | Tablero sticky salud del sistema | Timeline scrub: `--health`, semáforos, log, checks | GSAP+ST CDN | Compacto superior en móvil, sin pin |
| `StoryPhase` ×7 | Copy por fase | Crossfade + `clip-path` titulares | GSAP | Stack vertical normal en móvil |
| `HealthBar` | Barra 0→100% + % count-up | `scaleX` + contador | GSAP | Igual, más alta (touch) |
| `NodeDot` | Semáforo por nodo | color + pulso (solo fase crítica) | CSS vars | Igual |
| `EventLog` | Líneas de log mono | Escritura progresiva ligada a progreso | GSAP | Máx 3 líneas en móvil |
| `TrustStrip` | Números/garantías bajo hero | Count-up on-enter | GSAP batch | Scroll-x snap en móvil |
| `StickyHeaderCTA` | CTA persistente | Aparece tras hero (`toggleClass`) | ST o IO | Solo WA icon+texto corto |
| `QuoteForm v2` | Form mejorado | Validación on-blur, `aria-live`, éxito persistente | vanilla | 1 columna, inputs 48px |
| `FinalCTA` | Cierre de oferta | Entrance simple | — | Botón full-width |
| `ScrollProgress` | Barra lectura 2px | `scaleX` scrub body | ST | Igual |

Ninguno requiere npm. GSAP vía CDN con `defer` + fallback: si el CDN falla, la página queda con el reveal CSS actual (progresivo, no bloqueante).

---

## 13. Responsive strategy

- **Desktop ≥1024:** pin 280vh, panel 2 columnas (tablero | fases).
- **Tablet 768-1023:** pin 200vh, panel 1 columna con tablero compacto arriba (sticky `top: 76px`).
- **Móvil ≤767:** sin pin ni scrub; fases como secciones con cabecera de estado; CTA WA full-width ≥48px; grids 1 col; `TrustStrip` en carrusel nativo; `.wa-float` se oculta ante `#cotizar` en viewport (IO).
- Reglas duras: `overflow-x: clip` (no hidden), imágenes con `aspect-ratio` + dimensiones, `100dvh`, `env(safe-area-inset-bottom)`, sin hover-only, texto no menor a 0.85rem en legal.

---

## 14. Accessibility strategy (WCAG 2.2 AA)

- Landmarks: `skip-link`, `<header>`, `<nav aria-label>`, `<main id>`, `<footer>`; un solo `h1`; orden sin saltos.
- `#story` es contenido real, no canvas: fases como `<section aria-labelledby>`, log con `aria-hidden` + resumen textual visible, salud con `role="progressbar" aria-valuenow`.
- Menú: `aria-expanded` + `aria-controls` + Esc + retorno de foco; drawer con `inert` cuando cerrado.
- Form: `<fieldset><legend>` para radios, `aria-describedby` hint+error, `aria-invalid`, foco al primer error, `#formMessage` con `aria-live="polite"` pre-existente, errores `role="alert"` persistentes.
- Foco `:focus-visible` global 2px coral con contraste 3:1; contraste body 4.5:1 (oscurecer `--muted` a `#5B7A99` o limitarlo a meta grande); targets 44px (social, nav, FAQ).
- Movimiento: gate completo `prefers-reduced-motion` + sin autoplay >5s + nada parpadea >3Hz.

---

## 15. Performance strategy (presupuesto)

Presupuesto: **LCP <2.5s en Moto G4 simulado, JS total <80KB gzip, imágenes <400KB totales, CLS <0.1.**

- `hero.jpg` (2.1MB) → WebP/AVIF ≤1200px + `fetchpriority="high"` + dimensiones + `object-position` actual; `logo` inline SVG o `loading eager` con tamaño; FA: subset o reemplazo por inline SVG (FA completo es ~100KB+).
- CSS crítico inline (ya lo es), resto igual; GSAP/ScrollTrigger `defer` desde CDN, solo en `no-preference` + `min-width:768px` + sin `save-data` (carga condicional).
- `content-visibility: auto` en secciones bajo el fold; `decoding="async"` en imgs no críticas.
- Medición: Lighthouse + `landing/_landing_audit.mjs` (LCP, CTA coverage, OG) antes/después en 1280 y 375.

---

## 16. Fases de implementación (archivos probables, sin tocar aún)

- **P1 Foundation:** tokens sistematizados + tipografía display + `overflow-x:clip` + metas SEO/OG/JSON-LD + optimización `hero` (solo `index.html`, `assets/`). Añadir `assets/hero-1200.webp`, `assets/og-1200x630.png`.
- **P2 Visual redesign:** Trust-strip, poda Transformación, CTA fuera de planes, Final CTA, header CTA persistente (`index.html`).
- **P3 Scroll experience:** `#story` HTML + `assets/story.js` + `assets/story.css` (nuevos; `index.html` solo con anclas). GSAP CDN.
- **P4 Motion:** migración reveals a GSAP batch + microinteractions + progress bar (`assets/motion.js`).
- **P5 Responsive:** breakpoints story, `wa-float` vs form, carrusel trust (solo CSS/JS nuevo).
- **P6 Accessibility:** landmarks, foco, form v2, contraste, menú (`index.html` + `assets/form.js`).
- **P7 Performance:** WebP/AVIF, FA subset, carga condicional GSAP, `content-visibility`, auditoría Lighthouse.
- **P8 Conversion review:** checklist `landing` (5s test, CTA/quartile, copy verb-first, trust-lines, FAQ garantía) + `ctaCoverage` verificado.
- **P9 Final QA:** screenshots 1440+390, keyboard walk, NVDA/VoiceOver 5min, `prefers-reduced-motion`, `reviewing-interface-quality` verdict Ship/No-ship.

---

## 17. Risk assessment

| Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|
| Scroll pinned daña conversión móvil | Media | Alto | Sin pin en móvil; CTA sticky conserva acción; test A/B de longitud |
| GSAP CDN falla / bloqueado | Baja | Medio | Fallback CSS-reveal; contenido visible por defecto; `defer` no bloqueante |
| Falta de testimonios reales retrasa trust | Alta | Alto | Lanzar con garantías + contadores operativos; pedir 3 testimonios a clientes actuales en P1 |
| Ilustración/copy de fases suena técnico | Media | Medio | Copy validado con dueño; log en lenguaje cliente, no sysadmin |
| `hero.webp` pierde calidad / LCP no baja | Baja | Medio | `quality 78`, fallback jpg, `fetchpriority`, preconnects ya existen |
| Form v2 rompe envío a Apps Script | Baja | Alto | No tocar payload ni URL; solo UX; prueba en staging con Sheet copia |
| Alcance se expande a `cotizador.html`/portfolio | Media | Medio | Congelar alcance: solo `index.html` + 2 assets nuevos hasta P9 |

---

## Veredicto de auditoría

**Ship with fixes.** La landing convierte hoy (mensaje claro, WA omnipresente, pricing honesto, form operativo) pero es genérica y sin prueba social. El rediseño propuesto reutiliza ~80% del contenido y componentes, añade una sola sección memorable (`#story`), y subordina todo el movimiento a narrativa y conversión. Three.js queda descartado por escrito. GSAP solo donde el scroll cuenta la historia.

*Fin del plan. Detenido antes de implementación, como se ordenó.*
