import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Header } from '../../../shared/header/header';
import { Nav } from '../../../shared/nav/nav';
import { Producto, ProductoService2 } from '../../../services/producto/producto-service2';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, Header, Nav, ReactiveFormsModule],
  templateUrl: './servicios.html',
  styleUrls: ['./servicios.css']
})
export class Servicios implements OnInit, AfterViewInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  nuevoServicio: any = {};
  idEditando: number | null = null;

  categoriaSeleccionada: string = '';

  constructor(private productoService: ProductoService2) {}

  ngOnInit(): void {
    this.cargarProductos();
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

  cargarProductos() {
    // 1. Intenta cargar desde localStorage primero
    const local = localStorage.getItem('productos');
    if (local) {
      this.productos = JSON.parse(local);
      this.refrescarFiltrado();
    }
    // 2. Luego sincroniza con la API
    this.productoService.getProductosApi().subscribe({
      next: (productos) => {
        this.productos = productos;
        localStorage.setItem('productos', JSON.stringify(productos));
        this.refrescarFiltrado();
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

guardarServicio() {
  // 🔁 Lógica de edición
    console.log('Enviando servicio...', this.nuevoServicio);
  if (this.idEditando !== null) {
    this.productoService.editarProductoApi(this.idEditando, this.nuevoServicio).subscribe({
      next: () => {
        this.cargarProductos();
        this.resetForm();
      },
      error: (err) => console.error('Error al editar servicio:', err)
    });
  } else {
    this.productoService.addProductoApi(this.nuevoServicio).subscribe({
      next: () => {
        // Actualiza localStorage inmediatamente
        const nuevos = [...this.productos, this.nuevoServicio];
        localStorage.setItem('productos', JSON.stringify(nuevos));
        this.cargarProductos();
        this.resetForm();
      },
      error: (err) => console.error('Error al agregar servicio:', err)
    });
  }
}

  editarServicio(id: number) {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      this.nuevoServicio = { ...producto };
      this.idEditando = id;
    }
  }

  refrescarFiltrado() {
    const categoria = this.categoriaSeleccionada?.toLowerCase();
    if (categoria) {
      this.productosFiltrados = this.productos.filter(
        p => p.categoria?.toLowerCase() === categoria
      );
    } else {
      this.productosFiltrados = [...this.productos];
    }
  }

resetForm() {
  this.nuevoServicio = {};
  this.idEditando = null;
  // también podés resetear el form visualmente si usás TemplateRef:
  const form = document.querySelector('form') as HTMLFormElement;
  form?.reset();
}
  trackById(index: number, item: any) {
    return item.id;
  }

  eliminarServicio(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      this.productoService.eliminarProductoApi(id).subscribe({
        next: () => {
          // Actualiza localStorage inmediatamente
          const nuevos = this.productos.filter(p => p.id !== id);
          localStorage.setItem('productos', JSON.stringify(nuevos));
          this.cargarProductos();
          this.resetForm();
        },
        error: (err) => console.error('Error al eliminar servicio:', err)
      });
    }
  }
}