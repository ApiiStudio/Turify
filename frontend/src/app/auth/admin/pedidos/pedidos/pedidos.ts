import { Component, OnInit } from '@angular/core';
import { Header } from '../../../../shared/header/header';
import { RouterLink } from '@angular/router';
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
  pedidosPendientes: Pedido[] = [];
  pedidosHistoricos: Pedido[] = [];

  constructor(private pedidoService: PedidoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  //Menú
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

  //Carga Pedidos
  cargarPedidos(): void {
    this.pedidoService.getPedidos().subscribe({
      next: res => {
        console.log(res)
        this.pedidos = res;
        this.pedidosPendientes = res.filter(p => p.estado === 'pendiente');
        this.pedidosHistoricos = res.filter(p => p.estado === 'completo' || p.estado === 'anulado');
        this.cdr.detectChanges();
      },
      error: err => console.error('Error al obtener pedidos:', err)
    });
  }

  //Localiza Pedido
  trackById(index: number, pedido: Pedido): number {
  return pedido.id;
  }

  //Cambia Estado
  cambiarEstado(pedidoId: number, estado: string): void {
    this.pedidoService.actualizarEstadoPedido(pedidoId, estado).subscribe({
      next: () => {
        this.cargarPedidos();
      },
      error: err => console.error('Error al actualizar estado:', err)
    });
  }

  //Anula Pedidos
  anularPedidoAdmin(id: number): void {
    if (confirm('¿Estás seguro de que querés anular este pedido?')) {
      this.pedidoService.anularPedidoAdmin(id).subscribe({
        next: () => this.cargarPedidos(),
        error: err => alert(err.error?.detail || 'Error al anular el pedido')
      });
    }
  }

  //Total Pedidos según su Estado
  getTotalesPorEstado(estado: 'pendiente' | 'anulado' | 'completo'): number {
    return this.pedidos.filter(p => p.estado === estado).length;
  }
}
