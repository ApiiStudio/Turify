import { Component } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { Nav } from '../../shared/nav/nav';
import { Header } from '../../shared/header/header';

@Component({
  selector: 'app-alquiler-auto',
  imports: [Header, Nav, Footer],
  templateUrl: './alquiler-auto.html',
  styleUrl: './alquiler-auto.css'
})
export class AlquilerAuto {

}
