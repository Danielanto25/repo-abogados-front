import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTareaComponent } from './tipo-tarea.component';

describe('TipoTareaComponent', () => {
  let component: TipoTareaComponent;
  let fixture: ComponentFixture<TipoTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoTareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
