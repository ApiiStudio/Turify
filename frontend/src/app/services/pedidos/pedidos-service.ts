import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Pedido {
  id: number;
  servicio_id: number;
  user_id: number;
  numero_pedido: string;
  monto_total: number;
  estado: string;
  fecha_creacion: string;
  direccion_entrega: string;
  email_usuario: string;
}

export interface DetallePedido {
  pedido_id: number;
  cantidad: number;
  importe: number;
  fecha_creacion: string;
}

export interface Usuario {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'https://turifyback.onrender.com/pedidos';
  private userApiUrl = 'https://turifyback.onrender.com/usuarios';

  constructor(private http: HttpClient) { }

  crearPedido(pedido: Pedido): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, pedido);
  }

  crearDetallePedido(detalles: DetallePedido[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/detalle`, detalles);
  }

actualizarEstadoPedido(id: number, nuevo_estado: string): Observable<any> {
  const body = { id, nuevo_estado };
  return this.http.put('https://turifyback.onrender.com/pedidos/estado', body);
}

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>('https://turifyback.onrender.com/pedidos/');
  }

  // ✅ Nuevo: Obtener datos del usuario autenticado
  getUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`https://turifyback.onrender.com/usuarios/${id}`);
  }
  
anularPedidoAdmin(pedido_id: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/anular`, { pedido_id });
}
}
