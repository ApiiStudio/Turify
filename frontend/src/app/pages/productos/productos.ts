import { Component, Inject, OnInit } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Nav } from '../../shared/nav/nav';
import { Footer } from '../../shared/footer/footer';
import { ProductoService } from '../../services/productoService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  imports: [Header, Nav, Footer,CommonModule,],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
  providers: [ProductoService]
})
export class Productos implements OnInit{
  productoAlojamiento: any[] = [];

  constructor(private productoService: ProductoService){}
  ngOnInit(): void {
    this.productoAlojamiento = this.productoService.getProductoAlojamiento();
  }
}
