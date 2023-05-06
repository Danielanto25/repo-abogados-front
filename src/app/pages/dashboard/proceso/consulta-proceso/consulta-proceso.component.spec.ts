import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaProcesoComponent } from './consulta-proceso.component';

describe('ConsultaProcesoComponent', () => {
  let component: ConsultaProcesoComponent;
  let fixture: ComponentFixture<ConsultaProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaProcesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
