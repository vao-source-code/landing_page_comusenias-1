import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { LottiePlayer } from 'lottie-web'; // Asegúrate de que esté instalado correctamente
declare var require: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, AfterViewInit, OnDestroy {

  private observer?: IntersectionObserver;

  public cards = [
    {
      title:'Diseño creativo',
      description:'Combina la funcionalidad con la estética de una manera única.Utiliza colores, tipografías y elementos visuales atractivos para crear una experiencia agradable para el usuario.',
      icon:'assets/check.svg'
    },
    {
      title:'Facil de usar',
      description:'La interfaz de usuario es intuitiva y fácil de navegar, lo que facilita a los usuarios aprender y practicar la lengua de señas de manera efectiva.',
      icon:'assets/check.svg'
    },
    {
      title:'Mejor experiencia de usuario',
      description:'Incorpora elementos visuales y recursos interactivos que hacen que el proceso de aprendizaje sea atractivo y memorable. La atención al detalle en el diseño refuerza la autenticidad de la aplicación y su compromiso con la accesibilidad.',
      icon:'assets/check.svg'
    }
  ];

  constructor() { }

  ngOnInit() {    
    this.loadAnimation('animation-numbers', 'assets/animations/Animation-numbers.json');
    this.loadAnimation('animation-premium', 'assets/animations/Animation-premium.json');
    this.loadAnimation('animation-clock', 'assets/animations/Animation-clock.json');
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupScrollAnimations(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback si IntersectionObserver no está soportado: mostrar todo directamente
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    this.observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => this.observer?.observe(el));
  }

  loadAnimation(containerId: string, path: string) {
    try {
      const container = document.getElementById(containerId);
      if (container) {
        const lottie: LottiePlayer = require('lottie-web');
        lottie.loadAnimation({
          container: container,
          path: path,
          renderer: 'svg',
          loop: true,
          autoplay: true
        });
      }
    } catch (e) {
      // Elemento opcional no presente
    }
  }

}
