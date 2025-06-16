import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';
import { CarritoService } from '../../services/carrito-service';
import { Carrito } from '../../core/carrito'; // Adjust the path if needed
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [Header, Nav, Footer, CommonModule, FormsModule, RouterLink, ],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  public carritoService = inject(CarritoService);
  listCarrito: Carrito[] = [];

  ngOnInit(): void {
    this.getListCarrito();
  }
  
  getListCarrito(){
    this.listCarrito = this.carritoService.getCarrito();
  }
  
  onKeyDown(event: any){
    event.preventDefault();
  }

  actualizar(item: Carrito, index: number){
    this.carritoService.actualizar(index, item.cantidad);
  }

  eliminarItem(index: number){
  this.carritoService.eliminar(index);
  this.getListCarrito();
  }

  procesarPago() {
    console.log(this.listCarrito)
  }
}
