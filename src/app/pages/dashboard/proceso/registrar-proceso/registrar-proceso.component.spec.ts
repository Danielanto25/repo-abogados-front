import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarProcesoComponent } from './registrar-proceso.component';

describe('RegistrarProcesoComponent', () => {
  let component: RegistrarProcesoComponent;
  let fixture: ComponentFixture<RegistrarProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarProcesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
