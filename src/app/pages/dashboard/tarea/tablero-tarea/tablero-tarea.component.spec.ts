import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroTareaComponent } from './tablero-tarea.component';

describe('TableroTareaComponent', () => {
  let component: TableroTareaComponent;
  let fixture: ComponentFixture<TableroTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableroTareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
