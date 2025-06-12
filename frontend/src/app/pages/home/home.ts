import { Component } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { Nav } from '../../shared/nav/nav';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../shared/header/header';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, Footer, Nav, Header],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
}
