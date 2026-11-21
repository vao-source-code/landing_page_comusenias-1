import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export interface RouteSeoData {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
  breadcrumbName?: string;
  robots?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly siteOrigin = 'https://xn--comuseas-i3a.com.ar';
  private readonly breadcrumbScriptId = 'route-breadcrumb-schema';

  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  public updateRouteSeo(data: RouteSeoData): void {
    const normalizedPath = data.path === '/' ? '/' : `/${data.path.replace(/^\/+|\/+$/g, '')}`;
    const canonicalUrl = `${this.siteOrigin}${normalizedPath}`;
    const ogType = data.ogType || 'website';
    const robots = data.robots || 'index, follow';

    // Document title
    this.titleService.setTitle(data.title);

    // Standard meta tags
    this.metaService.updateTag({ name: 'description', content: data.description });
    this.metaService.updateTag({ name: 'robots', content: robots });

    // Open Graph
    this.metaService.updateTag({ property: 'og:type', content: ogType });
    this.metaService.updateTag({ property: 'og:title', content: data.title });
    this.metaService.updateTag({ property: 'og:description', content: data.description });
    this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });

    // Twitter Cards
    this.metaService.updateTag({ name: 'twitter:title', content: data.title });
    this.metaService.updateTag({ name: 'twitter:description', content: data.description });

    // Self-referencing canonical link
    this.setCanonicalLink(canonicalUrl);

    // Per-route BreadcrumbList structured data (for subpages)
    this.updateBreadcrumbSchema(normalizedPath, canonicalUrl, data.breadcrumbName);
  }

  private setCanonicalLink(url: string): void {
    let linkEl = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkEl) {
      linkEl = this.document.createElement('link');
      linkEl.setAttribute('rel', 'canonical');
      this.document.head.appendChild(linkEl);
    }
    linkEl.setAttribute('href', url);
  }

  private updateBreadcrumbSchema(path: string, canonicalUrl: string, breadcrumbName?: string): void {
    const existing = this.document.getElementById(this.breadcrumbScriptId);
    if (path === '/' || !breadcrumbName) {
      existing?.remove();
      return;
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: `${this.siteOrigin}/`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: breadcrumbName,
          item: canonicalUrl
        }
      ]
    };

    const script = existing || this.document.createElement('script');
    script.id = this.breadcrumbScriptId;
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(schema);

    if (!existing) {
      this.document.head.appendChild(script);
    }
  }
}
