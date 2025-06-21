import { Component, AfterViewInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Footer } from '../../../shared/footer/footer';
import { Nav } from '../../../shared/nav/nav';
import { Header } from '../../../shared/header/header';
import { Chart } from 'chart.js';
import { AdminNavbar } from '../../../shared/admin-navbar/admin-navbar/admin-navbar';

@Component({
  selector: 'app-admin',
  imports: [Header, Nav, AdminNavbar],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin {

  }