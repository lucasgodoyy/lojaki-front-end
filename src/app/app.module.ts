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
import { CategoriaProdutoComponent } from './components/categoria-produto/categoria-produto.component';
import { MarcaProdutoComponent } from './components/marca-produto/marca-produto.component';
import { AcessoComponent } from './components/acesso/acesso.component';
import { PessoaJuridicaComponent } from './components/pessoa-juridica/pessoa-juridica.component';
import { PessoaFisicaComponent } from './components/pessoa-fisica/pessoa-fisica.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { Maskito } from '@maskito/core';

 

 

export const appRoutes : Routes = [ 

{path: 'login', component : LoginComponent},
{path: '', component : AppComponent},
{path: 'home', component : HomeComponent, canActivate:[guardianGuard], data: {role:['ROLE_ADMIN','ROLE_USER']}},
{path: 'categoria-produto', component: CategoriaProdutoComponent, canActivate:[guardianGuard], data: {role:['ROLE_ADMIN','ROLE_USER']}},
{path: 'marca-produto', component: MarcaProdutoComponent, canActivate:[guardianGuard], data: {role:['ROLE_ADMIN','ROLE_USER']}},
{path: 'acesso', component: AcessoComponent, canActivate:[guardianGuard], data: {role:['ROLE_ADMIN','ROLE_USER']}},
{path: 'pessoa-juridica', component: PessoaJuridicaComponent, canActivate:[guardianGuard], data: {role:['ROLE_ADMIN','ROLE_USER']}},
{path: 'pessoa-fisica', component: PessoaFisicaComponent, canActivate:[guardianGuard], data: {role:['ROLE_ADMIN','ROLE_USER']}},




];

export const routes = RouterModule.forRoot(appRoutes)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    CategoriaProdutoComponent,
    MarcaProdutoComponent,
    AcessoComponent,
    PessoaJuridicaComponent,
    PessoaFisicaComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule, 
    
    RouterModule.forRoot(appRoutes),
    NgxMaskDirective,
    NgxMaskPipe,
    
     
    
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: interceptorLojakiInterceptor, multi: true},
    provideNgxMask()

  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
