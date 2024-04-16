import { Component } from '@angular/core';
import { LoginService } from './sevices/login.service';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { Usuario } from './model/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

 

  constructor (private fb: FormBuilder, private loginService: LoginService) {

  }
/* Pegando os dados do formulário */
  loginForm = this.fb.group({

    login: [null, Validators.required],
    senha: [null, Validators.required]
  })

/* Transformando os dados do formulário em objeto */
  loginObjeto(): Usuario {

    return {
      login: this.loginForm.get('login')?.value!,
      senha: this.loginForm.get('senha')?.value!
    }
  }

  fazerLogin() {
  const usuario = this.loginObjeto()
  this.loginService.logar(usuario)
  }

  recuperarSenha() {
    const usuario = this.loginObjeto()
    var login = usuario.login
    console.info('---------------Login' + login)

    if (login == '' ){
      alert('Informe o login para recuperar a senha ')
      
    }else {
      this.loginService.recuperarSenha(login)

    }

  } 

}

