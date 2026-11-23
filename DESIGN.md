# DESIGN.md - Sistema de Diseño Lúdico-Moderno de Comuseñas

> Documento de tokens de diseño, tipografía, componentes y principios visuales de **Comuseñas** bajo estética **Lúdica-Moderna Inclusiva** (inspirada en Duolingo / Lingokids, manteniendo claridad y respaldo para familias, escuelas y especialistas).

---

## 1. Identidad y Filosofía Visual
- **Tono**: Alegre, cercano, motivador, inclusivo y confiable.
- **Enfoque**: Contraste accesible WCAG AA/AAA, lienzo cálido claro (`#FFFDF7` y `#F5F3FF`), formas orgánicas suaves, botones táctiles 3D ("chunky") con respuesta física al clic y práctica interactiva en vivo con cámara.
- **Firma visual**: Títulos redondeados amigables en `Fredoka`, tarjetas con bordes de `2px` y esquinas generosas (`1.5rem`), pills coloridos de estado/nivel y botones 3D con sombra inferior sólida.

---

## 2. Paleta de Colores Oficial (Unificada con `Color.kt` de Android)

| Token CSS | Hex / Valor | Rol / Uso |
|---|---|---|
| `--color-primary` | `#7584f2` | `primaryColorApp` — Azul-violeta periwinkle oficial (medallas y marca) |
| `--color-primary-deep` | `#5262d6` | Sombra 3D y texto de alto contraste WCAG AA |
| `--color-secondary` | `#8164ff` | `primaryBlackColorApp` — Violeta pastel secundario |
| `--color-play-green` | `#4e9a7c` | Derivado accesible de `greenColorApp` (`#6aaf93`) para CTA "Jugar / ¡Correcto!" |
| `--color-play-yellow` | `#f2d05c` | `cardColorCheckPoint` — Estrellas, logros y recompensas |
| `--color-accent-magenta` | `#a275fd` | `violetGlow` — Lavanda brillante para acentos |
| `--surface-canvas` | `#fafcff` | `backgroundColorTextField` — Lienzo principal limpio |
| `--surface-subtle` | `#f3f8fe` | `cardInProgress` — Secciones alternadas en celeste muy suave |
| `--color-ink` | `#252525` | `blackColorApp` — Texto principal de alto contraste |
| `--color-on-surface-variant` | `#52586e` | Texto secundario / párrafos |

---

## 3. Tipografía (Unificada con la App Android ComuSenias)
- **Principal y Display**: `Lato` (`300`, `400`, `700`, `900`) — exactamente la misma tipografía oficial de la aplicación Android (`lato_regular`, `lato_bold`, `lato_black`).
- **Acento manuscrito escolar**: `Marck Script` (`marck_script.ttf` en la app Android).
- **Iconografía**: `Material Symbols Outlined` + medallas e ilustraciones oficiales de la app (`src/assets/vocales`).

---

## 4. Buenas Prácticas
1. Utilizar botones táctiles 3D (`.btn-playful-primary`, `.btn-playful-violet`, `.btn-playful-secondary`) y tarjetas redondeadas (`.playful-card`).
2. Garantizar `:focus-visible` claro en todos los elementos interactivos y soporte completo de `prefers-reduced-motion: reduce`.
3. La cámara en la mini-demo web **nunca** se solicita al cargar la página: solo cuando el usuario decide iniciar la práctica, procesando el modelo `.task` de MediaPipe **100% localmente en el navegador**.
