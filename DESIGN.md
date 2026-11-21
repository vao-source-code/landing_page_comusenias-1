# DESIGN.md - Sistema de Diseño Swiss-Tech de Comuseñas

> Documento de tokens de diseño, tipografía, componentes y principios visuales de **Comuseñas** bajo estética **Swiss-Tech / Editorial de Precisión**.

---

## 1. Identidad y Filosofía Visual
- **Tono**: Preciso, innovador, humano, accesible y confiable.
- **Enfoque**: Inclusión real con contraste WCAG AA/AAA, lienzo blanco arquitectónico con grilla técnica hairline (`1px`), integración directa de fotografía recortada sin marcos y narrativa visual de visión computacional.
- **Firma visual**: Encabezados con contraste tipográfico (*Bold + Light*) rematados con punto cuadrado magenta (`#E052B2`), navegación prefijada con `+`, eyebrows monoespaciados y franja vertical degradada en el borde derecho del Hero.

---

## 2. Paleta de Colores y Tokens Semánticos

| Token CSS | Hex / Valor | Rol / Uso |
|---|---|---|
| `--color-primary` | `#4f35e8` | Violeta eléctrico principal (titulares, CTAs primarios, enlaces, retícula IA) |
| `--color-primary-deep` | `#3b25b8` | Hover de botones y énfasis de alto contraste |
| `--color-primary-dark` | `#543c9d` | Violeta institucional secundario |
| `--color-accent-magenta` | `#e052b2` | Punto cuadrado editorial, indicador de eyebrow y acento de borde |
| `--surface-canvas` | `#ffffff` | Lienzo principal limpio |
| `--surface-subtle` | `#fafafe` | Secciones alternadas |
| `--grid-line` | `rgba(79, 53, 232, 0.075)` | Líneas de grilla arquitectónica |
| `--border-hairline` | `rgba(17, 16, 29, 0.085)` | Divisores y bordes de tarjetas |
| `--color-ink` | `#11101d` | Texto principal (contraste > 16:1 sobre blanco) |
| `--color-on-surface-variant` | `#4b4860` | Texto secundario / párrafos (contraste > 7.5:1 sobre blanco) |

---

## 3. Tipografía (Unificada con la App Android ComuSenias)
- **Sans principal**: `Lato` (`300`, `400`, `700`, `900`) — misma tipografía oficial de la aplicación Android.
- **Acento manuscrito**: `Marck Script` (`cursiveSchool` en la app Android).
- **Mono técnico**: `JetBrains Mono` (`400`, `500`, `600`) para eyebrows, numeración `01/02/03`, `SCROLL DOWN` y telemetría.
- **Iconografía**: `Material Symbols Outlined` + SVGs geométricos animados.

---

## 4. Buenas Prácticas
1. Evitar estilos inline repetitivos; utilizar tokens CSS y clases utilitarias (`.swiss-card`, `.tech-eyebrow`, `.btn-precision-primary`).
2. Garantizar `:focus-visible` visible en todos los elementos interactivos y soporte completo de `prefers-reduced-motion: reduce`.
3. Solo aplicar `cursor: pointer` en elementos realmente interactivos.
