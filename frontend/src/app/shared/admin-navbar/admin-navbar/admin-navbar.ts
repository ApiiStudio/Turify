import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthLogin } from '../../../services/auth-login/auth-login';
import { User } from '../../../services/user';
import { Pedido, PedidoService } from '../../../services/pedidos/pedidos-service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css'
})
export class AdminNavbar implements AfterViewInit, OnInit {
  usuarioActual: any;
  usuarioCliente: User[] = [];
  pedidos: Pedido[] = [];

  constructor(
    private authlogin: AuthLogin,
    private pedidoService: PedidoService,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Cargar usuario actual
    this.usuarioActual = this.authlogin.currentUserData.value;

    // Obtener todos los usuarios
    this.authlogin.getAllUsers().subscribe({
      next: (clientes) => {
        console.log('🟡 Usuarios devueltos por la API:', clientes);

        this.usuarioCliente = (clientes as any[])
          .filter(u => u.rol === 'cliente')
          .map(u => ({
            id: u.id,
            name: u.name,
            surname: u.surname,
            email: u.email,
            role: u.rol 
          }));

          this.cdRef.detectChanges();
        console.log('🟢 Usuarios filtrados (rol cliente):', this.usuarioCliente);
      },
      error: (err) => {
        console.error('❌ Error al obtener usuarios con rol cliente:', err);
      }
    });

    // Obtener pedidos
    this.pedidoService.getPedidos().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('❌ Error al obtener pedidos:', err);
      }
    });
  }

  // Menú
  ngAfterViewInit() {
    const hamburguer = document.querySelector(".toggle-btn");
    const toggler = document.querySelector("#icon");
    if (hamburguer) {
      hamburguer.addEventListener("click", function () {
        document.querySelector("#sidebar")?.classList.toggle("expand");
        toggler?.classList.toggle("fa-chevron-right");
        toggler?.classList.toggle("fa-chevron-left");
      });
    }
  }

  mostrarFormulario = false;

  getMontoTotalPorEstado(estado: 'pendiente' | 'anulado' | 'completo'): number {
    return this.pedidos
      .filter(p => p.estado === estado)
      .reduce((sum, p) => sum + (p.monto_total || 0), 0);
  }
}
