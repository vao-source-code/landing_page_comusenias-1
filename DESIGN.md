# DESIGN.md - Sistema de Diseño Lúdico-Moderno de Comuseñas

> Documento de tokens de diseño, tipografía, componentes y principios visuales de **Comuseñas** bajo estética **Lúdica-Moderna Inclusiva** (inspirada en Duolingo / Lingokids, manteniendo claridad y respaldo para familias, escuelas y especialistas).

---

## 1. Identidad y Filosofía Visual
- **Tono**: Alegre, cercano, motivador, inclusivo y confiable.
- **Enfoque**: Contraste accesible WCAG AA/AAA, lienzo limpio (`#FAFCFF`), secciones alternadas en celeste suave (`#F3F8FE`) y lavanda suave (`#F5F1FF`), atmósfera inspirada en `bg_home_opt.xml` (`#D2B1FF → #9E6FFC → #7F63FF`), botones táctiles 3D con respuesta física al clic y práctica interactiva en vivo con cámara.
- **Firma visual**: Tipografía limpia `Lato`, tarjetas con bordes de `2px` (`#DDE4FB`) y esquinas generosas (`1.5rem`), pills en paleta pastel oficial y botones 3D con sombra inferior sólida (periwinkle `#7584F2` para marca/descarga y verde `#4E9A7C` exclusivo para la práctica interactiva *"Probar la letra A ahora"* y aciertos).

---

## 2. Paleta de Colores Oficial (Unificada con `Color.kt` y `bg_home_opt.xml` de Android)

| Token CSS | Hex / Valor | Rol / Uso |
|---|---|---|
| `--color-primary` | `#7584f2` | `primaryColorApp` — Azul-violeta periwinkle oficial (marca, CTAs y medallas) |
| `--color-primary-deep` | `#5262d6` | Sombra 3D y texto de alto contraste WCAG AA |
| `--color-secondary` | `#8164ff` | `primaryBlackColorApp` — Violeta secundario |
| `--app-lavender` | `#d2b1ff` | `bg_home_opt.xml` — Lavanda pastel del fondo oficial de la app |
| `--app-violet-glow` | `#9e6ffc` | `bg_home_opt.xml` — Violeta brillante intermedio |
| `--color-play-green` | `#4e9a7c` | Derivado accesible de `greenColorApp` (`#6aaf93`) exclusivo para "Probar la letra A ahora" y aciertos |
| `--color-play-yellow` | `#f2d05c` | `cardColorCheckPoint` — Estrellas, logros y recompensas |
| `--surface-canvas` | `#fafcff` | `backgroundColorTextField` — Lienzo principal limpio |
| `--surface-subtle` | `#f3f8fe` | `cardInProgress` — Secciones alternadas en celeste muy suave |
| `--surface-lavender` | `#f5f1ff` | Secciones alternadas en lavanda ultra-suave |
| `--color-ink` | `#252525` | `blackColorApp` — Texto principal de alto contraste |
| `--color-on-surface-variant` | `#52586e` | Texto secundario / párrafos |

---

## 3. Tipografía (Unificada con la App Android ComuSenias)
- **Única familia tipográfica**: `Lato` (`300`, `400`, `700`, `900`) — exactamente la misma tipografía oficial de la aplicación Android (`lato_regular`, `lato_bold`, `lato_black`), priorizando pesos `400` y `700` para lectura abierta y amigable.
- **Iconografía**: `Material Symbols Outlined` + medallas e ilustraciones oficiales de la app (`src/assets/vocales`).

---

## 4. Buenas Prácticas
1. Utilizar botones táctiles 3D (`.btn-playful-primary`, `.btn-playful-violet`, `.btn-playful-secondary`) y tarjetas redondeadas (`.playful-card`).
2. Garantizar `:focus-visible` claro en todos los elementos interactivos y soporte completo de `prefers-reduced-motion: reduce`.
3. La cámara en la mini-demo web **nunca** se solicita al cargar la página: solo cuando el usuario decide iniciar la práctica, procesando el modelo `.task` de MediaPipe **100% localmente en el navegador**.
