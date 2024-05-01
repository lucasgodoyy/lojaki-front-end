export class PessoaJuridica {

    id?: Number;
    cnpj?: String;
    inscEstadual?: String;
    inscMunicipal?: String;
    nomeFantasia?: String;
    razaoSocial?: String;
    categoria?: String;

    constructor(private cod: Number) {
        this.id = cod

    }
}
