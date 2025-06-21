import { Component, OnInit } from '@angular/core';
import { Header } from '../../../../shared/header/header';
import { RouterLink } from '@angular/router';
import { Footer } from '../../../../shared/footer/footer';
import { Nav } from '../../../../shared/nav/nav';
import { CommonModule } from '@angular/common';
import { PedidoService, Pedido } from '../../../../services/pedidos/pedidos-service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [Header, RouterLink, Nav, CommonModule],
  templateUrl: './pedidos.html',
  styleUrls: ['./pedidos.css']
})

export class Pedidos implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  ngAfterViewInit() {
    const hamburguer = document.querySelector(".toggle-btn");
    const toggler = document.querySelector("#icon");
    if (hamburguer) {
      hamburguer.addEventListener("click", () => {
        document.querySelector("#sidebar")?.classList.toggle("expand");
        toggler?.classList.toggle("fa-chevron-right");
        toggler?.classList.toggle("fa-chevron-left");
      });
    }
  }

cargarPedidos(): void {
  this.pedidoService.getPedidos().subscribe({
    next: res => {
      this.pedidos = res;
      this.cdr.detectChanges(); // 👈 fuerza la actualización de la vista
    },
    error: err => console.error('Error al obtener pedidos:', err)
  });
}

  cambiarEstado(pedidoId: number, estado: string): void {
    this.pedidoService.actualizarEstadoPedido(pedidoId, estado).subscribe({
      next: () => {
        const pedido = this.pedidos.find(p => p.id === pedidoId);
        if (pedido) pedido.estado = estado;
      },
      error: err => console.error('Error al actualizar estado:', err)
    });
  }
anularPedidoAdmin(id: number): void {
  if (confirm('¿Estás seguro de que querés anular este pedido?')) {
    this.pedidoService.anularPedidoAdmin(id).subscribe({
      next: () => {
        this.pedidos = this.pedidos.map(p =>
          p.id === id ? { ...p, estado: 'anulado' } : p
        );
      },
      error: err => {
        alert(err.error?.detail || 'Error al anular el pedido');
      }
    });
  }
}
}
