import { Injectable } from '@angular/core';
import { Carrito } from '../../carrito/core/carrito';
import { Producto } from '../producto/producto-service2';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private listCarrito: Carrito[] = [];
  private descuentoActivo: boolean = false;

  // Obtiene Carrito
  getCarrito() {
    this.obtenerSesion();
    return this.listCarrito;
  }

  // Agrega Productos
  agregarProducto(producto: Producto, cantidad: number = 1) {
    this.obtenerSesion();
    const index = this.listCarrito.findIndex(item => item.producto.id == producto.id);

    if (index == -1) {
      const item = new Carrito(producto, cantidad);
      this.listCarrito.push(item);
    } else {
      this.actualizar(index, this.listCarrito[index].cantidad + cantidad);
    }
    this.guardarSesion();
  }

  // Actualiza
  actualizar(index: number, cantidad: number) {
    if (index >= 0 && index < this.listCarrito.length) {
      this.listCarrito[index].cantidad = cantidad;
      this.guardarSesion();
    }
  }

  // Obtiene Cantidad
  cantidad() {
    this.obtenerSesion();
    return this.listCarrito.length
  }

  // Obtiene el Total
  total() {
    const total = this.listCarrito.reduce((sum, item) =>
      sum + item.producto.precio * item.cantidad, 0
    )
    return total;
  }

  // Elimina Productos del Carrito
  eliminar(index: number) {
    if (index >= 0 && index < this.listCarrito.length) {
      this.listCarrito.splice(index, 1);
      this.guardarSesion();
    }
  }

  // Guarda la sesión
  guardarSesion() {
    localStorage.setItem('carrito', JSON.stringify(this.listCarrito));
  }

  // Obtiene la sesión
  obtenerSesion() {
    this.listCarrito = [];
    if (typeof window != 'undefined' && window.localStorage) {
      const carrito = localStorage.getItem('carrito');
      if (carrito != null) {
        this.listCarrito = JSON.parse(carrito);
      }
    }
  }

  // Impuestos del 21%
  impuestos(): number {
    const subtotal = this.total();
    return subtotal * 0.21;
  }

  // Total + Impuestos
  totalConImpuestos(): number {
    return this.totalConDescuento() + this.impuestos();
  }
  
  setDescuentoActivo(activo: boolean) {
    this.descuentoActivo = activo;
  }

  // Descuento
  descuento(): number {
    if (this.descuentoActivo) {
      const subtotal = this.total();
      return subtotal * 0.1;
    }
    return 0;
  }

  // Total + Descuento
  totalConDescuento(): number {
    return this.total() - this.descuento();
  }

  vaciar(): void {
    localStorage.removeItem('carrito');
  }
}
