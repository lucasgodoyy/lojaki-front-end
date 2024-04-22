import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { interceptorLojakiInterceptor } from './interceptor/interceptor-lojaki.interceptor';

import { HomeComponent } from './home/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { guardianGuard } from './guard/guardian.guard';
import { NavbarComponent } from './navbar/navbar.component';





export const appRoutes : Routes = [ 

{path: 'login', component : LoginComponent},
{path: '', component : AppComponent},
{path: 'home', component : HomeComponent, canActivate:[guardianGuard], data: {role:['ROLE_ADMIN','ROLE_USER']}}
];

export const routes = RouterModule.forRoot(appRoutes)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: interceptorLojakiInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
