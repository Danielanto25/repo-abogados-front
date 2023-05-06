import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBibliotecaComponent } from './listar-biblioteca.component';

describe('ListarBibliotecaComponent', () => {
  let component: ListarBibliotecaComponent;
  let fixture: ComponentFixture<ListarBibliotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarBibliotecaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
