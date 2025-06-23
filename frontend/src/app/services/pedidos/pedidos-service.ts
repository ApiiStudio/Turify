import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthLogin } from '../auth-login/auth-login';

export interface Pedido {
  categoria?: any;
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

  constructor(private http: HttpClient, private auth: AuthLogin) { }
  
  // Crea un Pedido
  crearPedido(pedido: Pedido): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, pedido);
  }

  // Crea el detalle del Pedido
  crearDetallePedido(detalles: DetallePedido[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/detalle`, detalles);
  }

  // Actualiza el Estado del Pedido dentro de la API
  actualizarEstadoPedido(id: number, nuevo_estado: string): Observable<any> {
    const body = { id, nuevo_estado };
    return this.http.put('https://turifyback.onrender.com/pedidos/estado', body);
  }

  // Obtiene los Pedidos de la API
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>('https://turifyback.onrender.com/pedidos/');
  }

  // Obtiene datos del Usuario por API
  getUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`https://turifyback.onrender.com/usuarios/${id}`);
  }
  
  // Anula Pedidos por API
  anularPedidoAdmin(pedido_id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/anular`, { pedido_id });
  }

  // Obtiene los Pedidos por ID del usuario
  getPedidosPorUsuario(id: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/mios?user_id=${id}`);
  }
}
