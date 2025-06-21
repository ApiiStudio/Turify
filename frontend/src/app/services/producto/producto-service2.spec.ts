import { TestBed } from '@angular/core/testing';

import { ProductoService2 } from './producto-service2';

describe('ProductoService2', () => {
  let service: ProductoService2;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoService2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
