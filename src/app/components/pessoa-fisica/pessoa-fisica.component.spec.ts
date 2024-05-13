import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaFisicaComponent } from './pessoa-fisica.component';

describe('PessoaFisicaComponent', () => {
  let component: PessoaFisicaComponent;
  let fixture: ComponentFixture<PessoaFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PessoaFisicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PessoaFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
