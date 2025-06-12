import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Nav } from '../../shared/nav/nav';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-vuelos',
  imports: [Header, Nav, Footer,],
  templateUrl: './vuelos.html',
  styleUrl: './vuelos.css'
})
export class Vuelos {

}
