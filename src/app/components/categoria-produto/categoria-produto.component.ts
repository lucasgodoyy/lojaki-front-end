import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

import { LoginService } from '../../services/login.service';
import { CategoriaProduto } from '../../model/categoria-produto';
import { CategoriaProdutoService } from '../../services/categoria-produto.service';
import { isEmpty } from 'rxjs';



@Component({
  selector: 'app-categoria-produto',
  templateUrl: './categoria-produto.component.html',
  styleUrls: ['./categoria-produto.component.css']
})
export class CategoriaProdutoComponent implements OnInit {


  lista = new Array<CategoriaProduto>();
  categoriaProduto: CategoriaProduto
  catProdForm: FormGroup;
  pesquisa: String = '';
  constructor(private fb: FormBuilder, private categoriaProdutoService: CategoriaProdutoService, private loginService: LoginService) {

    this.categoriaProduto = new CategoriaProduto();
    this.pesquisa = new String();


    /*Pegar dados do formulário, inicia e limpa*/
    this.catProdForm = this.fb.group({
      id: [],
      nomeDesc: [null, Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });

  }

  ngOnInit(): void {


    this.categoriaProdutoService.carregarCategorias().subscribe({
      next: (res) => {
        this.lista = res
      },

      error: (error) => {
        alert(error)
      }
    });


  }



  novo(): void {
    this.catProdForm = this.fb.group({
      id: [],
      nomeDesc: [null, Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });
  }


  /*Trasnformar em objeto */
  catProdObjeto(): CategoriaProduto {

    return {
      id: this.catProdForm.get('id')?.value!,
      nomeDesc: this.catProdForm.get('nomeDesc')?.value!,
      empresa: this.catProdForm.get('empresa')?.value!
    }
  }




  cadastrarCp() {
    const categoria = this.catProdObjeto();

    this.categoriaProdutoService.salvarCategoriaProduto(categoria).subscribe({
      next: (res) => {

        var varResposta = JSON.stringify(res);
        var jsonResposta = JSON.parse(varResposta);

        if (jsonResposta.error != undefined) {
          alert(jsonResposta.error);
        } else {
          alert('Salvo com sucesso: ID ' + jsonResposta.id)
        }

        this.atualizarLista()
        this.novo()

      },
      error: (error) => {
        console.info(error.error.error)
      }
    });

  }

  deletarCp(categoria: CategoriaProduto): void {

    var confir = confirm('Deseja mesmo deletar?');
    if (confir) {

      this.categoriaProdutoService.deletarCatProd(categoria).subscribe({


        next: (res) => {
          alert(res);
          this.atualizarLista()
        },

        error: (error) => {
          var varResposta = JSON.stringify(error);
          var jsonResposta = JSON.parse(varResposta);

          console.log(jsonResposta);
          alert(jsonResposta);

        }
      })

    }

  }



  atualizarLista() {

    this.categoriaProdutoService.carregarCategorias().subscribe({
      next: (res) => {
        this.lista = res;
      },
      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
      }
    });


  }

  buscar(id: number) {
    this.categoriaProdutoService.buscarId(id).subscribe({
      next: (res) => {
        this.categoriaProduto = res;
      },
      error: (error) => {
        alert(error);
      }
    });
  }


  editarCp(c: CategoriaProduto): void {

    this.categoriaProdutoService.buscarId(c.id).subscribe({
      next: (data) => {

        this.categoriaProduto = data


        this.catProdForm = this.fb.group({
          id: [this.categoriaProduto.id],
          nomeDesc: [this.categoriaProduto.nomeDesc, Validators.required],
          empresa: [this.categoriaProduto.empresa, Validators.required]

        });

      },
      error: (error) => {
        alert(error);
      }
    });
    this.atualizarLista();

  }

  


  pesquisar(val:String){

      this.pesquisa = val

      if(val.length <= 0) {
        this.atualizarLista();
      }

     else { this.categoriaProdutoService.buscarPorDescCatgoria(this.pesquisa).subscribe({

        next: (res) => {
          this.lista = res
          },

        error:(error) => {
          alert('error')
          alert(error);
        }
      
      })
    }

      return false
  }




}

