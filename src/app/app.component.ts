import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Usuario } from './model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {



  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {

  }


  ngOnInit(): void {

   if (this.loginService.usuarioLogado() == true) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }

  }
}