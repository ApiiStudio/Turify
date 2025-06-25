import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito } from '../../carrito/core/carrito';

@Injectable({
  providedIn: 'root'
})
export class MercadoPago {
  private apiURL = 'https://turifyback.onrender.com';

  constructor(private http: HttpClient) { }

  createPreference(
    carrito: Carrito[],
    usuario: { id: number; email: string },
    direccion: string,
    numeroPedido: string,
  ): Observable<any> {
    const body: any = {
      pedido_numero: numeroPedido,
      user_id: usuario.id,
      email: usuario.email,
      direccion: direccion,
      productos: carrito.map(p => ({
        servicio_id: p.producto.id,
        titulo: p.producto.nombre,
        cantidad: p.cantidad,
        precio_unitario: +(p.producto.precio * 1.21).toFixed(2)
      }))
    };

    console.log('✅ Body enviado a /pago:', body);

    return this.http.post(`${this.apiURL}/pago`, body);
  }
}
