import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MejoresAppsComponent } from './pages/mejores-apps/mejores-apps.component';
import { EspecialistasFamiliasComponent } from './pages/especialistas-familias/especialistas-familias.component';
import { SobreNosotrosUnlamComponent } from './pages/sobre-nosotros-unlam/sobre-nosotros-unlam.component';
import { LinksComponent } from './pages/links/links.component';
import { AyudanosComponent } from './pages/ayudanos/ayudanos.component';
import { RouteSeoData } from './services/seo.service';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    data: {
      seo: {
        title: 'Comuseñas: App para Aprender Lengua de Señas Argentina (LSA) con IA',
        description: 'Aprendé Lengua de Señas Argentina (LSA) con Comuseñas. Aplicación educativa gratuita con Inteligencia Artificial que valida tus gestos por cámara en tiempo real.',
        path: '/',
        ogType: 'website'
      } as RouteSeoData
    }
  },
  {
    path: 'ios',
    component: LandingPageComponent,
    data: {
      scrollToIos: true,
      seo: {
        title: 'Comuseñas para iPhone y iPad (iOS) — Lista de espera',
        description: '¿Usás iPhone o iPad? Dejanos tu correo y te avisamos apenas lancemos la versión para iOS de Comuseñas, la app gratuita para aprender LSA con IA.',
        path: '/ios',
        ogType: 'website',
        breadcrumbName: 'Lista de espera iOS'
      } as RouteSeoData
    }
  },
  {
    path: 'mejores-apps-aprender-lengua-de-senas-argentina',
    component: MejoresAppsComponent,
    data: {
      seo: {
        title: 'Mejores Apps para Aprender Lengua de Señas Argentina (LSA) | Comuseñas',
        description: 'Comparativa 2026 de apps de Lengua de Señas Argentina (LSA): Comuseñas (aprender con IA en tiempo real), LSApp, IncluSeñas y traductores en vivo como Pulsa.',
        path: '/mejores-apps-aprender-lengua-de-senas-argentina',
        ogType: 'article',
        breadcrumbName: 'Mejores Apps de LSA'
      } as RouteSeoData
    }
  },
  {
    path: 'especialistas-y-familias',
    component: EspecialistasFamiliasComponent,
    data: {
      seo: {
        title: 'Especialistas y Familias: Seguimiento QR en LSA | Comuseñas',
        description: 'Herramienta de acompañamiento en Lengua de Señas Argentina para fonoaudiólogos, docentes integradores y familias: vinculación por QR, métricas y notas pedagógicas.',
        path: '/especialistas-y-familias',
        ogType: 'website',
        breadcrumbName: 'Especialistas y Familias'
      } as RouteSeoData
    }
  },
  {
    path: 'sobre-nosotros-unlam',
    component: SobreNosotrosUnlamComponent,
    data: {
      seo: {
        title: 'Sobre Comuseñas: Historia UNLaM y Equipo Fundador',
        description: 'Conocé la historia de Comuseñas, nacida en la Universidad Nacional de La Matanza (UNLaM), ganadora del 1° premio Expo Proyecto UNLaM y seleccionada en JIJE.',
        path: '/sobre-nosotros-unlam',
        ogType: 'website',
        breadcrumbName: 'Sobre Nosotros (UNLaM)'
      } as RouteSeoData
    }
  },
  {
    path: 'contacto',
    component: ContactComponent,
    data: {
      seo: {
        title: 'Contacto | Comuseñas App de Lengua de Señas Argentina',
        description: 'Contactá al equipo de Comuseñas para consultas, escuelas, instituciones educativas, fonoaudiólogos o sugerencias sobre nuestra app de LSA.',
        path: '/contacto',
        ogType: 'website',
        breadcrumbName: 'Contacto'
      } as RouteSeoData
    }
  },
  {
    path: 'links',
    component: LinksComponent,
    data: {
      seo: {
        title: 'Enlaces Oficiales y Descarga | Comuseñas',
        description: 'Accedé a todos los enlaces oficiales de Comuseñas: descarga en Google Play, Instagram, YouTube, TikTok, LinkedIn y Cafecito.',
        path: '/links',
        ogType: 'website',
        breadcrumbName: 'Links Oficiales'
      } as RouteSeoData
    }
  },
  {
    path: 'ayudanos',
    component: AyudanosComponent,
    data: {
      seo: {
        title: 'Ayudanos a mantener Comuseñas 100% Gratuita | Comuseñas',
        description: 'Conocé en qué se invierte cada aporte en Comuseñas: servidores, entrenamiento de IA y nuevas señas de LSA. Apoyanos por Alias (comu.LEMON) o Cafecito.',
        path: '/ayudanos',
        ogType: 'website',
        breadcrumbName: 'Ayudanos'
      } as RouteSeoData
    }
  },
  {
    path: 'privacidad',
    component: PrivacyComponent,
    data: {
      seo: {
        title: 'Política de Privacidad | Comuseñas',
        description: 'Conocé cómo protegemos tus datos y la privacidad del uso de cámara en la aplicación Comuseñas para aprender Lengua de Señas Argentina.',
        path: '/privacidad',
        ogType: 'website',
        breadcrumbName: 'Política de Privacidad'
      } as RouteSeoData
    }
  },
  {
    path: 'terminos',
    component: TermsComponent,
    data: {
      seo: {
        title: 'Términos y Condiciones | Comuseñas',
        description: 'Términos y condiciones de uso de la plataforma y aplicación móvil Comuseñas.',
        path: '/terminos',
        ogType: 'website',
        breadcrumbName: 'Términos y Condiciones'
      } as RouteSeoData
    }
  },
  {
    path: 'about',
    component: SobreNosotrosUnlamComponent,
    data: {
      seo: {
        title: 'Sobre Comuseñas: Historia UNLaM y Equipo Fundador',
        description: 'Conocé la historia de Comuseñas, nacida en la Universidad Nacional de La Matanza (UNLaM), ganadora del 1° premio Expo Proyecto UNLaM y seleccionada en JIJE.',
        path: '/sobre-nosotros-unlam',
        ogType: 'website',
        breadcrumbName: 'Sobre Nosotros (UNLaM)'
      } as RouteSeoData
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      seo: {
        title: 'Contacto | Comuseñas App de Lengua de Señas Argentina',
        description: 'Contactá al equipo de Comuseñas para consultas, escuelas, instituciones educativas, fonoaudiólogos o sugerencias sobre nuestra app de LSA.',
        path: '/contacto',
        ogType: 'website',
        breadcrumbName: 'Contacto'
      } as RouteSeoData
    }
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    data: {
      seo: {
        title: 'Política de Privacidad | Comuseñas',
        description: 'Conocé cómo protegemos tus datos y la privacidad del uso de cámara en la aplicación Comuseñas para aprender Lengua de Señas Argentina.',
        path: '/privacidad',
        ogType: 'website',
        breadcrumbName: 'Política de Privacidad'
      } as RouteSeoData
    }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
