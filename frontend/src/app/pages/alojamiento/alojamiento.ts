import { Component, Inject, OnInit } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Nav } from '../../shared/nav/nav';
import { Footer } from '../../shared/footer/footer';
import { AlojamientoService } from '../../services/alojamiento';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alojamiento',
  imports: [Header, Nav, Footer,CommonModule,],
  templateUrl: './alojamiento.html',
  styleUrl: './alojamiento.css',
  providers: [AlojamientoService]
})
export class Alojamiento implements OnInit{
  productoAlojamiento: any[] = [];

  constructor(private alojamientoService: AlojamientoService){}
  ngOnInit(): void {
    this.productoAlojamiento = this.alojamientoService.getProductoAlojamiento();
  }
}
