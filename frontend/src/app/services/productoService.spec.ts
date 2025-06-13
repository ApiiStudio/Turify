import { TestBed } from '@angular/core/testing';

import { Productos } from '../pages/productos/productos';

describe('Producto', () => {
  let service: Productos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Productos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
