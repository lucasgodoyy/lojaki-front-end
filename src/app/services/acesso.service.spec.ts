import { TestBed } from '@angular/core/testing';

import { AcessoService } from './acesso.service';

describe('AcessoService', () => {
  let service: AcessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcessoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
