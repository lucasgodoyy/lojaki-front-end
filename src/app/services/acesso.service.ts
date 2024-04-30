import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Acesso } from '../model/acesso';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  private urlApi = environment.urlApiLocal;

  constructor(private http: HttpClient, private loginService: LoginService) { }


  qtdPagina() {
    return this.http.get<BigInteger>(this.urlApi + 'qtdPaginaAcesso/' + this.loginService.codEmpresa());
  }


  pesquisarPorDesc(desc: String){
    return this.http.get<Acesso[]>(this.urlApi + 'obterAcessoPorDescricao/' + desc +'/' + this.loginService.codEmpresa());
  }


  deletarAcesso(acesso: Acesso){

    return this.http.post(this.urlApi + 'deleteAcesso/', acesso, { responseType: 'text' })
  }
  
  buscarId(id: any){
    return this.http.get<Acesso>(this.urlApi + 'obterMarcaProdutoPorId/' + id)
  }

  salvarAcesso(acesso: Acesso){

    return this.http.post<Acesso>(this.urlApi + 'salvarAcesso/', acesso)
}

buscarPorPagina(pagina: Number){
    
  return this.http.get<Acesso[]>(this.urlApi + 'listaAcessoByPagina/' + pagina + '/' + this.loginService.codEmpresa())
}


}
