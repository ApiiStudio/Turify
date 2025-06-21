import { Component, OnInit, inject } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Nav } from '../../shared/nav/nav';
import { Footer } from '../../shared/footer/footer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Producto } from '../../services/producto/producto-service2';

import { CarritoService } from '../../services/carrito/carrito-service';
import { Carrito } from '../core/carrito';
import { PedidoService, Pedido, DetallePedido, Usuario } from '../../services/pedidos/pedidos-service';
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

  userEmail: string = '';
  userId: number = 0;

  ngOnInit(): void {
    this.getListCarrito();

    const usuarioLocal = this.authService.currentUserData.value;
    if (usuarioLocal && usuarioLocal.id) {
      this.pedidoService.getUsuarioPorId(usuarioLocal.id).subscribe({
        next: (usuarioApi) => {
          this.userEmail = usuarioApi.email;
          this.userId = usuarioApi.id;
          console.log('Usuario autenticado desde API:', usuarioApi);
        },
        error: (err) => {
          console.error('No se pudo obtener el usuario actual:', err);
          alert('Debe iniciar sesión para procesar el pago.');
          this.router.navigate(['/login']);
        }
      });
    } else {
      alert('Debe iniciar sesión para continuar.');
      this.router.navigate(['/login']);
    }
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
    if (!this.userId || !this.userEmail) {
      alert('Error: No hay sesión activa.');
      return;
    }

    const fechaActual = new Date().toISOString().split('T')[0];
    const numeroPedido = 'PED' + Math.floor(Math.random() * 100000);

    const pedido: Pedido = {
      id: 0,
      user_id: this.userId,
      servicio_id: this.listCarrito[0]?.producto.id, // Si tu backend ahora no requiere esto, podés eliminarlo
      numero_pedido: numeroPedido,
      monto_total: this.carritoService.totalConImpuestos(),
      estado: 'pendiente',
      fecha_creacion: fechaActual,
      direccion_entrega: 'Dirección demo',
      email_usuario: this.userEmail,
    };

    console.log('Pedido a crear:', pedido);

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

        console.log('Detalles del pedido:', detalles);
        // Pronto podés activar esta línea:
        // this.pedidoService.crearDetallePedido(detalles).subscribe(...)

        alert('Pedido procesado con éxito.');
      },
      error: err => {
        console.error('Error al crear el pedido', err);
        alert('Error al procesar el pedido.');
      }
    });
  }
}
