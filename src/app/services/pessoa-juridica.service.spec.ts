import { TestBed } from '@angular/core/testing';

import { PessoaJuridicaService } from './pessoa-juridica.service';

describe('PessoaJuridicaService', () => {
  let service: PessoaJuridicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PessoaJuridicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
