import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivaComponent } from './activa.component';

describe('ActivaComponent', () => {
  let component: ActivaComponent;
  let fixture: ComponentFixture<ActivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
