import { Component, OnInit } from '@angular/core';
import { LottiePlayer } from 'lottie-web'; // Asegúrate de que esté instalado correctamente
declare var require: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

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
  ]


  constructor() { }

  ngOnInit() {    
    this.loadAnimation('animation-numbers', 'assets/animations/Animation-numbers.json');
    this.loadAnimation('animation-premium', 'assets/animations/Animation-premium.json');
    this.loadAnimation('animation-clock', 'assets/animations/Animation-clock.json');
  }

  loadAnimation(containerId: string, path: string) {
    const lottie: LottiePlayer = require('lottie-web'); // Cargar lottie-web correctamente

    const container = document.getElementById(containerId);
    if (container) {
      lottie.loadAnimation({
        container: container, // ID del contenedor
        path: path, // Ruta del archivo de animación JSON
        renderer: 'svg',
        loop: true,
        autoplay: true
      });
    } else {
      console.error(`El contenedor con ID ${containerId} no se encontró.`);
    }
  }

}
