import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;

  // Paquete / Alojamiento
  noches?: number;
  personas?: number;

  // Vuelo
  duracion?: string;
  clase?: string;

  // Auto
  dias?: number;
  gama?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService2 {
  getProductosFiltradosApi(categoria: string): Observable<Producto[]> {
  return this.http.get<Producto[]>(`${this.apiUrl}/filtrar?categoria=${categoria}`);
  }
  private apiUrl = 'https://turifyback.onrender.com/servicios';

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProductosApi(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Crear un nuevo producto
  addProductoApi(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  // Editar un producto existente
  editarProductoApi(id: number, productoActualizado: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, productoActualizado);
  }

  // Eliminar un producto
  eliminarProductoApi(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}