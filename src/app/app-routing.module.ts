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

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'privacidad', component: PrivacyComponent },
  { path: 'terminos', component: TermsComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'mejores-apps-aprender-lengua-de-senas-argentina', component: MejoresAppsComponent },
  { path: 'especialistas-y-familias', component: EspecialistasFamiliasComponent },
  { path: 'sobre-nosotros-unlam', component: SobreNosotrosUnlamComponent },
  { path: 'links', component: LinksComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
