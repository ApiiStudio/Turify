import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Pedido {
  id: number;
  user_id: number;
  servicio_id: number;
  numero_pedido: string;
  monto_total: number;
  estado: string;
  fecha_creacion: string;
  direccion_entrega: string;
  email_usuario: string;
}

export interface DetallePedido {
  pedido_id: number;
  servicio_id: number;
  cantidad: number;
  importe: number;
  fecha_creacion: string;
}
@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'https://turifyback.onrender.com/pedidos';

  constructor(private http: HttpClient) {}

  crearPedido(pedido: Pedido): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, pedido);
  }

  crearDetallePedido(detalles: DetallePedido[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/detalle`, detalles);
  }

  actualizarEstadoPedido(id: number, estado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/estado`, { pedido_id: id, estado });
  }
  
  getPedidos(): Observable<Pedido[]> {
  return this.http.get<Pedido[]>(`${this.apiUrl}/pedidos`);
}
}
