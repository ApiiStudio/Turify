import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Excursiones } from './excursiones';

describe('Excursiones', () => {
  let component: Excursiones;
  let fixture: ComponentFixture<Excursiones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Excursiones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Excursiones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
