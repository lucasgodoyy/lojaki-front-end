import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';
import { PessoaJuridica } from '../model/pessoa-juridica';

@Injectable({
  providedIn: 'root'
})
export class PessoaJuridicaService {

  private urlApi = environment.urlApiLocal

  constructor(private http: HttpClient, private loginService: LoginService) { }



  qtdPaginaEmpresa(){
    return this.http.get<Number>(this.urlApi + 'qtdPaginaEmpresa')

  }

  listaEmpresaByPagina(pagina: Number){
    return this.http.get<PessoaJuridica[]>(this.urlApi + 'listaEmpresaByPagina/' + pagina)

  }

  deletarEmpresa(empresa: PessoaJuridica){
    return this.http.post(this.urlApi + 'deletePessoaJuridica/', empresa, { responseType: 'text' })

  }


  desativarEmpresa(empresa: PessoaJuridica){
    return this.http.post(this.urlApi + 'desativarPessoaJuridica/', empresa, { responseType: 'text' })

  }

  salvarJuridica(empresa: PessoaJuridica){
    return this.http.post<PessoaJuridica>(this.urlApi + 'salvarEmpresaNova/', empresa)

  }

}


