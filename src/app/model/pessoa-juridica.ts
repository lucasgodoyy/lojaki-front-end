import { Pessoa } from "./pessoa";

export class PessoaJuridica extends Pessoa{

    id?: Number;
    cnpj?: String;
    inscricaoMunicipal?: String;
    inscricaoEstadual?: String;
    nomeFantasia?: String;
    razaoSocial?: String;
    categoria?: String;



}
