import { Component, OnInit, inject } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Nav } from '../../shared/nav/nav';
import { Footer } from '../../shared/footer/footer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CarritoService } from '../../services/carrito/carrito-service';
import { Carrito } from '../core/carrito';
import { PedidoService, Pedido, DetallePedido } from '../../services/pedidos/pedidos-service';
import { AuthLogin } from '../../services/auth-login/auth-login';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [Header, Nav, Footer, CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  carritoService = inject(CarritoService);
  pedidoService = inject(PedidoService);
  authService = inject(AuthLogin);
  router = inject(Router);

  listCarrito: Carrito[] = [];
  cupon: string = '';
  cuponAplicado = false;
  cuponInvalido = false;

  userId: number | null = null;
  userEmail: string = '';

  ngOnInit(): void {
    this.getListCarrito();

    // Obtenemos datos del usuario
    this.authService.currentUserData.subscribe({
      next: (user) => {
        this.userId = user?.id ?? null;
        this.userEmail = user?.email ?? '';
      }
    });
  }

  getListCarrito(): void {
    this.listCarrito = this.carritoService.getCarrito();
  }

  onKeyDown(event: KeyboardEvent): void {
    event.preventDefault();
  }

  actualizar(item: Carrito, index: number): void {
    this.carritoService.actualizar(index, item.cantidad);
  }

  eliminarItem(index: number): void {
    this.carritoService.eliminar(index);
    this.getListCarrito();
  }

  aplicarCupon(): void {
    const codigo = this.cupon.trim().toLowerCase();
    if (codigo === 'turify') {
      this.carritoService.setDescuentoActivo(true);
      this.cuponAplicado = true;
      this.cuponInvalido = false;
    } else {
      this.carritoService.setDescuentoActivo(false);
      this.cuponAplicado = false;
      this.cuponInvalido = true;
    }
  }

  procesarPago(): void {
    if (!this.userId) {
      alert('Debes iniciar sesión para procesar el pago.');
      return;
    }

    const fechaActual = new Date().toISOString().split('T')[0];
    const numeroPedido = 'PED' + Math.floor(Math.random() * 100000);

    const pedido: Pedido = {
      user_id: this.userId,
      servicio_id: 0, // Si no aplica, omitir en backend
      numero_pedido: numeroPedido,
      monto_total: this.carritoService.total(),
      estado: 'pendiente',
      fecha_creacion: fechaActual,
      direccion_entrega: 'Dirección demo',
      email_usuario: this.userEmail,
      id: 0
    };

    this.pedidoService.crearPedido(pedido).subscribe({
      next: (res) => {
        const pedido_id = res.pedido_id ?? res.id ?? 0;

        const detalles: DetallePedido[] = this.carritoService.getCarrito().map(item => ({
          pedido_id,
          servicio_id: item.producto.id,
          cantidad: item.cantidad,
          importe: item.producto.precio * item.cantidad,
          fecha_creacion: fechaActual
        }));
      },
      error: err => {
        console.error('Error al crear el pedido', err);
        alert('Error al procesar el pedido.');
      }
    });
  }
  
}
