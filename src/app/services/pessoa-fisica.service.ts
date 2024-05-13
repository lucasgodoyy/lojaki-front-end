import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';
import { PessoaFisica } from '../model/pessoa-fisica';

@Injectable({
  providedIn: 'root'
})
export class PessoaFisicaService {

 // private empresa = localStorage.getItem('Empresa')

  private urlApi = environment.urlApiLocal

  constructor(private http: HttpClient, private loginService: LoginService) { }


  qtdPaginaEmpresa(){
    return this.http.get<Number>(this.urlApi + 'qtdPaginaPessoaFisica')

  }

  listaFisicaByPagina(pagina: Number){
   
    return this.http.get<PessoaFisica[]>(this.urlApi + 'listaPessoaFisicaPagina/' + pagina + '/' + this.loginService.codEmpresa())

  }

  desativarPessoa(fisica: PessoaFisica){
   
    return this.http.post(this.urlApi + 'desativarPessoaFisica/', fisica, { responseType: 'text' })

  }


  salvarFisica(pessoa: PessoaFisica){

    
    return this.http.post<PessoaFisica>(this.urlApi + 'salvarPf/' + this.loginService.codEmpresa(), pessoa)

  }
  
}
