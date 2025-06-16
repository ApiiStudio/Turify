import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Header } from '../../../shared/header/header';
import { Nav } from '../../../shared/nav/nav';
import { Producto, ProductoService2 } from '../../../services/producto-service2';
import { ProductoService } from '../../../services/productoService';
import { BehaviorSubject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, Header, Nav, ReactiveFormsModule],
  templateUrl: './servicios.html',
  styleUrls: ['./servicios.css']
})

export class Servicios implements AfterViewInit {
  productos: Producto[] = [];
  nuevoServicio: any = {};
  editandoIndex: number | null = null;
  idEditando: number | null = null;

  categoriasDisponibles: string[] = ['paquete', 'excursion', 'vuelo', 'alojamiento', 'auto'];

  categoriaControl = new FormControl(''); // 🔹 Control reactivo para el select

  private productosSubject = new BehaviorSubject<Producto[]>([]);

  constructor(private productoService: ProductoService2) {
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
      this.productosSubject.next(productos); // Si en el futuro querés trabajar con observable
    });
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

  guardarServicio() {
    if (this.idEditando !== null) {
      const productoEditado = { ...this.nuevoServicio, id: this.idEditando };
      this.productoService.editarProducto(this.idEditando, productoEditado);
    } else {
      const nuevo = { ...this.nuevoServicio, categoria: this.nuevoServicio.tipo };
      this.productoService.addProducto(nuevo);
    }
    this.resetForm();
  }

  editarServicio(id: number) {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      this.nuevoServicio = { ...producto };
      this.idEditando = id;
    }
  }

  eliminarServicio(id: number) {
    this.productoService.eliminarProducto(id);
    this.resetForm();
  }

  resetForm() {
    this.nuevoServicio = {};
    this.editandoIndex = null;
    this.idEditando = null;
  }

  get serviciosFiltrados() {
    const categoria = this.categoriaControl.value;
    return categoria
      ? this.productos.filter(s => s.categoria === categoria)
      : this.productos;
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}