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
import { MercadoPago } from '../../services/mercado-pago/mercado-pago';

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
  mercadoPagoService = inject(MercadoPago);
  router = inject(Router);

  listCarrito: Carrito[] = [];
  cupon: string = '';
  cuponAplicado = false;
  cuponInvalido = false;

  userEmail: string = '';
  userId: number = 0;
  direccion: string = ''; // puedes enlazarlo desde el formulario
  numeroPedido: string = '';

  ngOnInit(): void {
    this.getListCarrito();

    const usuarioLocal = this.authService.currentUserData.value;
    if (usuarioLocal && usuarioLocal.id) {
      this.pedidoService.getUsuarioPorId(usuarioLocal.id).subscribe({
        next: (usuarioApi) => {
          this.userEmail = usuarioApi.email;
          this.userId = usuarioApi.id;
        },
        error: () => {
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
    this.numeroPedido = 'PED' + Math.floor(Math.random() * 100000);

    // Paso 1: generar preferencia en Mercado Pago
    this.mercadoPagoService.createPreference(
      this.listCarrito,
      { id: this.userId, email: this.userEmail },
      this.direccion,
      this.numeroPedido
    ).subscribe({
      next: (res) => {
        const initPoint = res.init_point;
        if (!initPoint) {
          alert('No se pudo obtener el enlace de pago.');
          return;
        }

        // Paso 2: abrir ventana de pago
        const pagoVentana = window.open(initPoint, '_blank');
        if (!pagoVentana) {
          alert('Permita ventanas emergentes para completar el pago.');
          return;
        }

        // Paso 3: solo si el pago se completa, crear pedido y detalles
        // Simulación: en entorno real usarías Webhooks/IPN
        // Aquí asumimos que si se abrió, se paga (solo para test)

        const pedido: Pedido = {
          id: 0,
          user_id: this.userId,
          servicio_id: this.listCarrito[0].producto.id, // opcional si se guarda en detalles
          numero_pedido: this.numeroPedido,
          monto_total: this.carritoService.totalConImpuestos(),
          estado: 'pendiente',
          fecha_creacion: fechaActual,
          direccion_entrega: this.direccion,
          email_usuario: this.userEmail,
        };

        this.pedidoService.crearPedido(pedido).subscribe({
          next: (res) => {
            const pedido_id = res.id || res.pedido_id;
            const detalles: DetallePedido[] = this.listCarrito.map(item => ({
              pedido_id,
              servicio_id: item.producto.id,
              cantidad: item.cantidad,
              importe: item.producto.precio * item.cantidad,
              fecha_creacion: fechaActual
            }));

            this.pedidoService.crearDetallePedido(detalles).subscribe({
              next: () => {
                this.carritoService.vaciar(); // limpiar carrito
                this.getListCarrito(); // actualizar vista
                alert('Pedido procesado correctamente. ¡Gracias por tu compra!');
              },
              error: () => {
                alert('Error al guardar los detalles del pedido.');
              }
            });
          },
          error: () => {
            alert('Error al crear el pedido.');
          }
        });
      },
      error: (err) => {
        console.error("Error creando preferencia:", err);
        alert(JSON.stringify(err.error));
      }
    });
  }
}
