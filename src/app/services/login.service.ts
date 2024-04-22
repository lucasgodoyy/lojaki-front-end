import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private urlLogar = environment.urlApiLocal + 'login';
  private urlRecuperarSenha = environment.urlApiLocal + 'recuperarSenha';

  constructor(private http: HttpClient, private router: Router) {

  }

  usuarioLogado() {

    var authorization = localStorage.getItem('Authorization')
    return authorization !== '' && authorization !== null && authorization !== 'null'
  }

  logar(usuario: Usuario) {

    return this.http.post<String>(this.urlLogar, usuario).subscribe({

      next: (res) => {

        var respJson = JSON.stringify(res)
        var jwt = JSON.parse(respJson)
        localStorage.setItem("Authorization", jwt.Authorization)
        localStorage.setItem("Username", jwt.username)

        alert('Login realizado')

        this.router.navigate(['home']);

      },

      error: (error) => {
        alert('Ocorreu um erro' + error.error.text)
        console.info(error)
      }

    })
  }

  recuperarSenha(login: String) {

    return this.http.post<String>(this.urlRecuperarSenha, login).subscribe({

      next: (res) => {
        var respostaJSON = JSON.stringify(res)
        var resposta = JSON.parse(respostaJSON)
        console.info(res)
        alert(resposta.msg)
      },
      error: (error) => {

        var respostaJSON = JSON.stringify(error)
        var resposta = JSON.parse(respostaJSON)

        alert('Ocorreu um erro ao recuperar a senha ' + resposta.error.error)

        console.info(error)
      }
    })
  }


  deslogarMetodo(): void {
    localStorage.setItem("Authorization", '');
    localStorage.setItem("username", '');

    this.router.navigate(['login']);
  }

}
