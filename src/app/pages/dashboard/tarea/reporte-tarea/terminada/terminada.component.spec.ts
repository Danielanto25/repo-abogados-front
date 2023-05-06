import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminadaComponent } from './terminada.component';

describe('TerminadaComponent', () => {
  let component: TerminadaComponent;
  let fixture: ComponentFixture<TerminadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
