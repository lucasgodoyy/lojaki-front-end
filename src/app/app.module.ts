import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { interceptorLojakiInterceptor } from './interceptor/interceptor-lojaki.interceptor';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './home/home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: interceptorLojakiInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
