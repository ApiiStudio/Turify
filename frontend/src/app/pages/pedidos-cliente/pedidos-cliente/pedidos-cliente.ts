import { Component } from '@angular/core';
import { Header } from '../../../shared/header/header';
import { Nav } from '../../../shared/nav/nav';
import { Footer } from '../../../shared/footer/footer';

@Component({
  selector: 'app-pedidos-cliente',
  imports: [Header, Nav, Footer],
  templateUrl: './pedidos-cliente.html',
  styleUrl: './pedidos-cliente.css'
})
export class PedidosCliente {

}
