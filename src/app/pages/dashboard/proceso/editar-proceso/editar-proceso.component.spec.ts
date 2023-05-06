import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProcesoComponent } from './editar-proceso.component';

describe('EditarProcedesoComponent', () => {
  let component: EditarProcesoComponent;
  let fixture: ComponentFixture<EditarProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarProcesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
