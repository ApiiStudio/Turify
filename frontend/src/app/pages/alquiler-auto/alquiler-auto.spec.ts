import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilerAuto } from './alquiler-auto';

describe('AlquilerAuto', () => {
  let component: AlquilerAuto;
  let fixture: ComponentFixture<AlquilerAuto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlquilerAuto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlquilerAuto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
