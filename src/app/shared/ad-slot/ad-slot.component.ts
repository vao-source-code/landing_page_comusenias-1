import { AfterViewInit, Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    adsbygoogle?: any[] & { requestNonPersonalizedAds?: number };
  }
}

@Component({
  selector: 'app-ad-slot',
  templateUrl: './ad-slot.component.html',
  styleUrls: ['./ad-slot.component.css']
})
export class AdSlotComponent implements AfterViewInit {
  @Input() adClient = 'ca-pub-1617470550819719';
  @Input() adSlot = '';
  @Input() adFormat: 'auto' | 'horizontal' | 'rectangle' = 'horizontal';
  @Input() label = 'PUBLICIDAD';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (!this.adSlot || !isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.requestNonPersonalizedAds = 1;
      window.adsbygoogle.push({});
    } catch {
      // Evita romper la vista si un bloqueador de anuncios intercepta adsbygoogle
    }
  }
}
