import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
    //Paquete Turistico & Alojamiento
  noches?: number;
  personas?: number;

  //Vuelo
  duracion?: string;
  clase?: string;

  //Auto
  dias?: number;
  gama?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService2 {
  // Simulación de productos, reemplaza con llamada HTTP real si es necesario
  private productos: Producto[] = [];
  private productosSubject = new BehaviorSubject<Producto[]>([...this.productos]);
  private guardarEnLocalStorage(): void {
  localStorage.setItem('productos', JSON.stringify(this.productos));
}


constructor() {
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
      this.productos = JSON.parse(productosGuardados);
      this.productosSubject.next(this.productos);
    }
  }

  getProductos(): Observable<Producto[]> {
    return this.productosSubject.asObservable();
  }

  addProducto(producto: Producto) {
    const nuevoProducto: Producto = {
      ...producto,
      id: this.generarId()
    };
    this.productos.push(nuevoProducto); // importante
    this.actualizarYGuardar();
  }

    editarProducto(id: number, productoActualizado: Producto) {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos[index] = { ...productoActualizado };
      this.actualizarYGuardar();
    }
  }

  private generarId(): number {
    const ids = this.productos.map(p => p.id);
    let nuevoId = Math.floor(Math.random() * 10000);
    while (ids.includes(nuevoId)) {
      nuevoId = Math.floor(Math.random() * 10000);
    }
    return nuevoId;
  }
  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
    this.actualizarYGuardar();
  }
    private actualizarYGuardar() {
    this.productosSubject.next([...this.productos]);
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }
}