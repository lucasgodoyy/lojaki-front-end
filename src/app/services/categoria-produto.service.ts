import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { LoginService } from './login.service';
import { CategoriaProduto } from '../model/categoria-produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoriaProdutoService {

  private urlApi = environment.urlApiLocal;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) {

  }


  salvarCategoriaProduto(categoriaProduto: CategoriaProduto) {

    return this.http.post<String>(this.urlApi + 'salvarCategoria', categoriaProduto)
  }




  deletarCatProd(categoriaProduto: CategoriaProduto) {

    return this.http.post(this.urlApi + 'deletarCategoria', categoriaProduto, { responseType: 'text' } );
      
  }

  carregarCategorias(pagina: Number)  {
    return this.http.get<CategoriaProduto[]>(this.urlApi + 'listaPorPageCategoriaProduto/' + this.loginService.codEmpresa() + '/' + pagina);

  }

  buscarId(id: any)  {
    return this.http.get<CategoriaProduto>(this.urlApi + 'buscarPorId/' + id);
}


buscarPorDescCatgoria(desc: String){
  return this.http.get<CategoriaProduto[]>(this.urlApi + 'buscarPorDescCategoriaEmp/' + desc +'/' + this.loginService.codEmpresa());
}

qtdPagina() {
  return this.http.get<BigInteger>(this.urlApi + 'qtdPaginaCategoriaProduto/' + this.loginService.codEmpresa());
}


}

