/**
 * Cloudflare Worker para Comuseñas — AgentReady 100/100
 *
 * Resuelve los 2 checks ESSENTIAL de Is Agentic en el edge de Cloudflare (plan gratis):
 * 1. Markdown content negotiation (`Accept: text/markdown` -> `Content-Type: text/markdown` + `Vary: Accept`)
 * 2. Real HTTP 404 para rutas inexistentes (con cuerpo Markdown cuando el agente pide `text/markdown`)
 *
 * Instalación rápida en Cloudflare Dashboard:
 * 1. Workers & Pages -> Create Worker -> pegar este archivo -> Deploy.
 * 2. Settings -> Triggers -> Routes -> agregar: `xn--comuseas-i3a.com.ar/*`
 */

const KNOWN_ROUTES = new Set([
  '/',
  '/mejores-apps-aprender-lengua-de-senas-argentina',
  '/especialistas-y-familias',
  '/sobre-nosotros-unlam',
  '/about',
  '/contacto',
  '/contact',
  '/privacidad',
  '/privacy',
  '/terminos',
  '/links'
]);

const STATIC_PREFIXES = ['/assets/', '/loaderio-'];
const STATIC_FILES = new Set([
  '/robots.txt',
  '/sitemap.xml',
  '/llms.txt',
  '/llms-full.txt',
  '/favicon.ico'
]);

function normalizePath(pathname) {
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '');
}

function isStaticAsset(pathname) {
  if (STATIC_FILES.has(pathname)) return true;
  if (STATIC_PREFIXES.some(prefix => pathname.startsWith(prefix))) return true;
  // Hashed Angular bundles (.js, .css, .webp, .png, .svg, .mp4, .woff2, etc.)
  return /\.[a-z0-9]{2,6}$/i.test(pathname);
}

function wantsMarkdown(request) {
  const accept = (request.headers.get('Accept') || '').toLowerCase();
  return accept.includes('text/markdown');
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const normalizedPath = normalizePath(url.pathname);
    const mdRequested = wantsMarkdown(request);

    // 1. Static assets pass directly to origin
    if (isStaticAsset(normalizedPath)) {
      return fetch(request);
    }

    // 2. Real HTTP 404 for nonexistent paths (Agent-friendly 404s)
    if (!KNOWN_ROUTES.has(normalizedPath)) {
      if (mdRequested) {
        const md404 = [
          '# 404 — Página no encontrada (Comuseñas)',
          '',
          `La ruta solicitada (\`${url.pathname}\`) no existe en Comuseñas.`,
          '',
          '## Recursos disponibles para agentes y usuarios',
          '- Contexto LLM: https://xn--comuseas-i3a.com.ar/llms.txt',
          '- Base completa: https://xn--comuseas-i3a.com.ar/llms-full.txt',
          '- Mapa del sitio: https://xn--comuseas-i3a.com.ar/sitemap.xml',
          '- Inicio: https://xn--comuseas-i3a.com.ar/'
        ].join('\n');

        return new Response(md404, {
          status: 404,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Vary': 'Accept',
            'Cache-Control': 'no-cache'
          }
        });
      }

      const html404 = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>404 — Comuseñas</title><meta name="robots" content="noindex"></head><body><h1>404 — Página no encontrada</h1><p>La ruta solicitada no existe. Visitá <a href="/">Comuseñas</a> o consultá <a href="/llms.txt">llms.txt</a> y <a href="/sitemap.xml">sitemap.xml</a>.</p></body></html>`;
      return new Response(html404, {
        status: 404,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Vary': 'Accept',
          'Cache-Control': 'no-cache'
        }
      });
    }

    // 3. Markdown content negotiation (`Accept: text/markdown`)
    if (mdRequested) {
      const mdSource = normalizedPath === '/' ? '/llms.txt' : '/llms-full.txt';
      const mdRes = await fetch(new URL(mdSource, url.origin).toString());
      const mdText = await mdRes.text();

      return new Response(mdText, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }

    // 4. Normal HTML browser request -> proxy to origin and include `Vary: Accept`
    const originRes = await fetch(request);
    const headers = new Headers(originRes.headers);
    const existingVary = headers.get('Vary');
    if (!existingVary) {
      headers.set('Vary', 'Accept');
    } else if (!existingVary.toLowerCase().includes('accept')) {
      headers.set('Vary', `${existingVary}, Accept`);
    }

    return new Response(originRes.body, {
      status: originRes.status,
      statusText: originRes.statusText,
      headers
    });
  }
};
