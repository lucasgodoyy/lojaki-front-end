import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { MarcaProdutoService } from '../../services/marca-produto.service';
import { MarcaProduto } from '../../model/marca-produto';

@Component({
  selector: 'app-marca-produto',
  templateUrl: './marca-produto.component.html',
  styleUrl: './marca-produto.component.css'
})
export class MarcaProdutoComponent implements OnInit {


  marcaProdForm: FormGroup;
  listaMarca = new Array<MarcaProduto>();
  marcaProduto: MarcaProduto
  campoPesquisa: String = ''
  numeroPaginas: Number[] = [];
  qtdPagina: Number 
  paginaAtual: Number = 0;

  constructor(private formBuilder: FormBuilder, private marcaProdutoService: MarcaProdutoService, private loginService: LoginService) {

    this.marcaProduto = new MarcaProduto()
    this.campoPesquisa = new String()
    this.qtdPagina = 0

    this.marcaProdForm = this.formBuilder.group({
      id: [],
      nomeDesc: [null, Validators.required],
      empresa: [this.loginService.objetoEmpresa() || '', Validators.required]
    });



  }

  ngOnInit(): void {


    this.buscarPagina(this.paginaAtual)
    this.qntPaginasFuncao()

  }

  obterObjTela(): MarcaProduto {

    return {
      id: this.marcaProdForm.get('id')?.value!,
      nomeDesc: this.marcaProdForm.get('nomeDesc')?.value!,
      empresa: this.marcaProdForm.get('empresa')?.value!
    }


  }

  buscarPagina(pagina: Number) {

    this.paginaAtual = pagina
    this.marcaProdutoService.buscarPorPagina(pagina).subscribe({

      next: (res) => {

        this.listaMarca = res;
      },

      error: (error) => {
        console.info('ERRO---------------' + error)
      }
    })


  }


  
  salvar() {


    const marcaProduto = this.obterObjTela()

    this.marcaProdutoService.salvarMarca(marcaProduto).subscribe({

      next: (res) => {

        let resp = JSON.stringify(res)
        let jsonResp = JSON.parse(resp)

        if (jsonResp.error != undefined) {
          alert(jsonResp.error);
        } else {
          alert('Salvo com sucesso, id: ' + jsonResp.id)
          this.buscarPagina(this.paginaAtual)
        }

      },
      error: (error) => {

        alert('errou ' + error.error)
        console.info(marcaProduto)

      }
    })
  }



  editarMarca(marcaProduto: MarcaProduto) {


    this.marcaProdutoService.buscarId(marcaProduto.id).subscribe({

      next: (res) => {


        this.marcaProduto = res
        this.marcaProdForm = this.formBuilder.group({
          id: [marcaProduto.id],
          nomeDesc: [marcaProduto.nomeDesc, Validators.required],
          empresa: [marcaProduto.empresa, Validators.required]

        });

      },
      error: (error) => {
        alert(error.error.error)
        console.info('erro')

      }
    })
  }


  novo(): void {
    this.marcaProdForm = this.formBuilder.group({
      id: [],
      nomeDesc: [null, Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });
  }


  deletarMarca(marcaProduto: MarcaProduto): void {

    var confir = confirm('Deseja mesmo deletar?');

    if (confir) {
      this.marcaProdutoService.deletar(marcaProduto).subscribe({

        next: (res) => {

          alert(res)
          this.buscarPagina(this.paginaAtual)

        },
        error: (error) => {
          alert(error.error.error)
        }
      })
    }

    this.buscarPagina(this.paginaAtual)

  }


  pesquisarMarcaPorDesc(desc: String) {

    this.campoPesquisa = desc

    if (this.campoPesquisa.length > 0) {
      this.marcaProdutoService.pesquisarPorDesc(this.campoPesquisa).subscribe({

        next: (res) => {
          this.listaMarca = res
        },
        error: (error) => {
          alert(error.error.error)
        }
      })
    } 
    if(this.campoPesquisa.length <= 0) {


    }

    return false
      
  }


qntPaginasFuncao() : void{

  this.marcaProdutoService.qtdPaginaMarca().subscribe({

    next: (res) => {

      this.qtdPagina = Number(res)

     this.numeroPaginas = Array(this.qtdPagina).fill(0).map((x,i) => i)
    
    },
    error: (error) => {
      alert(error.error.error)
    }
  })

}

voltar(): void{


  if(this.paginaAtual.valueOf() > 0){
    this.paginaAtual = this.paginaAtual.valueOf() - 1;
  }

  this.buscarPagina(this.paginaAtual);
} 

avancar(): void{

   if(this.paginaAtual.valueOf() < this.qtdPagina.valueOf()){
         this.paginaAtual = this.paginaAtual.valueOf() + 1;
   }

   this.buscarPagina(this.paginaAtual);

}


}


