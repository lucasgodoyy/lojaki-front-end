import { Component, OnInit } from '@angular/core';
import { AcessoService } from '../../services/acesso.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Acesso } from '../../model/acesso';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrl: './acesso.component.css'
})
export class AcessoComponent implements OnInit {

  acessoProdForm: FormGroup;
  listaMarca = new Array<Acesso>();
  acessoObj: Acesso
  campoPesquisa: String = ''
  numeroPaginas: Number[] = [];
  qtdPagina: Number
  paginaAtual: Number = 0;


  constructor(private formBuilder: FormBuilder, private acessoService: AcessoService,
    private loginService: LoginService) {

    this.acessoObj = new Acesso()
    this.campoPesquisa = new String()
    this.qtdPagina = 0

    this.acessoProdForm = this.formBuilder.group({
      id: [],
      nomeDesc: [null, Validators.required],
      empresa: [this.loginService.objetoEmpresa() || '', Validators.required]
    });


  }


  ngOnInit(): void {


    this.buscarPagina(this.paginaAtual)
    this.qntPaginasFuncao()

  }

  obterObjTela(): Acesso {

    return {
      id: this.acessoProdForm.get('id')?.value!,
      descricao: this.acessoProdForm.get('nomeDesc')?.value!,
      empresa: this.acessoProdForm.get('empresa')?.value!
    }


  }

  buscarPagina(pagina: Number) {

    this.paginaAtual = pagina
    this.acessoService.buscarPorPagina(pagina).subscribe({

      next: (res) => {

        this.listaMarca = res;
      },

      error: (error) => {
        console.info('ERRO---------------' + error)
      }
    })


  }



  salvar() {


    const acessoSalvar = this.obterObjTela()

    this.acessoService.salvarAcesso(acessoSalvar).subscribe({

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

      }
    })
  }



  editarAcesso(acesso: Acesso) {


    this.acessoService.buscarId(acesso.id).subscribe({

      next: (res) => {


        this.acessoObj = res
        this.acessoProdForm = this.formBuilder.group({
          id: [this.acessoObj.id],
          nomeDesc: [this.acessoObj.descricao, Validators.required],
          empresa: [this.acessoObj.empresa, Validators.required]

        });

      },
      error: (error) => {
        alert(error.error.error)
        console.info('erro')

      }
    })
  }


  novo(): void {
    this.acessoProdForm = this.formBuilder.group({
      id: [],
      nomeDesc: [null, Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });
  }


  deletarAcesso(acesso: Acesso): void {

    var confir = confirm('Deseja mesmo deletar?');

    if (confir) {
      this.acessoService.deletarAcesso(acesso).subscribe({

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


  pesquisarAcessoPorDesc(desc: String) {

    this.campoPesquisa = desc

    if (this.campoPesquisa.length > 0) {
      this.acessoService.pesquisarPorDesc(this.campoPesquisa).subscribe({

        next: (res) => {
          this.listaMarca = res
        },
        error: (error) => {
          alert(error.error.error)
        }
      })
    }
    if (this.campoPesquisa.length <= 0) {


    }

    return false

  }


  qntPaginasFuncao(): void {

    this.acessoService.qtdPagina().subscribe({

      next: (res) => {

        this.qtdPagina = Number(res)

        this.numeroPaginas = Array(this.qtdPagina).fill(0).map((x, i) => i)

      },
      error: (error) => {
        alert(error.error.error)
      }
    })

  }

  voltar(): void {


    if (this.paginaAtual.valueOf() > 0) {
      this.paginaAtual = this.paginaAtual.valueOf() - 1;
    }

    this.buscarPagina(this.paginaAtual);
  }

  avancar(): void {

    if (this.paginaAtual.valueOf() < this.qtdPagina.valueOf()) {
      this.paginaAtual = this.paginaAtual.valueOf() + 1;
    }

    this.buscarPagina(this.paginaAtual);

  }


}

