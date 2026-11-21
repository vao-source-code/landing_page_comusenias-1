# DESIGN.md - Sistema de Diseño de Comuseñas

> Documento de tokens de diseño, tipografía, componentes y principios visuales de **Comuseñas** para consistencia en la web e interfaz de usuario asistida por IA.

---

## 1. Identidad y Filosofía Visual
- **Tono**: Cálido, accesible, educativo, innovador y confiable.
- **Enfoque**: Inclusión real, contrastes legibles para personas con baja visión, microinteracciones suaves y diseño adaptado a móviles.
- **Estilo**: Modern glassmorphism sutil sobre degradado lavanda/violeta con bordes redondeados orgánicos (`rounded-4`, `rounded-5`, `rounded-pill`).

---

## 2. Paleta de Colores y Tokens Semánticos

### Colores Principales (Brand Tokens)
| Token CSS | Hex | Rol / Uso |
|---|---|---|
| `--color-primary` | `#543c9d` | Violeta principal institucional (títulos, botones primarios, acentos) |
| `--color-primary-dark` | `#4a3b8d` | Variante oscura para alto contraste |
| `--color-primary-fixed` | `#e7deff` | Fondo violeta suave / badges / píldoras destacadas |
| `--color-primary-light` | `#ede7f6` | Contenedores de iconos y fondos sutiles |
| `--color-secondary` | `#4453bf` | Acento azul índigo (secciones interactivas, validación IA) |
| `--color-secondary-fixed` | `#dfe0ff` | Fondo índigo suave para badges secundarios |

### Colores Neutros y de Superficie
| Token CSS | Hex | Rol / Uso |
|---|---|---|
| `--color-surface` | `#f7f5fa` | Fondo global de la aplicación |
| `--color-surface-card` | `rgba(255, 255, 255, 0.85)` | Fondo de tarjetas con glassmorphism |
| `--color-on-surface` | `#1f1c2b` | Texto principal de alta legibilidad |
| `--color-on-surface-variant`| `#494551` | Texto secundario / párrafos descriptivos |
| `--color-border-subtle` | `rgba(84, 60, 157, 0.12)` | Bordes finos de tarjetas y separadores |

### Colores de Estado y Acentos Específicos
| Token | Hex | Rol |
|---|---|---|
| `--color-soft-yellow` | `#FFF4A3` | Acento cálido / blobs decorativos |
| `--color-warm-amber` | `#fff3dc` | Badges de alerta / seguimiento QR |
| `--color-success` | `#10b981` | Estado activo / validación correcta |

---

## 3. Tipografía

- **Fuente principal**: `Nunito Sans`, sans-serif (legible, limpia, amigable).
- **Iconografía**: `Material Symbols Outlined`.

### Escala Tipográfica
- `font-display-lg`: `clamp(2rem, 5.5vw, 3rem)`, `font-weight: 800` (Hero titles).
- `font-display-md`: `clamp(1.75rem, 4vw, 2.25rem)`, `font-weight: 800` (Títulos de sección).
- `font-headline-lg`: `clamp(1.5rem, 3.5vw, 2rem)`, `font-weight: 700`.
- `font-title-md`: `20px` / `line-height: 28px`, `font-weight: 600`.
- `font-body-lg`: `clamp(1rem, 2vw, 1.125rem)`, `line-height: 1.6`, `font-weight: 400`.
- `font-label-bold`: `14px`, `font-weight: 700`, `letter-spacing: 0.05em`.

---

## 4. Elevación y Tarjetas (Glassmorphism)

### Glass Card Base (`.glass-card`)
- Fondo: `rgba(255, 255, 255, 0.7)` a `0.85`.
- Backdrop filter: `blur(16px)`.
- Borde: `1px solid rgba(255, 255, 255, 0.5)`.
- Radio: `1.5rem` (`24px`).
- Sombra base: `0 4px 6px -1px rgba(0, 0, 0, 0.05)`.
- Hover: `translateY(-6px)`, sombra `0 16px 25px -5px rgba(84, 60, 157, 0.15)`.

---

## 5. Reglas de Componentes

### Botón Store / Acción Primaria
- Fondo: `#1c1924` o gradiente `linear-gradient(135deg, #6b4cce, #543c9d)`.
- Texto: Blanco con letra de apoyo al 85% de opacidad.
- Hover: Leve elevación `translateY(-3px)` con sombra de color primario.

### Tarjetas de Perfil / Fundadores (`.founder-card`)
- Proporción de imagen: `aspect-ratio: 1 / 1`, con `object-fit: cover` y `object-position: center top`.
- Enlaces sociales: botón circular de `38px` con fondo `var(--color-primary-fixed)` y hover a color primario.

### Badges / Píldoras
- Clases recomendadas: `.badge-primary-soft`, `.badge-indigo-soft`, `.badge-amber-soft`.
- Padding: `py-2 px-3`, `border-radius: 50rem` (`rounded-pill`), texto en semibold.

---

## 6. Buenas Prácticas para Código Futuro
1. **No usar estilos inline `style="color: #4a3b8d"`**: Utilizar las clases utilitarias (`text-brand-primary`, `bg-brand-soft`, etc.) o variables CSS.
2. **Imágenes siempre adaptadas**: Especificar `aspect-ratio`, `object-fit: cover`, `loading="lazy"` y `decoding="async"`.
3. **Microinteracciones consistentes**: Duración estándar `0.35s` con curva `cubic-bezier(0.16, 1, 0.3, 1)`.
