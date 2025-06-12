import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaquetesTuristicos } from './paquetes-turisticos';

describe('PaquetesTuristicos', () => {
  let component: PaquetesTuristicos;
  let fixture: ComponentFixture<PaquetesTuristicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaquetesTuristicos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaquetesTuristicos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
