# Mapa interactivo en "Cotiza o reporta una falla" - 2026-09-22

Estado: **borrador** (cambios locales en la landing, **sin publicar**).
Archivos tocados: `index.html` y nuevo `assets/mapa.js`.
Sin Google Maps, sin API keys, sin costos.

## 1. Que cambio (antes / despues)

| | Antes | Despues |
|---|---|---|
| Mapa | `<svg>` estilizado "fake" de 640x300 con cuadras, avenidas y un pin dibujado | Mapa real interactivo de Leaflet + OpenStreetMap |
| Interaccion | Ninguna | Zoom (botones y rueda tras interactuar), pan con drag, popup al hacer click en el marker |
| Pin | Forma SVG naranja dentro del mapa | Marker custom con pin naranja `#FF7A59` (mismo acento de FixIT) |
| Pie | `<figcaption>Mexicali, B.C.</figcaption>` | Se mantiene igual |
| Peso | SVG inline (~2 KB) | CSS+JS de Leaflet por CDN + tiles de OSM (carga diferida) |
| Fallback | n/a (era el unico mapa) | El SVG original se conserva oculto: si Leaflet no carga, se muestra |

## 2. Libreria y tiles

- **Leaflet 1.9.4** por CDN (unpkg), sin API key:
  - CSS en el `<head>` (tag exacto solicitado):
    ```
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    ```
  - JS cargado **por `assets/mapa.js` solo cuando el mapa entra al viewport**
    (`https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`).
- **Tile source: OpenStreetMap** `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
  con atribucion "© OpenStreetMap contributors".
- Centro: **32.6245, -115.4523** (Mexicali, B.C.), zoom **13**.

## 3. Como funciona (`assets/mapa.js`)

1. `IntersectionObserver` (con `rootMargin: 200px`) detecta cuando la seccion
   `#cotizar` se acerca al viewport; entonces inyecta el CSS (si falta) y el
   JS de Leaflet. Si el observador no existe (navegador viejo), carga de una.
2. `iniciarMapa()` crea el mapa, agrega la capa OSM, el marker custom y el
   popup "FixIT Soluciones — Mexicali, B.C.".
3. **Fallback:** el SVG original queda dentro de `.mapa-fallback`, visible
   hasta que el mapa carga; si `leaflet.js` falla (`onerror`), el SVG se
   queda. El contenedor solo cambia a `.mapa-listo` cuando Leaflet arranco.
4. **Scroll:** `scrollWheelZoom: false` por defecto (no secuestra el scroll de
   la pagina en movil); se habilita al hacer click en el mapa y se desactiva
   al salir. Drag, touch zoom y teclado activos.
5. **Accesibilidad:** el contenedor es `role="region"` con
   `aria-label="Mapa interactivo de Mexicali, B.C. con la ubicación de FixIT
   Soluciones"`; el SVG de respaldo conserva su `aria-label`; el marker tiene
   `title`/`alt`.

Estilos agregados (consistentes con el resto de la pagina): altura **280 px**
(220 px en movil), `border-radius: 18px`, borde y `box-shadow` iguales al
formulario, `z-index: 0` para no tapar el header sticky.

## 4. Verificacion ejecutada

- `node --check assets/mapa.js`: OK.
- Balance HTML: `<div>` 151/151, `<figure>` 1/1, `<svg>` 20/20.
- Render real con Chrome headless (file://) en 3 viewports, **0 errores de
  consola** y **0 requests fallidos**:

| Viewport | Leaflet | Tiles | Marker | Popup | Altura | Fallback |
|---|---|---|---|---|---|---|
| Desktop 1440x900 | OK | 6 | OK | "FixIT Soluciones / Mexicali, B.C." | 280 px | oculto |
| Movil 390x844 (2x) | OK | 4 | OK | OK | 220 px | oculto |
| Tablet 820x1180 | OK | 8 | OK | OK | 280 px | oculto |

- Nota: la landing es estatica (no hay `npm run build`); la verificacion fue
  sintaxis + balance + render en navegador.

## 5. Capturas

- `_capturas/mapa-2026-09-22-desktop.png`
- `_capturas/mapa-2026-09-22-movil.png`
- `_capturas/mapa-2026-09-22-tablet.png`

(La carpeta `_capturas` esta en `.vercelignore`: no se publica.)

## 6. Pendientes / notas

- **No publicado**: el cambio es borrador local; falta el deploy cuando el
  dueno lo apruebe.
- Los tiles de OSM requieren internet en el navegador del visitante (normal).
- Si se prefiere no depender de unpkg, se puede pasar Leaflet a local
  (`assets/vendor/leaflet/`) en otra tarea; hoy el CDN es el pedido.
- Cumple la politica de OSM para uso normal de tiles; si el trafico crece,
  evaluar un proveedor de tiles o self-hosting.
