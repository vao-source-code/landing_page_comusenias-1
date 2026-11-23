import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AdSlotComponent } from './shared/ad-slot/ad-slot.component';
import { SupportModalComponent } from './shared/support-modal/support-modal.component';
import { SignDemoComponent } from './shared/sign-demo/sign-demo.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MejoresAppsComponent } from './pages/mejores-apps/mejores-apps.component';
import { EspecialistasFamiliasComponent } from './pages/especialistas-familias/especialistas-familias.component';
import { SobreNosotrosUnlamComponent } from './pages/sobre-nosotros-unlam/sobre-nosotros-unlam.component';
import { LinksComponent } from './pages/links/links.component';
import { AyudanosComponent } from './pages/ayudanos/ayudanos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AdSlotComponent,
    SupportModalComponent,
    SignDemoComponent,
    LandingPageComponent,
    MejoresAppsComponent,
    EspecialistasFamiliasComponent,
    SobreNosotrosUnlamComponent,
    LinksComponent,
    AyudanosComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
