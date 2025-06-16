import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthLogin } from '../../services/auth-login';
import { User } from '../../services/user';
import { ProductoService2, Producto } from '../../services/producto-service2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
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
    private productoService: ProductoService2
  ) {
  }
  ngOnInit(): void {
    this.AuthLogin.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    this.productoService.getProductos().subscribe((data) => {
      this.productos = this.shuffleArray(data);
    });

    this.autoSlideInterval = setInterval(() => {
      this.next();
    }, 50);

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
  const total = this.productos.length;
  const visibles: Producto[] = [];

  for (let i = 0; i < this.visibleCount; i++) {
    const index = (this.currentIndex + i) % total;
    visibles.push(this.productos[index]);
  }

  return visibles;
}

  next(): void {
    if (this.currentIndex + this.visibleCount < this.productos.length) {
      this.currentIndex++;
    }
    else {
      this.currentIndex = 0;
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

    private shuffleArray(array: Producto[]): Producto[] {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }
}
