import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent, SafePipe} from './app.component';
import {UserService} from '../services/user.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ContactComponent} from './contact/contact.component';
import {PropertiesComponent} from './properties/properties.component';
import {PropertyComponent} from './property/property.component';
import {ServicesComponent} from './services/services.component';
import {HomeComponent} from './home/home.component';
import {SellComponent} from './sell/sell.component';
import {CreatePropertyComponent} from './create-property/create-property.component';
import {RouterModule} from "@angular/router";
import {NotFoundComponent} from './not-found/not-found.component';
import {PasswordComponent} from './password/password.component';
import {AuthService} from "./auth/auth.service";
import {AuthGuard} from "./auth/auth.guard";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ServiceComponent } from './service/service.component';
import { AgentComponent } from './agent/agent.component';
import { LogsComponent } from './logs/logs.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ContactComponent,
        PropertiesComponent,
        PropertyComponent,
        ServicesComponent,
        HomeComponent,
        SellComponent,
        CreatePropertyComponent,
        NotFoundComponent,
        PasswordComponent,
        SafePipe,
        ServiceComponent,
        AgentComponent,
        LogsComponent,
        EditPropertyComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    RouterModule,
    BrowserAnimationsModule,
    ScrollingModule
  ],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
  providers: [UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
