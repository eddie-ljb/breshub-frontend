import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { FeatureComponent } from './pages/feature/feature.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { TeamComponent } from './pages/team/team.component';
import { GruppenuebersichtComponent } from './pages/gruppenuebersicht/gruppenuebersicht.component';
import { GruppenerstellenComponent } from './pages/gruppenerstellen/gruppenerstellen.component';
import { GruppenbeitretenComponent } from './pages/gruppenbeitreten/gruppenbeitreten.component';
import { GruppenentfernenComponent } from './pages/gruppenentfernen/gruppenentfernen.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'feature', component: FeatureComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'team', component: TeamComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' }, // Standardroute zeigt AppComponent
  { path: 'dashboard', component: DashboardComponent, runGuardsAndResolvers: 'always' },
  { path: 'gruppen-uebersicht', component: GruppenuebersichtComponent, runGuardsAndResolvers: 'always' },
  { path: 'gruppen-erstellen', component: GruppenerstellenComponent, runGuardsAndResolvers: 'always' },
  { path: 'gruppen-beitreten', component: GruppenbeitretenComponent, runGuardsAndResolvers: 'always' },
  { path: 'gruppen-entfernen', component: GruppenentfernenComponent, runGuardsAndResolvers: 'always' }
];
