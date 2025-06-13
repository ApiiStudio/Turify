import { Component, OnInit } from '@angular/core';
// Update the import path and exported member to match the actual file and export
import { ProductoService2, Producto } from '../../services/producto-service2';
import { Header } from '../../shared/header/header';
import { Nav } from '../../shared/nav/nav';
import { Footer } from '../../shared/footer/footer';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-productos2',
  templateUrl: './productos2.html',
  styleUrls: ['./productos2.css'],
  imports: [Header, Nav, Footer,CommonModule, ],
  providers: [ProductoService2]
})
export class Productos2Component implements OnInit {
  productos: Producto[] = [];
  categoriaSeleccionada = 'paquete';

  categorias: string[] = ['paquete', 'vuelo', 'alojamiento', 'excursion', 'auto'];

  constructor(private productoService2:ProductoService2) {}

productosFiltrados: Producto[] = [];

ngOnInit(): void {
  this.productoService2.getProductos().subscribe(data => {
    this.productos = data;
    this.actualizarFiltrados();
  });
}

seleccionarCategoria(cat: string): void {
  this.categoriaSeleccionada = cat;
  this.actualizarFiltrados();
}

actualizarFiltrados(): void {
  this.productosFiltrados = this.productos.filter(
    p => p.categoria === this.categoriaSeleccionada
  );
}

}
