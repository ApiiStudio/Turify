import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Servicios } from '../../../auth/admin/servicios/servicios';
import { AuthLogin } from '../../../services/auth-login/auth-login';

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterLink, FormsModule, CommonModule,],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css'
})

export class AdminNavbar implements AfterViewInit {
usuarioActual: any;

constructor(private authlogin: AuthLogin){
  this.usuarioActual = this.authlogin.currentUserData.value;
}

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

  mostrarFormulario = false;
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

