import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-ayudanos',
  templateUrl: './ayudanos.component.html',
  styleUrls: ['./ayudanos.component.css']
})
export class AyudanosComponent implements OnDestroy {
  public readonly alias = 'comu.LEMON';
  public readonly cafecitoUrl = 'https://cafecito.app/comusenias';
  public aliasCopied = false;

  private copyResetTimer?: ReturnType<typeof setTimeout>;

  public readonly fundingUses = [
    {
      index: '01',
      icon: 'dns',
      title: 'Infraestructura, servidores y base de datos',
      description:
        'Sostenemos el alojamiento web, almacenamiento de videos demostrativos y sincronización de perfiles y progreso por código QR para familias y especialistas.'
    },
    {
      index: '02',
      icon: 'psychology',
      title: 'Entrenamiento y mejora de la Inteligencia Artificial',
      description:
        'Financiamos recursos de cómputo para entrenar, ajustar y mejorar la precisión del reconocimiento de gestos de manos y expresiones faciales en tiempo real.'
    },
    {
      index: '03',
      icon: 'sign_language',
      title: 'Producción y validación de nuevas señas en LSA',
      description:
        'Ampliación continua del diccionario interactivo y nuevas categorías cotidianas validadas en Lengua de Señas Argentina oficial (Ley 27.710).'
    },
    {
      index: '04',
      icon: 'phone_iphone',
      title: 'Llegada a iPhone (iOS) y acceso 100% gratuito',
      description:
        'Cubrimos licencias de tiendas (como Apple Developer para llevar la app a iPhone) y garantizamos que cualquier familia, fonoaudiólogo o escuela pueda usar Comuseñas gratis.'
    }
  ];

  public readonly roadmapItems = [
    {
      status: 'EN PROGRESO',
      title: 'Migración y lanzamiento en iPhone (iOS)',
      description: 'Estamos migrando Comuseñas para que también funcione en iPhone y iPad con reconocimiento de señas por IA en tiempo real.'
    },
    {
      status: 'EN PROGRESO',
      title: 'Nuevas categorías de vocabulario cotidiano en LSA',
      description: 'Ampliación de módulos prácticos de escuela, salud, familia y emociones con validación por cámara.'
    },
    {
      status: 'PRÓXIMAMENTE',
      title: 'Mejoras de precisión en reconocimiento facial y manual',
      description: 'Modelos más livianos para funcionar aún mejor en celulares de gama media y baja.'
    },
    {
      status: 'PRÓXIMAMENTE',
      title: 'Más herramientas para especialistas y docentes',
      description: 'Nuevos reportes de evolución y seguimiento pedagógico vinculado por código QR.'
    }
  ];

  ngOnDestroy(): void {
    if (this.copyResetTimer) {
      clearTimeout(this.copyResetTimer);
    }
  }

  copyAlias(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(this.alias).then(
        () => this.markCopied(),
        () => this.fallbackCopy()
      );
    } else {
      this.fallbackCopy();
    }
  }

  private fallbackCopy(): void {
    if (typeof document === 'undefined') {
      return;
    }
    const textarea = document.createElement('textarea');
    textarea.value = this.alias;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      this.markCopied();
    } finally {
      document.body.removeChild(textarea);
    }
  }

  private markCopied(): void {
    this.aliasCopied = true;
    if (this.copyResetTimer) {
      clearTimeout(this.copyResetTimer);
    }
    this.copyResetTimer = setTimeout(() => {
      this.aliasCopied = false;
    }, 2500);
  }
}
