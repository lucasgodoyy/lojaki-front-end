import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarcaProduto } from '../model/marca-produto';
import { environment } from '../../environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class MarcaProdutoService {

  private urlApi = environment.urlApiLocal;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  pesquisarMarcaPorEmpresa(){

     return this.http.get<MarcaProduto[]>(this.urlApi + 'listaMarcaProdutoPorEmpresa/' + this.loginService.codEmpresa())
  }


  buscarId(id: any){

    
    return this.http.get<MarcaProduto>(this.urlApi + 'obterMarcaProdutoPorId/' + id)
  }

  salvarMarca(marcaProduto: MarcaProduto){

      return this.http.post<MarcaProduto>(this.urlApi + 'salvarMarca/', marcaProduto)
  }


  deletar(marcaProduto: MarcaProduto){

    return this.http.post(this.urlApi + 'deleteMarca/', marcaProduto, { responseType: 'text' })
  }

  pesquisarPorDesc(desc: String){
    
    return this.http.get<MarcaProduto[]>(this.urlApi + 'obterMarcaProdutoPorNomeDescricao/' + desc +'/' + this.loginService.codEmpresa())
  }

  qtdPaginaMarca(){
    
    return this.http.get<Number>(this.urlApi + 'qtdPaginaMarca/' + this.loginService.codEmpresa())
  }

  buscarPorPagina(pagina: Number){
    
    return this.http.get<MarcaProduto[]>(this.urlApi + 'listaMarcaByPagina/' + pagina + '/' + this.loginService.codEmpresa())
  }

  
}
