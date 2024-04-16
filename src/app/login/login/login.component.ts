import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../sevices/login.service';
import { Usuario } from '../../model/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  tituloLogin = 'Login da Loja';

  constructor(private fb: FormBuilder, private loginService: LoginService) {

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

    if (login == '') {
      alert('Informe o login para recuperar a senha ')

    } else {
      this.loginService.recuperarSenha(login)

    }

  }


}
