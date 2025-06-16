export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;

  //Paquete Turistico & Alojamiento
  noches: number;
  personas: number;
  hotel: string;

  //Vuelo
  duracion: string;
  clase: string;

  //Auto
  dias: number;
  gama: string;
}