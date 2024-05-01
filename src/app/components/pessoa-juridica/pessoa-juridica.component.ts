import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PessoaJuridicaService } from '../../services/pessoa-juridica.service';
import { LoginService } from '../../services/login.service';
import { PessoaJuridica } from '../../model/pessoa-juridica';

@Component({
  selector: 'app-pessoa-juridica',
  templateUrl: './pessoa-juridica.component.html',
  styleUrls: ['./pessoa-juridica.component.css']
})
export class PessoaJuridicaComponent implements OnInit{


  arrayPagina: Number[]
  qtdPag: Number 
  
  paginaAtual: Number
  listaEmpresa = new Array<PessoaJuridica>();


  constructor(private formBuilder: FormBuilder, private juridicaService: PessoaJuridicaService,
    private loginService: LoginService){

      this.arrayPagina = []
      this.qtdPag = 0
      
      this.paginaAtual = 0
  }

  ngOnInit(): void {
    
    this.qtdPaginas()
    this.buscarPorPagina(this.paginaAtual)

  }

  buscarPorPagina(pagina: Number){

    this.paginaAtual = pagina
      

    this.juridicaService.listaEmpresaByPagina(pagina).subscribe({
      
      next: (res) => {

        this.listaEmpresa = res
        console.info(this.listaEmpresa)
        console.info()
      
      },
        error: (error) => {
        alert(error.error.error)
      }
    })

  }







  qtdPaginas () : void{

    this.juridicaService.qtdPaginaEmpresa().subscribe({

      
      next: (res) => {
        
        this.qtdPag = Number(res)

        this.arrayPagina = Array(this.qtdPag).fill(0).map((x,i) => i)

        console.info(this.qtdPag + ' aaaaaaaaaaaaa')
      
      },
      error: (error) => {
        alert(error.error.error)
      }
    })

  }





  }














