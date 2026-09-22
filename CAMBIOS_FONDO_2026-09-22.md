# Fondo de las secciones grises a #33475B — 2026-09-22

Estado: **PUBLICADO** en https://www.fixitsoluciones.com (deploy Vercel producción
`fixit-landing-63g80hw9g`, ✓ Ready) y **subido a GitHub** en `sigasa1990-ai/fixit-website`
(commit `38f6a6d`, rama `main`), al final del trabajo y con el QA en verde.
Archivo modificado: `index.html` (solo CSS: un bloque nuevo en `index.html:262`).
Ningún JS, HTML de secciones, textos ni estructura fueron modificados.
Documento nuevo: `CAMBIOS_FONDO_2026-09-22.md`.

---

## 1. Identificación de secciones (paso 1)

La landing usa dos fondos alternados:

- Blancas: `.sp` sin fondo propio (heredan el blanco del `body`).
- Grises: clase `.sec-alt` → `background:var(--bg2)` con `--bg2:#F5F6FA` (`index.html:86`).

Secciones con `.sec-alt` (grises) encontradas:

| Sección | Clase CSS | Fondo antes | Acción |
|---|---|---|---|
| `#cuando-falla` ("Cuando algo falla, no hablas con un robot") | `sp sec-alt` | `#F5F6FA` | Cambiada a `#33475B` |
| `#compatibilidad` ("Compatibilidad") | `sp sec-alt` | `#F5F6FA` | Cambiada a `#33475B` |
| `#cierre` (CTA final, banda exterior de la tarjeta) | `sp sec-alt` | `#F5F6FA` | Cambiada a `#33475B` |
| `#cotizar` ("Cotiza o reporta una falla") | `sp sp-tight sec-alt` | Gradiente claro (`#cotizar{background:linear-gradient(180deg,#E9F0F8 0%,#FFFFFF 58%,#FDF2ED 100%)}`, `index.html:317`) | **Sin cambios** (está en tu lista de "no tocar"; su fondo real no es el gris sino un gradiente claro) |
| `#respaldo` | propia | Ya era `#33475b` | Sin cambios (ya estaba en el color destino) |

Secciones blancas que **NO** se tocaron (verificado en QA): hero, `#planes`,
`#diferenciadores`, `#como-funciona`, `#clientes`, `#faq` (todas sin fondo propio) y `#servicios`
(coral `#FF7A59`). El footer es coral (`.footer{background:var(--accent)}`), tampoco se tocó.

## 2. Cambio de fondo (paso 2)

Se agregó un bloque al final del bloque de contraste existente (`index.html:262`), apuntando
solo a los IDs de las secciones grises (no se modificó `.sec-alt`, así `#cotizar` conserva su
gradiente intacto):

```css
#cuando-falla, #compatibilidad, #cierre{background:#33475B;border-color:rgba(255,255,255,.2)}
```

- Padding, tipografía, grid y layout intactos (solo cambia color).
- `#cierre` conserva su tarjeta interior `.final-cta` con `background:var(--slate)` `#22344D`
  (no se tocó), por lo que la banda azul `#33475B` y la tarjeta quedan en capas.

## 3. Ajustes de contraste (paso 3)

Solo dentro de las secciones cambiadas (los estilos globales no se tocaron):

| Elemento | Antes | Después |
|---|---|---|
| Títulos `.st` (`#cuando-falla`, `#compatibilidad`) | `--text` `#33475B` | `#FFFFFF` |
| Línea bajo el título `.st::after` | coral | `#FFFFFF` (igual que en `#respaldo`/`#servicios`) |
| Subtítulo `.ss` (Compatibilidad) | `--text2` `#3F5A75` | `rgba(255,255,255,.85)` |
| Nota al pie (Compatibilidad) | `--text2` | `#FFFFFF` |
| H3 de bloques (Cuando algo falla) | `--text` | `#FFFFFF` |
| Párrafos de bloques (Cuando algo falla) | `--text2` | `rgba(255,255,255,.85)` |
| Íconos de línea (Cuando algo falla) | `--slate` `#22344D` | `#FFFFFF` (hover se mantiene coral `--accent`) |
| Bordes de sección `.sec-alt` | `--border` `#CBD6E2` | `rgba(255,255,255,.2)` |
| Separadores del grid de iconos | `--border` | `rgba(255,255,255,.2)` |
| Tarjetas Windows/macOS-Linux | Fondo blanco, texto oscuro | **Sin cambios** (contraste preservado) |
| Checks verdes / cruz roja | `#1E9E6A` / `#C0392B` | **Sin cambios** (siguen sobre tarjeta blanca) |
| Links | No hay links en estas secciones; el link del CTA final ya era blanco subrayado | Sin cambios |

Contraste calculado sobre `#33475B` (WCAG):

- Texto blanco `#FFFFFF`: **9.58:1** (AA/AAA).
- Texto blanco 85% (efectivo `rgb(224,227,230)`): **7.43:1** (AA/AAA).
- Ícono coral `#FF7A59` (solo hover): **3.73:1** (aceptable para texto grande/íconos según WCAG 1.4.11).

## 4. Verificación (paso 4)

- **Estático**: 49/49 OK (balance HTML, IDs únicos, anclas, contenido de Compatibilidad, FAQ,
  CSS). El HTML de secciones no cambió: solo el bloque CSS nuevo.
- **JS**: `node --check` en los 7 archivos de `assets/`: 7/7 OK (ningún JS modificado).
- **QA Chrome headless** sobre servidor HTTP local, 3 viewports × 31 comprobaciones =
  **93/93 OK, 0 errores de consola**:
  - Fondos: `#cuando-falla`, `#compatibilidad`, `#cierre` y `#respaldo` en `rgb(51,71,91)`.
  - Blancas intactas: `#planes`, `#diferenciadores`, `#como-funciona`, `#clientes`, `#faq`
    sin fondo; `body` blanco; `#servicios` coral; `#cotizar` conserva su `linear-gradient`.
  - Textos: títulos blancos, párrafos `rgba(255,255,255,0.85)`, iconos blancos,
    nota blanca; bordes `rgba(255,255,255,0.2)`.
  - Tarjetas de Compatibilidad blancas con texto oscuro y checks verde/rojo intactos;
    tarjeta `.final-cta` con su color original `rgb(34,52,77)`.
  - Sin overflow horizontal en 1440/768/390; grid de compatibilidad 2/2/1 columnas.

## 5. Capturas

En `_capturas/fondo-2026-09-22/` (excluida del deploy):

- `cuando-falla-desktop-1440.png`, `cuando-falla-tablet-768.png`, `cuando-falla-movil-390.png`
- `compatibilidad-desktop-1440.png`, `compatibilidad-tablet-768.png`, `compatibilidad-movil-390.png`
- `cierre-desktop-1440.png`, `cierre-tablet-768.png`, `cierre-movil-390.png`
- `qa-resultado.txt` (calculos de contraste + salida completa del QA)

Capturas tomadas con `prefers-reduced-motion: reduce` para congelar el revelado.

## 6. Restricciones respetadas

- Desarrollo en borrador; la publicación se hizo al final por instrucción del dueño.
- **No se tocaron las secciones blancas** (verificado por computed styles en los 3 viewports).
- **Solo se cambiaron fondos y colores** de las secciones grises: nada de estructura,
  contenido, textos, padding ni tipografía.
- `#cotizar` quedó intacta (gradiente original).

## 7. Publicación y verificación post-deploy (2026-09-22)

- **Git**: commit `38f6a6d` ("Cambia el fondo de las secciones grises a #33475B con contraste
  ajustado") subido a `main`; incluye capturas y este documento. `CAMBIOS_FONDO_2026-09-22.md`
  agregado a `.vercelignore` (404 en producción).
- **Deploy**: `npx vercel --prod --yes` → alias https://www.fixitsoluciones.com.
- **QA contra producción**: mismos 31 checks × 3 viewports = **93/93 OK, 0 errores de consola**
  (computed styles reales desde el sitio en vivo; capturas en
  `_capturas/fondo-2026-09-22-prod/`).
- **HTTP**: home 200 con la regla CSS nueva presente; docs y capturas devuelven 404.
