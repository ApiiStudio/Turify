import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterLink, FormsModule, CommonModule, ],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css'
})

export class AdminNavbar implements AfterViewInit {
  ngAfterViewInit() {
    const hamburguer = document.querySelector(".toggle-btn");
    const toggler = document.querySelector("#icon");
    if (hamburguer) {
      hamburguer.addEventListener("click", function () {
        document.querySelector("#sidebar")?.classList.toggle("expand");
        toggler?.classList.toggle("fa-chevron-right");
        toggler?.classList.toggle("fa-chevron-left");
      });
    }
  }
  //Usuarios Ejemplo
  usuarios = [
  { id: 1, nombre: 'Benicio', apellido: 'Ferrer', correo: 'beniferrer@gmail.com', password: 'BeniDeveloper45', rol: 'Admin' },
  { id: 2, nombre: 'Yaco', apellido: 'Ledesma', correo: 'yaquitoL@outlook.com', password: 'gatoperro2005', rol: 'Jefe de Ventas' },
  { id: 3, nombre: 'Ezequiel', apellido: 'Rey', correo: 'ezerey15@gmail.com', password: 'Jsd42F4#', rol: 'Admin' },
  { id: 4, nombre: 'Vicente', apellido: 'Sanchez', correo: 'viceensanchh@gmail.com', password: '$vScrOot#', rol: 'Jefe de Ventas' }
  ];
  //
  nuevoUsuario = {
  nombre: '',
  apellido: '',
  correo: '',
  password: '',
  rol: ''
  };

  mostrarFormulario = false;

  agregarUsuario() {
  const nuevoId = this.usuarios.length + 1;
  const usuario = {
    id: nuevoId,
    ...this.nuevoUsuario
  };
  this.usuarios.push(usuario);
  this.nuevoUsuario = { nombre: '', apellido: '', correo: '', password: '', rol: '' };
  this.mostrarFormulario = false;
}
cancelarAgregar() {
  this.nuevoUsuario = { nombre: '', apellido: '', correo: '', password: '', rol: '' };
  this.mostrarFormulario = false;
}
}
const hamburguer = document.querySelector(".toggle-btn");
const toggler = document.querySelector("#icon");
if (hamburguer) {
  hamburguer.addEventListener("click", function () {
    document.querySelector("#sidebar")?.classList.toggle("expand");
    toggler?.classList.toggle("fa-chevron-right");
    toggler?.classList.toggle("fa-chevron-left");
  });
}
