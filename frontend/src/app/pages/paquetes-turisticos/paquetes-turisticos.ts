import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Nav } from '../../shared/nav/nav';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-paquetes-turisticos',
  imports: [Header, Nav, Footer, ],
  templateUrl: './paquetes-turisticos.html',
  styleUrl: './paquetes-turisticos.css'
})
export class PaquetesTuristicos {

}
