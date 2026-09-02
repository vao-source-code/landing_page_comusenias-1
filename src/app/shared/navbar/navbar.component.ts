import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  activeSection: string = '';

  public sidebarItems = [
    {label:'Inicio',url:'/'},
    {label:'Características',url:'/#traductor-ia'},
    {label:'Cómo Funciona', url:'/#funcionamiento'},
    {label:'Preguntas Frecuentes', url:'/#faq'},
    {label:'Prensa', url:'/#prensa'},
    {label:'Testimonios', url:'/#testimonios'},
    {label:'Contacto', url:'/contacto'},
  ];

  constructor() { }

  ngOnInit(): void {
  }


}
