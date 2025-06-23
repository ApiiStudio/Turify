import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Restringido } from './restringido';

describe('Restringido', () => {
  let component: Restringido;
  let fixture: ComponentFixture<Restringido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Restringido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Restringido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
