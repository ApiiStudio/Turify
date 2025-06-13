import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  // agrega otros campos según sea necesario
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService2 {
  // Simulación de productos, reemplaza con llamada HTTP real si es necesario
  private productos: Producto[] = [
    { id: 1, nombre: 'Paquete 1', categoria: 'paquete', descripcion:'lorem', precio:200 },
    { id: 2, nombre: 'Paquete 2', categoria: 'vuelo', descripcion:'lorem', precio:200 },
    { id: 3, nombre: 'Paquete 3', categoria: 'alojamiento', descripcion:'lorem', precio:200 },
    { id: 4, nombre: 'Paquete 4', categoria: 'excursion', descripcion:'lorem', precio:200 },
    { id: 5, nombre: 'Paquete 5', categoria: 'auto', descripcion:'lorem', precio:200 },
  ];

  getProductos(): Observable<Producto[]> {
    return of(this.productos);
  }
}