import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaFisicaService } from '../../services/pessoa-fisica.service';
import { LoginService } from '../../services/login.service';
import { PessoaFisica } from '../../model/pessoa-fisica';

@Component({
  selector: 'app-pessoa-fisica',
  templateUrl: './pessoa-fisica.component.html',
  styleUrl: './pessoa-fisica.component.css'
})
export class PessoaFisicaComponent implements OnInit{

  formPessoaFisica: FormGroup
  numberArrayPagina: Number[]
  numberQtdPagina: Number
  paginaAtual: Number
  listaPessoaFisica = new Array<PessoaFisica>();
  pessoaFisicaObj: PessoaFisica


constructor(private formBuilder: FormBuilder, private pessoaFisicaService: PessoaFisicaService,
  private loginService: LoginService) {

    this.numberArrayPagina = []
    this.numberQtdPagina = 0 
    this.paginaAtual = 0
    this.pessoaFisicaObj = new PessoaFisica

 
    this.formPessoaFisica = this.formBuilder.group({
      id: [],
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, Validators.required],
      cpf: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      empresa: [null, Validators.required],
    });



  }


  ngOnInit(): void {
    
    this.carregarNumeroPagina()
    this.buscarPorPagina(this.paginaAtual);
    console.info(this.obterObjTela())

  }


  salvar(){

    this.pessoaFisicaObj = this.obterObjTela()

    this.pessoaFisicaService.salvarFisica(this.pessoaFisicaObj).subscribe({

      next: (res) => {
        
        let resposta = JSON.stringify(res)
        let respostaJson = JSON.parse(resposta)

        this.novo();
        this.buscarPorPagina(this.paginaAtual);
        alert('Salvo com sucesso, ID: ' + respostaJson.id)


        let jsonr = JSON.stringify(res)
        let jss = JSON.parse(jsonr)

      },
      error: (error) => {
        alert(error.error.error)
      }
    })


  }


  desativar(fisica: PessoaFisica){

    var confir = confirm('Deseja mesmo DESATIVAR?');
    if (confir) {
    this.pessoaFisicaService.desativarPessoa(fisica).subscribe({


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

  editar(pessoa: PessoaFisica){

    this.formPessoaFisica = this.formBuilder.group({
      id: [pessoa.id],
      nome: [pessoa.nome, Validators.required],
      email: [pessoa.email, Validators.required],
      telefone: [pessoa.telefone, Validators.required],
      cpf: [pessoa.cpf, Validators.required],
      dataNascimento: [pessoa.dataNascimento, Validators.required],
      empresa: [pessoa.empresa?.id, Validators.required],
    });

  }



  obterObjTela(): PessoaFisica {

    return {
      id: this.formPessoaFisica.get('id')?.value!,
      nome: this.formPessoaFisica.get('nome')?.value!,
      email: this.formPessoaFisica.get('email')?.value!,
      telefone: this.formPessoaFisica.get('telefone')?.value!,
      cpf: this.formPessoaFisica.get('cpf')?.value!,
      dataNascimento: this.formPessoaFisica.get('dataNascimento')?.value!,
    }

  }





  buscarPorPagina(pagina: Number) {

    this.paginaAtual = pagina
    this.pessoaFisicaService.listaFisicaByPagina(this.paginaAtual).subscribe({

      next: (res) => {
        
        this.listaPessoaFisica = res


        let jsonr = JSON.stringify(res)
        let jss = JSON.parse(jsonr)

      },
      error: (error) => {
        alert(error.error.error)
      }
    })
  }



  carregarNumeroPagina(){

    this.pessoaFisicaService.qtdPaginaEmpresa().subscribe({

      next: (res) => {

        this.numberQtdPagina = Number(res)
        this.numberArrayPagina = Array(this.numberQtdPagina).fill(0).map((x, i) => i)
      },
      error: (error) => {
        alert(error.error.error)
      }


    })

  }


  
  
  
  
  novo(){

    this.formPessoaFisica = this.formBuilder.group({
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


}
