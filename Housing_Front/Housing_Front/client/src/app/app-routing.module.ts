import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PropertiesComponent} from './properties/properties.component';
import {PropertyComponent} from './property/property.component';
import {ContactComponent} from './contact/contact.component';
import {SellComponent} from './sell/sell.component';
import {CreatePropertyComponent} from './create-property/create-property.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {PasswordComponent} from './password/password.component';
import {AuthGuard} from './auth/auth.guard';
import {ServicesComponent} from './services/services.component';
import {ServiceComponent} from './service/service.component';
import {AgentComponent} from './agent/agent.component';
import {LogsComponent} from './logs/logs.component';

const routes: Routes = [
  {
    path: 'logs',
    component: LogsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'agent/:id',
    component: AgentComponent
  },
  {
    path: 'service/:id',
    component: ServiceComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'properties',
    component: PropertiesComponent
  },
  {
    path: 'password',
    component: PasswordComponent
  },
  {
    path: 'createProperties',
    component: CreatePropertyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'property/:id',
    component: PropertyComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'sell',
    component: SellComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
