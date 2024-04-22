import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


constructor(private loginService: LoginService){

}

deslogar(): void{
  this.loginService.deslogarMetodo();
}


}
