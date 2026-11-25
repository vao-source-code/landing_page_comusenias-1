import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve(process.cwd(), 'dist/comu-senias');
const BASE_HTML_PATH = path.join(DIST_DIR, 'index.html');
const SITE_ORIGIN = 'https://xn--comuseas-i3a.com.ar';

const ABOUT_BODY_HTML = `
      <header>
        <h1>Sobre Comuseñas: Tecnología con Propósito e Inclusión Real</h1>
        <p>Comuseñas nació como un proyecto de impacto social en la Universidad Nacional de La Matanza (UNLaM), en San Justo, Provincia de Buenos Aires, Argentina. Fue impulsado por Juan Guerrero Aguilar —quien vive con hipoacusia profunda bilateral— junto a Víctor Orue (Ingeniero de Software y cofundador) y el equipo inicial de desarrollo integrado por Pablo Carballo, Fabián Zárate y Fernando Benítez.</p>
      </header>
      <main>
        <section>
          <h2>Misión y Respaldo Institucional</h2>
          <p>Al experimentar en primera persona las barreras de comunicación durante la virtualidad y notar que más del 90% de los niños sordos nacen en familias oyentes, el equipo diseñó una plataforma gratuita para aprender Lengua de Señas Argentina (LSA, reconocida por la Ley Nacional 27.710) mediante visión artificial en tiempo real.</p>
          <p>El proyecto fue distinguido con el <strong>1° Premio en Expo Proyecto UNLaM</strong>, seleccionado en las Jornadas Internacionales de Jóvenes Emprendedores (JIJE — UNL) y destacado por medios nacionales como El Trece (Otro Día Perdido con Mario Pergolini), Clarín, Página|12, Primer Plano Online, Viví el Oeste y el Portal CyT UNLaM.</p>
        </section>
        <nav>
          <a href="/">Inicio</a> |
          <a href="/especialistas-y-familias">Especialistas y Familias</a> |
          <a href="/contacto">Contacto</a> |
          <a href="/privacidad">Política de Privacidad</a> |
          <a href="/llms.txt">llms.txt</a>
        </nav>
      </main>
    `;

const CONTACT_BODY_HTML = `
      <header>
        <h1>Contacto — Comuseñas (App de Lengua de Señas Argentina)</h1>
        <p>Canal oficial de contacto de Comuseñas para familias, escuelas, docentes integradores, fonoaudiólogos, medios de prensa e instituciones educativas de toda Argentina.</p>
      </header>
      <main>
        <section>
          <h2>¿Cómo comunicarte con el equipo de Comuseñas?</h2>
          <p>Podés escribirnos directamente a nuestro correo electrónico oficial <strong>comusenias@gmail.com</strong> o completar el formulario web disponible en esta página. Respondemos consultas sobre implementación en escuelas, vinculación del Rol Especialista por código QR, sugerencias pedagógicas sobre Lengua de Señas Argentina (LSA) y soporte técnico de la aplicación móvil en Android.</p>
          <ul>
            <li><strong>Correo electrónico de soporte:</strong> comusenias@gmail.com</li>
            <li><strong>Ubicación:</strong> San Justo, La Matanza, Provincia de Buenos Aires, Argentina</li>
            <li><strong>Descarga oficial gratuita (Android):</strong> <a href="https://play.google.com/store/apps/details?id=com.ars.comusenias&hl=es_AR">Google Play Store</a></li>
          </ul>
        </section>
        <nav>
          <a href="/">Inicio</a> |
          <a href="/sobre-nosotros-unlam">Sobre Nosotros (UNLaM)</a> |
          <a href="/privacidad">Política de Privacidad</a> |
          <a href="/llms.txt">llms.txt</a>
        </nav>
      </main>
    `;

const PRIVACY_BODY_HTML = `
      <header>
        <h1>Política de Privacidad — Comuseñas</h1>
        <p>En Comuseñas protegemos la privacidad de los niños, familias y especialistas que utilizan nuestra plataforma educativa para aprender Lengua de Señas Argentina (LSA).</p>
      </header>
      <main>
        <section>
          <h2>Uso de la cámara y visión artificial (IA)</h2>
          <p>La aplicación solicita acceso a la cámara del dispositivo móvil exclusivamente para validar gestos de manos y expresiones faciales en tiempo real mediante modelos de visión computacional (MediaPipe). El procesamiento de las señas se orienta a la corrección pedagógica inmediata y no comercializamos ni vendemos grabaciones biométricas ni datos personales de menores a terceros.</p>
        </section>
        <section>
          <h2>Datos de perfil, seguimiento QR y contacto</h2>
          <p>Los datos mínimos de progreso de aprendizaje se utilizan para guardar el avance del usuario y permitir la vinculación privada con un familiar o especialista mediante código QR. Para solicitar acceso, modificación o eliminación de datos personales, podés escribirnos en cualquier momento a <strong>comusenias@gmail.com</strong>.</p>
        </section>
        <section>
          <h2>Publicidad en el sitio web (Google AdSense)</h2>
          <p>Algunas páginas informativas del sitio web pueden mostrar bloques publicitarios de Google AdSense configurados en modo de anuncios no personalizados para resguardar la privacidad de familias y escuelas.</p>
        </section>
        <nav>
          <a href="/">Inicio</a> |
          <a href="/terminos">Términos y Condiciones</a> |
          <a href="/contacto">Contacto</a> |
          <a href="/llms.txt">llms.txt</a>
        </nav>
      </main>
    `;

const ROUTES = [
  {
    slug: 'ios',
    title: 'Comuseñas para iPhone y iPad (iOS) — Lista de espera',
    description:
      '¿Usás iPhone o iPad? Dejanos tu correo y te avisamos apenas lancemos la versión para iOS de Comuseñas, la app gratuita para aprender LSA con IA.',
    ogType: 'website',
    breadcrumbName: 'Lista de espera iOS',
    bodyHtml: `
      <header>
        <h1>Comuseñas para iPhone y iPad (iOS) — Lista de espera</h1>
        <p>Dejanos tu correo electrónico y te avisamos apenas lancemos la versión oficial de Comuseñas para iPhone y iPad (iOS). Mientras tanto, ya podés probar la demo interactiva de vocales en LSA desde tu navegador.</p>
      </header>
      <main>
        <p><a href="https://play.google.com/store/apps/details?id=com.ars.comusenias&hl=es_AR">Descargar hoy en Google Play (Android, Gratis)</a></p>
        <nav>
          <a href="/">Inicio y Demo IA</a> |
          <a href="/links">Enlaces Oficiales</a> |
          <a href="/contacto">Contacto</a>
        </nav>
      </main>
    `
  },
  {
    slug: 'mejores-apps-aprender-lengua-de-senas-argentina',
    title: 'Mejores Apps para Aprender Lengua de Señas Argentina (LSA) | Comuseñas',
    description:
      'Comparativa 2026 de apps de Lengua de Señas Argentina (LSA): Comuseñas (aprender con IA en tiempo real), LSApp, IncluSeñas y traductores en vivo como Pulsa.',
    ogType: 'article',
    breadcrumbName: 'Mejores Apps de LSA',
    bodyHtml: `
      <header>
        <h1>Las mejores aplicaciones para aprender Lengua de Señas Argentina (LSA)</h1>
        <p>Guía comparativa actualizada sobre las principales apps para aprender LSA en Argentina en concordancia con la Ley Nacional 27.710.</p>
      </header>
      <main>
        <section>
          <h2>Respuesta rápida</h2>
          <p>Si buscás <strong>aprender y practicar LSA</strong> frente a la cámara con corrección automática en tiempo real, <strong>Comuseñas</strong> es actualmente la única app educativa argentina gratuita que integra Inteligencia Artificial (MediaPipe) para validar gestos de manos y expresiones faciales, además de incluir un panel por código QR para fonoaudiólogos, docentes y familias. Si en cambio ya te comunicás en LSA y necesitás un <strong>traductor a voz/texto</strong> en situaciones cotidianas, existen propuestas complementarias enfocadas en interpretación en vivo como <strong>Pulsa</strong>.</p>
        </section>
        <section>
          <h2>Comparativa de apps para aprender LSA en Argentina</h2>
          <table>
            <thead>
              <tr>
                <th>Aplicación</th>
                <th>Enfoque</th>
                <th>Validación IA por cámara</th>
                <th>Seguimiento QR Especialistas</th>
                <th>Costo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Comuseñas</td>
                <td>Práctica interactiva gamificada en LSA oficial</td>
                <td>Sí (tiempo real con MediaPipe)</td>
                <td>Sí (métricas y notas pedagógicas)</td>
                <td>Gratis (Android)</td>
              </tr>
              <tr>
                <td>LSApp</td>
                <td>Diccionario y señario digital de consulta</td>
                <td>No</td>
                <td>No</td>
                <td>Gratis</td>
              </tr>
              <tr>
                <td>IncluSeñas</td>
                <td>Juegos de opción múltiple (señas regionales)</td>
                <td>No</td>
                <td>No</td>
                <td>Gratis</td>
              </tr>
              <tr>
                <td>Pulsa</td>
                <td>Traductor en vivo LSA → voz y texto (no educativa)</td>
                <td>Traduce en vivo (sin corrección pedagógica)</td>
                <td>No</td>
                <td>Gratis</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <h2>Análisis detallado</h2>
          <article>
            <h3>Comuseñas</h3>
            <p>Desarrollada en la Universidad Nacional de La Matanza (UNLaM) y ganadora del 1° premio en Expo Proyecto UNLaM. Valida señas por cámara con IA en tiempo real e incluye seguimiento QR para especialistas y familias.</p>
          </article>
          <article>
            <h3>LSApp</h3>
            <p>Diccionario de consulta rápida y señario digital con videos demostrativos para buscar palabras puntuales en LSA.</p>
          </article>
          <article>
            <h3>IncluSeñas</h3>
            <p>Plataforma lúdica con preguntas de opción múltiple enfocada en lenguas de señas de la región.</p>
          </article>
          <article>
            <h3>Pulsa</h3>
            <p>Herramienta utilitaria argentina diseñada para que personas Sordas que ya se comunican en LSA traduzcan sus señas a español hablado y escrito en tiempo real frente a oyentes. No es una app educativa para aprender desde cero, sino un recurso complementario de interpretación asistida.</p>
          </article>
        </section>
        <section>
          <h2>Diferencia entre una app para aprender LSA y un traductor con IA</h2>
          <p><strong>App educativa con IA (Comuseñas):</strong> pensada para aprender y practicar LSA paso a paso (niños, familias oyentes, escuelas y fonoaudiólogos) con devolución inmediata por cámara.</p>
          <p><strong>Traductor de LSA en tiempo real (como Pulsa):</strong> pensado para personas Sordas que ya dominan LSA y necesitan traducir señas a texto y voz frente a oyentes en la calle, un comercio o una consulta médica.</p>
        </section>
        <nav>
          <a href="/">Inicio</a> |
          <a href="/especialistas-y-familias">Especialistas y Familias</a> |
          <a href="/sobre-nosotros-unlam">Sobre Nosotros (UNLaM)</a> |
          <a href="/llms.txt">llms.txt</a> |
          <a href="https://play.google.com/store/apps/details?id=com.ars.comusenias&hl=es_AR">Descargar Comuseñas en Google Play</a>
        </nav>
      </main>
    `
  },
  {
    slug: 'especialistas-y-familias',
    title: 'Especialistas y Familias: Seguimiento QR en LSA | Comuseñas',
    description:
      'Herramienta de acompañamiento en Lengua de Señas Argentina para fonoaudiólogos, docentes integradores y familias: vinculación por QR, métricas y notas pedagógicas.',
    ogType: 'website',
    breadcrumbName: 'Especialistas y Familias',
    bodyHtml: `
      <header>
        <h1>Acompañamiento Familiar y Panel para Especialistas en LSA</h1>
        <p>Más del 90% de los niños sordos nacen en familias con padres oyentes. Comuseñas integra el aprendizaje de la Lengua de Señas Argentina al entorno cotidiano.</p>
      </header>
      <main>
        <section>
          <h2>¿Qué ofrece Comuseñas para el entorno del niño?</h2>
          <ul>
            <li><strong>Vinculación por Código QR:</strong> Conexión directa y privada entre el perfil del aprendiz y el especialista (fonoaudiólogo, docente, psicólogo) o familiar.</li>
            <li><strong>Estadísticas de Aprendizaje:</strong> Seguimiento de aciertos, intentos y progreso en cada nivel temático (vocales, colores, saludos y rutinas).</li>
            <li><strong>Carga de Observaciones:</strong> Espacio para que los terapeutas dejen notas pedagógicas personalizadas para guiar la práctica en el hogar.</li>
          </ul>
        </section>
        <nav>
          <a href="/">Inicio</a> |
          <a href="/mejores-apps-aprender-lengua-de-senas-argentina">Mejores Apps de LSA</a> |
          <a href="/contacto">Contacto</a> |
          <a href="/llms.txt">llms.txt</a>
        </nav>
      </main>
    `
  },
  {
    slug: 'sobre-nosotros-unlam',
    canonicalSlug: 'sobre-nosotros-unlam',
    title: 'Sobre Comuseñas: Historia UNLaM y Equipo Fundador',
    description:
      'Conocé la historia de Comuseñas, nacida en la Universidad Nacional de La Matanza (UNLaM), ganadora del 1° premio Expo Proyecto UNLaM y seleccionada en JIJE.',
    ogType: 'website',
    breadcrumbName: 'Sobre Nosotros (UNLaM)',
    bodyHtml: ABOUT_BODY_HTML
  },
  {
    slug: 'about',
    canonicalSlug: 'sobre-nosotros-unlam',
    title: 'Sobre Comuseñas: Historia UNLaM y Equipo Fundador',
    description:
      'Conocé la historia de Comuseñas, nacida en la Universidad Nacional de La Matanza (UNLaM), ganadora del 1° premio Expo Proyecto UNLaM y seleccionada en JIJE.',
    ogType: 'website',
    breadcrumbName: 'Sobre Nosotros (UNLaM)',
    bodyHtml: ABOUT_BODY_HTML
  },
  {
    slug: 'contacto',
    canonicalSlug: 'contacto',
    title: 'Contacto | Comuseñas App de Lengua de Señas Argentina',
    description:
      'Contactá al equipo de Comuseñas para consultas, escuelas, instituciones educativas, fonoaudiólogos o sugerencias sobre nuestra app de LSA.',
    ogType: 'website',
    breadcrumbName: 'Contacto',
    bodyHtml: CONTACT_BODY_HTML
  },
  {
    slug: 'contact',
    canonicalSlug: 'contacto',
    title: 'Contacto | Comuseñas App de Lengua de Señas Argentina',
    description:
      'Contactá al equipo de Comuseñas para consultas, escuelas, instituciones educativas, fonoaudiólogos o sugerencias sobre nuestra app de LSA.',
    ogType: 'website',
    breadcrumbName: 'Contacto',
    bodyHtml: CONTACT_BODY_HTML
  },
  {
    slug: 'ayudanos',
    title: 'Ayudanos a mantener Comuseñas 100% Gratuita | Comuseñas',
    description:
      'Conocé en qué se invierte cada aporte en Comuseñas: servidores, entrenamiento de IA y nuevas señas de LSA. Apoyanos por Alias (comu.LEMON) o Cafecito.',
    ogType: 'website',
    breadcrumbName: 'Ayudanos',
    bodyHtml: `
      <header>
        <h1>Ayudanos a mantener Comuseñas 100% gratuita</h1>
        <p>Conocé cómo sostenemos el desarrollo de Comuseñas, la app argentina gratuita de Lengua de Señas Argentina (LSA) con Inteligencia Artificial nacida en la UNLaM.</p>
      </header>
      <main>
        <section>
          <h2>¿En qué se usa tu aporte?</h2>
          <ul>
            <li><strong>Infraestructura y servidores:</strong> alojamiento web, videos demostrativos y sincronización por código QR.</li>
            <li><strong>Entrenamiento de IA:</strong> recursos de cómputo para mejorar la precisión del reconocimiento de gestos y expresiones faciales.</li>
            <li><strong>Nuevas señas de LSA:</strong> producción y validación continua de vocabulario oficial (Ley 27.710).</li>
            <li><strong>Migración a iPhone (iOS) y acceso gratuito:</strong> desarrollo para llegar a iPhone/iPad, licencias de tiendas y acceso 100% gratuito para familias y escuelas.</li>
          </ul>
        </section>
        <section>
          <h2>Canales de apoyo</h2>
          <p>Alias (Mercado Pago, Lemon o banco): <strong>comu.LEMON</strong></p>
          <p><a href="https://cafecito.app/comusenias">Apoyar en Cafecito</a></p>
        </section>
        <nav>
          <a href="/">Inicio</a> |
          <a href="/contacto">Contacto</a> |
          <a href="/privacidad">Política de Privacidad</a>
        </nav>
      </main>
    `
  },
  {
    slug: 'links',
    title: 'Enlaces Oficiales y Descarga | Comuseñas',
    description:
      'Accedé a todos los enlaces oficiales de Comuseñas: descarga en Google Play, Instagram, YouTube, TikTok, LinkedIn y Cafecito.',
    ogType: 'website',
    breadcrumbName: 'Links Oficiales',
    bodyHtml: `
      <header>
        <h1>Enlaces Oficiales de Comuseñas</h1>
      </header>
      <main>
        <ul>
          <li><a href="https://play.google.com/store/apps/details?id=com.ars.comusenias&hl=es_AR">Descargar en Google Play (Android, Gratis)</a></li>
          <li><a href="https://www.instagram.com/comusenias/">Instagram</a></li>
          <li><a href="https://www.youtube.com/@Comusenias">YouTube</a></li>
          <li><a href="https://www.tiktok.com/@comusenias">TikTok</a></li>
          <li><a href="https://www.linkedin.com/in/comuse%C3%B1as/">LinkedIn</a></li>
          <li><a href="https://cafecito.app/comusenias">Cafecito</a></li>
        </ul>
      </main>
    `
  },
  {
    slug: 'privacidad',
    canonicalSlug: 'privacidad',
    title: 'Política de Privacidad | Comuseñas',
    description:
      'Conocé cómo protegemos tus datos y la privacidad del uso de cámara en la aplicación Comuseñas para aprender Lengua de Señas Argentina.',
    ogType: 'website',
    breadcrumbName: 'Política de Privacidad',
    bodyHtml: PRIVACY_BODY_HTML
  },
  {
    slug: 'privacy',
    canonicalSlug: 'privacidad',
    title: 'Política de Privacidad | Comuseñas',
    description:
      'Conocé cómo protegemos tus datos y la privacidad del uso de cámara en la aplicación Comuseñas para aprender Lengua de Señas Argentina.',
    ogType: 'website',
    breadcrumbName: 'Política de Privacidad',
    bodyHtml: PRIVACY_BODY_HTML
  },
  {
    slug: 'terminos',
    title: 'Términos y Condiciones | Comuseñas',
    description:
      'Términos y condiciones de uso de la plataforma y aplicación móvil Comuseñas.',
    ogType: 'website',
    breadcrumbName: 'Términos y Condiciones',
    bodyHtml: `
      <header>
        <h1>Términos y Condiciones — Comuseñas</h1>
        <p>Condiciones generales de uso de la plataforma educativa Comuseñas.</p>
      </header>
      <main><a href="/">Volver al inicio</a></main>
    `
  }
];

function escapeAttr(value) {
  return value.replace(/"/g, '&quot;');
}

function buildBreadcrumbScript(canonicalUrl, breadcrumbName) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: `${SITE_ORIGIN}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: breadcrumbName,
        item: canonicalUrl
      }
    ]
  };
  return `<script type="application/ld+json" id="route-breadcrumb-schema">${JSON.stringify(schema)}</script>`;
}

function prerender() {
  if (!fs.existsSync(BASE_HTML_PATH)) {
    console.error(`[prerender] No se encontró ${BASE_HTML_PATH}. Ejecutá ng build primero.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(BASE_HTML_PATH, 'utf8');

  for (const route of ROUTES) {
    const canonicalSlug = route.canonicalSlug || route.slug;
    const canonicalUrl = `${SITE_ORIGIN}/${canonicalSlug}`;
    let html = baseHtml;

    // 1. Replace <title>
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);

    // 2. Replace meta description, OG, Twitter, and canonical
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${escapeAttr(route.description)}">`
    );
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}">`
    );
    html = html.replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:type" content="${route.ogType}" />`
    );
    html = html.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${escapeAttr(route.title)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${escapeAttr(route.description)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${escapeAttr(route.title)}">`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${escapeAttr(route.description)}">`
    );

    // 3. Remove FAQPage node from subpages (FAQ only exists visibly on Home)
    html = html.replace(
      /,\s*\{\s*"@type"\s*:\s*"FAQPage"[\s\S]*?\]\s*\}/,
      ''
    );

    // 4. Inject BreadcrumbList JSON-LD before </head>
    const breadcrumbTag = buildBreadcrumbScript(canonicalUrl, route.breadcrumbName);
    html = html.replace('</head>', `  ${breadcrumbTag}\n</head>`);

    // 5. Replace semantic fallback inside <app-root> with route-specific content (AR-READ-01)
    const fallbackBlock = `<div style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;">${route.bodyHtml}</div>`;
    html = html.replace(
      /(<app-root[^>]*>)[\s\S]*?(<\/app-root>)/i,
      `$1\n    ${fallbackBlock}\n  $2`
    );

    const outDir = path.join(DIST_DIR, route.slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    console.log(`[prerender] ✔ Generado dist/comu-senias/${route.slug}/index.html`);
  }
}

prerender();
