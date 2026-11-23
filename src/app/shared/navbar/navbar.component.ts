import { Component, OnInit, OnDestroy } from '@angular/core';

export interface NavItem {
  label: string;
  route: string;
  fragment?: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isMenuOpen = false;
  public activeKey = '';
  public scrollProgress = 0;
  public isScrolled = false;

  private scrollListener?: () => void;

  public readonly navItems: NavItem[] = [
    { label: 'Probar Demo', route: '/', fragment: 'probar-demo' },
    { label: 'Cómo se juega', route: '/', fragment: 'como-funciona' },
    { label: 'Familias y Especialistas', route: '/especialistas-y-familias' },
    { label: 'Prensa', route: '/', fragment: 'prensa' },
    { label: 'Contacto', route: '/contacto' },
  ];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.scrollListener = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.isScrolled = scrollTop > 16;
        this.scrollProgress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      };
      window.addEventListener('scroll', this.scrollListener, { passive: true });
      this.scrollListener();
    }
  }

  ngOnDestroy(): void {
    if (this.scrollListener && typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public closeMenu(key?: string): void {
    if (key !== undefined) {
      this.activeKey = key;
    }
    this.isMenuOpen = false;
  }
}
