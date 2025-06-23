import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthLogin } from '../../services/auth-login/auth-login';
import { User } from '../../services/user';
import { ProductoService2, Producto } from '../../services/producto/producto-service2';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/header/header';
import { Nav } from '../../shared/nav/nav';
import { Footer } from '../../shared/footer/footer';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, RouterLink, Header, Nav, Footer,],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio implements OnInit {
  userData?: User;
  userLoginOn: boolean = false;
  productos: Producto[] = [];
  currentIndex = 0;
  visibleCount = 3;
  autoSlideInterval: any;
  constructor(
    private AuthLogin: AuthLogin,
    private productoService: ProductoService2,
    private cdr: ChangeDetectorRef,
  ) {
  }
  ngOnInit(): void {
    this.AuthLogin.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    // Cargar productos desde la API
    this.productoService.getProductosApi().subscribe({
      next: (productos) => {
        this.productos = productos || [];
        this.currentIndex = 0;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });

    this.autoSlideInterval = setInterval(() => {
      if (this.productos.length > 0) {
        this.next();
      }
    }, 3000);

    this.AuthLogin.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

get productosVisibles(): Producto[] {
  if (!this.productos || this.productos.length === 0) {
    return [];
  }
  const total = this.productos.length;
  const visibles: Producto[] = [];

  for (let i = 0; i < this.visibleCount; i++) {
    const index = (this.currentIndex + i) % total;
    visibles.push(this.productos[index]);
  }

  return visibles;
}

  next(): void {
    if (this.productos.length === 0) return;
    if (this.currentIndex + this.visibleCount < this.productos.length) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prev(): void {
    if (this.productos.length === 0) return;
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = Math.max(0, this.productos.length - this.visibleCount);
    }
  }

    private shuffleArray(array: Producto[]): Producto[] {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }
}
