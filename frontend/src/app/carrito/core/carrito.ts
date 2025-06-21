import { Producto } from "../../services/producto/producto-service2";

export class Carrito {
    producto: Producto;
    cantidad: number;

    constructor(
        producto: Producto,
        cantidad: number = 1){
            this.producto = producto;
            this.cantidad = cantidad;
        } 
}
