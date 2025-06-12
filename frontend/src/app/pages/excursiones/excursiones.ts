import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Nav } from '../../shared/nav/nav';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-excursiones',
  imports: [Header, Nav, Footer,],
  templateUrl: './excursiones.html',
  styleUrl: './excursiones.css'
})
export class Excursiones {

}
