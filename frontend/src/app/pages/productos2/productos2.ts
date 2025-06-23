import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ProductoService2, Producto } from '../../services/producto/producto-service2';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { CommonModule } from '@angular/common';
import { AuthLogin } from '../../services/auth-login/auth-login';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../services/user';
import { CarritoService } from '../../services/carrito/carrito-service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-productos2',
  templateUrl: './productos2.html',
  styleUrls: ['./productos2.css'],
  imports: [Header, Footer, CommonModule],
})
export class Productos2Component implements OnInit {
  productos: Producto[] = [];
  categoriaSeleccionada = 'Paquete';
  categorias: string[] = ['paquete', 'vuelo', 'alojamiento', 'excursion', 'auto'];
  userData?: User;
  userLoginOn: boolean = false;
  productosFiltrados: Producto[] = [];
  constructor(
    private productoService2: ProductoService2,
    private AuthLogin: AuthLogin,
    private router: Router,
    private carritoService: CarritoService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) { }
  
  // Inicia el componente y obtiene los productos
  ngOnInit(): void {
    this.AuthLogin.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn
      }
    });
    this.AuthLogin.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
      }
    });
    this.categoriaControl = new FormControl('');

    // Obtiene los Productos
    this.productoService2.getProductosApi().subscribe((productos) => {
      this.productos = productos;
      // Filtro por URL
      const categoria = this.route.snapshot.queryParamMap.get('categoria');
      if (categoria) {
        this.categoriaControl.setValue(categoria);
        this.categoriaSeleccionada = categoria;
        this.actualizarFiltrados(categoria);
      } else {
        this.actualizarFiltrados('');
      }
    });

    // Escucha de cambios en la URL
    this.route.queryParams.subscribe(params => {
      const categoria = params['categoria'];
      if (categoria) {
        this.categoriaControl.setValue(categoria);
        this.categoriaSeleccionada = categoria;
        this.actualizarFiltrados(categoria);
      } else {
        this.actualizarFiltrados('');
      }
    });

    // Cambios de control
    this.categoriaControl.valueChanges.subscribe(categoria => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { categoria },
        queryParamsHandling: 'merge'
      });
      this.categoriaSeleccionada = categoria ?? '';
      this.actualizarFiltrados(categoria ?? '');
    });
  }

  categoriaControl = new FormControl('');

  // Seleccionar Categoría
  seleccionarCategoria(cat: string): void {
  this.categoriaSeleccionada = cat;
  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: { categoria: cat },
    queryParamsHandling: 'merge',
  });
  this.actualizarFiltrados(cat);
  }

  // Actualizar Filtro
  actualizarFiltrados(categoria: any): void {
    if (!categoria) {
      this.productosFiltrados = [...this.productos];
    } else {
      this.productosFiltrados = this.productos.filter(
        p => p.categoria === categoria
      );
    }
    console.log("se filtran los productos:", categoria, this.productosFiltrados);
    this.cdr.detectChanges();
  }

  // Agregar Producto Carrito
  agregarProducto(producto: Producto) {
    this.carritoService.agregarProducto(producto, 1);
  }
  trackById(index: number, item: Producto) {
    return item.id;
  }
}
