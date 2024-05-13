import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaJuridicaService } from '../../services/pessoa-juridica.service';
import { LoginService } from '../../services/login.service';
import { PessoaJuridica } from '../../model/pessoa-juridica';
import { PessoaFisicaComponent } from '../pessoa-fisica/pessoa-fisica.component';

@Component({
  selector: 'app-pessoa-juridica',
  templateUrl: './pessoa-juridica.component.html',
  styleUrls: ['./pessoa-juridica.component.css']
})
export class PessoaJuridicaComponent implements OnInit {


  arrayPagina: Number[]
  qtdPag: Number
  formEmpresa: FormGroup
  paginaAtual: Number
  listaEmpresa = new Array<PessoaJuridica>();


  constructor(private formBuilder: FormBuilder, private juridicaService: PessoaJuridicaService,
    private loginService: LoginService) {

    this.arrayPagina = []
    this.qtdPag = 0
    this.paginaAtual = 0


    this.formEmpresa = this.formBuilder.group({
      id: [],
      nome: [null, Validators.required],
      email: [null, Validators.required],
      telefone: [null, Validators.required],
      cnpj: [null, Validators.required],
      inscricaoEstadual: [null, Validators.required],
      inscricaoMunicipal: [null, Validators.required],
      nomeFantasia: [null, Validators.required],
      razaoSocial: [null, Validators.required],
      categoria: [null, Validators.required],
      empresa: [null, Validators.required],
    });



  }

  ngOnInit(): void {

    this.qtdPaginas()
    this.buscarPorPagina(this.paginaAtual)

  }

  obterObjTela(): PessoaJuridica {

    return {
      id: this.formEmpresa.get('id')?.value!,
      nome: this.formEmpresa.get('nome')?.value!,
      email: this.formEmpresa.get('email')?.value!,
      telefone: this.formEmpresa.get('telefone')?.value!,
      cnpj: this.formEmpresa.get('cnpj')?.value!,
      inscricaoEstadual: this.formEmpresa.get('inscricaoEstadual')?.value!,
      inscricaoMunicipal: this.formEmpresa.get('inscricaoMunicipal')?.value!,
      nomeFantasia: this.formEmpresa.get('nomeFantasia')?.value!,
      razaoSocial: this.formEmpresa.get('razaoSocial')?.value!,
      categoria: this.formEmpresa.get('categoria')?.value!,
      empresa: this.formEmpresa.get('empresa')?.value!,
    }

  }

  salvar(){

    let pessoa = this.obterObjTela()
    
    this.juridicaService.salvarJuridica(pessoa).subscribe({

      next: (res) => {

        let resp = JSON.stringify(res)
        let jsonResp = JSON.parse(resp)

        if (jsonResp.error != undefined) {
          alert(jsonResp.error);
        } else {
          alert('Salvo com sucesso, id: ' + jsonResp.id)
          this.buscarPorPagina(this.paginaAtual)
        }

      },
      error: (error) => {

        alert('erro ' + error.error)
        

      }
    })


  }

  
  novo(): void {
    this.formEmpresa = this.formBuilder.group({
      id: [],
      nome: [null, Validators.required],
      email: [null, Validators.required],
      telefone: [null, Validators.required],
      cnpj: [null, Validators.required],
      inscricaoEstadual: [null, Validators.required],
      inscricaoMunicipal: [null, Validators.required],
      nomeFantasia: [null, Validators.required],
      razaoSocial: [null, Validators.required],
      categoria: [null, Validators.required],
      empresa: [null, Validators.required],
    });
  }



  editar(pessoa: PessoaJuridica){

    this.formEmpresa = this.formBuilder.group({
      id: [pessoa.id],
      nome: [pessoa.nome, Validators.required],
      email: [pessoa.email, Validators.required],
      telefone: [pessoa.telefone, Validators.required],
      cnpj: [pessoa.cnpj, Validators.required],
      inscricaoEstadual: [pessoa.inscricaoEstadual, Validators.required],
      inscricaoMunicipal: [pessoa.inscricaoMunicipal, Validators.required],
      nomeFantasia: [pessoa.nomeFantasia, Validators.required],
      razaoSocial: [pessoa.razaoSocial, Validators.required],
      categoria: [pessoa.categoria, Validators.required],
      empresa: [pessoa.empresa, Validators.required],
    });

  }


  desativar(pessoa: PessoaJuridica) {

    var confir = confirm('Deseja mesmo DESATIVAR?');
    if (confir) {
      this.juridicaService.desativarEmpresa(pessoa).subscribe({


        next: (res) => {

          alert(res)
          this.buscarPorPagina(this.paginaAtual)

        },
        error: (error) => {
          alert(error.error.error)
        }
      })

    }
  }

    deletar(pessoa: PessoaJuridica) {

      var confir = confirm('Deseja mesmo DELETAR?');
      if (confir) {
        this.juridicaService.deletarEmpresa(pessoa).subscribe({


          next: (res) => {

            this.buscarPorPagina(this.paginaAtual)

          },
          error: (error) => {
            console.info(error.error.error)
            alert(error.error.error)
          }
        })
      }
    }

    buscarPorPagina(pagina: Number) {

      this.paginaAtual = pagina
      this.juridicaService.listaEmpresaByPagina(pagina).subscribe({

        next: (res) => {

          this.listaEmpresa = res

        },
        error: (error) => {
          alert(error.error.error)
        }
      })
    }


    qtdPaginas(): void {

      this.juridicaService.qtdPaginaEmpresa().subscribe({

        next: (res) => {

          this.qtdPag = Number(res)
          this.arrayPagina = Array(this.qtdPag).fill(0).map((x, i) => i)

        },
        error: (error) => {
          alert(error.error.error)
        }
      })

    }


  }

















