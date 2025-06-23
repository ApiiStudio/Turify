import { Component } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { Header } from '../../shared/header/header';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restringido',
  imports: [Footer, Header, RouterLink],
  templateUrl: './restringido.html',
  styleUrl: './restringido.css'
})
export class Restringido {

}
