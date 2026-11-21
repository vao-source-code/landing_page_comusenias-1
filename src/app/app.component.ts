import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RouteSeoData, SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'comuSenias';
  private seoSub?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoSub = this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.snapshot.data['seo'] as RouteSeoData | undefined;
        })
      )
      .subscribe(seoData => {
        if (seoData) {
          this.seoService.updateRouteSeo(seoData);
        }
      });
  }

  ngOnDestroy(): void {
    this.seoSub?.unsubscribe();
  }
}
