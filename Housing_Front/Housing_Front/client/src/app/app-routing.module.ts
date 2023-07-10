import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PropertiesComponent} from './properties/properties.component';
import {PropertyComponent} from './property/property.component';
import {ContactComponent} from './contact/contact.component';
import {SellComponent} from './sell/sell.component';

const routes: Routes = [
  {
    path: 'properties',
    component: PropertiesComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
