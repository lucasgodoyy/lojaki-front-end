import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaJuridicaComponent } from './pessoa-juridica.component';

describe('PessoaJuridicaComponent', () => {
  let component: PessoaJuridicaComponent;
  let fixture: ComponentFixture<PessoaJuridicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PessoaJuridicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PessoaJuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
