import { TestBed } from '@angular/core/testing';

import { MarcaProdutoService } from './marca-produto.service';

describe('MarcaProdutoService', () => {
  let service: MarcaProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcaProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
