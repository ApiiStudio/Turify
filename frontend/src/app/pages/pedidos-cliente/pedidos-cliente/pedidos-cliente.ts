import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedidos/pedidos-service';
import { AuthLogin } from '../../../services/auth-login/auth-login';
import { Header } from '../../../shared/header/header';
import { Nav } from '../../../shared/nav/nav';
import { Footer } from '../../../shared/footer/footer';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-pedidos-cliente',
  templateUrl: './pedidos-cliente.html',
  imports: [Header, Nav, Footer, CommonModule]
})
export class PedidosCliente implements OnInit {
  pedidos: any[] = [];

  constructor(
    private pedidoService: PedidoService,
    private authlogin: AuthLogin,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.obtenerPedidosCliente();
  }

obtenerPedidosCliente(): void {
  const usuario = this.authlogin.currentUserData.value;
  if (!usuario || !usuario.id) {
    this.pedidos = [];
    return;
  }
  this.pedidoService.getPedidosPorUsuario(usuario.id).subscribe({
    next: (data) => {
      this.pedidos = data;
      this.cdRef.detectChanges();
    },
    error: (err) => {
      console.error('Error al obtener pedidos del cliente:', err);
    }
  });
}

anularPedido(pedidoId: number): void {
  if (!confirm('¿Estás seguro que deseas anular este pedido? Esta acción no se puede deshacer.')) {
    return;
  }
  this.pedidoService.anularPedidoAdmin(pedidoId).subscribe({
    next: () => this.obtenerPedidosCliente(),
    error: (err) => console.error('Error al anular pedido:', err)
  });
  this.cdRef.detectChanges();
}
}