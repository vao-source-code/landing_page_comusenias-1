import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { SupportModalService } from 'src/app/services/support-modal.service';

export interface Founder {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export interface PressItem {
  name: string;
  url: string;
  title: string;
  logo?: string;
  textLogo?: string;
  compact?: boolean;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('presentationVideo') presentationVideoRef?: ElementRef<HTMLVideoElement>;

  private observer?: IntersectionObserver;
  private videoObserver?: IntersectionObserver;
  private videoPreloadObserver?: IntersectionObserver;
  private resizeListener?: () => void;
  private telemetryInterval?: ReturnType<typeof setInterval>;
  private typingTimeout?: ReturnType<typeof setTimeout>;

  public isVideoPlaying = false;
  public isVideoMuted = true;
  public shouldLoadVideo = false;
  public isMobile = false;

  // Kinetic typewriter state for Hero H1
  private readonly fullLine1 = 'Señas, en';
  private readonly fullLine2 = 'Tiempo Real';
  public typedLine1 = '';
  public typedLine2 = '';
  public typingStage: 'line1' | 'line2' | 'done' = 'line1';

  // Interactive mouse parallax state for Hero depth
  public parallaxX = 0;
  public parallaxY = 0;

  // Live cycling AI telemetry status on the face + hand scanner
  public readonly telemetryStates: string[] = [
    'ROSTRO + MANO · OK',
    'LSA · 98.4% PRECISIÓN',
    'SEÑA VALIDADA ✓',
    'VISIÓN IA · 60 FPS'
  ];
  public telemetryIndex = 0;

  public get currentTelemetryLabel(): string {
    return this.telemetryStates[this.telemetryIndex];
  }

  public readonly founders: Founder[] = [
    {
      name: 'Víctor Orue',
      role: 'Fundador & Ingeniero de Software',
      bio: 'Desarrollo de software y arquitectura web, enfocado en crear soluciones tecnológicas accesibles y de alto impacto social.',
      image: 'assets/fundadores/victor_orue.webp',
      linkedin: 'https://www.linkedin.com/in/victor-andrian-orue/'
    },
    {
      name: 'Juan Guerrero Aguilar',
      role: 'Fundador & Impulsor del Proyecto',
      bio: 'Inspirador de Comuseñas a partir de su vivencia con hipoacusia profunda bilateral, transformando barreras de comunicación en tecnología inclusiva.',
      image: 'assets/fundadores/juan_guerrero.webp',
      linkedin: 'https://www.linkedin.com/in/juan-matias-guerrero-aguilar-a8b389184/'
    }
  ];

  public readonly pressItems: PressItem[] = [
    {
      name: 'Otro Día Perdido - El Trece',
      url: 'https://www.eltrecetv.com.ar/otro-dia-perdido/2026/09/18/la-historia-detras-de-comusenas-la-inovadora-app-desarrolada-en-argentina-que-destaco-mario-pergolini/',
      title: 'Nota en El Trece (Otro Día Perdido con Mario Pergolini) sobre Comuseñas',
      logo: 'assets/noticias/otro_dia_perdido.webp',
      compact: true
    },
    {
      name: 'Clarín',
      url: 'https://www.clarin.com/zonales/crearon-app-aprender-lenguaje-senas_0_JJ6ghmrKJX.html',
      title: 'Nota en Clarín sobre Comuseñas',
      logo: 'assets/noticias/clarin.webp'
    },
    {
      name: 'Página|12',
      url: 'https://www.pagina12.com.ar/704301-comusenas-para-la-hipoacusia-profunda-bilateral/',
      title: 'Nota en Página|12 sobre Comuseñas',
      textLogo: 'Página|12'
    },
    {
      name: 'Primer Plano Online',
      url: 'https://primerplanoonline.com.ar/un-graduado-de-la-unlam-con-hipoacusia-creo-una-innovadora-aplicacion-para-ensenar-lengua-de-senas/',
      title: 'Nota en Primer Plano Online sobre Comuseñas',
      logo: 'assets/noticias/noticia_primer_plano.webp'
    },
    {
      name: 'Viví el Oeste',
      url: 'https://www.vivieloeste.com.ar/noticias/2024/01/09/65328-unlam-graduado-premiado-por-app-que-ensena-lengua-de-senas',
      title: 'Nota en Viví el Oeste sobre Comuseñas',
      logo: 'assets/noticias/vivi_el_oeste.webp'
    },
    {
      name: 'Desde el Conocimiento',
      url: 'https://desdeelconocimiento.com.ar/tag/comusenas/',
      title: 'Nota en Desde el Conocimiento sobre Comuseñas',
      logo: 'assets/noticias/desde_el_conocimiento.webp'
    },
    {
      name: 'Noticias UNL',
      url: 'https://www.unl.edu.ar/noticias/news/view/la_jije_2024_destac%C3%B3_a_emprendedores_innovadores',
      title: 'Nota en Noticias UNL sobre Comuseñas',
      logo: 'assets/noticias/Unl_argentina_logo.webp'
    },
    {
      name: 'Portal CyT UNLaM',
      url: 'https://cyt.unlam.edu.ar/index.php?seccion=-1&accion=noticia&idNoticia=87',
      title: 'Nota en Portal CyT UNLaM sobre Comuseñas',
      logo: 'assets/noticias/cyt_unlam.webp'
    }
  ];

  constructor(private supportModalService: SupportModalService) {}

  public openSupportModal(): void {
    this.supportModalService.open();
  }

  ngOnInit(): void {
    this.setupResponsiveListener();
    this.startTelemetryCycle();
    this.startHeroTypewriter();
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
    this.setupVideoAutoplayOnScroll();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.videoObserver) {
      this.videoObserver.disconnect();
    }
    if (this.videoPreloadObserver) {
      this.videoPreloadObserver.disconnect();
    }
    if (this.resizeListener && typeof window !== 'undefined') {
      window.removeEventListener('resize', this.resizeListener);
    }
    if (this.telemetryInterval) {
      clearInterval(this.telemetryInterval);
    }
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }

  public onHeroMouseMove(event: MouseEvent): void {
    if (this.isMobile) {
      return;
    }
    const target = event.currentTarget as HTMLElement | null;
    if (!target) {
      return;
    }
    const rect = target.getBoundingClientRect();
    const normX = (event.clientX - rect.left) / rect.width - 0.5;
    const normY = (event.clientY - rect.top) / rect.height - 0.5;
    this.parallaxX = Math.round(normX * 22 * 10) / 10;
    this.parallaxY = Math.round(normY * 18 * 10) / 10;
  }

  public onHeroMouseLeave(): void {
    this.parallaxX = 0;
    this.parallaxY = 0;
  }

  public playVideo(videoElement: HTMLVideoElement): void {
    this.isVideoPlaying = true;
    videoElement.play().catch(() => {
      this.isVideoPlaying = false;
    });
  }

  public toggleMuteVideo(videoElement: HTMLVideoElement): void {
    videoElement.muted = !videoElement.muted;
    this.isVideoMuted = videoElement.muted;
    if (videoElement.paused) {
      this.playVideo(videoElement);
    }
  }

  public onVideoPause(): void {
    this.isVideoPlaying = false;
  }

  public onVideoEnded(): void {
    this.isVideoPlaying = false;
  }

  public scrollToDemoAndPlay(): void {
    if (typeof document === 'undefined') {
      return;
    }
    this.shouldLoadVideo = true;
    const section = document.getElementById('demostracion');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      const videoEl = this.presentationVideoRef?.nativeElement;
      if (videoEl) {
        if (!videoEl.getAttribute('src')) {
          videoEl.load();
        }
        this.playVideo(videoEl);
      }
    }, 350);
  }

  private setupVideoAutoplayOnScroll(): void {
    const videoEl = this.presentationVideoRef?.nativeElement;
    if (!videoEl || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.shouldLoadVideo = true;
      return;
    }

    // Ensure muted property is enforced for reliable browser autoplay
    videoEl.muted = true;
    this.isVideoMuted = true;

    // 1. Preload video only when user approaches the section (protects Hero LCP)
    this.videoPreloadObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.shouldLoadVideo) {
            this.shouldLoadVideo = true;
            setTimeout(() => videoEl.load(), 0);
            obs.disconnect();
          }
        });
      },
      { rootMargin: '260px 0px' }
    );
    this.videoPreloadObserver.observe(videoEl);

    // 2. Play/pause seamlessly based on viewport visibility
    this.videoObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!this.shouldLoadVideo) {
              this.shouldLoadVideo = true;
              setTimeout(() => {
                videoEl.load();
                this.playVideo(videoEl);
              }, 0);
            } else {
              videoEl.play().then(() => {
                this.isVideoPlaying = true;
              }).catch(() => {
                this.isVideoPlaying = false;
              });
            }
          } else {
            if (!videoEl.paused) {
              videoEl.pause();
            }
            this.isVideoPlaying = false;
          }
        });
      },
      {
        threshold: 0.35
      }
    );

    this.videoObserver.observe(videoEl);
  }

  private startTelemetryCycle(): void {
    if (typeof window === 'undefined') {
      return;
    }
    this.telemetryInterval = setInterval(() => {
      this.telemetryIndex = (this.telemetryIndex + 1) % this.telemetryStates.length;
    }, 2800);
  }

  private startHeroTypewriter(): void {
    if (typeof window === 'undefined') {
      this.typedLine1 = this.fullLine1;
      this.typedLine2 = this.fullLine2;
      this.typingStage = 'done';
      return;
    }

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      this.typedLine1 = this.fullLine1;
      this.typedLine2 = this.fullLine2;
      this.typingStage = 'done';
      return;
    }

    let i = 0;
    const typeLine1 = () => {
      if (i <= this.fullLine1.length) {
        this.typedLine1 = this.fullLine1.slice(0, i);
        i++;
        this.typingTimeout = setTimeout(typeLine1, 58);
      } else {
        this.typingStage = 'line2';
        let j = 0;
        const typeLine2 = () => {
          if (j <= this.fullLine2.length) {
            this.typedLine2 = this.fullLine2.slice(0, j);
            j++;
            this.typingTimeout = setTimeout(typeLine2, 54);
          } else {
            this.typingStage = 'done';
          }
        };
        this.typingTimeout = setTimeout(typeLine2, 110);
      }
    };

    this.typingTimeout = setTimeout(typeLine1, 180);
  }

  private setupResponsiveListener(): void {
    if (typeof window === 'undefined') {
      return;
    }
    this.isMobile = window.innerWidth <= 768;
    this.resizeListener = () => {
      const currentMobile = window.innerWidth <= 768;
      if (currentMobile !== this.isMobile) {
        this.isMobile = currentMobile;
      }
    };
    window.addEventListener('resize', this.resizeListener, { passive: true });
  }

  private setupScrollAnimations(): void {
    const selector = '.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale';
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll(selector).forEach(el => el.classList.add('is-visible'));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    document.querySelectorAll(selector).forEach(el => this.observer?.observe(el));
  }
}
