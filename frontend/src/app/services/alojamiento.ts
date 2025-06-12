import { Injectable,  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlojamientoService {

  private productosHotel = [
  {
    nombre: 'Hotel Luna',
    noches: 2,
    personas: 3,
    precio: 1699,
    imagen: '/imagenes/alojamiento/hotel1.jpg'
  },
  {
    nombre: 'Hotel Sol',
    noches: 3,
    personas: 2,
    precio: 899,
    imagen: '/imagenes/alojamiento/hotel2.jpg'
  },
  {
    nombre: 'Hotel Marte, Buenos Aires, Recoleta',
    noches: 7,
    personas: 3,
    precio: 4399,
    imagen: '/imagenes/alojamiento/hotel2.jpg'
  },
    {
    nombre: 'Hotel Marte, Buenos Aires, Recoleta',
    noches: 7,
    personas: 3,
    precio: 4399,
    imagen: '/imagenes/alojamiento/hotel2.jpg'
  }
  ];

  getProductoAlojamiento(){
    return this.productosHotel;
  }
}
