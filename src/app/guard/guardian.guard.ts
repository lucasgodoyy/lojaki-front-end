
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';


export const guardianGuard: CanActivateFn = (route, state) => {


  var username = localStorage.getItem('Username')
  var roles = route.data
  var rolee = roles['role'].toString();

  //var rolee = JSON.parse(JSON.stringify(roles)).role.toString()
  var authorization =  '' + localStorage.getItem('Authorization')

  console.info(rolee)
  //console.info('user ' + username)

  
  var request = new XMLHttpRequest()

  request.open("GET", environment.urlApiLocal + 'possuiAcesso/' +  username + "/" + rolee, false) /* "false" para a solicitação ser síncrona  */
  request.setRequestHeader('Authorization', authorization)
  request.send()

  var possuiAcessoRetorno =  request.responseText === 'true' || new Boolean(request.responseText) === true
  var usuarioLogado = inject(LoginService).usuarioLogado()

  console.info('-----------' + possuiAcessoRetorno) 


  return usuarioLogado && possuiAcessoRetorno
};
